import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  onClose,
}: Props) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
      setElement(document.getElementById('modal-root'));
  }, []);
  if (!isOpen || !element) return <></>;
  return (
    <>
      {ReactDOM.createPortal(
        <Box 
          zIndex="10"
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
        >
          <Box
            zIndex="10"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            p="20px"
            bg="#3B3C40"
            borderRadius="10px"
            width="calc(100% - 40px)"
            maxW="460px"
          >
            {children}
            <Box 
              position="absolute"
              top="16px"
              right="16px"
              onClick={onClose}
            >
              <Image
                alt="close-icon"
                src="/icons/ico-x.svg"
                width="24"
                height="24"
              />
            </Box>
          </Box>
          <Box onClick={onClose} position="absolute" width="100vw" height="100vh" bg="#000000D6" />
        </Box>,
        element
      )}
    </>
  );
};