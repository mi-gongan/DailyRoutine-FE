import { Box, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Button } from "../common";
import { color } from "../styles/colors";

const RejectModal = ({ isOpen, onConfirm }) => {
  const inputRef = useRef(null);
  const handleSubmit = () => {
    const value = inputRef.current.value;

    let modalLayer = document.getElementsByClassName('modal-layer')[0];
    let modalBody = document.getElementsByClassName('modal-body')[0];
    if (modalLayer && modalBody) {
      (modalLayer as any).style["background-color"] = '#00000000';
      (modalBody as any).style["transform"] = "translate(-50%, 0)";
    }
    setTimeout(() => {
      onConfirm(value);
    }, 500);
  };
  useEffect(() => {
    const timer = setTimeout(() => {

      let modalLayer = document.getElementsByClassName('modal-layer')[0];
      let modalBody = document.getElementsByClassName('modal-body')[0];
      if (modalLayer && modalBody) {
        (modalLayer as any).style["background-color"] = color.background.modal;
        (modalBody as any).style["transform"] = "translate(-50%, -100%)";
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen]);
  if (!isOpen) return <></>;
  return (
    <Box
      className="modal-layer"
      position="fixed"
      zIndex="10"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bgColor='#00000000'
      transition="0.5s"
    >
      <Box 
        className="modal-body"
        position="fixed"
        top="100vh"
        left="50%"
        transform="translate(-50%, 0)"
        w="min(100%, 500px)"
        p="58px 20px 22px 20px"
        bg={color.white}
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        transition="0.5s"
      >
        <Box
          position="absolute"
          width="50px"
          height="4px"
          top="14px"
          left="calc(50% - 25px)"
          bg="#D7DBE0"
          borderRadius="99px"
        />
        <Text
          fontWeight={800}
          fontSize="26px"
          lineHeight="32px"
        >
          Why didn't it pass?
        </Text>
        <Textarea
          ref={inputRef}
          placeholder="It's not related to this challenge There's a picture of a cat"
          mt="20px"
          minH="340px"
          p="24px 20px"
          fontWeight={500}
          fontSize="17px"
          lineHeight="21px"
          border="none !important"
          bg={color.background.layer1}
          borderRadius="18px"
          sx={{
            '&::placeholder': {
              color: color.text.tertiary
            },
            '&:focus, &:hover': {
              border: 'none !important'
            }
          }}
        />
        <Button
          onClick={handleSubmit}
          mt="38px"
          p="16px 20px"
          borderRadius="21px"
          h="fit-content"
          fontWeight={700}
          fontSize="22px"
          lineHeight="27px"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default RejectModal;