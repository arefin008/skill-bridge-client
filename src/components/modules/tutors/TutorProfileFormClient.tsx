/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createTutorProfile, updateTutorProfile } from "@/actions/tutor.action";
import { Button } from "@/components/ui/button";
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

const tutorSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  hourlyRate: z.number().positive("Hourly rate must be positive"),
  experience: z.number().min(1, "Must have at least 1 year of experience"),
});

type FormType = z.infer<typeof tutorSchema>;

interface Props {
  mode: "create" | "update";
  defaultValues?: Partial<FormType>;
}

export function TutorProfileFormClient({ mode, defaultValues }: Props) {
  const form = useForm({
    defaultValues: {
      bio: defaultValues?.bio || "",
      hourlyRate: defaultValues?.hourlyRate || 0,
      experience: defaultValues?.experience || 1,
    },
    validators: { onSubmit: tutorSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        mode === "create" ? "Creating profile..." : "Updating profile...",
      );

      const data = {
        bio: value.bio,
        hourlyRate: Number(value.hourlyRate),
        experience: Number(value.experience),
      };

      try {
        const res =
          mode === "create"
            ? await createTutorProfile(data)
            : await updateTutorProfile(data);

        if ((res as any).error) {
          toast.error((res as any).error.message, { id: toastId });
          return;
        }

        toast.success(
          mode === "create" ? "Profile created!" : "Profile updated!",
          { id: toastId },
        );
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Create Tutor Profile" : "Update Tutor Profile"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Set up your tutor profile below."
            : "Update your tutor details below."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="tutor-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="bio"
              children={(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Describe your experience..."
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="hourlyRate"
              children={(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Hourly Rate ($)
                    </FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="experience"
              children={(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Experience (years)
                    </FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="tutor-profile-form" type="submit" className="w-full">
          {mode === "create" ? "Create Profile" : "Update Profile"}
        </Button>
      </CardFooter>
    </Card>
  );
}
