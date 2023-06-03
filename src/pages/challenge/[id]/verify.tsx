import { Box, Text, useAccordion } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react';
import { Header, Loading } from 'src/components/common';
import { Executions, ImageUpload } from 'src/components/challenge';
import { color } from 'src/components/styles/colors';
import { challengeList } from 'src/dummyData';
import uploadImage from 'src/utils/uploadImage';
import Chevron from 'public/icons/ico-chevron-right-teritary.svg';
import Image from 'next/image';
import parse from 'html-react-parser';
import dayjs from 'dayjs';
import { Progress } from 'src/components/challenge/Executions.style';
import axios from 'axios';
import { Execution } from '@prisma/client';
import { ExecutionType } from 'src/types';
import Modal from 'src/components/common/Modal';
import useNear from 'src/hook/useNear';

export default function Verify() {
  const router = useRouter();
  const { id } = router.query;
  const [execution, setExecution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accountId } = useNear();
  const [executions, setExecutions] = useState<ExecutionType[]>([]);

  const getExecutions = async () => {
    const res: ExecutionType[] = (
      await axios.get('/api/execution/get-executions', {
        params: {
          challengeId: id,
        },
      })
    ).data;

    setExecutions(res);
  };

  useEffect(() => {
    if (!accountId) return;
    getExecutions();
  }, [accountId]);

  const getExecution = async () => {
    const res: Execution[] = (
      await axios.get('/api/execution/get-my-executions', {
        params: {
          challengeId: id,
          account: accountId,
        },
      })
    ).data;

    setExecution(res[0]);
  };

  useEffect(() => {
    if (!accountId || !id) return;
    getExecution();
  }, [id, accountId]);

  const challenge = challengeList[0];

  const onSubmit = async (file: File) => {
    if (file) {
      setIsLoading(true);
      const img = await uploadImage(file);
      await axios
        .post('/api/execution', {
          data: {
            imagePath: img,
            imageName: file.name,
            account: accountId,
            challengeId: id,
            count: 0,
            status: 'pending',
          },
        })
        .then(function (response) {
          const data = response.data.data;
          setIsLoading(false);
          setExecution(data);
          setIsModalOpen(true);
        })
        .catch(function (error) {
          setIsLoading(false);
          console.warn(error);
        });
    }
  };
  return (
    <>
      <Head>
        <title>Verify: {challenge.title}</title>
      </Head>
      <Loading isLoading={isLoading} />
      <Header
        title="Verify"
        returnUrl={`/my-challenges`}
        background={color.background.main}
      />
      <Box
        pt={16}
        position="relative"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        <Box p="28px 20px 26px 20px" bg={color.background.main}>
          <Box display="flex" alignItems="center" gap="8px">
            <Image
              alt="organizer"
              src={challenge.organizer.image}
              width="36"
              height="36"
            />
            <Text fontWeight={600} fontSize="18px" lineHeight="1">
              {challenge.organizer.name}
            </Text>
          </Box>
          <Text mt="14px" fontWeight="700" fontSize="26px" lineHeight="32px">
            {parse(challenge.title.replace(/\n/g, '<br/>'))}
          </Text>
          <Text
            color={color.text.grey6}
            fontWeight="500"
            sx={{
              '& span': { color: color.primary },
            }}
          >
            Start on{' '}
            <span>{dayjs(challenge.startDate).format('MMMMM DD, YYYY')}</span>
          </Text>
        </Box>
        <Box p="27px 20px 32px 20px">
          <Box>
            <Box display="flex" alignItems="center">
              <Text fontWeight={800} fontSize="20px" lineHeight="25px">
                Mine
              </Text>
              {/* <Box
                onClick={() => router.push(`/challenge/${id}/my-history`)}
                ml="auto"
                display="flex"
                alignItems="center"
              >
                <Text fontWeight={600} color={color.text.tertiary}>
                  View History
                </Text>
                <Chevron />
              </Box> */}
            </Box>
            <ImageUpload
              timeLeft={challenge.timeLeft}
              onSubmit={onSubmit}
              execution={execution}
            />
            <Box
              mt="24px"
              width="100%"
              h="1px"
              borderRadius="99px"
              bg="#4A4A4A"
            />
          </Box>

          <Box mt="35px">
            <Text fontWeight={800} fontSize="20px" lineHeight="25px">
              Other participants
            </Text>
            <Text mt="20px" fontWeight={600} fontSize="17px" lineHeight="21px">
              Today's success rate
            </Text>
            <Text
              mt="2px"
              mb="6px"
              fontWeight={500}
              fontSize="17px"
              lineHeight="21px"
              color={color.primary}
            >
              {Math.floor(
                executions.length + (1 / (executions.length + 11)) * 100,
              )}
              %
            </Text>
            <Progress
              max="100"
              value={Math.floor(
                executions.length + (1 / (executions.length + 11)) * 100,
              )}
            />
            <Box mt="28px" />
            <Executions executions={executions} />
            <Box mt="100px" />
          </Box>
        </Box>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Text fontWeight="700" fontSize="24px" lineHeight="30px">
          Upload success! 😎
        </Text>
        <Text mt="12px" fontSize="17px" lineHeight="24px">
          Please wait a moment until the moderator verifies your photo! If the
          authentication is successful, you will receive money and NFT as
          rewards!
        </Text>
        <Box mt="21px" mb="16px" width="100%" textAlign="center">
          <Image
            alt="modal-image"
            src="/images/modal/modal-image-2.png"
            width="173"
            height="167"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
        </Box>
      </Modal>
    </>
  );
}
