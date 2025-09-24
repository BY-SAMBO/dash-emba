import { LogtoNextConfig, UserScope } from '@logto/next';

export const logtoConfig: LogtoNextConfig = {
  endpoint: process.env.LOGTO_ENDPOINT || 'https://logto-ag0gcw0swwkg088ssocw4g80.industriasgalgo.com/oidc',
  appId: process.env.LOGTO_APP_ID || 'w5kas9wezygqk269zu7hy',
  appSecret: process.env.LOGTO_APP_SECRET || 'A8UJwBqvxZ3jhKkoD1gAN5fsazUkfdKk',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://emba.industriasgalgo.com',
  cookieSecret: process.env.LOGTO_COOKIE_SECRET || 'complex_random_string_at_least_32_characters_long_for_security_purposes',
  cookieSecure: process.env.NODE_ENV === 'production',
  scopes: [
    UserScope.Profile,
    UserScope.Email,
    UserScope.CustomData,
    UserScope.Identities
  ],
};

// Removed LogtoClient - not needed for server-side operations

export interface UserInfo {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  username?: string;
  picture?: string;
  custom_data?: {
    team?: string;
    role?: string;
    [key: string]: any;
  };
}

export interface TeamData {
  id: string;
  name: string;
  description?: string;
  members?: string[];
  settings?: Record<string, any>;
}