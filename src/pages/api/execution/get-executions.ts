import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { challengeId } = req.query;
  const data = await prisma.execution.findMany({
    where: {
      challengeId: String(challengeId),
    },
  });
  return res.json(data);
}
