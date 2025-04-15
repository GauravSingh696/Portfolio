import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { name, phone, email, query } = await request.json();

    const msg = {
      to: 'gauravsingh033950@gmail.com',
      from: email, // Replace with your verified sender email
      subject: 'New Contact Form Submission',
      text: `Hi Gaurav,

You've received a new contact request. Here are the details:

Name: ${name}
Phone: ${phone}
Email: ${email}
Query: ${query}

Best regards,
Your Website Contact Form`,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 