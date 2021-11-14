import jwt from 'jsonwebtoken';

const signToken = (name, password) => {
  return jwt.sign(
    {
      name: name,
      password: password,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    /// Bearer
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not supplied' });
  }
};

export { isAuth, signToken };
