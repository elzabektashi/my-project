"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with back button to Fleet */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Link href="/user/dashboard/fleet">
            <Button variant="outline" size="icon">
              ←
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Add New Driver</h1>
        </div>
      </div>

      {/* Form centered */}
      <div className="flex flex-1 items-start justify-center px-4 mt-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl space-y-6 bg-[#0d1526] p-10 rounded-xl"
        >
          <div>
            <Label
              htmlFor="name"
              className="text-base font-semibold text-white"
            >
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter driver name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-base font-semibold text-white"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter driver email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="text-base font-semibold text-white"
            >
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full text-base">
            Add Driver
          </Button>
        </form>
      </div>
    </div>
  );
}
