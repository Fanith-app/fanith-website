"use client";

import { privacyPolicy } from "@/src/lib/data";
import { motion } from "framer-motion";
import { Cookie, Eye, Lock, Mail, Shield, Users } from "lucide-react";



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#960018] text-white py-20"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Shield className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {privacyPolicy.introduction.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto mb-6">
            {privacyPolicy.introduction.description}
          </p>
          {/* <div className="flex items-center justify-center gap-2 text-sm text-white/80">
            <Calendar className="w-4 h-4" />
            <span>Last Updated: {new Date(privacyPolicy.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div> */}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 md:px-6 py-16 space-y-12"
      >
        {/* Information We Collect */}
        <motion.div variants={itemVariants} className="bg-[#202020] rounded-2xl shadow-lg p-8 md:p-10 border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#960018] rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {privacyPolicy.informationCollected.title}
            </h2>
          </div>
          <div className="grid gap-6">
            {privacyPolicy.informationCollected.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-linear-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#960018] hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.type}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How We Use Your Information */}
        <motion.div variants={itemVariants} className="bg-[#202020] rounded-2xl shadow-lg p-8 md:p-10 border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {privacyPolicy.howWeUseData.title}
            </h2>
          </div>
          <ul className="space-y-4">
            {privacyPolicy.howWeUseData.uses.map((use, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg hover:bg-[#960018] transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-white rounded-full mt-2 shrink-0"></div>
                <p className="text-[#c3c3c3] leading-relaxed">{use}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Data Sharing & Disclosure */}
        <motion.div variants={itemVariants} className="bg-[#202020] rounded-2xl shadow-lg p-8 md:p-10 border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {privacyPolicy.dataSharing.title}
            </h2>
          </div>
          <p className="text-[#c3c3c3] leading-relaxed mb-6 text-lg">
            {privacyPolicy.dataSharing.description}
          </p>
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-4">We may share data with:</h3>
            <ul className="space-y-3">
              {privacyPolicy.dataSharing.sharedWith.map((entity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-700">{entity}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Cookies Policy */}
        <motion.div variants={itemVariants} className="bg-[#202020] rounded-2xl shadow-lg p-8 md:p-10 border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {privacyPolicy.cookiesPolicy.title}
            </h2>
          </div>
          <p className="text-[#c3c3c3] leading-relaxed mb-6 text-lg">
            {privacyPolicy.cookiesPolicy.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {privacyPolicy.cookiesPolicy.cookieTypes.map((type, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-orange-50 to-white p-5 rounded-xl border border-orange-100 text-center hover:shadow-md transition-shadow duration-300"
              >
                <p className="font-semibold text-gray-900">{type}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Your Rights */}
        <motion.div variants={itemVariants} className="bg-[#202020] rounded-2xl shadow-lg p-8 md:p-10 border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {privacyPolicy.userRights.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {privacyPolicy.userRights.rights.map((right, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 p-5 bg-white rounded-xl border border-red-200 hover:border-red-400 transition-colors duration-300"
              >
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{right}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Security */}
        <motion.div variants={itemVariants} className="bg-[#202020] rounded-2xl shadow-lg p-8 md:p-10 border border-white">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {privacyPolicy.dataSecurity.title}
          </h2>
          <p className="text-[#c3c3c3] leading-relaxed text-lg">
            {privacyPolicy.dataSecurity.description}
          </p>
        </motion.div>

        {/* Third-Party Links */}
        <motion.div variants={itemVariants} className="bg-[#202020] rounded-2xl shadow-lg p-8 md:p-10 border border-white">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {privacyPolicy.thirdPartyLinks.title}
          </h2>
          <p className="text-[#c3c3c3] leading-relaxed text-lg">
            {privacyPolicy.thirdPartyLinks.description}
          </p>
        </motion.div>

        {/* Policy Updates */}
        <motion.div variants={itemVariants} className="bg-[#202020] rounded-2xl shadow-lg p-8 md:p-10 border border-white">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {privacyPolicy.policyUpdates.title}
          </h2>
          <p className="text-[#c3c3c3] leading-relaxed text-lg">
            {privacyPolicy.policyUpdates.description}
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={itemVariants}
          className="bg-[#960018] text-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {privacyPolicy.contactInformation.title}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white/90">Email:</span>
              <a
                href={`mailto:${privacyPolicy.contactInformation.email}`}
                className="text-white hover:underline transition-all duration-200 hover:text-white/90"
              >
                {privacyPolicy.contactInformation.email}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white/90">Address:</span>
              <span className="text-white/90">{privacyPolicy.contactInformation.address}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Note */}
      {/* <div className="max-w-5xl mx-auto px-4 md:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-gray-500"
        >
          <p>
            This privacy policy is effective as of {new Date(privacyPolicy.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and applies to {privacyPolicy.website.name} ({privacyPolicy.website.type}).
          </p>
        </motion.div>
      </div> */}
    </div>
  );
}