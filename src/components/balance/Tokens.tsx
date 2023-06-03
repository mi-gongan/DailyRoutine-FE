import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { TokenType } from 'src/types';
import { color } from '../styles/colors';

interface Props {
  tokens: TokenType[];
}

export default function Tokens({
  tokens,
}: Props) {
  return (
    <Box>
      {tokens.map((x, i) => (
        <Box
          key={`token-${i}`}
          py="12px"
          display="flex"
          alignItems="center"
          gap="14px"
          fontWeight={600}
          lineHeight="1"
          {...i > 0 && {
            borderTop: `1px solid ${color.background.grey6}`
          }}
        >
          <Image
            alt={x.network}
            src={x.image}
            width="40"
            height="40"
          />
          <Box mr="auto">
            <Text fontSize="17px">
              {x.unit}
            </Text>
            <Text
              mt="4px"
              fontSize="15px"
              color={color.text.grey5}
            >
              {x.network}
            </Text>
          </Box>
          <Text fontSize="20px">
            {x.balance.toLocaleString()}
          </Text>
        </Box>
      ))}
    </Box>
  );
};