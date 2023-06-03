import { Box, Grid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { ExecutionType } from 'src/types';
import { reduceHashString } from 'src/utils';
import { color } from '../styles/colors';

interface Props {
  executions: Array<ExecutionType>;
}

export default function Executions({ executions }: Props) {
  return (
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="20px 10px"
      style={{
        paddingBottom: '80px',
      }}
    >
      {executions.map((execution, i) => (
        <Box
          key={`execution ${execution?.id}-${i}`}
          pt="100%"
          position="relative"
          bgImage={`url(${execution?.imagePath})`}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          borderRadius="8px"
          overflow="hidden"
        >
          <Box
            p="2px 8px 6px 8px"
            position="absolute"
            bottom="0"
            left="0"
            display="flex"
            alignItems="center"
            w="100%"
            bg="linear-gradient(180deg, rgba(31, 31, 31, 0) 0%, rgba(31, 31, 31, 0.9) 25.46%)"
          >
            <Box
              position="relative"
              width="16px"
              height="16px"
              borderRadius="99px"
              overflow="hidden"
            >
              <Image
                alt={`profile-${i}`}
                src={`/images/profile/profile_${
                  (parseInt(execution?.account, 16) % 12) + 1
                }.svg`}
                fill
                sizes="100% auto"
                objectFit="cover"
              />
            </Box>
            <Text
              ml="6px"
              color={color.background.layer2}
              fontWeight={500}
              fontSize="8px"
              lineHeight="10px"
            >
              {reduceHashString(execution?.account, 7, 4)}
            </Text>
          </Box>
        </Box>
      ))}
    </Grid>
  );
}
