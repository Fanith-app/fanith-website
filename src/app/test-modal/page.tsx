"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import EarlyAccessModal from "@/src/components/modals/EarlyAccessModal";

export default function TestModalPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">Test Modal Functionality</h1>
        <Button
          onClick={() => setModalOpen(true)}
          variant="gradient"
          size="xl"
        >
          Open Early Access Modal
        </Button>
        
        <EarlyAccessModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      </div>
    </div>
  );
}