import { LogtoNextConfig, UserScope } from '@logto/next';

export const logtoConfig: LogtoNextConfig = {
  appId: process.env.LOGTO_APP_ID || 'w5kas9wezygqk269zu7hy',
  appSecret: process.env.LOGTO_APP_SECRET || 'A8UJwBqvxZ3jhKkoD1gAN5fsazUkfdKk',
  endpoint: process.env.LOGTO_ENDPOINT || 'https://logto-ag0gcw0swwkg088ssocw4g80.industriasgalgo.com/oidc',
  baseUrl: process.env.LOGTO_BASE_URL || 'https://emba.industriasgalgo.com',
  cookieSecret: process.env.LOGTO_COOKIE_SECRET || 'emba_secure_cookie_secret_32_chars_minimum_length_required',
  cookieSecure: process.env.NODE_ENV === 'production',
  scopes: [
    UserScope.Email,
    UserScope.Profile,
    UserScope.CustomData,
    UserScope.Identities,
  ],
  resources: process.env.LOGTO_RESOURCES?.split(',') || [],
};