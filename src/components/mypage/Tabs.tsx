import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { color } from "../styles/colors";

export default function Tabs() {
  const router = useRouter();
  const { tab } = router.query;
  const current = useMemo(() => {
    if (!tab) return 'all';
    return tab;
  }, [tab]);

  return (
    <Box display="flex" borderRadius="99px" w="300px" bg={color.white}>
      {['all', 'nft', 'history'].map(x => (
        <Button
          key={x}
          type="button"
          {...current !== x && {
            onClick: () => router.push({ query: { tab: x } })
          }}
          w="100px"
          h="51px"
          borderRadius="99px"
          fontWeight={600}
          fontSize="19px"
          {...current === x ? {
            bg: color.secondary,
            boxShadow: '0px 1.88889px 3.77778px rgba(0, 0, 0, 0.14)',
            color: color.white
          } : {
            bg: 'transparent'
          }}
        >
          {x === 'all' && 'All'}
          {x === 'nft' && 'Nft'}
          {x === 'history' && 'History'}
        </Button>
      ))}
    </Box>
  );
};