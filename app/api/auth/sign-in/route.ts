import { signIn } from '@logto/next/server-actions';
import { logtoConfig } from '@/lib/logto';

export async function GET() {
  return await signIn(logtoConfig, `${logtoConfig.baseUrl}/api/auth/callback`);
}