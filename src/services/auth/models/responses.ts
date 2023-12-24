export interface I_Response {
  data?: I_AuthResponse
}

export interface I_AuthResponse {
  accessToken?: string
  refreshToken?: string
  admin: I_Admin
}

export interface I_Admin {
  email: string
}
