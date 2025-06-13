import { useCallback, useState } from "react";

export function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const confirm = useCallback((msg, confirmCallback) => {
    setMessage(msg);
    setOnConfirm(() => () => {
      confirmCallback();
      setIsOpen(false);
    });
    setIsOpen(true);
  }, []);

  const cancel = () => setIsOpen(false);

  return {
    isOpen,
    message,
    confirm,
    onConfirm,
    cancel,
  };
}
