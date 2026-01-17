"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { _makeUnauthenticatedPostRequest } from "@/src/api/api";
import endpoints from "@/src/api/endpoint";
import routes from "../lib/routes";
import { useCenterPopup } from "@/src/context/CenterPopupContext";
import { toast } from 'react-toastify';

const tabs = ["Support Form", "Brand Partnership Form"] as const;

type Tab = (typeof tabs)[number];

// Zod schemas for validation
const supportFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required").min(2, "Full name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
});

const brandFormSchema = z.object({
  companyName: z.string().min(1, "Company/Brand name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  websiteOrSocialLink: z.string().optional(),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
});

type SupportFormData = z.infer<typeof supportFormSchema>;
type BrandFormData = z.infer<typeof brandFormSchema>;

export default function SupportTabs() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const tabsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showPopup } = useCenterPopup();

  // Set initial tab based on URL parameter
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (tabParam === 'brand') {
      return "Brand Partnership Form";
    }
    return "Support Form";
  });

  // Update tab when URL parameter changes and scroll to tabs
  useEffect(() => {
    if (tabParam === 'brand') {
      setActiveTab("Brand Partnership Form");
    } else if (tabParam === 'support') {
      setActiveTab("Support Form");
    }

    // Scroll to tabs section if tab parameter exists
    if (tabParam && tabsRef.current) {
      setTimeout(() => {
        tabsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [tabParam]);

  return (
    <section className="bg-transparent py-10 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-15">

        {/* Tabs */}
        <div
          ref={tabsRef}
          className="flex justify-center mb-14"
        >
          <div className="flex rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] w-160 ">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-xl text-sm md:text-xl font-semibold py-4 transition-all duration-200
                  ${activeTab === tab
                    ? "bg-[#FF0000] text-[#F8F8F8]"
                    : "text-[#111111] bg-transparent"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div

            key={activeTab}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid lg:grid-cols-2 gap-14 items-start"
          >

            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            >
              {activeTab === "Support Form" ? (
                <>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                    className="text-2xl text-[#111111] font-bold mb-4"
                  >
                    When Should You Use This Form?
                  </motion.h2>
                  <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                    className="space-y-4 text-[#333333]/70 font-semibold"
                  >
                    <li><span className="text-[#111111] text-2xl">●</span> You have product or app-related questions</li>
                    <li><span className="text-[#111111] text-2xl">●</span> You need technical help or installation support</li>
                    <li><span className="text-[#111111] text-2xl">●</span> You want to report an issue or bug</li>
                    <li><span className="text-[#111111] text-2xl">●</span> You need help with FanDom or FanPedia features</li>
                  </motion.ul>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 border-2 border-[#111111] px-8 py-3 rounded-lg font-medium text-[#111111] transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#111111] hover:text-white cursor-pointer"
                 onClick={()=> router.push(routes.faq)}
                 >
                    View FAQ
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                    className="text-2xl text-[#111111] font-bold mb-4"
                  >
                    Brand Collaborations
                  </motion.h2>
                  <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                    className="space-y-4 text-[#333333]/70 font-semibold"
                  >
                    <li><span className="text-[#111111] text-2xl">●</span> Sponsorship opportunities</li>
                    <li><span className="text-[#111111] text-2xl">●</span> Game Room branding</li>
                    <li><span className="text-[#111111] text-2xl">●</span> Affiliate marketing</li>
                    <li><span className="text-[#111111] text-2xl">●</span> Coupon rewards for winners</li>
                  </motion.ul>
                </>
              )}

              {/* Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                className="mt-12"
              >
                <Image
                  src="/assets/svg/contact-us.svg"
                  alt="Support Illustration"
                  width={400}
                  height={300}
                />
              </motion.div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-4 md:p-10"
            >
              {activeTab === "Support Form" ? (
                <SupportForm />
              ) : (
                <BrandForm />
              )}
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
function SupportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showPopup } = useCenterPopup();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      category: '',
      message: '',
    },
  });

  const onSubmit = async (data: SupportFormData) => {
    setIsSubmitting(true);

    try {
      const response = await _makeUnauthenticatedPostRequest(endpoints.SUPPORT_FORM, data);

      // Check if response has the expected structure for success
      if (response && response.id && response.createdAt) {
        showPopup({
          title: 'Success!',
          message: 'Your support request has been submitted successfully! We\'ll get back to you soon.',
          type: 'success'
        });
        toast.success('Your support request has been submitted successfully!');
        reset(); // Clear the form
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error: any) {
      console.error('Support form submission error:', error);

      let errorMessage = 'Something went wrong. Please try again.';

      // Handle API error response
      if (error && error.message) {
        errorMessage = error.message;
      } else if (error && error.details && Array.isArray(error.details)) {
        errorMessage = error.details.join(', ');
      } else if (error && typeof error === 'string') {
        errorMessage = error;
      }

      showPopup({
        title: 'Error!',
        message: errorMessage,
        type: 'error'
      });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >

      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Full Name"
            {...field}
            error={errors.fullName?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Email"
            type="email"
            {...field}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Phone Number (optional)"
            type="tel"
            {...field}
            error={errors.phoneNumber?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormSelect
            label="Category"
            options={[
              "Technical Support",
              "Bug Report",
              "Feature Request",
              "Account Issues",
              "General Inquiry"
            ]}
            {...field}
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <FormTextarea
            label="Message"
            {...field}
            error={errors.message?.message}
          />
        )}
      />

      <SubmitButton isSubmitting={isSubmitting} />
    </motion.form>
  );
}

function BrandForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showPopup } = useCenterPopup();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      companyName: '',
      contactPerson: '',
      email: '',
      websiteOrSocialLink: '',
      inquiryType: '',
      message: '',
    },
  });

  const onSubmit = async (data: BrandFormData) => {
    setIsSubmitting(true);

    try {
      // Send data in the exact payload structure you specified
      const response = await _makeUnauthenticatedPostRequest(endpoints.BRAND_PARTNERSHIP_FORM, data);

      if (response && response.id && response.createdAt) {
        showPopup({
          title: 'Success!',
          message: 'Your partnership inquiry has been submitted successfully! We\'ll review it and get back to you soon.',
          type: 'success'
        });
        toast.success('Your partnership inquiry has been submitted successfully!');
        reset();
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error: any) {
      console.error('Brand form submission error:', error);

      let errorMessage = 'Something went wrong. Please try again.';

      if (error && error.message) {
        errorMessage = error.message;
      } else if (error && error.details && Array.isArray(error.details)) {
        errorMessage = error.details.join(', ');
      } else if (error && typeof error === 'string') {
        errorMessage = error;
      }

      showPopup({
        title: 'Error!',
        message: errorMessage,
        type: 'error'
      });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >

      <Controller
        name="companyName"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Company / Brand Name"
            {...field}
            error={errors.companyName?.message}
          />
        )}
      />

      <Controller
        name="contactPerson"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Contact Person"
            {...field}
            error={errors.contactPerson?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Email"
            type="email"
            {...field}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="websiteOrSocialLink"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Website / Social Link (optional)"
            type="url"
            {...field}
            error={errors.websiteOrSocialLink?.message}
          />
        )}
      />

      <Controller
        name="inquiryType"
        control={control}
        render={({ field }) => (
          <FormSelect
            label="Inquiry Type"
            options={[
              "Sponsorship",
              "Game Room Branding",
              "Affiliate Marketing",
              "Coupon Rewards",
              "Other Partnership"
            ]}
            {...field}
            error={errors.inquiryType?.message}
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <FormTextarea
            label="Message / Proposal"
            {...field}
            error={errors.message?.message}
          />
        )}
      />

      <SubmitButton isSubmitting={isSubmitting} />
    </motion.form>
  );
}

function FormInput({
  label,
  type = "text",
  error,
  ...field
}: {
  label: string;
  type?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  name?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium">
        {label}:
      </Label>
      <Input
        id={label.toLowerCase().replace(/\s+/g, '-')}
        type={type}
        className={`h-8 md:h-10 lg:h-12 border-2 rounded-full px-5 py-3 ${error ? 'border-red-500 focus:border-red-500' : 'border-[#111111]'
          }`}
        {...field}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

function FormSelect({
  label,
  options,
  error,
  value,
  onChange
}: {
  label: string;
  options: string[];
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium">
        {label}:
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`w-full h-8 md:h-10 lg:h-12 border-2 rounded-full px-5 py-3 ${error ? 'border-red-500 focus:border-red-500' : 'border-[#111111]'
          }`}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

function FormTextarea({
  label,
  error,
  ...field
}: {
  label: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  name?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium">
        {label}:
      </Label>
      <Textarea
        id={label.toLowerCase().replace(/\s+/g, '-')}
        className={`min-h-32 border-2 rounded-xl px-5 py-3 ${error ? 'border-red-500 focus:border-red-500' : 'border-[#111111]'
          }`}
        placeholder={`Enter your ${label.toLowerCase()}...`}
        {...field}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

function SubmitButton({ isSubmitting }: { isSubmitting?: boolean }) {
  return (
    <div className="pt-4 text-center md:text-right">
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
        type="submit"
        disabled={isSubmitting}
        className={`px-10 py-2 rounded-lg font-semibold transform transition-all duration-300 ease-in-out ${isSubmitting
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
          : 'bg-[#FF0000] text-[#F8F8F8] hover:scale-105 hover:bg-red-700 active:scale-95'
          }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </motion.button>
    </div>
  );
}


