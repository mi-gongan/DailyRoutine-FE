import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react';
import { Button, Skeleton } from 'src/components/common';
import { color } from 'src/components/styles/colors';
import useNear from 'src/hook/useNear';
import { CONTRACT_ID } from 'src/utils/contract';
import { baseUri } from 'src/utils';

export default function Splash() {
  const router = useRouter();
  const [isBlur, setIsBlur] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { accountId, walletConnection } = useNear();
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (render && accountId) {
      router.push('/challenges');
    }

    setRender(true);
  }, [render, accountId]);

  useEffect(() => {
    setTimeout(() => {
      setIsBlur(true);
    }, 500);
  }, []);

  const handleConnectWallet = async () => {
    setIsLoading(true);
    if (!walletConnection) return;
    walletConnection.requestSignIn({
      contractId: CONTRACT_ID,
      methodNames: [], // optional
      successUrl: baseUri + '/challenges',
      failureUrl: baseUri,
    });
  };

  return (
    <>
      <Head>
        <title>Daily Routine</title>
      </Head>
      {!isLoading ? (
        <Box
          w="100%"
          h="100vh"
          bgImage="url(/images/background/bg-splash.png)"
          bgSize="min(100%, 500px) auto"
          bgPos="center"
          bgRepeat="no-repeat"
        >
          <Box
            w="100%"
            h="100vh"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            transition="backdrop-filter 3s"
            {...(isBlur && {
              backdropFilter: 'blur(10px)',
            })}
          >
            <Box m="auto">
              <Image
                alt="splash"
                src="/images/splash.svg"
                width={310}
                height={151}
              />
              <Text
                mt="16px"
                fontSize="19px"
                lineHeight="1.5"
                letterSpacing="1%"
                textAlign="center"
                opacity={isBlur ? 1 : 0}
                transition="opacity 3s"
              >
                Build healthy habits and achieve
                <br />
                your goals with Daily Routine
              </Text>
            </Box>
            <Box px="20px" mb="34px" w="100%">
              <Button
                onClick={handleConnectWallet}
                p="16px 20px"
                borderRadius="15px"
                h="fit-content"
                fontWeight={700}
                fontSize="22px"
                lineHeight="27px"
                color={color.background.main}
              >
                Connect the wallet
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
