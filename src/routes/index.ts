import { Router } from 'express'
import Auth from './auth'
import Upload from './upload'

const routes = Router()

routes.use('/auth', Auth)
routes.use('/upload', Upload)

export default routes
