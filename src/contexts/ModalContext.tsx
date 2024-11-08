"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface ModalContextValue {
  modalIsOpen: boolean;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: (event?: React.MouseEvent<HTMLElement> | KeyboardEvent) => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

const getScrollBarWidth = () => {
  const isSSR = typeof window === "undefined";
  if (isSSR) return 0;
  const hasScrollbar = document.body.scrollHeight > screen.height;
  if (hasScrollbar) {
    const scrollbarWidth = window.innerWidth -
      document.documentElement.clientWidth;
    return scrollbarWidth;
  }
  return 0;
};

function ModalProvider({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSSR = typeof window === "undefined";
  const htmlTag = !isSSR && document.querySelector("html");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalAnimationDuration = 400;

  // Handle open
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (htmlTag) {
      setModalIsOpen(true);
      htmlTag.classList.add("modal-is-open", "modal-is-opening");
      setTimeout(() => {
        htmlTag.classList.remove("modal-is-opening");
      }, modalAnimationDuration);
    }
  };

  // Handle close
  const handleClose = (
    event?: React.MouseEvent<HTMLElement> | KeyboardEvent,
  ) => {
    event?.preventDefault?.();
    if (htmlTag) {
      htmlTag.classList.add("modal-is-closing");
      setTimeout(() => {
        setModalIsOpen(false);
        htmlTag.classList.remove("modal-is-open", "modal-is-closing");
      }, modalAnimationDuration);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!modalIsOpen) return;
      if (event.key === "Escape") {
        handleClose(event);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalIsOpen]);

  // Set scrollbar width on mount
  useEffect(() => {
    const scrollBarWidth = getScrollBarWidth();
    if (htmlTag) {
      htmlTag?.style.setProperty(
        "--pico-scrollbar-width",
        `${scrollBarWidth}px`,
      );
      return () => {
        htmlTag.style.removeProperty("--pico-scrollbar-width");
      };
    }
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        handleOpen,
        handleClose,
        ...props,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, useModal };
