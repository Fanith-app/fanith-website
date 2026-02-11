"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCenterPopup } from "@/src/context/CenterPopupContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { _makePostRequest } from "@/src/api/api";
import endpoints, { BASE_URL } from "../../api/endpoint";

interface Team {
  name: string;
  value: string;
}

export default function EarlyAccess() {
  const { showPopup } = useCenterPopup();

  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !selectedTeam) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await _makePostRequest(
        `${BASE_URL}${endpoints.EARLY_ACCESS}`,
        {
          name,
          email,
          supportedTeam: selectedTeam,
        }
      );

      if (response?.status === 201 || response?.data?.id) {
        // ✅ CENTER POPUP
        showPopup({
          title: "Thank You! 🎉",
          message:
            "You’ve successfully joined the waitlist. We’ll notify you as soon as early access is available.",
        });

        setName("");
        setEmail("");
        setSelectedTeam("");
      } else {
        toast.error(response?.data?.message || "Something went wrong.");
      }
    } catch (error: any) {
      console.error("Early access error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${endpoints.TEAMS}`);
        if (response.data?.success) {
          setTeams(response.data.teams);
        }
      } catch {
        toast.error("Failed to load teams.");
      }
    };

    fetchTeams();
  }, []);

  return (
    <section id="early-access" className="relative overflow-hidden">
      {/* Toast Container (errors only) */}
      <ToastContainer newestOnTop />

      {/* Background */}
      {/* <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-transparent rounded-t-4xl" />
      </div> */}

      <motion.div
        className="max-w-6xl px-0 pt-10 pb-3 text-left text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl md:text-2xl font-bold"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Get Early Access
        </motion.h2>

        {/* <p className="mx-auto mt-4 max-w-3xl text-white/90">
          Be the first to experience the app. Join our waitlist and help shape the
          future.
        </p> */}

        <form
          onSubmit={handleEarlyAccess}
          className="mt-5 flex flex-col md:flex-row items-start gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-full w-full md:w-72 rounded-full border border-white bg-white/20 backdrop-blur-md px-6 py-2.5 text-sm text-[#bfbfbf]"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-full w-full md:w-72 rounded-full border border-white bg-white/20 backdrop-blur-md px-6 py-2.5 text-sm text-[#bfbfbf]"
          />

          <div className="w-full md:w-72">
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="h-full w-full md:w-72 rounded-full border border-white bg-white/20 backdrop-blur-md px-6 py-2.5 text-sm text-[#bfbfbf]">
                <SelectValue placeholder="Select Team " />
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

          <button
            type="submit"
            disabled={loading}
            className={`rounded-full bg-[#960018] px-8 py-3 text-sm font-semibold text-white ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-black"
            }`}
          >
            {loading ? "Joining..." : "Get Early Access"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
