import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { color } from "../styles/colors";


export default function WrapperTitle({
  content,
  target,
  marginTop,
}) {
  const router = useRouter();
  return (
    <Box display="flex" alignItems="center" marginTop={marginTop} w="100%">
      <Text fontWeight={800} fontSize="20px">
        {content}
      </Text>

      <Box 
        onClick={() => router.push({ query: { tab: target } })}
        ml="auto"
        display="flex"
        alignItems="center"
      >
        <Text
          mr="7px"
          fontWeight={600}
          color={color.primary}
        >
          View All
        </Text>
        <Image
          alt="chevron"
          src={`/icons/ico-chevron-right-secondary.svg`}
          width={6}
          height={22 / 13 * 6}
        />
      </Box>
    </Box>
  );
};
