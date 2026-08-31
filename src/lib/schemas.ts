import { z } from 'zod';

export const primaryUseCaseOptions = [
  'Agriculture',
  'Security',
  'Drone operations',
  'Project monitoring',
  'Research',
  'Investment or partnership',
  'Other',
] as const;

export const requestAccessSchema = z.object({
  fullName: z.string().trim().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
  organisation: z.string().trim().min(2, { message: 'Organisation name is required' }),
  role: z.string().trim().min(2, { message: 'Your role or title is required' }),
  primaryUseCase: z.enum(primaryUseCaseOptions, {
    errorMap: () => ({ message: 'Please select a primary use case' }),
  }),
  country: z.string().trim().optional(),
  goals: z.string().trim().max(1000, { message: 'Goals response must not exceed 1000 characters' }).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy to request prototype access',
  }),
  honeypot: z.string().optional(), // Spam trap: must be empty
});

export type RequestAccessSchema = z.infer<typeof requestAccessSchema>;

export const workspaceOptions = [
  'Drone Operator Workspace',
  'Agriculture Analyst Workspace',
  'Security Analyst Workspace',
  'Client & Viewer Workspace',
  'All Workspaces',
] as const;

export const submitFeedbackSchema = z.object({
  token: z.string().min(1, { message: 'Access token is required' }),
  email: z.string().email({ message: 'Valid email required' }),
  rating: z.number().min(1, { message: 'Please select a rating' }).max(5),
  workspaceTested: z.enum(workspaceOptions, {
    errorMap: () => ({ message: 'Please select which workspace you tested' }),
  }),
  mostUsefulFeature: z.string().trim().min(3, { message: 'Please tell us what feature was most useful' }),
  confusingElements: z.string().trim().optional(),
  mostUsedFeature: z.string().trim().optional(),
  suggestedImprovements: z.string().trim().optional(),
  futureTestingInterest: z.boolean().default(true),
});

export type SubmitFeedbackSchema = z.infer<typeof submitFeedbackSchema>;
