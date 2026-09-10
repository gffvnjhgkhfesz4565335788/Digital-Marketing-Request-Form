import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // The environment variables FORM_TOKEN, API_BASE_URL, and FORM_ID
    // will be set in the Vercel project settings after deployment.
    const { FORM_TOKEN, API_BASE_URL, FORM_ID } = process.env;

    if (!FORM_TOKEN || !API_BASE_URL || !FORM_ID) {
        return NextResponse.json({ message: 'Environment variables are not set properly.' }, { status: 500 });
    }

    const backendResponse = await fetch(`${API_BASE_URL}/api/public/forms/${FORM_ID}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: FORM_TOKEN,
        data: data,
        email: data.email_address // Use the specific email field for contact creation
      }),
    });

    if (backendResponse.ok) {
      return NextResponse.json({ message: 'Submitted successfully.' });
    } else {
      const errorData = await backendResponse.json();
      return NextResponse.json({ message: errorData.message || 'Submission to backend failed.' }, { status: backendResponse.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'An internal error occurred.' }, { status: 500 });
  }
}