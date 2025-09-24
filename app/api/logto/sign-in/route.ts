import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const returnTo = request.nextUrl.searchParams.get('returnTo') || '/dashboard';

  // Simple redirect to Logto authorization endpoint
  const authUrl = `https://logto-ag0gcw0swwkg088ssocw4g80.industriasgalgo.com/oidc/auth?client_id=w5kas9wezygqk269zu7hy&redirect_uri=${encodeURIComponent('https://emba.industriasgalgo.com/callback')}&response_type=code&scope=openid%20profile%20email%20custom_data&state=${encodeURIComponent(returnTo)}`;

  redirect(authUrl);
}