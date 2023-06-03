import { ExecutionStatus } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/utils/prisma';

export interface VerifyUnit {
  address: string;
  challengeId: number;
  status: ExecutionStatus;
  count: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { verifyUnits } = req.body;
  for (let i = 0; i < verifyUnits.length; i++) {
    const verifyUnit = verifyUnits[i] as VerifyUnit;
    await prisma.execution.update({
      where: {
        account_challengeId_count: {
          account: verifyUnit.address,
          challengeId: String(verifyUnit.challengeId),
          count: verifyUnit.count,
        },
      },
      data: {
        status: verifyUnit.status,
      },
    });
  }

  return res.json({ success: true });
}
