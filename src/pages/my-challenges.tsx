import { Box, Text, useAccordion } from '@chakra-ui/react';
import { Execution } from '@prisma/client';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { ChallengeInfo } from 'src/components/challenge';
import { Header } from 'src/components/common';
import { Board } from 'src/components/my-challenges';
import { color } from 'src/components/styles/colors';
import { challengeList } from 'src/dummyData';

export default function MyChallenges() {
  const router = useRouter();
  const [execution, setExecution] = useState(null);
  const [load, setLoad] = useState(false);
  const [bettingAmount, setBettingAmount] = useState(0);

  return (
    <>
      <Head>
        <title>Participating Challenges</title>
      </Head>
      <Header title="My Challenges" returnUrl="/challenges" />
      <Box mt={16} p="12px 20px 60px 20px">
        <Board
          inprogress={bettingAmount ? 1 : 0}
          finished={0}
          successRate={load ? (execution ? '100' : '0') : '...'}
        />
        <Text mt="42px" fontWeight="700" fontSize="18px" lineHeight="22px">
          My challenges list
        </Text>
        {bettingAmount !== 0 ? (
          <Box mt="12px" display="grid" gap="16px">
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
          <></>
        )}
      </Box>
    </>
  );
}
