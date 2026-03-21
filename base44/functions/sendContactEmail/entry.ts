import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, company, message } = await req.json();

    // Save to database
    await base44.asServiceRole.entities.ContactSubmission.create({
      name,
      email,
      company,
      message,
    });

    // Send email to info@mobihero.de
    const apiKey = Deno.env.get('RESEND_API_KEY');
    const emailBody = `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}

Message:
${message}
    `.trim();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'MBE Group <onboarding@resend.dev>',
        to: 'danielmasouleh@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});