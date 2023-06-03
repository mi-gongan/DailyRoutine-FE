import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { color } from "../styles/colors";

export default function EmptyBox({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Box 
      px="30px"
      w="100%"
      height="110px"
      bg={color.background.grey4}
      borderRadius="16px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        fontWeight="500"
        fontSize="17px"
        textAlign="center"
        color={color.text.grey3}
      >
        {children}
      </Text>
    </Box>
  )
};
