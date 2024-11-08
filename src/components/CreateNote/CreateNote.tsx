import { ModalProvider } from "@/contexts/ModalContext";
import { CreateNoteModal } from "./CreateNoteModal";
import ModalButton from "../Modal/ModalButton";

export default function CreateNote() {
  return (
    <ModalProvider>
      <ModalButton>Create Note</ModalButton>
      <CreateNoteModal />
    </ModalProvider>
  );
}
