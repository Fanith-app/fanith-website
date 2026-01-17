"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X, AlertCircle } from "lucide-react";

interface PopupData {
  title: string;
  message: string;
  type?: 'success' | 'error';
}

interface PopupContextType {
  showPopup: (data: PopupData) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | null>(null);

export function CenterPopupProvider({ children }: { children: React.ReactNode }) {
  const [popup, setPopup] = useState<PopupData | null>(null);

  const showPopup = (data: PopupData) => setPopup(data);
  const closePopup = () => setPopup(null);

  return (
    <PopupContext.Provider value={{ showPopup, closePopup }}>
      {children}

      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl w-full max-w-md p-8 text-center shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>

              <div className={`w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center ${
                popup.type === 'error' ? 'bg-red-100' : 'bg-green-100'
              }`}>
                {popup.type === 'error' ? (
                  <AlertCircle size={48} className="text-red-600" />
                ) : (
                  <CheckCircle size={48} className="text-green-600" />
                )}
              </div>

              <h2 className="text-2xl font-bold mb-3">{popup.title}</h2>
              <p className="text-gray-600">{popup.message}</p>

              <button
                onClick={closePopup}
                className={`mt-6 px-8 py-3 rounded-xl font-semibold hover:opacity-90 ${
                  popup.type === 'error' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PopupContext.Provider>
  );
}

export function useCenterPopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("useCenterPopup must be used inside CenterPopupProvider");
  return ctx;
}
