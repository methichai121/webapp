from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import logging
import os
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText
import threading

app = Flask(__name__)
CORS(app)

# -------------------------
# Configurations
# -------------------------
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

logging.basicConfig(level=logging.ERROR)

# -------------------------
# Database connection (Railway)
# -------------------------
def get_db_connection():
    return mysql.connector.connect(
        host="metro.proxy.rlwy.net",  # <-- Host จาก Railway
        user="root",
        password="INCqoeHnCjzZjcgJScePIPKksBzhtj",  # <-- รหัสจาก Railway
        database="railway",  # <-- database name จาก Railway
        port=10714  # <-- port จาก Railway
    )

# -------------------------
# Email notification functions
# -------------------------
def send_email(to_email, subject, message):
    sender_email = "yourgmail@gmail.com"
    sender_password = "your_app_password"  # ต้องใช้ App Password ของ Gmail

    msg = MIMEText(message, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, msg.as_string())

def notify_upcoming_events():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        now = datetime.now()
        next_day = now + timedelta(days=1)
        next_day_str = next_day.strftime("%Y-%m-%d")

        cursor.execute("""
            SELECT f.userEmail, a.nameactivity, a.date, a.start_time, a.location
            FROM follow_activities f
            JOIN activities a ON f.activity_id = a.activity_id
            WHERE a.date = %s
        """, (next_day_str,))

        for row in cursor.fetchall():
            email = row["userEmail"]
            name = row["nameactivity"]
            date = row["date"]
            start = row["start_time"]
            location = row["location"]

            subject = f"แจ้งเตือนกิจกรรม: {name}"
            message = f"""สวัสดีค่ะ/ครับ
คุณมีกิจกรรมที่ติดตามไว้กำลังจะเริ่มในวันที่ {date} เวลา {start}
สถานที่: {location}

อย่าลืมไปร่วมกิจกรรมนะครับ/ค่ะ!"""

            send_email(email, subject, message)

    except Exception as e:
        logging.error(f"Error sending notifications: {e}")
    finally:
        cursor.close()
        conn.close()

@app.route('/api/notify-events', methods=['GET'])
def trigger_notify():
    threading.Thread(target=notify_upcoming_events).start()
    return jsonify({"message": "Notification process started"}), 200

# -------------------------
# API routes
# -------------------------
@app.route("/api/activities", methods=["GET"])
def get_activities():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT activity_id, nameactivity, date, start_time, end_time, location FROM activities")
    activities = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(activities)

@app.route('/api/check-user', methods=['POST'])
def check_user():
    data = request.get_json()
    email = data.get('email', '').strip()
    if not email:
        return jsonify({"error": "Missing email"}), 400
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        if user:
            return jsonify({"exists": True, "user_id": user["user_id"]})
        else:
            return jsonify({"exists": False, "message": "User not found"})
    except mysql.connector.Error as err:
        logging.error(f"Error occurred: {err}")
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    required_fields = ["firstName", "lastName", "email", "faculty", "major", "year"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"Missing field: {field}"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        sql = """
        INSERT INTO users (firstname, lastname, email, faculty, major, year)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            data['firstName'].strip(), data['lastName'].strip(), data['email'].strip(),
            data['faculty'].strip(), data['major'].strip(), data['year'].strip()
        ))
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except mysql.connector.Error as err:
        logging.error(f"Error occurred: {err}")
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/student/<int:user_id>', methods=['GET'])
def get_student(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users WHERE user_id=%s", (user_id,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user)
    finally:
        cursor.close()
        conn.close()

@app.route('/api/student/update/<int:user_id>', methods=['PUT'])
def update_student(user_id):
    try:
        data = request.get_json(force=True)
        fields = ["firstname", "lastname", "studentid", "sex", "phone", "faculty", "major", "year", "dateofburn"]
        values = [data.get(f) if data.get(f) not in ['', None] else None for f in fields]
        values.append(user_id)

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE users SET
                firstname=%s, lastname=%s, studentid=%s, sex=%s, phone=%s,
                faculty=%s, major=%s, year=%s, dateofburn=%s
            WHERE user_id=%s
        """, values)
        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "No user found with that ID"}), 404
        return jsonify({"message": "Profile updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/teacher/<int:user_id>', methods=['GET'])
def get_teacher(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users WHERE user_id=%s", (user_id,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "Teacher not found"}), 404
        return jsonify(user)
    finally:
        cursor.close()
        conn.close()

@app.route('/api/get-user', methods=['POST'])
def get_user_by_email():
    data = request.get_json()
    email = data.get('email', '').strip()
    if not email:
        return jsonify({"error": "Missing email"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user)
    finally:
        cursor.close()
        conn.close()

@app.route('/api/activities', methods=['POST'])
def create_activity():
    try:
        data = request.form
        image_file = request.files.get('image')
        hours = int(data.get('hours') or 0)

        image_path = None
        if image_file and image_file.filename != '':
            image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
            image_file.save(image_path)

        date_str = data.get('date')
        start_time_str = data.get('start_time')
        end_time_str = data.get('end_time')

        start_datetime = end_datetime = None
        if date_str and start_time_str:
            start_datetime = datetime.strptime(f"{date_str} {start_time_str}", "%Y-%m-%d %H:%M")
        if date_str and end_time_str:
            end_datetime = datetime.strptime(f"{date_str} {end_time_str}", "%Y-%m-%d %H:%M")

        conn = get_db_connection()
        cursor = conn.cursor()
        sql = """
        INSERT INTO activities (
            nameactivity, description, date,
            start_time, end_time, location,
            hours, note, image, created_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            data.get('nameactivity'),
            data.get('description'),
            date_str,
            start_datetime,
            end_datetime,
            data.get('location'),
            hours,
            data.get('note'),
            image_path,
            datetime.now()
        ))
        conn.commit()
        return jsonify({"message": "Activity created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route("/api/activities/<int:activity_id>", methods=["GET"])
def get_activity(activity_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM activities WHERE activity_id = %s", (activity_id,))
        activity = cursor.fetchone()
        if not activity:
            return jsonify({"error": "Activity not found"}), 404

        if activity["date"]:
            activity["date"] = activity["date"].strftime("%Y-%m-%d")
        if activity["start_time"]:
            activity["start_time"] = activity["start_time"].strftime("%H:%M")
        if activity["end_time"]:
            activity["end_time"] = activity["end_time"].strftime("%H:%M")
        if activity["created_at"]:
            activity["created_at"] = activity["created_at"].strftime("%Y-%m-%d %H:%M:%S")

        return jsonify(activity)
    finally:
        cursor.close()
        conn.close()

# -------------------------
# Run server
# -------------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)
