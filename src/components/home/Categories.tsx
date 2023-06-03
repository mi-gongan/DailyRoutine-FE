import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { color } from "../styles/colors";

const categories = [
  'All',
  'Popular',
  'Study',
  'Life',
  'Workout',
]

export default function Categories() {
  const router = useRouter();
  const { category } = router.query;
  return (
    <Box
      width="100%" 
      overflowX="scroll"
      sx={{ 
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      <Box display="flex" px="20px" gap="7px" w="fit-content">
        {categories.map(item => (
          <Box
            key={`category-${item}`}
            p="6px 15px"
            fontWeight="700"
            fontSize="15px"
            lineHeight="1"
            borderRadius="99px"
            {...(
              item.toLowerCase() === category?.toString() ||
              (item === 'All' && !category)
            ) ? {
              color: color.background.main,
              bg: color.primary
            } : {
              color: color.text.grey2,
              bg: color.background.grey3,
            }}
            onClick={() => router.push({ query: { category: item.toLowerCase() } })}
          >
            <Text>
              {item}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};