import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/utils/prisma';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data } = req.body;

  const response = await prisma.execution.create({
    data,
  });

  res.json({
    data: response,
  });
}
