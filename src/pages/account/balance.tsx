import { Box, Grid, Text } from '@chakra-ui/react';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { EmptyBox, Navbar } from 'src/components/common';
import { challengeList } from 'src/dummyData';
import useNear from 'src/hook/useNear';
import { nearFormat } from 'src/utils/format';

const DynamicTokens = dynamic(() => import('src/components/balance/Tokens'), {
  ssr: false,
});

export default function BalancePage() {
  const { balance } = useNear();
  const nfts = [];
  return (
    <>
      <Head>
        <title>Balance: Daily Routine</title>
      </Head>
      <Navbar />
      <Box px="20px">
        <Text mt="4px" fontWeight={700} fontSize="24px" lineHeight="1">
          Your balance
        </Text>

        <DynamicTokens
          tokens={[
            {
              network: 'Near',
              unit: 'NEAR',
              image: '/images/token/Near.svg',
              balance: nearFormat(balance),
            },
          ]}
        />

        <Text
          mt="38px"
          mb="20px"
          fontWeight={700}
          fontSize="22px"
          lineHeight="1"
        >
          NFT
        </Text>

        {nfts.length !== 0 ? (
          <Grid gridTemplateColumns="repeat(3, 1fr)" gap="8px" mb="40px">
            {nfts.map((nft, i) => (
              <Box
                key={`challenge-${i}`}
                position="relative"
                width="100%"
                pt="100%"
              >
                <Image
                  alt={nft.tokenId}
                  src={nft.image}
                  fill
                  style={{ borderRadius: '8px' }}
                />
              </Box>
            ))}
          </Grid>
        ) : (
          <EmptyBox>No NFTs in possession</EmptyBox>
        )}
      </Box>
    </>
  );
}
