"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, ShieldCheck, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type DocumentStatus = "valid" | "tampered" | "pending";

export type Document = {
  id: string;
  name: string;
  uploadDate: Date | string;
  status: DocumentStatus;
  fileUrl: string;
};

interface DocumentTableProps {
  documents: Document[];
  onVerify?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
}

const statusVariantMap: Record<DocumentStatus, "default" | "destructive" | "secondary"> = {
  valid: "default",
  tampered: "destructive",
  pending: "secondary",
};

export function DocumentTable({ documents = [], onVerify, onDelete }: DocumentTableProps) {
  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[35%]">Document Name</TableHead>
          <TableHead className="w-[20%]">Upload Date</TableHead>
          <TableHead className="w-[15%]">Status</TableHead>
          <TableHead className="text-right w-[30%]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => {
          const uploadDate = new Date(document.uploadDate);
          const isValidDate = !isNaN(uploadDate.getTime());

          return (
            <TableRow key={document.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate max-w-[200px]">{document.name}</span>
                </div>
              </TableCell>
              <TableCell>
                {isValidDate ? uploadDate.toLocaleDateString() : 'Invalid Date'}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={statusVariantMap[document.status]}
                  className={cn({
                    'animate-pulse': document.status === 'pending',
                  })}
                >
                  {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(document.fileUrl, document.name)}
                    aria-label={`Download ${document.name}`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant={document.status === 'valid' ? 'default' : 'secondary'}
                    disabled={document.status === "pending"}
                    onClick={() => onVerify?.(document.id)}
                    aria-label={`${document.status === 'valid' ? 'Unverify' : 'Verify'} ${document.name}`}
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    {document.status === 'valid' ? 'Unverify' : 'Verify'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete?.(document.id)}
                    aria-label={`Delete ${document.name}`}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
        {documents.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              No documents found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}