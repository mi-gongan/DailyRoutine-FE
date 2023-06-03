import { Box, Text, useAccordion } from '@chakra-ui/react';
import { Execution } from '@prisma/client';
import axios from 'axios';
import { Contract } from 'near-api-js';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { ChallengeInfo } from 'src/components/challenge';
import { EmptyBox, Header } from 'src/components/common';
import { Board } from 'src/components/my-challenges';
import { color } from 'src/components/styles/colors';
import { challengeList } from 'src/dummyData';
import useNear from 'src/hook/useNear';
import { CONTRACT_ID } from 'src/utils/contract';

export default function MyChallenges() {
  const router = useRouter();
  const [execution, setExecution] = useState(null);
  const [load, setLoad] = useState(false);
  const { accountId, account } = useNear();
  const [myChallenges, setMyChallenges] = useState([]);

  const getExecution = useCallback(async () => {
    if (!accountId) return;
    const res: Execution[] = (
      await axios.get('/api/execution/get-my-executions', {
        params: {
          challengeId: challengeList[0].id,
          account: accountId,
        },
      })
    ).data;
    setExecution(res[0]);
  }, [accountId]);

  useEffect(() => {
    getExecution();
  }, [getExecution]);

  const getMyChallenges = useCallback(async () => {
    if (!account || !accountId) return;
    const contract: any = new Contract(account, CONTRACT_ID, {
      changeMethods: [],
      viewMethods: ['get_participated_challenge_ids'],
    });
    if (!contract) return;
    const res = await contract.get_participated_challenge_ids({
      account_id: accountId,
    });

    setMyChallenges(
      res.map((id) => {
        return {
          image: '/images/dummy/challenges/challenge_ethseoul_1x1.png',
        };
      }),
    );
  }, [account, accountId]);
  console.log(myChallenges);
  useEffect(() => {
    getMyChallenges();
  }, [getMyChallenges]);

  return (
    <>
      <Head>
        <title>Participating Challenges</title>
      </Head>
      <Header title="My Challenges" returnUrl="/challenges" />
      <Box mt={16} p="12px 20px 60px 20px">
        <Board
          inprogress={myChallenges.length}
          finished={0}
          successRate={load ? (execution ? '100' : '0') : '...'}
        />
        <Text mt="42px" fontWeight="700" fontSize="18px" lineHeight="22px">
          My challenges list
        </Text>
        <br />
        {myChallenges.length !== 0 ? (
          <Box mt="" display="grid" gap="16px">
            <Box
              key={challengeList[0].id}
              position="relative"
              onClick={() =>
                router.push(`/challenge/${challengeList[0].id}/verify`)
              }
            >
              <ChallengeInfo
                {...challengeList[0]}
                p="16px 12px"
                borderRadius="16px"
                bgColor={color.background.grey4}
              />
              <Image
                alt="chevron-right"
                src="/icons/ico-chevron-right.svg"
                width="12"
                height="17"
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '13px',
                }}
              />
            </Box>
          </Box>
        ) : (
          <EmptyBox>No challenges</EmptyBox>
        )}
      </Box>
    </>
  );
}
