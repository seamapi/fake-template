import getNextJSFixture from ".nsm/get-server-fixture"
import getTestDatabase from "../fixtures/get-test-database"

export default async (t) => {
  const { db, seed } = await getTestDatabase(t)

  const sharedDbMw = (next) => (req, res) => {
    req.db = db
    return next(req, res)
  }

  const fixture = await getNextJSFixture(t, {
    middlewares: [sharedDbMw],
  })

  return {
    ...fixture,
    db,
    seed,
  }
}
