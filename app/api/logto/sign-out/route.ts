import { redirect } from 'next/navigation';

export async function GET() {
  // Simple redirect to Logto logout endpoint
  const logoutUrl = `https://logto-ag0gcw0swwkg088ssocw4g80.industriasgalgo.com/oidc/session/end?post_logout_redirect_uri=${encodeURIComponent('https://emba.industriasgalgo.com')}`;
  redirect(logoutUrl);
}