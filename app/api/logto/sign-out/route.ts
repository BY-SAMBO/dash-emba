import { logtoClient } from '@/lib/logto';
import { redirect } from 'next/navigation';

export async function GET() {
  const { url, newCookie } = await logtoClient.handleSignOut(
    'https://emba.industriasgalgo.com'
  );

  const response = redirect(url);

  if (newCookie) {
    response.headers.append('Set-Cookie', newCookie);
  }

  return response;
}