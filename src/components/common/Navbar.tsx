import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <Box 
      p="20px"
      width="100%" 
      display="flex" 
      alignItems="center"
      gap="12px"
    >
      {!router.pathname.includes('challenges') && (
        <Box onClick={() => router.back()}>
          <Image
            alt="bell"
            src="/icons/ico-chevron-left.svg"
            width="24"
            height="24"
          />
        </Box>
      )}
      <Box ml="auto">
        <Image
          alt="bell"
          src="/icons/ico-bell.svg"
          width="28"
          height="28"
        />
      </Box>
      <Box>
        <Image
          alt="setting"
          src="/icons/ico-setting.svg"
          width="24"
          height="24"
        />
      </Box>
    </Box>
  );
};
