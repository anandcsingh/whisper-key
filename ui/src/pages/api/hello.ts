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

  
  fs.writeFileSync(path.resolve(dir, `test${new Date().getMilliseconds()}.txt`), 'test');
  //const result = fs.readFileSync(path.resolve(dir, 'test.txt'), 'utf-8');
  let fileResult = '';
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      fileResult += ` ${file}`;
    });
  });
  res.status(200).json({ name: fileResult });
}
  
function getUserHome() { 
      
    // From process.env 
    return process.env[(process.platform == 'win32') 
            ? 'USERPROFILE' : 'HOME']; 
} 