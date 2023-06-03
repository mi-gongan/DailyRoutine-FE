import React, { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import ChevronIcon from 'public/icons/ico-chevron-left.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from './Button';
import { color } from '../styles/colors';
import useNear from 'src/hook/useNear';

interface Props {
  title: string;
  isHome?: boolean;
  buttonVisible?: boolean;
  returnUrl?: string | null;
  background?: string;
}

export default function Header({
  title,
  isHome = false,
  buttonVisible = true,
  returnUrl,
  background = color.background.main,
}: Props) {
  const { accountId } = useNear();
  const router = useRouter();

  const handleConnectWallet = () => {};

  return (
    <Box
      as="header"
      p="12px 20px"
      position="fixed"
      zIndex={2}
      top="0"
      left="50%"
      transform="translateX(-50%)"
      w="100%"
      maxW="500px"
      h="64px"
      display="flex"
      alignItems="center"
      bg={background}
    >
      {isHome ? (
        <Box as="nav">
          <Image
            alt="Daily Routine"
            src="/images/img-logo.svg"
            width={140}
            height={24}
          />
        </Box>
      ) : (
        <>
          {buttonVisible && (
            <Box as="nav" mr="12px">
              <ChevronIcon
                onClick={() => {
                  if (returnUrl === null) {
                    router.back();
                  } else {
                    router.push(returnUrl);
                  }
                }}
              />
            </Box>
          )}
          <Box as="nav">
            <Text fontWeight="700" fontSize="18px" lineHeight="22px">
              {title}
            </Text>
          </Box>
        </>
      )}
      <Box as="nav" ml="auto">
        {accountId ? (
          <Box
            as="button"
            type="button"
            onClick={() => router.push('/account/balance')}
            position="relative"
            borderRadius="99px"
            width="36px"
            height="36px"
            overflow="hidden"
          >
            <Image
              alt="profile-image"
              src={`/images/profile/profile_${1}.svg`}
              fill
              sizes="100% auto"
              objectFit="cover"
            />
          </Box>
        ) : (
          <Button
            onClick={handleConnectWallet}
            padding="9px 20px"
            fontWeight="600"
          >
            Connect
          </Button>
        )}
      </Box>
    </Box>
  );
}
