"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

export default function VerifyDocument() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    status: "valid" | "invalid" | "error";
    message: string;
    hash?: string;
    uuid?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setResult(null);   // Clear previous results when new file is selected
    } 
  });

  const handleVerify = async () => {
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file, file.name);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      setResult({
        status: "valid",
        message: "Document uploaded and hashed successfully!",
        hash: data.hash,
        uuid: data.uuid
      });
    } catch (error) {
      setResult({
        status: "error",
        message: error instanceof Error ? error.message : "Upload failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upload Document</h1>

      <Card className="p-6">
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
          >
            <input {...getInputProps()} />
            <p>Drag & drop document here, or click to select</p>
            {file && <p className="mt-2 text-sm">Selected: {file.name} ({Math.round(file.size / 1024)} KB)
            </p>}
          </div>

          <Button 
            onClick={handleVerify} 
            disabled={!file || isLoading}
            className="w-full"
          >
            Upload Document
          </Button>

          {result && (
            <div className={`p-4 rounded-lg ${
              result.status === "valid" 
                ? "bg-green-100 text-green-700" 
                : result.status === "invalid"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {result.message}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}