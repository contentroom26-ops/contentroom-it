import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const TO_EMAIL = 'info@contentroom.it';
const FROM_EMAIL = 'Content Room <info@contentroom.it>';

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(150).optional().default(''),
  message: z.string().trim().min(1).max(2000),
  source: z.string().trim().max(50).optional().default('website'),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!RESEND_API_KEY) {
      console.error('[send-contact-email] RESEND_API_KEY non configurata');
      return new Response(JSON.stringify({ error: 'Invio non riuscito. Riprova più tardi.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { name, email, subject, message, source } = parsed.data;

    const emailSubject = subject?.trim()
      ? `[Content Room] ${subject}`
      : `[Content Room] Nuovo contatto da ${name}`;

    const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;background:#0d0d0d;color:#f5f5f5;padding:32px;border-radius:16px;">
        <h2 style="color:#a8d4e0;margin:0 0 16px;">Nuovo messaggio dal sito</h2>
        <p style="color:#888;font-size:12px;margin:0 0 24px;text-transform:uppercase;letter-spacing:2px;">Origine: ${escapeHtml(source)}</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;width:120px;"><strong>Nome cliente</strong></td><td style="padding:8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#888;"><strong>Email cliente</strong></td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#a8d4e0;">${escapeHtml(email)}</a></td></tr>
          ${subject ? `<tr><td style="padding:8px 0;color:#888;"><strong>Oggetto</strong></td><td style="padding:8px 0;">${escapeHtml(subject)}</td></tr>` : ''}
        </table>
        <div style="margin-top:24px;">
          <p style="color:#888;text-transform:uppercase;letter-spacing:2px;font-size:12px;margin:0 0 8px;">Messaggio</p>
          <div style="padding:20px;background:#1a1a1a;border-radius:12px;border-left:3px solid #a8d4e0;">
            <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
          </div>
        </div>
        <p style="margin-top:24px;color:#666;font-size:12px;">Rispondi direttamente a questa email per contattare ${escapeHtml(name)} (${escapeHtml(email)}).</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: emailSubject,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Resend error', res.status, data);
      return new Response(JSON.stringify({ error: 'Invio non riuscito. Riprova più tardi.' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('[send-contact-email]', e);
    return new Response(JSON.stringify({ error: 'Invio non riuscito. Riprova più tardi.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
