"use client";

import { useModal } from "@/contexts/ModalContext";
import React from "react";

export default function ModalButton({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { handleOpen } = useModal();

  return (
    <button onClick={handleOpen} {...props}>
      {children}
    </button>
  );
}
