import { NextResponse } from 'next/server';

export default function registerHandler(req, res) {
  const { username, password, confirmPassword } = req.body;

  //this should call the backend and persist the data, return a truthy value if successful and falsy if not

  if (confirmPassword != password) {
    return res.status(403).json({ error: 'Password does not match' });
  } else {
    req.success = 'truth';

    return res.status(200).json(req.success);
  }
}
