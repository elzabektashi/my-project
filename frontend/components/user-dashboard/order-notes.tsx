"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface Note {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface OrderNotesProps {
  orderId: string;
  notes: Note[];
}

export function OrderNotes({ orderId, notes: initialNotes }: OrderNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format timestamp to readable date and time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      const newNoteObj: Note = {
        id: Date.now(),
        author: "Current User", // In a real app, this would come from the authenticated user
        content: newNote,
        timestamp: new Date().toISOString(),
      };

      setNotes([newNoteObj, ...notes]);
      setNewNote("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Notes</CardTitle>
        <CardDescription>Add and view notes for this order</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Add a note about this order..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || !newNote.trim()}>
              {isSubmitting ? "Adding Note..." : "Add Note"}
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No notes yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add the first note for this order
              </p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{note.author}</h3>
                  <p className="text-xs text-muted-foreground">
                    {formatTimestamp(note.timestamp)}
                  </p>
                </div>
                <p className="mt-2 text-sm">{note.content}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
