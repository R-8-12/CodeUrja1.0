from flask import Flask, request, jsonify, Response, send_file
from flask_cors import CORS
import pymongo
from bson import Binary
import uuid
import base64
import hashlib
import os, io

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow Next.js dev server

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

# File Upload and Storage
@app.route("/api/upload", methods=["POST"])
def upload_file():
    file = request.files.get('file')

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    if file and allowed_file(file.filename):
        # Generate unique UUID for the file
        file_uuid = str(uuid.uuid4())

        # Generate SHA-256 hash for the file
        hasher = hashlib.sha256()
        file_data = file.read()  # Read the file data
        hasher.update(file_data)
        file_hash = hasher.hexdigest()

        # Create a record with file metadata
        record = {
            "filename": file.filename,
            "uuid": file_uuid,
            "file_hash": file_hash,
            "file_data": Binary(file_data)  # Store the file data as Binary
        }

        # Insert the record into the MongoDB collection
        collection.insert_one(record)
        file_id = record["_id"]

        # Return UUID, hash, and success message
        return jsonify({
            "message": "File uploaded successfully",
            "uuid": file_uuid,
            "hash": file_hash,
            "mongo_id": str(file_id)
        }), 200
    else:
        return jsonify({"error": "Invalid file type"}), 400

# File Retrieval
@app.route("/api/get_file/<file_uuid>", methods=["GET"])
def get_file(file_uuid):
    record = collection.find_one({"uuid": file_uuid})

    if record:
        file_data = record["file_data"]
        filename = record["filename"]

        # Ensure the file_data is in binary format
        if isinstance(file_data, str):  # If stored as Base64 string
            file_data = base64.b64decode(file_data)

        # Use send_file to return the file properly
        return send_file(
            io.BytesIO(file_data),  
            mimetype="application/octet-stream",  
            as_attachment=True,  
            download_name=filename
        )
    else:
        return jsonify({"error": "File not found"}), 404

@app.route("/api/verify", methods=["POST"])
def verify_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    # Compute SHA-256 hash for the uploaded file
    file_data = file.read()
    file_hash = hashlib.sha256(file_data).hexdigest()

    # Check if the hash exists in the database
    record = collection.find_one({"file_hash": file_hash})

    if record:
        return jsonify({
            "message": "Document is authentic",
            "uuid": record["uuid"],
            "filename": record["filename"],
            "stored_hash": record["file_hash"],
            "verified_hash": file_hash
        }), 200
    else:
        return jsonify({
            "error": "Document integrity compromised or not found",
            "provided_hash": file_hash
        }), 400
    
    # Get all documents
@app.route("/api/documents", methods=["GET"])
def get_documents():
    documents = list(collection.find({}, {"_id": 1, "filename": 1, "uuid": 1, "file_hash": 1}))
    for doc in documents:
        doc["_id"] = str(doc["_id"])
    return jsonify(documents)

# Delete document
@app.route("/api/documents/<document_id>", methods=["DELETE"])
def delete_document(document_id):
    result = collection.delete_one({"_id": ObjectId(document_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Document not found"}), 404
    return jsonify({"message": "Document deleted successfully"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
