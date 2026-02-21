"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Shield, CalendarDays, Edit3, X, Save, Phone, Link as LinkIcon } from "lucide-react";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: string;
  createdAt: string;
  phone?: string | null;
}

interface Props {
  user: User;
}

export default function StudentProfileClient({ user }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Updating profile...");

    try {
      const { data, error } = await authClient.updateUser({
        name,
        image: image || undefined,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!", { id: toastId });
      setIsEditing(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="mt-1 text-muted-foreground">Manage your personal information and settings.</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column - Avatar & Core Info */}
        <Card className="col-span-1 border-none shadow-md bg-gradient-to-br from-card to-muted/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Shield className="h-32 w-32" />
          </div>
          <CardHeader className="text-center pb-2 relative z-10">
            <div className="mx-auto relative group">
              {user.image || image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <Image
                  src={isEditing ? image : (user.image || "")}
                  alt={user.name}
                  fill
                  className="h-32 w-32 rounded-full object-cover border-4 border-background shadow-lg mx-auto"
                />
              ) : (
                <div className="h-32 w-32 rounded-full border-4 border-background shadow-lg mx-auto bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <CardTitle className="text-2xl mt-4 font-bold">{isEditing ? name || "Your Name" : user.name}</CardTitle>
            <div className="mt-2">
              <Badge variant="secondary" className="px-3 py-1 text-sm uppercase tracking-wider font-semibold">
                {user.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex-1 truncate">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</p>
                  <p className="font-medium truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Verification</p>
                  <p className="font-medium">
                    {user.emailVerified ? (
                      <span className="text-green-600">Verified</span>
                    ) : (
                      <span className="text-amber-500">Pending</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Joined</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Editable Info */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Card className="border shadow-sm h-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Personal Details</span>
              </CardTitle>
              <CardDescription>
                {isEditing ? "Update your personal information below." : "Your basic account information."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-6 animate-in fade-in">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Full Name</label>
                      <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="e.g. John Doe"
                        className="bg-accent/30"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Profile Image URL</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          value={image} 
                          onChange={(e) => setImage(e.target.value)} 
                          placeholder="https://example.com/avatar.jpg"
                          className="pl-9 bg-accent/30"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Provide a direct link to an image to use as your avatar.</p>
                    </div>

                    <div className="pt-6 flex gap-3">
                      <Button onClick={handleUpdate} disabled={isSubmitting} className="min-w-[120px]">
                        {isSubmitting ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setIsEditing(false);
                        setName(user.name || "");
                        setImage(user.image || "");
                      }} disabled={isSubmitting}>
                        <X className="h-4 w-4 mr-2" /> Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Full Name</h4>
                      <p className="text-lg font-medium">{user.name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Account ID</h4>
                      <p className="text-sm font-mono bg-muted p-2 rounded-md truncate" title={user.id}>{user.id}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
