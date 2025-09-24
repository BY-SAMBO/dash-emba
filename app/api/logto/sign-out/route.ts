import { handleSignOut } from '@logto/next/server-actions';
import { logtoConfig } from '@/lib/logto';

export async function GET() {
  return await handleSignOut({
    ...logtoConfig,
    returnTo: 'https://emba.industriasgalgo.com',
  });
}