import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if(req.method == 'POST') {
    let hash = await bcrypt.hash(req.body.password, 10)
    req.body.password = hash;

    const db = (await connectDB).db('test');
    let result = await db.collection('user_cred').insertOne(req.body);
    return res.redirect(302, '/');
  }
}