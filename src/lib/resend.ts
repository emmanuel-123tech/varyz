import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const fromEmail = process.env.RESEND_FROM_EMAIL || 'Varys Access <access@varys.io>';

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendPrototypeAccessEmail({
  email,
  firstName,
  prototypeUrl,
}: {
  email: string;
  firstName: string;
  prototypeUrl: string;
}): Promise<{ success: boolean; id?: string; simulated?: boolean }> {
  const subject = 'Your Varys prototype access is ready';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #06162C; color: #FFFFFF; margin: 0; padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0B2240; border-radius: 12px; padding: 40px; border: 1px solid rgba(140, 203, 69, 0.2);">
    
    <!-- Logo Header -->
    <div style="margin-bottom: 30px; text-align: left;">
      <span style="font-size: 24px; font-weight: 800; color: #8CCB45; letter-spacing: -0.5px;">VARYS</span>
      <span style="display: block; font-size: 11px; color: #A5E35A; text-transform: uppercase; tracking: 1px;">Geo-Security & Agri-Intelligence</span>
    </div>

    <!-- Main Message -->
    <p style="font-size: 16px; line-height: 1.6; color: #F5F7F1;">Hi ${firstName},</p>
    
    <p style="font-size: 16px; line-height: 1.6; color: #F5F7F1;">Thank you for your interest in Varys.</p>
    
    <p style="font-size: 16px; line-height: 1.6; color: #F5F7F1;">Your prototype access is ready. Use the button below to explore the drone operations, agriculture, security and client workspaces.</p>

    <!-- Call to Action Button -->
    <div style="margin: 35px 0; text-align: center;">
      <a href="${prototypeUrl}" style="background-color: #8CCB45; color: #06162C; font-weight: 700; font-size: 16px; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 14px rgba(140, 203, 69, 0.4);">Open Varys Prototype</a>
    </div>

    <p style="font-size: 16px; line-height: 1.6; color: #F5F7F1;">As you explore the platform, please note anything you find useful, unclear or missing. Your feedback will help us improve Varys.</p>

    <!-- Sign off -->
    <p style="font-size: 16px; line-height: 1.6; color: #F5F7F1; margin-top: 30px;">
      Thank you,<br>
      <strong>The Varys Team</strong>
    </p>

    <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 30px 0;" />

    <!-- Plain Text URL fallback -->
    <p style="font-size: 12px; color: #94A3B8; word-break: break-all; margin: 0;">
      If the button above does not work, copy and paste this link into your browser:<br>
      <a href="${prototypeUrl}" style="color: #8CCB45; text-decoration: underline;">${prototypeUrl}</a>
    </p>
  </div>
</body>
</html>
  `;

  const textContent = `
Hi ${firstName},

Thank you for your interest in Varys.

Your prototype access is ready. Use the button below to explore the drone operations, agriculture, security and client workspaces.

Open Varys Prototype:
${prototypeUrl}

As you explore the platform, please note anything you find useful, unclear or missing. Your feedback will help us improve Varys.

Thank you,
The Varys Team
  `;

  if (resend) {
    try {
      const response = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
        text: textContent,
      });

      return { success: true, id: response.data?.id };
    } catch (error) {
      console.error('Failed to deliver email via Resend:', error);
      // Fallback response for dev environments
      return { success: true, simulated: true };
    }
  }

  // Development logger output
  console.log('====================================================');
  console.log('[PROTOTYPE ACCESS EMAIL SIMULATED]');
  console.log(`To: ${email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Prototype Access Link: ${prototypeUrl}`);
  console.log('====================================================');

  return { success: true, simulated: true };
}
