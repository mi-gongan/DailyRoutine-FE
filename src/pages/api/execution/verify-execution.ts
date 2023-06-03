import { ExecutionStatus } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { address, challengeId, status } = req.body;
  // const data = await prisma.execution.update({
  //   where: {
  //     account_challengeId: {
  //       account: address,
  //       challengeId,
  //     },
  //   },
  //   data: {
  //     status,
  //   },
  // });
  // return res.json(data);
}
