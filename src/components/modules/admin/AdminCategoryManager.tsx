"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/types";
import { Plus } from "lucide-react";
import { categoryService } from "@/services/category.service";

interface Props {
  categories: (Category & { isActive?: boolean })[];
}

export default function AdminCategoryManager({ categories }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleCreate() {
    if (!name.trim()) return;
    setLoading(true);
    const toastId = toast.loading("Creating category...");
    try {
      await categoryService.createCategory(name.trim());
      toast.success("Category created!", { id: toastId });
      setName("");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to create category", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(id: string, isActive: boolean) {
    const toastId = toast.loading(
      isActive ? "Deactivating..." : "Activating...",
    );
    try {
      await categoryService.updateCategory(id, { isActive: !isActive });
      toast.success(isActive ? "Category deactivated" : "Category activated", {
        id: toastId,
      });
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update category", { id: toastId });
    }
  }

  return (
    <div className="space-y-4">
      {/* Toggle active/inactive */}
      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Toggle Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <p className="font-medium text-sm">{cat.name}</p>
                  <Button
                    size="sm"
                    variant={cat.isActive === false ? "default" : "outline"}
                    onClick={() => handleToggle(cat.id, cat.isActive !== false)}
                  >
                    {cat.isActive === false ? "Activate" : "Deactivate"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add new category */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Category
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input
            placeholder="e.g. Mathematics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-xs"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <Button onClick={handleCreate} disabled={loading || !name.trim()}>
            {loading ? "Adding..." : "Add Category"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
