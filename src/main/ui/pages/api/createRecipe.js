export default function createRecipeHandler(req, res) {
  const { name, steps } = req.body;

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  //   const token = req.cookies.get('token');

  //this should call the backend and persist the data, return a truthy value if successful and falsy if not

  return res.status(200).json(authHeader);
}
