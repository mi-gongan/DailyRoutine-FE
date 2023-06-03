import { Box, BoxProps, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { ChallengeType } from 'src/types';
import { color } from '../styles/colors';
import EtherIcon from 'public/icons/ico-eth.svg';
import parse from 'html-react-parser';

export default function ChallengeInfo({
  id,
  deposit,
  title,
  image,
  startDate,
  endDate,
  participants,
  limit,
  minDeposits,
  maxDeposits,
  average,
  hashtags,
  timeLeft,
  organizer,
  description,
  nfts,
  background,
  fontColor,
  depositsVisible = false,
  ...rest
}: ChallengeType & BoxProps & { depositsVisible?: boolean }) {
  return (
    <Box
      display="flex"
      {...rest}
      bgColor={rest.bgColor || color.background.main}
    >
      <Box
        position="relative"
        width="106px"
        height="106px"
        borderRadius="15px"
        overflow="hidden"
      >
        <Image
          alt={title}
          src={image}
          fill
          sizes="100% auto"
          objectFit="cover"
        />
      </Box>
      <Box ml="20px">
        <Text as="h4" fontWeight={800} fontSize="20px" lineHeight="24px">
          {parse(title.replace(/\n/g, '<br/>'))}
        </Text>
        {depositsVisible && (
          <Box mt="8px" display="flex" alignItems="center">
            <EtherIcon />
            <Text
              ml="6px"
              fontWeight={800}
              fontSize="18px"
              lineHeight="1"
              color={color.text.secondary}
            >
              {deposit}
            </Text>
          </Box>
        )}
        <Text
          mt="3px"
          fontWeight={600}
          fontSize="16px"
          lineHeight="20px"
          color={color.primary}
        >
          {dayjs(startDate).format('MM/DD')} - {dayjs(endDate).format('MM/DD')}
        </Text>
        <Box mt="8px" display="flex" gap="6px">
          {hashtags.map((hashtag, i) => (
            <Box
              key={`${hashtag}-${i}`}
              mr="6px"
              p="4px 6px"
              bg="#0A1F33"
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
      </Box>
    </Box>
  );
}
