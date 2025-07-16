from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # เปิดใช้งาน CORS ให้ React เรียก API ได้

@app.route('/')
def home():
    return 'Flask backend is running!'

@app.route('/api/hello')
def hello():
    return jsonify({'message': 'สวัสดีจาก Flask!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
