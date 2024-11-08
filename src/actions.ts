"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createNote(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  "use server";
  const rawFormData = {
    title: formData.get("title"),
    content: formData.get("content"),
    keepOpen: formData.get("keepOpen"),
  };

  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: rawFormData.title,
        content: rawFormData.content,
      }),
    },
  );

  if (!res.ok) {
    return { message: "Failed to create a note" };
  }
  revalidatePath("/");
  if (!rawFormData.keepOpen) {
    redirect("/");
  }
  return { message: "Added note" };
}
