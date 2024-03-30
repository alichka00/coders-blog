import { I_Admin } from 'services/admins/models/responses'

export type T_AdminForm = Pick<I_Admin, 'email'> & {
  password: string | number
  confirm: string | number
}

export type T_AdminRecord = I_Admin & {
  key: number
}
