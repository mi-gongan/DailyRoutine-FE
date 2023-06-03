import {
  Box,
  Grid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { EmptyBox, Header } from 'src/components/common';
import { challengeList } from 'src/dummyData';
import { color } from 'src/components/styles/colors';
import { Executions } from 'src/components/challenge';
import useNear from 'src/hook/useNear';

export default function MyHistory() {
  const { accountId } = useNear();
  const router = useRouter();
  const { id } = router.query;
  const [executions, setExecutions] = useState([]);

  const challenge = challengeList[0];

  useEffect(() => {
    if (accountId && id) {
      axios
        .get('/api/execution/get-my-executions', {
          params: {
            challengeId: id,
            account: accountId,
          },
        })
        .then((res) => {
          setExecutions(res.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [id, accountId]);

  return (
    <>
      <Head>
        <title>My History: {challenge.title}</title>
      </Head>
      <Header title="My History" returnUrl={`/challenge/${id}/verify`} />
      <Box mt={16} p="16px 20px">
        <Text fontWeight={700} fontSize="24px" lineHeight="30px">
          {executions.length > 0 ? (
            <>
              Congratulations on
              <br />
              achieving 100% success!
            </>
          ) : (
            <>
              There is no record of
              <br />
              verification yet.
            </>
          )}
        </Text>
        <Text
          mt="22px"
          fontWeight={800}
          fontSize="24px"
          lineHeight="30px"
          color={color.primary}
        >
          {executions.length > 0 ? 100 : 0}%
        </Text>

        <Slider
          value={executions.length > 0 ? 100 : 4}
          min={0}
          max={100}
          mt="4px"
        >
          <SliderTrack h="11px" borderRadius="99px" bg={color.background.grey6}>
            <SliderFilledTrack borderRadius="99px" bg={color.primary} />
          </SliderTrack>
          <SliderThumb
            w="26px"
            h="26px"
            bg={color.primary}
            border="4px solid #fff"
            pointerEvents="none"
          />
        </Slider>
        <Text
          mt="32px"
          mb="18px"
          fontWeight={800}
          fontSize="20px"
          lineHeight="25px"
        >
          My pictures
        </Text>
        {executions.length > 0 ? (
          <Executions executions={executions} />
        ) : (
          <EmptyBox>No picture</EmptyBox>
        )}
      </Box>
    </>
  );
}
