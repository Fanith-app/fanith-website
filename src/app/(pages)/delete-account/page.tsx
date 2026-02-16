"use client";

import Banner from "@/src/components/common/Banner";
import { motion } from 'framer-motion';
import { User, Settings, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';

const DeleteAccountPage = () => {
  const steps = [
    {
      number: 1,
      title: "Go to Profile",
      description: "Navigate to your profile page by clicking on your profile icon in the top navigation bar.",
      icon: User,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: 2,
      title: "Go to Settings",
      description: "Once on your profile page, locate and click on the Settings option to access your account settings.",
      icon: Settings,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: 3,
      title: "Find Delete Account Button",
      description: "Scroll to the bottom of the settings page where you'll find the delete icon button in red.",
      icon: Trash2,
      color: "from-orange-500 to-orange-600"
    },
    {
      number: 4,
      title: "Click on Confirm",
      description: "Review the deletion warning carefully, then click the confirm button to permanently delete your account.",
      icon: CheckCircle,
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <main className="w-full">
      <Banner
        title="Delete Account Guide"
        description="Follow these simple steps to permanently delete your Fanith account. Please note that this action cannot be undone."
        backgroundImage="/assets/images/faq-banner.jpg"
        bottomcurve="lg:h-120 lg:[clip-path:ellipse(80%_90%_at_50%_0%)]"
      />

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-red-50 border-2 border-red-300 rounded-lg p-6 flex items-start gap-4"
        >
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Important Warning</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Deleting your account is permanent and cannot be undone. You will lose all your FanDom points,
              community connections, saved content, and account history. Please consider carefully before proceeding.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[30px] top-[70px] w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-gray-300 to-gray-200 z-0" />
                )}

                {/* Step Card */}
                <div className="relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-red-400 hover:shadow-lg transition-all duration-300 shadow-md">
                  <div className="flex items-start gap-6">
                    {/* Icon Circle */}
                    <div className={`relative z-10 flex-shrink-0 w-[60px] h-[60px] rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-gray-500">Step {step.number}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gray-50 border-2 border-gray-200 rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              If you're facing any issues or have questions about deleting your account,
              our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-105"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default DeleteAccountPage;
