"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found.");
      return;
    }

    const verify = async () => {
      try {
        const { error } = await authClient.verifyEmail({
          query: {
            token: token
          }
        });

        if (error) {
          setStatus("error");
          setMessage(error.message || "Failed to verify email.");
        } else {
          setStatus("success");
          setMessage("Your email has been verified successfully!");
        }
      } catch (err) {
        setStatus("error");
        setMessage("An unexpected error occurred.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl border-none ring-1 ring-border/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5">
            {status === "loading" && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
            {status === "success" && <CheckCircle2 className="h-10 w-10 text-green-500" />}
            {status === "error" && <XCircle className="h-10 w-10 text-destructive" />}
          </div>
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>
            {status === "loading" ? "Verifying your account..." : "Verification complete"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className={`text-lg font-medium ${status === "error" ? "text-destructive" : "text-foreground"}`}>
            {message}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pt-6">
          {status !== "loading" && (
            <Link href="/login" passHref>
              <Button size="lg" className="px-10 font-bold bg-[#0070f3] hover:bg-[#0060df] text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                {status === "success" ? "Go to Login" : "Try Again"}
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
