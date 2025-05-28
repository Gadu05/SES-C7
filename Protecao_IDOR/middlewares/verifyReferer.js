require('dotenv').config();

const allowedReferers = [process.env.HOST];

function verifyReferer() {
  return function (req, res, next) {
    const referer = req.get('Referer');

    if (!referer) {
      return next(); // Permite navegação direta
    }

    const isValid = allowedReferers.some(domain => referer.startsWith(domain));

    if (isValid) {
      return next();
    } else {
      return res.status(403).send('Requisição bloqueada: origem não confiável.');
    }
  };
}


module.exports = verifyReferer;
