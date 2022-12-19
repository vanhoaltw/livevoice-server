import { Application, Request, Response, Router } from 'express'
import { UserModel } from '../models'

const routes = Router()

// REGISTER
routes.post('/register', async (req: Request, res: Response) => {
  try {
    const { password, email, username } = req.body || {}
    if (!password || !email || !username) {
      throw Error('MISSING PARAMS')
    }

    const user = await UserModel.query().findOne({ email })
    if (user) throw Error('USERNAME_OR_EMAIL_EXISTED')

    const newUser = await UserModel.query().insert({
      email,
      emailConfirmed: false,
      username,
      displayName: username,
      password: UserModel.generateHash(password),
    })

    if (!newUser) throw Error('USER NOT EXIST')
    const newUserValue = await UserModel.query().findById(newUser.id).patch({ lastActive: new Date() })
    return res
      .status(200)
      .json({ success: true, token: UserModel.jsonToToken({ email, password }), user: newUserValue })
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ success: false, code: 401, message: err.message })
    }
  }
})

// LOGIN
routes.post('/login', async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body
    if (!password || !email) throw Error('MISSING PARAMS')

    const user = await UserModel.query().findOne({ email })

    if (!user || !UserModel.validPassword(password, user.password)) {
      throw new Error('INVALID_USER')
    }
    await UserModel.query().findById(user?.id).patch({ lastActive: new Date() })
    return res.status(200).json({ success: true, token: UserModel.jsonToToken({ email, password }), user })
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ success: false, code: 401, message: err.message })
    }
  }
})

export default routes
