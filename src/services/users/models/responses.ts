export interface I_User {
  id: number
  username: string
  avatar: string
  email: string
  from: string
  createdAt: string
  updatedAt: string
}

export interface I_ResponseUsers {
  data: I_User[]
}

export interface I_ResponseUser {
  data: I_User
}
