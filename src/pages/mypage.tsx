import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BottomGnb } from "src/components/common";
import { HabitsHistory, NftList, Tabs } from "src/components/mypage";
import { color } from "src/components/styles/colors";
import { myNfts, mypageHistories } from "src/dummyData";

export default function Mypage() {
  const router = useRouter();
  const { tab } = router.query;
  return (
    <>
    <Head>
      <title>Mypage</title>
    </Head>
    <Box pb="120px" position="relative" bg={color.background.main} flex={1}>
      <Box mt="40px" display="flex" flexDirection="column" alignItems="center">
        <Image
          alt="profile"
          src="/images/dummy/dummy_nft.jpeg"
          width={70}
          height={70}
          style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: '99px',
            border: `3px solid ${color.secondary}`
          }}
        />
        <Box
          mt="-35px" 
          mb="-22px"
          p="70px 20px" 
          w="100%"
          textAlign="center"
          bg="url(/images/background/bg-mypage.png)"
          bgSize="cover"
          bgRepeat="no-repeat"
        >
          <Text
            fontWeight={700}
            fontSize="20px"
            lineHeight="1"
            color={color.primary}
          >
            Total winnings
          </Text>
          <Box mt="16px" display="flex" alignItems="center" justifyContent="center">
            <Image
              alt="ethereum"
              src="/icons/ico-eth.svg"
              width={48}
              height={54}
            />
            <Text
              ml="12px"
              fontWeight={800}
              fontSize="47px"
              lineHeight="1"
            >
              371.24
            </Text>
            <Text
              ml="12px"
              fontWeight={800}
              fontSize="25px"
              lineHeight="1"
            >
              ETH
            </Text>
          </Box>
        </Box>
        <Tabs/>
        <Box w="100%" mt="32px" px="20px">
          {tab !== 'history' && (
            <NftList nftList={myNfts} />
          )}
          {tab !== 'nft' && (
            <HabitsHistory histories={mypageHistories} />
          )}
        </Box>
      </Box>
      <BottomGnb current="Mypage"/>
    </Box>
    </>
  );
};
