import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { color } from '../styles/colors';

interface Props {
  inprogress: number;
  finished: number;
  successRate: string;
}

export default function Board({ inprogress, finished, successRate }: Props) {
  return (
    <Box
      p="24px"
      bgColor={color.background.grey4}
      borderRadius="16px"
      display="flex"
      justifyContent="center"
    >
      <Box pr="20px" borderRight="1px solid #5C5C5C" textAlign="center">
        <Text fontWeight="500" fontSize="17px" lineHeight="21px">
          In progress
        </Text>
        <Text mt="12px" fontWeight="700" fontSize="26px" lineHeight="1">
          {inprogress}
        </Text>
      </Box>
      <Box px="20px" borderRight="1px solid #5C5C5C" textAlign="center">
        <Text fontWeight="500" fontSize="17px" lineHeight="21px">
          Finished
        </Text>
        <Text mt="12px" fontWeight="700" fontSize="26px" lineHeight="1">
          {finished}
        </Text>
      </Box>
      <Box pl="20px" textAlign="center">
        <Text fontWeight="500" fontSize="17px" lineHeight="21px">
          Success Rate
        </Text>
        <Text
          mt="12px"
          fontWeight="700"
          fontSize="26px"
          lineHeight="1"
          sx={{ '& span': { fontSize: '17px' } }}
        >
          {successRate}
          <span>%</span>
        </Text>
      </Box>
    </Box>
  );
}
