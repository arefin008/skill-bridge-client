/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createTutorProfile, updateTutorProfile } from "@/actions/tutor.action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { Category } from "@/types";

const tutorSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  hourlyRate: z.number().positive("Hourly rate must be positive"),
  experience: z.number().min(1, "Must have at least 1 year of experience"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
});

type FormType = z.infer<typeof tutorSchema>;

interface Props {
  mode: "create" | "update";
  defaultValues?: Partial<FormType>;
  allCategories?: Category[];
}

export function TutorProfileFormClient({ mode, defaultValues, allCategories = [] }: Props) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      bio: defaultValues?.bio || "",
      hourlyRate: defaultValues?.hourlyRate || 0,
      experience: defaultValues?.experience || 1,
      categories: defaultValues?.categories || [],
    } as FormType,
    validators: { onSubmit: tutorSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        mode === "create" ? "Creating profile..." : "Updating profile...",
      );

      const data = {
        bio: value.bio,
        hourlyRate: Number(value.hourlyRate),
        experience: Number(value.experience),
        categories: value.categories,
      };

      console.log("Submitting tutor profile data:", data);

      try {
        const res =
          mode === "create"
            ? await createTutorProfile(data as any)
            : await updateTutorProfile(data as any);
        
        if ((res as any).error) {
          toast.error((res as any).error.message, { id: toastId });
          return;
        }

        toast.success(
          mode === "create" ? "Profile created!" : "Profile updated!",
          { id: toastId },
        );
        router.refresh();
      } catch (error: any) {
        console.error("Profile submission error:", error);
        toast.error(error?.message || "Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {mode === "create" ? "Create Tutor Profile" : "Update Tutor Profile"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Set up your tutor details for students to see."
            : "Update your tutor bio, rates, and subjects."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="tutor-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <FieldGroup>
            {/* Bio Field */}
            <form.Field
              name="bio"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Profile Bio</FieldLabel>
                    <textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Share your expertise, teaching style, and passion..."
                      className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hourly Rate */}
              <form.Field
                name="hourlyRate"
                children={(field) => {
                  const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={invalid}>
                      <FieldLabel htmlFor={field.name}>Hourly Rate (৳)</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                      />
                      {invalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />

              {/* Experience */}
              <form.Field
                name="experience"
                children={(field) => {
                  const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={invalid}>
                      <FieldLabel htmlFor={field.name}>Experience (Years)</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                      />
                      {invalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </div>

            {/* Categories Selection */}
            <form.Field
              name="categories"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
                const selected = field.state.value;

                const toggleCategory = (id: string) => {
                  if (selected.includes(id)) {
                    field.handleChange(selected.filter(i => i !== id));
                  } else {
                    field.handleChange([...selected, id]);
                  }
                };

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Subject Areas</FieldLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                       {allCategories.map(cat => (
                         <button
                           key={cat.id}
                           type="button"
                           onClick={() => toggleCategory(cat.id)}
                           className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all ${
                             selected.includes(cat.id)
                               ? "bg-primary text-primary-foreground border-primary"
                               : "bg-secondary/40 text-secondary-foreground border-border hover:border-primary/50"
                           }`}
                         >
                           {cat.name}
                         </button>
                       ))}
                    </div>
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                    {!invalid && allCategories.length === 0 && (
                      <p className="text-xs text-muted-foreground italic">Loading categories...</p>
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          form="tutor-profile-form" 
          type="submit" 
          className="w-full h-11 text-base font-bold"
          disabled={form.state.isSubmitting}
        >
          {mode === "create" ? "Create Profile" : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
