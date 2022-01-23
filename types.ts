import { NextApiRequest } from "next"
import { Database } from "./lib/db"

export interface RequestWithDb extends NextApiRequest {
  db: Database
}

// export interface RequestWithAuth extends NextApiRequest {
//   auth: {
//     accessToken: string
//     apiKey: string
//   }
// }

export interface Device {
  deviceId: string
  name: string
}

export interface User {
  userId: string
  email: string
  password: string
}
