import { createClient } from '@supabase/supabase-js';
import { AccessRequestFormData, AccessTokenRecord, FeedbackFormData } from '@/types';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const isConfigured = Boolean(supabaseUrl && !supabaseUrl.includes('your-project') && !supabaseUrl.includes('mock'));

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)
  : null;

// --- IN-MEMORY FALLBACK DATA STORE FOR LOCAL DEMO / DEPLOYMENT TESTING ---
interface StoredRequest extends AccessRequestFormData {
  id: string;
  createdAt: string;
}

const memoryRequests = new Map<string, StoredRequest>(); // Keyed by lowercased email
const memoryTokens = new Map<string, AccessTokenRecord>();  // Keyed by token string
const memoryFeedback: (FeedbackFormData & { id: string; createdAt: string })[] = [];

/**
 * Creates or retrieves a prototype access request and token
 */
export async function processAccessRequest(
  data: AccessRequestFormData,
  ipAddress?: string
): Promise<{ request: StoredRequest; tokenRecord: AccessTokenRecord; isExisting: boolean }> {
  const normalizedEmail = data.email.toLowerCase().trim();
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days token validity

  if (supabase) {
    try {
      // Check existing request
      const { data: existingRequest } = await supabase
        .from('prototype_access_requests')
        .select('*')
        .eq('email', normalizedEmail)
        .single();

      let requestId: string;
      let isExisting = false;

      if (existingRequest) {
        requestId = existingRequest.id;
        isExisting = true;
        await supabase
          .from('prototype_access_requests')
          .update({ updated_at: now, full_name: data.fullName, organisation: data.organisation, role: data.role })
          .eq('id', requestId);
      } else {
        const { data: newRequest, error: reqErr } = await supabase
          .from('prototype_access_requests')
          .insert({
            full_name: data.fullName,
            email: normalizedEmail,
            organisation: data.organisation,
            role: data.role,
            primary_use_case: data.primaryUseCase,
            country: data.country || null,
            goals: data.goals || null,
            consent: data.consent,
            ip_address: ipAddress || null,
          })
          .select()
          .single();

        if (reqErr) throw reqErr;
        requestId = newRequest.id;
      }

      // Check existing active token
      const { data: existingToken } = await supabase
        .from('prototype_access_tokens')
        .select('*')
        .eq('email', normalizedEmail)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (existingToken && new Date(existingToken.expires_at) > new Date()) {
        return {
          request: { ...data, id: requestId, createdAt: now },
          tokenRecord: {
            id: existingToken.id,
            email: existingToken.email,
            token: existingToken.token,
            expiresAt: existingToken.expires_at,
            firstAccessedAt: existingToken.first_accessed_at,
            lastAccessedAt: existingToken.last_accessed_at,
          },
          isExisting,
        };
      }

      // Generate new secure 32-character hex token
      const token = crypto.randomBytes(16).toString('hex');
      const { data: newToken, error: tokenErr } = await supabase
        .from('prototype_access_tokens')
        .insert({
          request_id: requestId,
          email: normalizedEmail,
          token,
          expires_at: expiresAt,
        })
        .select()
        .single();

      if (tokenErr) throw tokenErr;

      return {
        request: { ...data, id: requestId, createdAt: now },
        tokenRecord: {
          id: newToken.id,
          email: newToken.email,
          token: newToken.token,
          expiresAt: newToken.expires_at,
        },
        isExisting,
      };
    } catch (err) {
      console.warn('Supabase DB operational error, falling back to memory store:', err);
    }
  }

  // --- Memory Fallback ---
  let isExisting = false;
  let request = memoryRequests.get(normalizedEmail);

  if (request) {
    isExisting = true;
    request = { ...request, ...data };
    memoryRequests.set(normalizedEmail, request);
  } else {
    request = { ...data, id: crypto.randomUUID(), createdAt: now };
    memoryRequests.set(normalizedEmail, request);
  }

  // Find existing valid token in memory
  let tokenRecord = Array.from(memoryTokens.values()).find(
    (t) => t.email === normalizedEmail && new Date(t.expiresAt) > new Date()
  );

  if (!tokenRecord) {
    const tokenStr = crypto.randomBytes(16).toString('hex');
    tokenRecord = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      token: tokenStr,
      expiresAt,
    };
    memoryTokens.set(tokenStr, tokenRecord);
  }

  return { request, tokenRecord, isExisting };
}

/**
 * Validates a prototype access token and updates access timestamps
 */
export async function validateAccessToken(tokenStr: string): Promise<{ isValid: boolean; tokenRecord: AccessTokenRecord | null }> {
  if (!tokenStr) return { isValid: false, tokenRecord: null };

  const now = new Date().toISOString();

  if (supabase) {
    try {
      const { data: tokenData, error } = await supabase
        .from('prototype_access_tokens')
        .select('*')
        .eq('token', tokenStr)
        .single();

      if (error || !tokenData) {
        return { isValid: false, tokenRecord: null };
      }

      const isExpired = new Date(tokenData.expires_at) <= new Date();
      if (isExpired) {
        return { isValid: false, tokenRecord: null };
      }

      // Update timestamps asynchronously
      const firstAccess = tokenData.first_accessed_at || now;
      await supabase
        .from('prototype_access_tokens')
        .update({
          first_accessed_at: firstAccess,
          last_accessed_at: now,
        })
        .eq('id', tokenData.id);

      return {
        isValid: true,
        tokenRecord: {
          id: tokenData.id,
          email: tokenData.email,
          token: tokenData.token,
          expiresAt: tokenData.expires_at,
          firstAccessedAt: firstAccess,
          lastAccessedAt: now,
        },
      };
    } catch (err) {
      console.warn('Supabase DB token verification error, falling back to memory store:', err);
    }
  }

  // Memory fallback check
  const tokenRecord = memoryTokens.get(tokenStr);
  if (!tokenRecord) {
    return { isValid: false, tokenRecord: null };
  }

  if (new Date(tokenRecord.expiresAt) <= new Date()) {
    return { isValid: false, tokenRecord: null };
  }

  if (!tokenRecord.firstAccessedAt) {
    tokenRecord.firstAccessedAt = now;
  }
  tokenRecord.lastAccessedAt = now;

  return { isValid: true, tokenRecord };
}

/**
 * Saves prototype feedback linked to tester token
 */
export async function saveFeedback(data: FeedbackFormData, tokenStr: string, email: string): Promise<{ success: boolean }> {
  const now = new Date().toISOString();

  if (supabase) {
    try {
      // Lookup token record ID if available
      const { data: tokenData } = await supabase
        .from('prototype_access_tokens')
        .select('id')
        .eq('token', tokenStr)
        .single();

      await supabase.from('prototype_feedback').insert({
        token_id: tokenData?.id || null,
        email: email.toLowerCase().trim(),
        rating: data.rating,
        workspace_tested: data.workspaceTested,
        most_useful_feature: data.mostUsefulFeature,
        confusing_elements: data.confusingElements || null,
        most_used_feature: data.mostUsedFeature || null,
        suggested_improvements: data.suggestedImprovements || null,
        future_testing_interest: data.futureTestingInterest,
      });

      return { success: true };
    } catch (err) {
      console.warn('Supabase DB feedback insert error, falling back to memory store:', err);
    }
  }

  // Memory fallback
  memoryFeedback.push({
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
  });

  return { success: true };
}
