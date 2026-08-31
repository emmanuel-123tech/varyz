export type RoleWorkspaceType = 'all' | 'drone-operator' | 'agriculture-analyst' | 'security-analyst' | 'client-viewer';

export interface PrototypeScreen {
  id: string;
  title: string;
  category: RoleWorkspaceType;
  categoryLabel: string;
  description: string;
  keyFeatures: string[];
  imagePath: string;
  aspectRatio?: string;
  isPublicPreview?: boolean;
}

export interface AccessRequestFormData {
  fullName: string;
  email: string;
  organisation: string;
  role: string;
  primaryUseCase: string;
  country?: string;
  goals?: string;
  consent: boolean;
  honeypot?: string; // Spam protection
}

export interface FeedbackFormData {
  rating: number;
  workspaceTested: string;
  mostUsefulFeature: string;
  confusingElements?: string;
  mostUsedFeature?: string;
  suggestedImprovements?: string;
  futureTestingInterest: boolean;
}

export interface AccessTokenRecord {
  id: string;
  email: string;
  token: string;
  expiresAt: string;
  firstAccessedAt?: string | null;
  lastAccessedAt?: string | null;
}
