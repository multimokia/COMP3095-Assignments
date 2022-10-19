import { SignJWT, jwtVerify } from 'jose';

export default async function loginHandler(req, res) {
  const { username, password } = req.body;
  //call backend api to check if user exists and password is correct and return a token if it is correct

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour

  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(new TextEncoder().encode(process.env.SECRET_KEY));

  res.setHeader(
    'Set-Cookie',
    `token=${token}; path=/; expires=${new Date(exp * 1000).toUTCString()}; `
  );
  // res.setHeader('Authorization', `Bearer ${token}`, {
  //   path: '/',
  //   expires: new Date(exp * 1000).toUTCString(),
  //   httpOnly: true,
  // });
  // res.setHeader('authorization', `Bearer ${token}`);

  return res.status(200).json({ username, token });
}
