import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/plants');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
};