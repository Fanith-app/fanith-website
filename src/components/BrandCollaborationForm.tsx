"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { _makeUnauthenticatedPostRequest } from '@/src/api/api';
import endpoints from '@/src/api/endpoint';
import { useCenterPopup } from '@/src/context/CenterPopupContext';

const brandFormSchema = z.object({
  companyName: z.string().min(1, 'Company/Brand name is required'),
  contactPerson: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  websiteOrSocialLink: z.string().optional().or(z.literal('')),
  inquiryType: z.string().min(1, 'Please select a partnership type'),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
});

type BrandFormData = z.infer<typeof brandFormSchema>;

export default function BrandCollaborationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showPopup } = useCenterPopup();

  const {
    register,
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
      const payload = {
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        email: data.email,
        websiteOrSocialLink: data.websiteOrSocialLink || undefined,
        inquiryType: data.inquiryType,
        message: data.message,
      };

      const response = await _makeUnauthenticatedPostRequest(
        endpoints.BRAND_PARTNERSHIP_FORM,
        payload
      );

      if (response && response.id && response.createdAt) {
        showPopup({
          title: 'Success!',
          message: "Your partnership inquiry has been submitted successfully! We'll review it and get back to you soon.",
          type: 'success',
        });
        toast.success('Your partnership inquiry has been submitted successfully!');
        reset();
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error: any) {
      console.error('Brand collaboration form submission error:', error);
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
        type: 'error',
      });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Full Name"
            {...register('contactPerson')}
            className={`h-11 rounded-md border bg-[#0E0F12] px-3 text-[14px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E31E24] ${
              errors.contactPerson ? 'border-red-500 focus:border-red-500' : 'border-white/10'
            }`}
          />
          {errors.contactPerson && (
            <span className="text-[12px] text-[#E31E24] pl-1">{errors.contactPerson.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email Address"
            {...register('email')}
            className={`h-11 rounded-md border bg-[#0E0F12] px-3 text-[14px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E31E24] ${
              errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10'
            }`}
          />
          {errors.email && (
            <span className="text-[12px] text-[#E31E24] pl-1">{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Brand/Company Name"
            {...register('companyName')}
            className={`h-11 rounded-md border bg-[#0E0F12] px-3 text-[14px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E31E24] ${
              errors.companyName ? 'border-red-500 focus:border-red-500' : 'border-white/10'
            }`}
          />
          {errors.companyName && (
            <span className="text-[12px] text-[#E31E24] pl-1">{errors.companyName.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Website / Social Link (optional)"
            {...register('websiteOrSocialLink')}
            className={`h-11 rounded-md border bg-[#0E0F12] px-3 text-[14px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E31E24] ${
              errors.websiteOrSocialLink ? 'border-red-500 focus:border-red-500' : 'border-white/10'
            }`}
          />
          {errors.websiteOrSocialLink && (
            <span className="text-[12px] text-[#E31E24] pl-1">{errors.websiteOrSocialLink.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <select
          {...register('inquiryType')}
          className={`h-11 w-full rounded-md border bg-[#0E0F12] px-3 text-[14px] outline-none focus:border-[#E31E24] ${
            errors.inquiryType ? 'border-red-500 focus:border-red-500' : 'border-white/10'
          } ${errors.inquiryType || errors.inquiryType === undefined ? 'text-white' : 'text-[#9CA3AF]'}`}
        >
          <option value="" className="text-[#6B7280]">Select Partnership Type</option>
          <option value="Brand Takeover">Brand Takeover</option>
          <option value="General Chat Sponsorship">General Chat Sponsorship</option>
          <option value="Rewards & Coupons">Rewards & Coupons</option>
          <option value="Contests & Challenges">Contests & Challenges</option>
          <option value="Affiliate Marketing">Affiliate Marketing</option>
        </select>
        {errors.inquiryType && (
          <span className="text-[12px] text-[#E31E24] pl-1">{errors.inquiryType.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          placeholder="Message / Proposal"
          rows={4}
          {...register('message')}
          className={`w-full rounded-md border bg-[#0E0F12] p-3 text-[14px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E31E24] resize-none ${
            errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10'
          }`}
        />
        {errors.message && (
          <span className="text-[12px] text-[#E31E24] pl-1">{errors.message.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#E31E24] text-[14px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
