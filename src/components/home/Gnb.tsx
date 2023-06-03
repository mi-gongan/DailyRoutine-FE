import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import HamburgerIcon from 'public/icons/ico-hamburger.svg';
import { color } from "../styles/colors";
import CloseIcon from 'public/icons/ico-x.svg';

const categories = [
  { label: 'Foryou', value: 'foryou' },
  { label: 'Study', value: 'study' },
  { label: 'Exercise', value: 'exercise' },
  { label: 'Eating habits', value: 'eating-habits' },
  { label: 'Life', value: 'life' },
  { label: 'Hobby', value: 'hobby' },

];

export default function Gnb() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSelectCategory = (val) => {
    router.push({ query: { category: val } });
    setIsModalOpen(false);
  };
  return (
    <>
      <Box 
        position="fixed" 
        zIndex={10}
        top="0"
        left="50%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        w="min(100%, 500px)"
        h="100vh"
        transform="translateX(-50%)"
        bg="#FFFFFFE0"
        backdropFilter="blur(11.5px)"
        {...!isModalOpen && { display: 'none' }}
      >
        <CloseIcon 
          style={{ margin: '22.5px 22.5px 22.5px auto' }}
          onClick={() => setIsModalOpen(false)}
        />
        {categories.map(category => (
          <Box 
            key={category.label}
            onClick={() => handleSelectCategory(category.value)}
            w="fit-content"
            p="22px 30px"
          >
            <Text
              fontWeight={700}
              fontSize="22px"
              lineHeight="27px"
              userSelect="none"
            >
              {category.label}
            </Text>
          </Box>
        ))}
      </Box>
      <Box 
        position="fixed"
        zIndex={2}
        top="64px"
        display="flex" 
        alignItems="center" 
        height="60px"
        w="min(100%, 500px)"
        bg={color.white}
      >
        <Box 
          as="button" 
          type="button" 
          ml="12px"
          p="20px 12px"
          onClick={() => setIsModalOpen(true)}
        >
          <HamburgerIcon/>
        </Box>
        <Box
          flex={1}
          display="flex" 
          alignItems="center" 
          height="60px"
          overflowX="scroll"
          sx={{ 
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          {categories.map(category => (
            <Box
              key={category.label}
              onClick={() => handleSelectCategory(category.value)}
              px="12px"
              w="fit-content"
            >
              <Text fontWeight={600}>
                {category.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
