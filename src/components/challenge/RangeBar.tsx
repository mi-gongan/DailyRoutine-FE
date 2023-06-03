import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { color } from '../styles/colors';

export default function RangeBar({ min, max, avg }) {
  return (
    <Box>
      <Box
        width="100%"
        height="11px"
        borderRadius="99px"
        bg={color.background.grey6}
      >
        <Box
          ml="48%"
          width="150px"
          height="inherit"
          borderRadius="99px"
          position="relative"
          bg="linear-gradient(90deg, #89974f 12.9%, #E7FF86 59.47%, #828d58 90.52%)"
        >
          <Text
            position="absolute"
            bottom="-28px"
            fontSize="14px"
            lineHeight="17px"
            w="100%"
            textAlign="center"
            color={color.primary}
          >
            average <span>{avg}</span> Near
          </Text>
        </Box>
      </Box>
      <Box mt="8px" position="relative" display="flex" fontWeight={700}>
        <Box>
          <Text>Min</Text>
          <Text
            mt="6px"
            color={color.primary}
            fontSize="14px"
            lineHeight="17px"
          >
            {min} Near
          </Text>
        </Box>
        <Box ml="auto" textAlign="right">
          <Text>Max</Text>
          <Text
            mt="6px"
            color={color.primary}
            fontSize="14px"
            lineHeight="17px"
          >
            {max} Near
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
