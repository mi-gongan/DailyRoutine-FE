import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { NftType } from "src/types";
import WrapperTitle from "./WrapperTitle";

interface Props {
  nftList: Array<NftType>;
}

export default function NftList({ nftList }: Props) {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <>
      {tab !== 'nft' && (
        <WrapperTitle
          content="Total NFT"
          target="nft"
          marginTop="0"
        />
      )}
      <Box mt="24px" px="6px" display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="12px">
        {nftList.slice(0, 6).map((nft, i) => (
          <Box
            key={nft.hash}
            position="relative"
            width="100%"
            pt="100%"
            borderRadius="7px"
            overflow="hidden"
          >
            <Image
              alt={`my nft ${i}`}
              src={nft.image}
              fill
            />
          </Box>
        ))}
      </Box>
    </>
  );
};