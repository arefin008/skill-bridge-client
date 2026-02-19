"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSearchClient() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/tutors?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/tutors");
    }
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="relative mx-auto mt-8 flex w-full max-w-xl items-center overflow-hidden rounded-full border bg-background shadow-lg transition-all focus-within:ring-2 focus-within:ring-primary"
    >
      <div className="flex h-full items-center pl-6">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Which subject do you want to learn? (e.g. Mathematics, Physics)"
        className="h-14 w-full bg-transparent px-4 text-base outline-none placeholder:text-muted-foreground/70"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button 
        type="submit" 
        className="mr-1 h-12 rounded-full px-8 text-base font-bold transition-all hover:scale-[1.02]"
      >
        Search
      </Button>
    </form>
  );
}
