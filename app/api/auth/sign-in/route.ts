import { redirect } from 'next/navigation';
import { logtoClient } from '@/lib/logto';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const returnTo = searchParams.get('returnTo') || '/dashboard';

  const { url, newCookie } = await logtoClient.handleSignIn(
    returnTo,
    ['profile', 'email', 'custom_data']
  );

  const response = redirect(url);

  if (newCookie) {
    response.headers.append('Set-Cookie', newCookie);
  }

  return response;
}