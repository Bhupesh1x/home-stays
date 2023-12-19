"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../shared/Button";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  footer?: React.ReactElement;
  body?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
};

function Modal({
  isOpen,
  actionLabel,
  onClose,
  onSubmit,
  body,
  disabled,
  footer,
  secondaryAction,
  secondaryActionLabel,
  title,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const closeModal = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 z-50 h-full w-full overflow-x-hidden overscroll-y-auto bg-neutral-800/70 flex items-center justify-center outline-none focus:outline-none">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/* Content */}
        <div
          className={`translate duration-300 h-full ${
            showModal
              ? "translate-y-0 opacity-95"
              : "translate-y-full opacity-0"
          }`}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                <IoMdClose size={18} onClick={closeModal} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>

            {/* Body */}
            <div className="p-6 relative flex-auto">{body}</div>

            {/* Footer */}
            <div className="p-6 flex items-center gap-3">
              {secondaryAction && secondaryActionLabel && (
                <Button
                  outline
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                  disabled={disabled}
                />
              )}

              <Button
                label={actionLabel}
                onClick={handleSubmit}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
