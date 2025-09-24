import { handleSignIn } from '@logto/next/server-actions';
import { logtoConfig } from '@/lib/logto';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    await handleSignIn(logtoConfig, searchParams);
  } catch (error) {
    console.error('Callback error:', error);
    redirect('/?error=callback-failed');
  }

  redirect('/dashboard');
}