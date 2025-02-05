import React, { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext({
  isModalOpen: false,
  isShowEditor: false,
  openModal: () => {},
  closeModal: () => {},
  showEditor: () => {},
  resetModalState: () => {},
});

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowEditor, setIsShowEditor] = useState(false);

  const showEditor = () => {
    setIsShowEditor();
  };

  const openModal = () => {
    setIsModalOpen();

    setTimeout(() => {
      setIsShowEditor(true);
    }, 3000);
  };

  const closeModal = () => {
    setIsShowEditor(false);
    setIsModalOpen(false);
  };

  // 모달이 닫힐 때 상태 초기화

  const resetModalState = () => {
    setIsShowEditor(false);
  };

  // 모달이 닫힐 때 자동으로 상태 초기화

  useEffect(() => {
    if (!isModalOpen) {
      resetModalState();
    }
  }, [isModalOpen]);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        isShowEditor,
        showEditor,
        openModal,
        closeModal,
        resetModalState,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
