"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Upload, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface Document {
  id: number
  name: string
  type: string
  uploadedBy: string
  uploadedAt: string
}

interface OrderDocumentsProps {
  orderId: string
  documents: Document[]
}

export function OrderDocuments({ orderId, documents }: OrderDocumentsProps) {
  const [isUploading, setIsUploading] = useState(false)

  // Format timestamp to readable date and time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Order Documents</CardTitle>
          <CardDescription>View and manage documents for this order</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>Upload a new document for this order</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select required>
                  <SelectTrigger id="document-type">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bill-of-lading">Bill of Lading</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="proof-of-delivery">Proof of Delivery</SelectItem>
                    <SelectItem value="customs-declaration">Customs Declaration</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="document-file">File</Label>
                <Input id="document-file" type="file" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document-notes">Notes (Optional)</Label>
                <Input id="document-notes" placeholder="Add notes about this document" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload Document"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <FileText className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No documents yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Upload documents for this order</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-start space-x-4">
                  <div className="rounded-md bg-primary/10 p-2 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.type}</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded by {doc.uploadedBy} on {formatTimestamp(doc.uploadedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
