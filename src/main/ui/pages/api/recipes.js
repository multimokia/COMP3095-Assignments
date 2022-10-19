import path from 'path';
import { promises as fs } from 'fs';

export default async function recipesHandler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + '/recipes.json',
    'utf8'
  );

  res.status(200).json(JSON.parse(fileContents));
}
