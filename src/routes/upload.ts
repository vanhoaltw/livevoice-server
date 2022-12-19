import { Request, Response, Router } from 'express'
import multer from 'multer'
import axios from 'axios'

const IMGBB_KEY = 'bf9c4d05da8a8720af92ce0d42404b80'
function uploadEndpoint() {
  const upload = multer({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  })
  console.log({ upload })
  const uploadFileMiddleware = upload.single('image')
  return uploadFileMiddleware
}

const routes = Router()

routes.post('/image', uploadEndpoint(), async (req: Request, res: Response) => {
  const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, req.body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (response?.data?.status === 200) {
    res.status(200).json({ success: true, data: response?.data?.data?.display_url })
  } else {
    res.status(response?.data?.status).json(response?.data)
  }
})

export default routes
