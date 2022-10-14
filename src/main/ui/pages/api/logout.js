export default async function logoutHandler(req, res) {
  res.setHeader(
    'Set-Cookie',
    'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httpOnly'
  );
  return res.redirect('/login');
}
