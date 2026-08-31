'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Lock, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { requestAccessSchema, RequestAccessSchema, primaryUseCaseOptions } from '@/lib/schemas';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestAccessModal({ isOpen, onClose }: RequestAccessModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [simulatedLink, setSimulatedLink] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestAccessSchema>({
    resolver: zodResolver(requestAccessSchema),
    defaultValues: {
      fullName: '',
      email: '',
      organisation: '',
      role: '',
      primaryUseCase: 'Agriculture',
      country: '',
      goals: '',
      consent: true,
      honeypot: '',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: RequestAccessSchema) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit prototype access request.');
      }

      setIsSuccess(true);
      if (result.prototypeUrl) {
        setSimulatedLink(result.prototypeUrl);
      }

      // Fire festive confetti animation
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8CCB45', '#A5E35A', '#6B3CE8', '#FFFFFF'],
      });
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSuccess) {
      reset();
      setIsSuccess(false);
      setSimulatedLink(null);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-white/20 bg-varyz-navy-light/95 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-varyz-lime/10 border border-varyz-lime/30 flex items-center justify-center text-varyz-lime shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Request Prototype Access
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Submit your details to receive a private access link to the Varyz prototype.
            </p>
          </div>
        </div>

        {/* Success State Screen */}
        {isSuccess ? (
          <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-varyz-lime/20 border border-varyz-lime/40 text-varyz-lime flex items-center justify-center mx-auto shadow-glow-lime">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Access Link Generated!</h3>
              <p className="text-base text-varyz-lime-bright font-medium max-w-md mx-auto">
                “Your prototype access is on its way. Check your email for your private link.”
              </p>
            </div>

            {/* Development / Testing Quick Link helper */}
            {simulatedLink && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Quick Access Link (Testing / Demo Mode):
                </span>
                <a
                  href={simulatedLink}
                  className="text-xs font-mono text-varyz-lime hover:underline break-all block"
                >
                  {simulatedLink}
                </a>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {simulatedLink ? (
                <a
                  href={simulatedLink}
                  onClick={handleClose}
                  className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-colors text-center"
                >
                  Open Prototype Now
                </a>
              ) : (
                <button
                  onClick={handleClose}
                  className="w-full py-3 px-4 rounded-xl font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-colors"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Access Request Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Server Error Alert */}
            {submitError && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Honeypot hidden input */}
            <input type="text" className="hidden" {...register('honeypot')} tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  {...register('fullName')}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.fullName ? 'border-rose-500' : 'border-white/10 focus:border-varyz-lime'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-400">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="s.jenkins@organisation.com"
                  {...register('email')}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500' : 'border-white/10 focus:border-varyz-lime'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Organisation */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  Organisation <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Company / Institute name"
                  {...register('organisation')}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.organisation ? 'border-rose-500' : 'border-white/10 focus:border-varyz-lime'
                  }`}
                />
                {errors.organisation && (
                  <p className="text-xs text-rose-400">{errors.organisation.message}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  Your Role <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lead Agronomist / Chief Pilot"
                  {...register('role')}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.role ? 'border-rose-500' : 'border-white/10 focus:border-varyz-lime'
                  }`}
                />
                {errors.role && (
                  <p className="text-xs text-rose-400">{errors.role.message}</p>
                )}
              </div>
            </div>

            {/* Primary Use Case */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200">
                Primary Use Case <span className="text-rose-400">*</span>
              </label>
              <select
                {...register('primaryUseCase')}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-sm text-white focus:outline-none transition-colors ${
                  errors.primaryUseCase ? 'border-rose-500' : 'border-white/10 focus:border-varyz-lime'
                }`}
              >
                {primaryUseCaseOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-900 text-white">
                    {option}
                  </option>
                ))}
              </select>
              {errors.primaryUseCase && (
                <p className="text-xs text-rose-400">{errors.primaryUseCase.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Optional Country */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Country <span className="text-slate-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nigeria, United States"
                  {...register('country')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-varyz-lime transition-colors"
                />
              </div>

              {/* Goals / Achievements */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  What would you like to test? <span className="text-slate-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Test NDVI maps on corn fields"
                  {...register('goals')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-varyz-lime transition-colors"
                />
              </div>
            </div>

            {/* Required Consent Checkbox */}
            <div className="pt-2 space-y-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-varyz-lime focus:ring-varyz-lime accent-varyz-lime"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I agree to receive a prototype access token and agree to the{' '}
                  <Link href="/privacy-policy" target="_blank" className="text-varyz-lime underline">
                    Privacy Policy
                  </Link>.
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-rose-400 pl-7">{errors.consent.message}</p>
              )}
            </div>

            {/* Submit Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all shadow-glow-lime flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Request...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Request Prototype Access</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
