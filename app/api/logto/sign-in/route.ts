import { redirect } from 'next/navigation';
import { handleSignIn } from '@logto/next/server-actions';
import { NextRequest } from 'next/server';
import { logtoConfig } from '@/lib/logto';

export async function GET(request: NextRequest) {
  const returnTo = request.nextUrl.searchParams.get('returnTo') || '/dashboard';

  return await handleSignIn({
    ...logtoConfig,
    returnTo,
  });
}