import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import { color } from "../styles/colors";

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <Box zIndex={10} position="fixed" top="0" left="0" right="0" bottom="0" bg="#00000044">
      <Spinner color={color.primary} size="lg" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
    </Box>
  );
};
