export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: any;
  session?: any;
}

export interface UserSession {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: any;
}
