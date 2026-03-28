import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNotificationEmail(senderName: string, senderEmail: string, message: string) {
  const { data, error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: ['meet.m.upadhyay@gmail.com'],
    subject: `🚀 New Portfolio Message from ${senderName}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0e141a; color: #dde3ec; padding: 32px; border-radius: 12px;">
        <div style="border-bottom: 2px solid #00E5FF; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #00E5FF; margin: 0; font-size: 24px;">New Contact Message</h1>
          <p style="color: #8892b0; margin: 4px 0 0 0; font-size: 14px;">Someone reached out via your portfolio website</p>
        </div>
        <div style="background: #0A192F; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
          <p style="margin: 0 0 8px 0;"><strong style="color: #00E5FF;">From:</strong> ${senderName}</p>
          <p style="margin: 0;"><strong style="color: #00E5FF;">Email:</strong> <a href="mailto:${senderEmail}" style="color: #c3f5ff;">${senderEmail}</a></p>
        </div>
        <div style="background: #0A192F; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <p style="color: #00E5FF; font-weight: bold; margin: 0 0 8px 0;">Message:</p>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #8892b0; font-size: 12px; text-align: center; margin: 0;">Reply from your Admin Dashboard or directly via email.</p>
      </div>
    `,
  });

  if (error) {
    console.error('Resend API error details:', JSON.stringify(error));
    throw new Error(error.message);
  }
  
  console.log('Resend email sent, ID:', data?.id);
  return data;
}

export async function sendReplyEmail(toEmail: string, toName: string, replyMessage: string) {
  const { data, error } = await resend.emails.send({
    from: 'Meet Upadhyay <onboarding@resend.dev>',
    to: [toEmail],
    replyTo: 'meet.m.upadhyay@gmail.com',
    subject: `Re: Your message to Meet Upadhyay`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0e141a; color: #dde3ec; padding: 32px; border-radius: 12px;">
        <div style="border-bottom: 2px solid #00E5FF; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #00E5FF; margin: 0; font-size: 24px;">Hi ${toName},</h1>
          <p style="color: #8892b0; margin: 4px 0 0 0; font-size: 14px;">Thanks for reaching out through my portfolio!</p>
        </div>
        <div style="background: #0A192F; padding: 20px; border-radius: 8px; margin-bottom: 24px; line-height: 1.6; white-space: pre-wrap;">${replyMessage}</div>
        <div style="border-top: 1px solid #1c3254; padding-top: 16px; text-align: center;">
          <p style="color: #8892b0; font-size: 13px; margin: 0;">Meet Upadhyay · Senior Software Engineer</p>
          <p style="margin: 4px 0 0 0;">
            <a href="https://github.com/meet-m-upadhyay" style="color: #00E5FF; text-decoration: none; margin: 0 8px;">GitHub</a> ·
            <a href="https://www.linkedin.com/in/meet-m-upadhyay/" style="color: #00E5FF; text-decoration: none; margin: 0 8px;">LinkedIn</a>
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend reply error details:', JSON.stringify(error));
    throw new Error(error.message);
  }
  
  console.log('Reply email sent, ID:', data?.id);
  return data;
}
