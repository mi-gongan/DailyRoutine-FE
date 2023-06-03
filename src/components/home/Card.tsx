import React from 'react';
import { Box, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { color } from '../styles/colors';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { ChallengeType } from 'src/types';
import parse from 'html-react-parser';

export default function Card({
  deposit,
  title,
  image,
  startDate,
  endDate,
  hashtags,
  disabled = false,
}: ChallengeType) {
  const router = useRouter();
  return (
    <GridItem
      onClick={() =>
        !disabled &&
        router.push(`challenge/${String(process.env.NEXT_PUBLIC_ID)}`)
      }
      style={{
        opacity: disabled ? '0.5' : '1',
      }}
    >
      <Box position="relative" borderRadius="9px" overflow="hidden">
        <Box position="relative" width="100%" pt="calc(100% * 142 / 168)">
          <Image
            alt={title}
            src={image}
            fill
            objectFit="cover"
            objectPosition="top"
          />
        </Box>
        <Box
          p="7px"
          position="absolute"
          bottom="0"
          bg="#0D253D"
          backdropFilter="blur(2.5px)"
          w="100%"
          textAlign="center"
        >
          <Text fontWeight={500}>{deposit} Near</Text>
        </Box>
      </Box>
      <Text mt="14px" fontWeight={800} fontSize="19px" lineHeight="24px">
        {parse(title.replace(/\n/g, '<br/>'))}
      </Text>
      <Text
        mt={2}
        mb="auto"
        fontWeight={600}
        fontSize="14px"
        lineHeight="17px"
        color={color.primary}
      >
        {dayjs(startDate).format('MM/DD')}-{dayjs(endDate).format('MM/DD')}
      </Text>
      <Box mt="12px" display="flex">
        {hashtags.map((hashtag, i) => (
          <Box
            key={`${hashtag}-${i}`}
            mr="6px"
            p="4px 6px"
            bg={color.background.grey3}
            borderRadius="4px"
          >
            <Text
              color={color.text.grey1}
              fontWeight={600}
              fontSize="14px"
              lineHeight="17px"
            >
              {hashtag}
            </Text>
          </Box>
        ))}
      </Box>
    </GridItem>
  );
}
