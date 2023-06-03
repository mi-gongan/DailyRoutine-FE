import { Box, Grid, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ExecutionType } from "src/types";
import { reduceHashString } from "src/utils";
import { color } from "../styles/colors";

interface Props {
  histories: Array<ExecutionType>;
};

export default function Histories({
  histories,
}: Props) {
  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap="20px 10px">
      {histories.map((history, i) => (
        <Box 
          key={`execution ${history?.id}-${i}`}
          pt="100%" 
          position="relative"
          bgImage={`url(${history?.imagePath})`}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          borderRadius="8px"
          overflow="hidden"
        >
          <Box 
            p="8px 10px 4px 10px"
            position="absolute"
            bottom="0"
            left="0"
            display="flex"
            alignItems="center"
            w="100%"
            bg="linear-gradient(180deg, rgba(31, 31, 31, 0) 0%, rgba(31, 31, 31, 0.9) 25.46%)"
          >
            <Text color={color.background.layer2} fontWeight={500} fontSize="10px" lineHeight="12.4px">
              {dayjs(history.date).format('YYYY/MM/DD')}
            </Text>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};