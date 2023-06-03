import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { Key } from "../3d-model";
import { Gradient1, Gradient2 } from "./Intro.style";

export default function Intro() {
  return (
    <Box
      pt="32px"
      position="relative" 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center"
      overflow="hidden"
      flex={1}
    >
      <Gradient2>
        <Image 
          alt="gradient2" 
          src="/images/background/bg-connect-gradient2.png"
          fill
        />
      </Gradient2>
      <Gradient1>
        <Image 
          alt="gradient1" 
          src="/images/background/bg-connect-gradient1.png"
          fill
        />
      </Gradient1>
      <Text mt="auto" position="relative" zIndex={1} textAlign="center" fontWeight="bold" fontSize="29px" lineHeight="40.6px">
        Habits are the key<br/>
        to change your life
      </Text>
      <Box position="relative" zIndex={1}>
        <Key/>
      </Box>
    </Box>
  );
};