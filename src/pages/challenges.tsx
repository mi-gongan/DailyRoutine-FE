import { Box, Grid, Text } from '@chakra-ui/react';
import { Contract } from 'near-api-js';
import Head from 'next/head';
import React, { useCallback, useEffect } from 'react';
import { Categories, Navbar, Skeleton } from 'src/components/common';
import { AccountInfo, Card, MyChallenges } from 'src/components/home';
import { challengeList } from 'src/dummyData';
import useNear from 'src/hook/useNear';
import { CONTRACT_ID } from 'src/utils/contract';

export default function Challenges() {
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [myChallenges, setMyChallenges] = React.useState([]);
  const { account, accountId } = useNear();

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
        <title>Daily Routine</title>
      </Head>
      <Navbar />
      <Box
        pb={8}
        flex={1}
        overflowY="scroll"
        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        <AccountInfo />
        <MyChallenges challenges={myChallenges} />

        <Text mt="23px" px="20px" fontWeight={700} fontSize="24px">
          List
        </Text>
        <Categories />
        <Grid
          p="21px 20px 90px 20px"
          gridTemplateColumns="repeat(2, 1fr)"
          gap="32px 14px"
        >
          <Card {...challengeList[0]} deposit={totalAmount} />
          {challengeList.map((challenge, i) => {
            if (i === 0) return <></>;
            return (
              <div
                style={{ opacity: 0.5 }}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Card
                  key={`${challenge.id}-${i}`}
                  {...challenge}
                  disabled={true}
                />
              </div>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
