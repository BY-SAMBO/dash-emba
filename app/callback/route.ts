import { handleSignIn } from '@logto/next/server-actions';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { logtoConfig } from '@/lib/logto';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    await handleSignIn(logtoConfig, searchParams);
    redirect('/dashboard');
  } catch (error) {
    console.error('Sign-in callback error:', error);
    redirect('/?error=callback-failed');
  }
}