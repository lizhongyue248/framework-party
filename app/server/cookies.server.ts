import { createCookie } from '@remix-run/node'

export const applicationConfig = createCookie("application-config", {
  maxAge: 60 * 60 * 24 * 365 * 10
})
