"use client";

import { termsAndConditions } from "@/src/lib/data";
import { motion } from "framer-motion";
import { Shield, FileText, Users, AlertTriangle, Copyright, ExternalLink, AlertCircle, Gavel, Scale, Edit, Mail, Calendar } from "lucide-react";

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

export default function TermsConditionsPage() {
  const { 
    website, 
    introduction, 
    eligibility, 
    userAccount, 
    acceptableUse, 
    contentOwnership, 
    thirdPartyServices, 
    disclaimers, 
    limitationOfLiability, 
    termination, 
    governingLaw, 
    changesToTerms, 
    contactInformation,
    lastUpdated 
  } = termsAndConditions

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-linear-to-r from-[#9E1F16] via-[#C2261B] to-[#F03322] text-white py-20"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <FileText className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {introduction.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto mb-6">
            {introduction.description}
          </p>
          {/* <div className="flex items-center justify-center gap-2 text-sm text-white/80">
            <Calendar className="w-4 h-4" />
            <span>Last Updated: {lastUpdated}</span>
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
        {/* Eligibility */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {eligibility.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {eligibility.description}
          </p>
        </motion.div>

        {/* User Accounts */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {userAccount.title}
            </h2>
          </div>
          <ul className="space-y-4">
            {userAccount.points.map((point, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">{point}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Acceptable Use Policy */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {acceptableUse.title}
            </h2>
          </div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h3 className="font-semibold text-gray-900 mb-4">Prohibited Activities:</h3>
            <ul className="space-y-3">
              {acceptableUse.points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-700">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Content Ownership */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Copyright className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {contentOwnership.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {contentOwnership.description}
          </p>
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-4">Content Restrictions:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contentOwnership.restrictions.map((restriction, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white p-4 rounded-xl border border-purple-200 text-center hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-gray-700 font-medium">{restriction}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Third-Party Services */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {thirdPartyServices.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {thirdPartyServices.description}
          </p>
        </motion.div>

        {/* Disclaimers */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {disclaimers.title}
            </h2>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
            <ul className="space-y-4">
              {disclaimers.points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg border border-yellow-200"
                >
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Limitation of Liability */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Gavel className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {limitationOfLiability.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {limitationOfLiability.description}
          </p>
        </motion.div>

        {/* Termination */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {termination.title}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {termination.description}
          </p>
        </motion.div>

        {/* Governing Law */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {governingLaw.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {governingLaw.description}
          </p>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Edit className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {changesToTerms.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {changesToTerms.description}
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={itemVariants}
          className="bg-linear-to-r from-[#9E1F16] via-[#C2261B] to-[#F03322] text-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {contactInformation.title}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white/90">Email:</span>
              <a
                href={`mailto:${contactInformation.email}`}
                className="text-white hover:underline transition-all duration-200 hover:text-white/90"
              >
                {contactInformation.email}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white/90">Address:</span>
              <span className="text-white/90">{contactInformation.address}</span>
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
            These terms and conditions are effective as of {lastUpdated} and apply to {website.name} ({website.type}).
          </p>
        </motion.div>
      </div> */}
    </div>
  );
}