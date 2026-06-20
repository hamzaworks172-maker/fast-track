import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  let body: Record<string, string>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, phone, subject, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  try {
    // Store in Supabase as a log/backup
    const supabase = createServiceClient()
    await supabase.from('contact_submissions').insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      subject: subject?.trim() || null,
      message: message.trim(),
    })
  } catch {
    // Non-fatal — still attempt email delivery
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const toEmail = process.env.CONTACT_FORM_TO_EMAIL!
    const displaySubject = subject?.trim() || 'General Enquiry'

    await transporter.sendMail({
      from: `"Fast Track Food Stuff LLC" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email.trim(),
      subject: `[Contact Form] ${displaySubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1B5E3A; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #D9A441; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Fast Track Food Stuff LLC</p>
          </div>
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280; width: 100px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; font-size: 14px; color: #1F1F1F; font-weight: 600;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; font-size: 14px; color: #1F1F1F;"><a href="mailto:${escapeHtml(email)}" style="color: #1B5E3A;">${escapeHtml(email)}</a></td>
              </tr>
              ${phone ? `<tr><td style="padding: 8px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Phone</td><td style="padding: 8px 0; font-size: 14px; color: #1F1F1F;">${escapeHtml(phone)}</td></tr>` : ''}
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Subject</td>
                <td style="padding: 8px 0; font-size: 14px; color: #1F1F1F;">${escapeHtml(displaySubject)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Message</td>
                <td style="padding: 8px 0; font-size: 14px; color: #1F1F1F; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>
            </table>
            <p style="margin: 20px 0 0; font-size: 12px; color: #9ca3af;">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}
