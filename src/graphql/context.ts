import { UserModel } from '../models'

export interface MyContext {
  me?: UserModel
  clientIp?: string
}
