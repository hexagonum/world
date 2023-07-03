import { handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handleCallback(req, res);
  } catch (error) {
    res.status((error as any).status || 400).end((error as Error).message);
  }
};

export default callbackHandler;
