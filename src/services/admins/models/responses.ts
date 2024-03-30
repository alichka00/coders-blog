export interface I_Admin {
  id: number
  email: string
  createdAt: string
  updatedAt: string
}

export interface I_ResponseAdmins {
  data: I_Admin[]
}

export interface I_ResponseAdmin {
  data: I_Admin
}
