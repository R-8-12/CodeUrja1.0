"use client";

import { useState } from 'react';
import { DocumentTable } from '@/components/documents-table1';


export default function DocumentPage() {
  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Annual Report 2023.pdf",
      uploadDate: "2024-03-15",
      status: "valid" as const,
      fileUrl: "/documents/report2023.pdf"
    },
    {
      id: "2",
      name: "Employment Contract.docx",
      uploadDate: "2024-03-14",
      status: "tampered" as const,
      fileUrl: "/documents/contract.docx"
    },
    {
      id: "3",
      name: "Technical Specifications.pdf",
      uploadDate: "2024-03-13",
      status: "pending" as const,
      fileUrl: "/documents/specs.pdf"
    },
  ]);

  const handleVerify = (documentId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === documentId ? {
        ...doc,
        status: doc.status === 'valid' ? 'tampered' : 'valid'
      } : doc
    ));
  };

  const handleDelete = (documentId: string) => {
    setDocuments(docs => docs.filter(doc => doc.id !== documentId));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white ">Documents Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your verified documents</p>
      </div>
      
      <DocumentTable 
        documents={documents} 
        onVerify={handleVerify}
        onDelete={handleDelete}
      />
    </div>
  );
}