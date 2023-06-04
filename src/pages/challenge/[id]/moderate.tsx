import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { use, useCallback, useEffect, useState } from 'react';
import Header from 'src/components/common/Header';
import { color } from 'src/components/styles/colors';
import { challengeList, executions } from 'src/dummyData';
import CheckIcon from 'public/icons/ico-check.svg';
import Image from 'next/image';
import { reduceHashString } from 'src/utils';
import { Button } from 'src/components/common';
import { RejectModal } from 'src/components/moderate';
import axios from 'axios';
import { Execution, ExecutionStatus } from '@prisma/client';
import useNear from 'src/hook/useNear';
import { Contract } from 'near-api-js';
import { CONTRACT_ID } from 'src/utils/contract';
import { VerifyUnit } from 'src/pages/api/execution/verify-execution';
import { useRecoilState } from 'recoil';
import { tempVerfiedUnitsState } from 'src/recoil/tempVerfiedUnits';

export default function Moderate() {
  const router = useRouter();
  const { id, transactionHashes } = router.query;

  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const challenge = challengeList[0];
  const [verifiedUnits, setVerifiedUnits] = useState([]);
  const [tempVerifiedUnits, setTempVerifiedUnits] = useRecoilState<
    VerifyUnit[]
  >(tempVerfiedUnitsState);
  const { accountId, account } = useNear();

  const onConfirm = (val) => {
    if (current < executions.length - 1) setCurrent(current + 1);
    verify(executions[current], ExecutionStatus.rejected);
    setCurrent(current + 1);
    setIsModalOpen(false);
  };
  console.log(tempVerifiedUnits);
  const getExecution = useCallback(async () => {
    if (!id) return;
    const res = (
      await axios.get('/api/execution/get-pending-executions', {
        params: {
          challengeId: id,
        },
      })
    ).data;
    setExecutions(res);
  }, [id]);

  useEffect(() => {
    getExecution();
  }, [getExecution]);

  const verify = async (execution, status) => {
    if (!id) return;
    setTempVerifiedUnits([
      ...tempVerifiedUnits,
      {
        address: execution.account,
        challengeId: Number(id),
        count: execution.count,
        status,
      },
    ]);
    if (status === ExecutionStatus.success) {
      setVerifiedUnits([
        ...verifiedUnits,
        {
          challenge_id: Number(id),
          user: execution.account,
          index: Number(execution.count),
        },
      ]);
    }
  };

  const verifySubmit = async () => {
    const contract: any = new Contract(account, CONTRACT_ID, {
      changeMethods: ['verify'],
      viewMethods: [],
    });
    try {
      await contract.verify({
        moderator: accountId,
        verify_units: verifiedUnits,
      });
    } catch (e) {
      console.error(e);
      return;
    }
  };

  useEffect(() => {
    if (transactionHashes) {
      const main = async () => {
        await axios
          .post('/api/execution/verify-execution', {
            verifyUnits: tempVerifiedUnits,
          })
          .then((res) => {
            setTempVerifiedUnits([]);
            router.push('/challenges');
          });
      };
      main();
    }
  }, [transactionHashes]);

  return (
    <>
      <Head>
        <title>Moderate: {challenge.title}</title>
      </Head>
      <RejectModal
        isOpen={isModalOpen}
        onConfirm={onConfirm}
        setIsModalOpen={setIsModalOpen}
      />
      <Header title="verifying" returnUrl={`/challenge/${id}`} />
      {executions.length !== 0 && (
        <Box mt={16} bg={color.background.main} p="16px 20px" flex={1}>
          <Text
            as="h1"
            fontWeight="800"
            fontSize="26px"
            lineHeight="32px"
            dangerouslySetInnerHTML={{
              __html: challenge.title.replace(/\n/g, '<br/>'),
            }}
          />
          <Box as="ul" pt="7px">
            {[
              'It should contain elements that symbolize ETH Seoul.',
              'Photographing the sky is not allowed.',
              'Someone needs to come out',
            ].map((x) => (
              <Box
                as="li"
                key={x}
                mt="6px"
                display="flex"
                sx={{ listStyle: 'none' }}
              >
                <CheckIcon style={{ width: '24px' }} />
                <Text
                  flex={1}
                  fontWeight={500}
                  fontSize="17px"
                  lineHeight="24px"
                  color={color.text.tertiary}
                >
                  {x}
                </Text>
              </Box>
            ))}
          </Box>
          {current === executions.length ? (
            <Box mt="auto" pt="32px"></Box>
          ) : (
            <Box mt="auto" pt="32px">
              <Box
                pt="100%"
                position="relative"
                zIndex="2"
                bgImage={`url(${executions[current]?.imagePath})`}
                bgRepeat="no-repeat"
                bgSize="cover"
                bgPosition="center"
                borderRadius="16px"
                overflow="hidden"
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.3)"
              >
                <Box
                  p="4px 12px 12px 12px"
                  position="absolute"
                  bottom="0"
                  left="0"
                  display="flex"
                  alignItems="center"
                  w="100%"
                  bg="linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.67) 35%)"
                >
                  <Box
                    position="relative"
                    width="36px"
                    height="36px"
                    borderRadius="99px"
                    overflow="hidden"
                  >
                    <Image
                      alt="profile"
                      src="/images/dummy/dummy_nft.jpeg"
                      fill
                      sizes="100% auto"
                      objectFit="cover"
                    />
                  </Box>
                  <Text
                    ml="12px"
                    color={color.background.layer2}
                    fontWeight={500}
                    fontSize="21px"
                    lineHeight="26px"
                  >
                    {reduceHashString(executions[current]?.account, 7, 4)}
                  </Text>
                </Box>
              </Box>
              <Box
                position="relative"
                zIndex="1"
                mt="calc(-100% + 60px)"
                mx="20px"
                w="calc(100% - 40px)"
                pt="calc(100% - 40px)"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
                bg={color.black}
                borderRadius="16px"
              />
              <Box
                position="relative"
                zIndex="0"
                mt="calc(-100% + 100px)"
                mx="40px"
                w="calc(100% - 80px)"
                pt="calc(100% - 80px)"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
                bg={color.black}
                borderRadius="16px"
              />
            </Box>
          )}
          {current === executions.length ? (
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                width: '100%',
              }}
            >
              <Button
                onClick={() => {
                  verifySubmit();
                }}
                background={color.primary}
                h="60px"
                borderRadius="21px"
              >
                Submit
              </Button>
            </div>
          ) : (
            <Box
              mt="auto"
              pt="32px"
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap="14px"
              fontWeight={700}
              fontSize="24px"
              lineHeight="30px"
            >
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                background={color.reject}
                h="60px"
                borderRadius="21px"
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  setCurrent(current + 1);
                  verify(executions[current], ExecutionStatus.success);
                }}
                background={color.secondary}
                h="60px"
                borderRadius="21px"
              >
                Pass
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
