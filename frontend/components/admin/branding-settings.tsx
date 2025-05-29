"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export function BrandingSettings() {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(
    "/placeholder.svg?height=60&width=200&text=Platform+Logo"
  );
  const [faviconPreview, setFaviconPreview] = useState<string | null>(
    "/placeholder.svg?height=32&width=32&text=Favicon"
  );

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFaviconPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "Branding Settings Saved",
      description: "Your branding settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 bg-[#0d1526]">
      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Platform Identity</CardTitle>
          <CardDescription>
            Configure your platform's visual identity and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input
              id="platform-name"
              defaultValue="Logistics Management Platform"
              className="border-white/10 text-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform-tagline">Platform Tagline</Label>
            <Input
              id="platform-tagline"
              defaultValue="Streamline your logistics operations"
              className="border-white/10 text-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform-description">Platform Description</Label>
            <Textarea
              id="platform-description"
              defaultValue="A comprehensive logistics management platform for companies of all sizes."
              rows={3}
              className="border-white/10 text-gray-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Platform Logo</Label>
              <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center bg-[#0d1526]">
                {logoPreview ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <Image
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        width={200}
                        height={60}
                        className="max-h-16 object-contain"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => setLogoPreview(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-400">
                      Upload your platform logo
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="mt-2 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-300 hover:file:bg-blue-800"
                />
              </div>
              <p className="text-xs text-gray-400">
                Recommended: PNG or SVG, max 2MB
              </p>
            </div>

            <div className="space-y-4">
              <Label>Favicon</Label>
              <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center bg-[#0d1526]">
                {faviconPreview ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <Image
                        src={faviconPreview || "/placeholder.svg"}
                        alt="Favicon preview"
                        width={32}
                        height={32}
                        className="mx-auto"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => setFaviconPreview(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-400">Upload favicon</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFaviconUpload}
                  className="mt-2 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-300 hover:file:bg-blue-800"
                />
              </div>
              <p className="text-xs text-gray-400">
                Recommended: ICO or PNG, 32x32px
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Color Scheme</CardTitle>
          <CardDescription>
            Customize your platform's color palette
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="primary-color"
                  defaultValue="#3b82f6"
                  className="w-12 h-10 rounded border-white/10"
                />
                <Input
                  defaultValue="#3b82f6"
                  className="flex-1 border-white/10 text-gray-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="secondary-color"
                  defaultValue="#64748b"
                  className="w-12 h-10 rounded border-white/10"
                />
                <Input
                  defaultValue="#64748b"
                  className="flex-1 border-white/10 text-gray-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="accent-color"
                  defaultValue="#10b981"
                  className="w-12 h-10 rounded border-white/10"
                />
                <Input
                  defaultValue="#10b981"
                  className="flex-1 border-white/10 text-gray-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="danger-color">Danger Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="danger-color"
                  defaultValue="#ef4444"
                  className="w-12 h-10 rounded border-white/10"
                />
                <Input
                  defaultValue="#ef4444"
                  className="flex-1 border-white/10 text-gray-200"
                />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <Button variant="outline" className="mr-2 border-white/10">
              Reset to Default
            </Button>
            <Button variant="outline" className="border-white/10">
              Preview Changes
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Custom CSS</CardTitle>
          <CardDescription>
            Add custom CSS to further customize your platform's appearance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="custom-css">Custom CSS</Label>
            <Textarea
              id="custom-css"
              rows={10}
              placeholder="/* Add your custom CSS here */
.custom-header {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.custom-button {
  border-radius: 8px;
  transition: all 0.2s ease;
}"
              className="font-mono text-sm border-white/10 text-gray-200"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Custom CSS will be applied globally across the platform. Use with
            caution.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
