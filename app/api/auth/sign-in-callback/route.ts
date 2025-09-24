import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { logtoClient } from '@/lib/logto';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const { redirectUrl, newCookie } = await logtoClient.handleSignInCallback(
      request.url
    );

    const response = redirect(redirectUrl);

    if (newCookie) {
      response.headers.append('Set-Cookie', newCookie);
    }

    return response;
  } catch (error) {
    console.error('Sign-in callback error:', error);
    return redirect('/login?error=callback_failed');
  }
}