"use client";

import { childSafetyPolicy } from "@/src/lib/data";
import { motion } from "framer-motion";
import {
  Baby,
  Users,
  Shield,
  Lock,
  ShieldCheck,
  Database,
  MessageSquare,
  BookOpen,
  AlertTriangle,
  Mail,
  CheckCircle,
  X,
  Clock,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function ChildSafetyPage() {
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
            <Baby className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {childSafetyPolicy.introduction.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto mb-6">
            {childSafetyPolicy.introduction.description}
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 md:px-6 py-16 space-y-12"
      >
        {/* Age Requirements */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {childSafetyPolicy.ageRequirements.title}
            </h2>
          </div>
          <div className="mb-6 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {childSafetyPolicy.ageRequirements.minimumAge}+
            </p>
            <p className="text-gray-700 leading-relaxed">
              {childSafetyPolicy.ageRequirements.description}
            </p>
          </div>
          <ul className="space-y-3">
            {childSafetyPolicy.ageRequirements.requirements.map(
              (requirement, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{requirement}</p>
                </motion.li>
              )
            )}
          </ul>
        </motion.div>

        {/* Parental Controls */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {childSafetyPolicy.parentalControls.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {childSafetyPolicy.parentalControls.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {childSafetyPolicy.parentalControls.features.map(
              (feature, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-linear-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Content Guidelines */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {childSafetyPolicy.contentGuidelines.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {childSafetyPolicy.contentGuidelines.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Allowed Content */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Allowed Content
              </h3>
              <ul className="space-y-3">
                {childSafetyPolicy.contentGuidelines.allowedContent.map(
                  (item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Prohibited Content */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <X className="w-5 h-5 text-red-600" />
                Prohibited Content
              </h3>
              <ul className="space-y-3">
                {childSafetyPolicy.contentGuidelines.prohibitedContent.map(
                  (item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Privacy Protection */}
        <motion.div
          variants={itemVariants}
          className="bg-linear-to-br from-purple-50 to-white rounded-2xl shadow-lg p-8 md:p-10 border border-purple-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {childSafetyPolicy.privacyProtection.title}
              </h2>
              <p className="text-sm text-purple-600 font-semibold mt-1">
                {childSafetyPolicy.privacyProtection.subtitle}
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {childSafetyPolicy.privacyProtection.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {childSafetyPolicy.privacyProtection.protections.map(
              (protection, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 p-5 bg-white rounded-xl border border-purple-200 hover:border-purple-400 transition-colors duration-300"
                >
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {protection.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {protection.description}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Safety Features */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {childSafetyPolicy.safetyFeatures.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {childSafetyPolicy.safetyFeatures.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {childSafetyPolicy.safetyFeatures.features.map(
              (feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-linear-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100 text-center hover:shadow-md transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl mb-4">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Data Collection */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {childSafetyPolicy.dataCollection.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {childSafetyPolicy.dataCollection.description}
          </p>

          {/* What We Collect */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-xl">
              What We Collect
            </h3>
            <div className="space-y-4">
              {childSafetyPolicy.dataCollection.collectedData.map(
                (item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-indigo-50 p-5 rounded-xl border border-indigo-100"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {item.type}
                    </h4>
                    <p className="text-gray-700 mb-2 text-sm">{item.details}</p>
                    <p className="text-indigo-600 text-sm font-medium">
                      Purpose: {item.purpose}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* What We Don't Collect */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 text-xl">
              What We Do NOT Collect
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {childSafetyPolicy.dataCollection.notCollected.map(
                (item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </motion.div>

        {/* Communication Restrictions */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {childSafetyPolicy.communicationRestrictions.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {childSafetyPolicy.communicationRestrictions.description}
          </p>

          <div className="space-y-6">
            {childSafetyPolicy.communicationRestrictions.restrictions.map(
              (restriction, index) => (
                <div
                  key={index}
                  className="bg-teal-50 p-6 rounded-xl border border-teal-100"
                >
                  <h3 className="font-bold text-gray-900 mb-4 text-xl flex items-center gap-2">
                    <Users className="w-6 h-6 text-teal-600" />
                    {restriction.ageGroup}
                  </h3>
                  <ul className="space-y-3">
                    {restriction.rules.map((rule, ruleIndex) => (
                      <li
                        key={ruleIndex}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 shrink-0"></div>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* Educational Resources */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {childSafetyPolicy.educationalResources.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {childSafetyPolicy.educationalResources.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For Parents */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">
                For Parents & Guardians
              </h3>
              <div className="space-y-4">
                {childSafetyPolicy.educationalResources.forParents.map(
                  (resource, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {resource.description}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* For Children */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">
                For Children & Teens
              </h3>
              <div className="space-y-4">
                {childSafetyPolicy.educationalResources.forChildren.map(
                  (resource, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {resource.description}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Incident Response */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {childSafetyPolicy.incidentResponse.title}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {childSafetyPolicy.incidentResponse.description}
          </p>

          {/* Process Timeline */}
          <div className="space-y-4 mb-6">
            {childSafetyPolicy.incidentResponse.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-linear-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {index + 1}
                  </div>
                  {index < childSafetyPolicy.incidentResponse.process.length - 1 && (
                    <div className="w-0.5 h-full bg-pink-200 mt-2 min-h-[40px]"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {step.step}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {step.description}
                  </p>
                  <div className="flex items-center gap-2 text-pink-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{step.timeframe}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-4">
            <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Emergency Reporting
            </h3>
            <p className="text-red-800 text-sm leading-relaxed">
              {childSafetyPolicy.incidentResponse.emergencyContact}
            </p>
          </div>

          {/* Law Enforcement */}
          <div className="bg-gray-100 p-6 rounded-xl">
            <p className="text-gray-700 text-sm leading-relaxed">
              {childSafetyPolicy.incidentResponse.lawEnforcement}
            </p>
          </div>
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
              {childSafetyPolicy.contactInformation.title}
            </h2>
          </div>
          <p className="text-white/90 leading-relaxed mb-6">
            {childSafetyPolicy.contactInformation.description}
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white/90 min-w-[180px]">
                Child Safety Team:
              </span>
              <a
                href={`mailto:${childSafetyPolicy.contactInformation.childSafetyEmail}`}
                className="text-white hover:underline transition-all duration-200 hover:text-white/90"
              >
                {childSafetyPolicy.contactInformation.childSafetyEmail}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white/90 min-w-[180px]">
                Parent Support:
              </span>
              <a
                href={`mailto:${childSafetyPolicy.contactInformation.parentSupportEmail}`}
                className="text-white hover:underline transition-all duration-200 hover:text-white/90"
              >
                {childSafetyPolicy.contactInformation.parentSupportEmail}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white/90 min-w-[180px]">
                General Support:
              </span>
              <a
                href={`mailto:${childSafetyPolicy.contactInformation.generalEmail}`}
                className="text-white hover:underline transition-all duration-200 hover:text-white/90"
              >
                {childSafetyPolicy.contactInformation.generalEmail}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white/90 min-w-[180px]">
                Address:
              </span>
              <span className="text-white/90">
                {childSafetyPolicy.contactInformation.address}
              </span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-white/90 shrink-0 mt-0.5" />
                <p className="text-white/90 text-sm leading-relaxed">
                  {childSafetyPolicy.contactInformation.responseTime}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
