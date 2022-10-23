import { SignJWT, jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';

export default async function loginHandler(req, res) {
  // const { username, password } = req.body;
  const { token } = req.body;
  //call backend api to check if user exists and password is correct and return a token if it is correct

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // const iat = Math.floor(Date.now() / 1000);
  // const exp = iat + 60 * 60; // one hour

  // const token = await new SignJWT({ username })
  //   .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
  //   .setIssuedAt(iat)
  //   .setExpirationTime(exp)
  //   .sign(new TextEncoder().encode(process.env.SECRET_KEY));

  return res.status(200).json({ jwt: decoded });
}
