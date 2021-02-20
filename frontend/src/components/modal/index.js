import React, { useRef, useEffect } from "react";
import {
  StyledModal,
  StyledModalOverlay,
  StyledModalContent,
  StyledModalHeader,
  StyledModalHeaderTitle,
  StyledModalHeaderClose,
  StyledModalMessage,
  StyledModalFooter,
  StyledModalFooterButton,
  StyledModalFooterCancelButton,
} from "./StyledModal";

const Modal = ({
  header,
  message,
  buttonLabel,
  confirmationLabel,
  confirmationModal = false,
  onClose,
  onConfirmation,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const buttonIndex = modalRef.current.children[2].children.length - 1;
    const modalFocusButton = modalRef.current.children[2].children[buttonIndex];
    modalFocusButton.focus();

    const handleClickOutside = (event) => {
      const element = event.target;

      if (modalRef.current && !modalRef.current.contains(element)) {
        event.preventDefault();
        event.stopPropagation();

        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return function cleanupListener() {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef, onClose]);

  return (
    <StyledModal>
      <StyledModalOverlay>
        <StyledModalContent ref={modalRef}>
          <StyledModalHeader>
            <StyledModalHeaderTitle>{header}</StyledModalHeaderTitle>
            <StyledModalHeaderClose aria-label="close modal" onClick={onClose}>
              <span aria-hidden="true">x</span>
            </StyledModalHeaderClose>
          </StyledModalHeader>

          <main>
            <StyledModalMessage>{message}</StyledModalMessage>
          </main>
          <StyledModalFooter>
            {confirmationModal && (
              <StyledModalFooterButton
                label={confirmationLabel}
                onClick={onConfirmation}
              />
            )}
            <StyledModalFooterCancelButton
              ref={modalRef}
              label={buttonLabel}
              onClick={onClose}
            />
          </StyledModalFooter>
        </StyledModalContent>
      </StyledModalOverlay>
    </StyledModal>
  );
};

export default Modal;
