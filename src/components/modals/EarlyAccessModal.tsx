"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { CheckCircle, X } from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Modal } from "../ui/modal";
import endpoints, { BASE_URL } from "../../api/endpoint";
import { i, nav } from "framer-motion/client";

interface Team {
  name: string;
  value: string;
}

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EarlyAccessModal({
  isOpen,
  onClose,
}: EarlyAccessModalProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !selectedTeam) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}${endpoints.EARLY_ACCESS}`,
        {
          name,
          email,
          supportedTeam: selectedTeam,
        }
      );

      if (response.status === 201 || response.data?.id) {
        setShowSuccess(true);
        setName("");
        setEmail("");
        setSelectedTeam("");
      } else {
        toast.error(response.data?.message || "Something went wrong.");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to submit. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const handleClose = () => {
    setShowSuccess(false);
    onClose();

  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${endpoints.TEAMS}`);
        console.log("Teams response:", response.data);
        if (response.data?.success) {
          setTeams(response.data.teams);
        }
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    if (isOpen) {
      fetchTeams();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md">
      {/* Toast container for errors */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="relative bg-white rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-lg"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Header */}
        <div className="relative bg-linear-to-br from-red-500 via-red-600 to-red-700 px-8 pt-8 pb-6">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="mb-4"
            >
              <Image
                src="/assets/svg/logo-white.svg"
                alt="Fanith Logo"
                width={100}
                height={100}
                className="object-contain mx-auto"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Get Early Access
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-red-100 text-sm leading-relaxed"
            >
              Be the first to experience Fanith. Join our exclusive waitlist and help shape the future of fan engagement.
            </motion.p>
          </div>
        </div>

        <div className="px-8 pb-8">
          <AnimatePresence mode="wait">
            {!showSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="pt-6"
              >
                <form onSubmit={handleEarlyAccess} className="space-y-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Favorite Team
                      </label>
                      <Select
                        onValueChange={setSelectedTeam}
                        value={selectedTeam}
                      >
                        <SelectTrigger className="h-fit w-full rounded-xl border-2 border-gray-200 px-4 py-3">
                          <SelectValue placeholder="Select your favorite team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.value} value={team.value}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full rounded-xl bg-linear-to-r from-red-500 to-red-600 px-6 py-4 text-sm font-semibold text-white ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Joining Waitlist..." : "Join the Waitlist"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={48} className="text-green-500" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to the Waitlist! 🎉
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  Thank you for joining our exclusive community! We'll notify you as soon as early access becomes available. Get ready for an amazing fan experience!
                </p>

                <button
                  onClick={handleClose}
                  className="rounded-xl bg-linear-to-r from-red-500 to-red-600 px-8 py-3 text-sm font-semibold text-white"
                >
                  Continue Exploring
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Modal>
  );
}
