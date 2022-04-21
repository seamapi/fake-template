import getNextJSFixture from "../../../.nsm/get-server-fixture"
import getTestDatabase from "./get-test-database"

export default async (t) => {
  const { db, seed } = await getTestDatabase(t)

  const sharedDbMw = (next) => (req, res) => {
    req.db = db
    return next(req, res)
  }

  const fixture = await getNextJSFixture(t, {
    middlewares: [sharedDbMw],
  })

  // Here's how you might put an authorization header on every request
  // fixture.axios.defaults.headers.common.Authorization = `Bearer ${seed.apiKey}

  return {
    ...fixture,
    db,
    seed,
  }
}
