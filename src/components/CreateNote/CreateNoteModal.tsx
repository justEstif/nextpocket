"use client";
import { createNote } from "@/actions";
import { useModal } from "@/contexts/ModalContext";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface CreateNoteModalProps
  extends React.ComponentPropsWithoutRef<"dialog"> {}

const initialState = {
  message: "",
};

export function CreateNoteModal({ ...props }: CreateNoteModalProps) {
  const { modalIsOpen, handleClose } = useModal();
  const [state, formAction] = useActionState(createNote, initialState);

  const handleClickOverlay = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      handleClose(event);
    }
  };

  const [checked, setChecked] = useState(false);
  const handleChecked = () => {
    setChecked(!checked);
  };
  return (
    <dialog onClick={handleClickOverlay} open={modalIsOpen} {...props}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={handleClose}></button>
          <h3>Create a new note</h3>
        </header>
        <form action={formAction} id="createNoteForm">
          <fieldset>
            <label>
              Title
              <input name="title" placeholder="title" autoComplete="off" />
            </label>
            <label>
              Content
              <textarea
                name="content"
                placeholder="content"
                autoComplete="off"
                id="content"
              />
            </label>
            <label>
              <input
                type="checkbox"
                name="keepOpen"
                checked={checked}
                onChange={handleChecked}
              />
              Keep open after creating now
            </label>
            <FormMessage message={state?.message} />
          </fieldset>
        </form>

        <footer>
          <button className="secondary" onClick={handleClose}>
            Cancel
          </button>
          <SubmitButton formId="createNoteForm" />
        </footer>
      </article>
    </dialog>
  );
}

function SubmitButton({ formId }: { formId: string }) {
  const { pending } = useFormStatus();
  return (
    <button form={formId} aria-disabled={pending}>
      Confirm
    </button>
  );
}

function FormMessage({ message }: { message?: string }) {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSuccess(message?.toLowerCase().includes("added") || false);
  }, [message]);

  if (!message) return null;

  return success
    ? (
      <ins
        aria-describedby="content"
        aria-live="polite"
        className="sr-only"
        role="status"
      >
        {message}
      </ins>
    )
    : (
      <small
        aria-describedby="content"
        aria-live="polite"
        className="sr-only"
        role="status"
      >
        {message}
      </small>
    );
}
