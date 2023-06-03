import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { challengeId, account } = req.query;
  const data = await prisma.execution.findMany({
    where: {
      challengeId: String(challengeId),
      account: String(account),
    },
  });
  return res.json(data);
}
