import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { color } from "../styles/colors";

interface Props {
  children: React.ReactNode;
  type?: 'information'|'check';
}

export default function ListItem({
  children,
  type = 'information',
}: Props) {
  return (
    <Box
      as="li"
      display="flex"
      gap="14px"
    >
      <Box
        bg="#2B2B2B"
        borderRadius="2px"
        width="20px"
        height="20px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {type === 'information' && (
          <Image
            alt="exclamation"
            src='/icons/ico-exclaimation.svg'
            width="4"
            height="16"
          />
        )}
        {type === 'check' && (
          <Image
            alt="check"
            src='/icons/ico-check-green.svg'
            width="12"
            height="9"
          />
        )}
      </Box>
      <Text color={color.text.grey4} fontWeight={500}>
        {children}
      </Text>
    </Box>
  );
}
