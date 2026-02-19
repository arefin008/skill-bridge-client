import { categoryService } from "@/services/category.service";
import { Category } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminCategoryManager from "@/components/modules/admin/AdminCategoryManager";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  let categories: Category[] = [];
  try {
    const res = await categoryService.getCategories();
    categories = res.data;
  } catch {
    categories = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <p className="mt-1 text-muted-foreground">
          Add, activate, or deactivate tutoring subject categories.
        </p>
      </div>

      {/* Existing categories list */}
      <Card>
        <CardHeader>
          <CardTitle>Categories ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">
              No categories yet. Add one below.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat: Category & { isActive?: boolean }) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{cat.name}</p>
                    <Badge
                      variant={cat.isActive === false ? "destructive" : "secondary"}
                      className="mt-1 text-xs"
                    >
                      {cat.isActive === false ? "Inactive" : "Active"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interactive management (client) */}
      <AdminCategoryManager categories={categories} />
    </div>
  );
}
