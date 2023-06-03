import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { Contract, utils } from 'near-api-js';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { ChallengeInfo, RangeBar } from 'src/components/challenge';
import { Button, Header, Skeleton } from 'src/components/common';
import Modal from 'src/components/common/Modal';
import { color } from 'src/components/styles/colors';
import { challengeList } from 'src/dummyData';
import useNear from 'src/hook/useNear';
import { CONTRACT_ID } from 'src/utils/contract';
import { nearFormat } from 'src/utils/format';

export default function Participate() {
  const inputRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const { balance, accountId, account } = useNear();
  const [loading, setLoading] = useState(false);
  const { transactionHashes } = useRouter().query;

  useEffect(() => {
    if (transactionHashes) {
      router.push('/my-challenges');
    }
  }, [transactionHashes]);

  const challenge = challengeList[0];

  const handleClickJoin = async () => {
    if (!accountId || !account) return;
    const betAmount = inputRef.current.value;
    if (
      challenge.maxDeposits < betAmount ||
      challenge.minDeposits > betAmount
    ) {
      alert('Please enter the correct amount');
      return;
    }
    setLoading(true);
    const contract: any = new Contract(account, CONTRACT_ID, {
      changeMethods: ['participate'],
      viewMethods: [],
    });
    try {
      await contract.participate(
        {
          challenge_id: Number(id),
          value: Number(betAmount),
        },
        300000000000000,
        parseNearAmount(betAmount),
      );
      router.push('/my-challenges');
    } catch (e) {
      setLoading(false);
      return;
    }
  };
  return (
    <>
      {!loading ? (
        <>
          <Head>
            <title>Challenge: {challenge.title}</title>
          </Head>
          <Header title="Participating" returnUrl={`/challenge/${id}`} />
          <Box
            mt={16}
            position="relative"
            display="flex"
            flexDirection="column"
            flex={1}
          >
            <Box p="16px 20px">
              <Text fontWeight={700} fontSize="24px" lineHeight="30px">
                How much
                <br />
                would you like to deposit?
              </Text>
              <InputGroup mt="30px">
                <Input
                  type="number"
                  ref={inputRef}
                  h="70px"
                  focusBorderColor={color.primary}
                  fontWeight={800}
                  fontSize="40px"
                  borderRadius="14px"
                  border="1px solid #FFFFFF"
                  bg={color.background.main}
                  color={color.white}
                  sx={{
                    '&:focus': {
                      border: 'none',
                    },
                  }}
                />
                <InputRightElement
                  right="20px"
                  height="100%"
                  children={
                    <Text fontWeight={500} fontSize="20px">
                      Near
                    </Text>
                  }
                />
              </InputGroup>
              <Box
                mt="12px"
                mb="38px"
                p="4px 10px"
                bg="#0A1F33"
                borderRadius="4px"
                w="fit-content"
              >
                <Text fontSize="14px" lineHeight="17px">
                  Your balance :{' '}
                  {Number(balance) !== 0 ? nearFormat(balance) : '..'} Near
                </Text>
              </Box>
              <RangeBar
                min={challenge.minDeposits}
                max={challenge.maxDeposits}
                avg={challenge.average}
              />

              <Box
                mt="56px"
                p="19px 16px"
                bg={color.background.grey4}
                borderRadius="14px"
                lineHeight="20px"
                display="flex"
                flexDirection="column"
                gap="10px"
              >
                <Text color="#8C8C8C" fontWeight="500">
                  If you succeed 100%, you can receive the deposits of other
                  participants who were not successful.
                </Text>
                <Text color="#8C8C8C" fontWeight="500">
                  If you succeed 70%, you can receive a full refund of the
                  amount you deposited.
                </Text>
                <Text color="#8C8C8C" fontWeight="500">
                  If you succeed less than 70%, you will be eligible to receive
                  a refund of half the amount you deposited.
                </Text>
              </Box>
            </Box>

            <Box mt="auto" px="20px" pb="30px">
              <Button
                onClick={handleClickJoin}
                padding="16px 20px"
                h="fit-content"
                fontWeight="800"
                fontSize="24px"
                lineHeight="30px"
                borderRadius="21px"
              >
                Start the challenge!
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Skeleton />
        </>
      )}
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          router.push('/my-challenges');
        }}
      >
        <Text fontWeight="700" fontSize="24px" lineHeight="30px">
          This challenge
          <br />
          begins now!
          <br />
          Good luck! 🍀
        </Text>
        <Text mt="12px" fontSize="17px" lineHeight="24px">
          Start the challenge right away by completing the mission!
        </Text>
      </Modal> */}
    </>
  );
}
