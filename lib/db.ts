import { Device, User } from "../types"

export interface DatabaseState {
  deviceCount: number
  userCount: number
  devices: Array<Device>
  users: Array<User>
}
export interface Database {
  state: DatabaseState
  addDevice: (user: User, device: Partial<Device>) => Promise<Device>
  addUser: (user: Partial<User>) => Promise<User>
  update: () => Promise<any>
}

export const createDb = async ({
  state: defaultState,
}: any = {}): Promise<Database> => {
  const db: any = {}
  db.state = defaultState || {
    deviceCount: 0,
    userCount: 0,
    devices: [],
    users: [],
  }

  async function addDevice(user: User, device: Partial<Device>) {
    const deviceCount = ++db.state.deviceCount
    db.state.devices.push({
      deviceId: `device-${deviceCount}`,
      ...device,
    })

    return db.state.devices[db.state.devices.length - 1]
  }

  async function addUser(user: Partial<User>) {
    db.state.users.push({
      userId: `user-${++db.state.userCount}`,
      ...user,
    })

    return db.state.users[db.state.users.length - 1]
  }

  // update any time-related tasks
  async function update() {}

  db.addDevice = addDevice
  db.addUser = addUser
  db.update = update

  return db
}

let globalDb
export const getGlobalDb = async (): Promise<Database> => {
  if (!globalDb) globalDb = await createDb()
  return globalDb
}

export const setGlobalDb = (db: Database) => {
  globalDb = db
}
