from flask import Flask, request, jsonify
import pymongo
from bson import Binary
import uuid
import hashlib

# Initialize Flask app
app = Flask(__name__)

# MongoDB Setup
MONGO_URI = "mongodb+srv://parthgupta221092:P%40ssw0rd@cluster0.rb0zm.mongodb.net/"
client = pymongo.MongoClient(MONGO_URI)
db = client["land_records"]
collection = db["documents"]

# File Upload Configuration
ALLOWED_EXTENSIONS = {"pdf", "docx", "txt", "png", "jpg", "jpeg"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to test if API is working
@app.route("/api/test", methods=["GET"])
def test_api():
    return jsonify({"message": "Flask API is working!"})

# File Retrieval
@app.route("/api/get_file/<file_uuid>", methods=["GET"])
def get_file(file_uuid):
    # Retrieve the file record from the database
    record = collection.find_one({"uuid": file_uuid})
    
    if record:
        file_data = record["file_data"]
        filename = record["filename"]
        # Return the file data as a downloadable file
        return file_data, 200, {'Content-Type': 'application/octet-stream', 'Content-Disposition': f'attachment; filename={filename}'}
    else:
        return jsonify({"error": "File not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
