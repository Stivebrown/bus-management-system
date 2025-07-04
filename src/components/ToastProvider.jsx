import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", type: "info", visible: false });

  const showToast = (message, type = "info") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white transition bg-${toast.type === "success" ? "green" : toast.type === "error" ? "red" : "blue"}-600`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
