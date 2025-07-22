
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const ToastContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed top-5 right-5 z-50 space-y-2">
    {children}
  </div>
);

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // allow for exit animation
  };

  return (
    <div
      className={`flex items-center justify-between bg-gray-700 text-white p-4 rounded-lg shadow-lg transition-all duration-300 transform ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <span>{message}</span>
      <button onClick={handleClose} className="ml-4 p-1 rounded-full hover:bg-gray-600">
        <X size={18} />
      </button>
    </div>
  );
};
