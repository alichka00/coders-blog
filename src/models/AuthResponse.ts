export interface I_AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  admin: I_Admin;
}

export interface I_Admin {
  email: string;
}
