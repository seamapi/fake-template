export default (req, res) => {
  res.status(200).json({
    status: "ok",
    note: "this is not part of the [insert manufacturer name] api",
  })
}
