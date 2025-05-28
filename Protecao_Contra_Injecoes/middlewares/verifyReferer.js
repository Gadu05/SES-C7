
function verifyReferer() {
  return function (req, res, next) {
    const referer = req.get('Referer');
    if (referer && referer.startsWith(process.env.HOST)) {
      next();
    } else {
      return res.status(403).send('Requisição bloqueada: origem não confiável.');
    }
  };
}

module.exports = verifyReferer;
