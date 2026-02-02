import { categoryService } from "@/services/category.service";

interface Category {
  id: string;
  name: string;
}

export default async function CategoriesPage() {
  const categories = await categoryService.getAll();

  return (
    <div>
      <h1>Categories</h1>
      {categories.map((c: Category) => (
        <div key={c.id}>{c.name}</div>
      ))}
    </div>
  );
}
