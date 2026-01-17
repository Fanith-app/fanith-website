"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EarlyAccessModal from "@/src/components/modals/EarlyAccessModal";

export default function JoinBeta() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Automatically open the modal when the component mounts
    setModalOpen(true);
  }, []);

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={handleClose}
      />
    </div>
  );
}