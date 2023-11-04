// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import os from 'os';
import fs from 'fs';
import path from 'path';
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log("home directory:" + getUserHome()); 
  console.log("temp directory:" + os.tmpdir()); 
  var dir = path.resolve(os.tmpdir(), 'credentials');
  console.log("temp directory:" + dir);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.resolve(dir, 'test.txt'), 'test');
  const result = fs.readFileSync(path.resolve(dir, 'test.txt'), 'utf-8');

  res.status(200).json({ name: result });
}
  
function getUserHome() { 
      
    // From process.env 
    return process.env[(process.platform == 'win32') 
            ? 'USERPROFILE' : 'HOME']; 
} 