import { create } from "zustand";

export type ModalType = "register" | "login" | "rent" | "search";

interface ModalStore {
  isOpen: boolean;
  type: ModalType | null;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false }),
}));
