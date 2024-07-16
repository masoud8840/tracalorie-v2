module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((e) => {
    res.json({
      message: e.message,
      statusCode: e.statusCode,
      status: e.status,
    });
  });
};
