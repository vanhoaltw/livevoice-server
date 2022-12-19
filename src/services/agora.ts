import { AudienceRole } from './../generated/graphql'
import config from '../settings/env'
import { RtcRole, RtcTokenBuilder } from 'agora-access-token'

export const generateRTCToken = (
  channelName: string,
  uid: number,
  role = RtcRole.PUBLISHER | RtcRole.SUBSCRIBER,
  expiry = 3600
) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const privilegeExpireTime = currentTime + expiry

  const token = RtcTokenBuilder.buildTokenWithUid(
    config.AGORA.APP_ID,
    config.AGORA.APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  )

  return token
}
