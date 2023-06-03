import { Box, Grid, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { color } from '../styles/colors';
import { useRouter } from 'next/router';
import useNear from 'src/hook/useNear';
import { WalletConnection, connect, keyStores, utils } from 'near-api-js';
import { nearFormat } from 'src/utils/format';

export default function AccountInfo() {
  const router = useRouter();
  const { balance, accountId } = useNear();

  return (
    <Grid p="5px 20px" gap="20px">
      <Box px="4px" display="flex" alignItems="center">
        {accountId && (
          <Image
            alt="profile-image"
            src={`/images/profile/profile_1.svg`}
            width="40px"
            height="40px"
          />
        )}
        <Box ml="12px">
          <Text fontSize="15px" lineHeight="1">
            Hello
          </Text>
          <Text mt="3px" fontWeight={700} fontSize="20px" lineHeight="1">
            {accountId}
          </Text>
        </Box>
      </Box>
      <Box
        p="24px 22px"
        position="relative"
        bg={color.background.grey2}
        borderRadius="16px"
      >
        <Text fontWeight="600" fontSize="18px">
          Your balance
        </Text>
        <Text fontWeight="700" fontSize="36px">
          {nearFormat(balance)} Near
        </Text>
        <div
          onClick={async () => {
            const connectionConfig = {
              networkId: 'testnet',
              keyStore: new keyStores.BrowserLocalStorageKeyStore(),
              nodeUrl: 'https://rpc.testnet.near.org',
              walletUrl: 'https://wallet.testnet.near.org',
              helperUrl: 'https://helper.testnet.near.org',
              explorerUrl: 'https://explorer.testnet.near.org',
            };

            const nearConnection = await connect(connectionConfig);

            const walletConnection = new WalletConnection(
              nearConnection,
              'daily_routine',
            );

            walletConnection.signOut();
            router.push('/');
          }}
        >
          Logout
        </div>

        <div
          style={{
            position: 'absolute',
            top: '18px',
            right: '16px',
          }}
          onClick={() => {
            router.push('/account/balance');
          }}
        >
          <Image
            alt="chevron-right"
            src="/icons/ico-chevron-right.svg"
            width="12px"
            height="17px"
          />
        </div>
      </Box>
    </Grid>
  );
}
