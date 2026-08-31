'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Star, MessageSquare, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitFeedbackSchema, SubmitFeedbackSchema, workspaceOptions } from '@/lib/schemas';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  email: string;
}

export function FeedbackModal({ isOpen, onClose, token, email }: FeedbackModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(5);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SubmitFeedbackSchema>({
    resolver: zodResolver(submitFeedbackSchema),
    defaultValues: {
      token,
      email,
      rating: 5,
      workspaceTested: 'All Workspaces',
      mostUsefulFeature: '',
      confusingElements: '',
      mostUsedFeature: '',
      suggestedImprovements: '',
      futureTestingInterest: true,
    },
  });

  if (!isOpen) return null;

  const handleRatingClick = (val: number) => {
    setSelectedRating(val);
    setValue('rating', val);
  };

  const onSubmit = async (data: SubmitFeedbackSchema) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, token, email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit prototype feedback.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while submitting your feedback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSuccess) {
      reset();
      setIsSuccess(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-white/20 bg-varyz-navy-light/95 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
        
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-varyz-purple/20 border border-varyz-purple/40 flex items-center justify-center text-varyz-purple-light shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Tester Feedback
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Help us refine the Varyz platform experience.
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-varyz-lime/20 border border-varyz-lime/40 text-varyz-lime flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Thank You for Your Feedback!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Your insights have been recorded and linked to your tester access profile.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-colors"
              >
                Return to Prototype
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {submitError && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Overall Rating 1 to 5 */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 block">
                Overall Prototype Rating (1 to 5)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className={`p-2 rounded-xl border transition-all flex items-center justify-center gap-1 text-sm font-bold ${
                      selectedRating >= star
                        ? 'bg-amber-400/10 border-amber-400 text-amber-400'
                        : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${selectedRating >= star ? 'fill-amber-400' : ''}`} />
                    <span>{star}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Workspace Tested */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200">
                Workspace Tested <span className="text-rose-400">*</span>
              </label>
              <select
                {...register('workspaceTested')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-varyz-lime"
              >
                {workspaceOptions.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            {/* Most Useful Feature */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200">
                Most Useful Feature <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. NDVI Vegetation Map layers & Drone maintenance tasks"
                {...register('mostUsefulFeature')}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-slate-500 focus:outline-none ${
                  errors.mostUsefulFeature ? 'border-rose-500' : 'border-white/10 focus:border-varyz-lime'
                }`}
              />
              {errors.mostUsefulFeature && (
                <p className="text-xs text-rose-400">{errors.mostUsefulFeature.message}</p>
              )}
            </div>

            {/* Anything Confusing */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Anything Confusing or Missing? <span className="text-slate-500">(Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Note any controls or visual elements that felt unclear..."
                {...register('confusingElements')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-varyz-lime"
              />
            </div>

            {/* Suggested Improvements */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Suggested Improvements <span className="text-slate-500">(Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Ideas for additional telemetry metrics, map export formats..."
                {...register('suggestedImprovements')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-varyz-lime"
              />
            </div>

            {/* Future Testing Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('futureTestingInterest')}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-varyz-lime focus:ring-varyz-lime accent-varyz-lime"
                />
                <span className="text-xs text-slate-300">
                  Interested in participating in future beta feature testing rounds.
                </span>
              </label>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Saving Feedback...</span>
                  </>
                ) : (
                  <span>Submit Tester Feedback</span>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
