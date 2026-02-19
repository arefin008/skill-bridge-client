"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { Category } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  categories: Category[];
}

export default function TutorFilterBar({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") ?? "";
  const initialSearch = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Debounced effect for search
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only update if search term actually changed from the URL param
      if (searchTerm !== (searchParams.get("search") ?? "")) {
        updateParam("search", searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`/tutors?${params.toString()}`);
    });
  }

  function clearFilters() {
    setSearchTerm("");
    startTransition(() => {
      router.push("/tutors");
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        placeholder="Search tutors..."
        value={searchTerm}
        className="max-w-xs"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {(currentCategory || searchTerm) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          disabled={isPending}
        >
          Clear filters
        </Button>
      )}

      {isPending && (
        <span className="text-sm text-muted-foreground">Filtering...</span>
      )}
    </div>
  );
}
