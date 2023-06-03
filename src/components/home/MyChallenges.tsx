import { Box, Grid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { challengeList } from 'src/dummyData';
import { EmptyBox } from '../common';
import { color } from '../styles/colors';

export default function MyChallenges({ challenges }) {
  const router = useRouter();
  return (
    <Box mt="25px" px="20px">
      <Box mb="12px" display="flex" alignItems="center">
        <Text mr="auto" fontWeight="700" fontSize="22px">
          My challenge
        </Text>

        <Link href="/my-challenges">
          <Text
            px="4px"
            color={color.primary}
            fontWeight="600"
            fontSize="15px"
            lineHeight="1"
          >
            view more
          </Text>
        </Link>
      </Box>
      {challenges.length !== 0 ? (
        <Grid gap="14px" gridTemplateColumns="repeat(3, 1fr)">
          {challenges.map((x, i) => (
            <Box
              // onClick={() => router.push(`challenge/${x.id}`)}
              onClick={() => router.push(`/my-challenges`)}
              position="relative"
              width="100%"
              pt="100%"
              borderRadius="12px"
              overflow="hidden"
            >
              <Image alt={`my-challenge-${i}`} src={x.image} fill />
            </Box>
          ))}
          {/* <Box
            my="auto"
            ml="10px"
            p="8px"
            w="32px"
            h="32px"
            bg={color.background.grey5}
            borderRadius="7px"
            onClick={() => {
              alert('No additional challenges are available at this time');
            }}
          >
            <Image
              alt="plus-icon"
              src="/icons/ico-plus.svg"
              width="16"
              height="16"
            />
          </Box> */}
        </Grid>
      ) : (
        <EmptyBox>
          No record of
          <br />
          challenge participation
        </EmptyBox>
      )}
    </Box>
  );
}
