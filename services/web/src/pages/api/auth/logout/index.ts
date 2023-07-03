import { handleLogout } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const logoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handleLogout(req, res);
  } catch (error) {
    res.status((error as any).status || 400).end((error as Error).message);
  }
};

export default logoutHandler;
