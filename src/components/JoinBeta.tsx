"use client";

import { useRouter } from "next/navigation";
import EarlyAccessModal from "@/src/components/modals/EarlyAccessModal";

export default function JoinBeta() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* This page exists only to show the modal, so it is always open. */}
      <EarlyAccessModal
        isOpen
        onClose={handleClose}
      />
    </div>
  );
}
