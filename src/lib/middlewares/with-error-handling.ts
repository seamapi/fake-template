export const withErrorHandling = (next) => async (req, res) => {
  try {
    return await next(req, res)
  } catch (e: any) {
    res.status(500).json({
      message: e.toString(),
      stack: e.stack,
    })
  }
}

export default withErrorHandling
