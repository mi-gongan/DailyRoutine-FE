import { Box, Grid, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { ChallengeInfo } from 'src/components/challenge';
import { Button } from 'src/components/common';
import Header from 'src/components/common/Header';
import ListItem from 'src/components/common/ListItem';
import { color } from 'src/components/styles/colors';
import { challengeList } from 'src/dummyData';

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const challenge = challengeList[0];

  return (
    <>
      <Head>
        <title>Challenge: {challenge.title}</title>
      </Head>
      <Header title="Participating" returnUrl={`/challenges`} />
      <Box
        mt={16}
        px="20px"
        position="relative"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        <ChallengeInfo {...challenge} p="12px" borderRadius="12px" />
        <Box
          mt="12px"
          py="20px"
          display="flex"
          flexDirection="column"
          flex={1}
          borderTop="1px solid #4A4A4A"
        >
          <Text fontSize="17px" lineHeight="23.5px" color={color.text.grey4}>
            {challenge.description}
          </Text>
          <Text
            mt="36px"
            fontWeight={800}
            fontSize="20px"
            lineHeight="25px"
            color={color.primary}
          >
            🏆 You can get this NFT
          </Text>
          <Grid mt="12px" gridTemplateColumns="repeat(3, 1fr)" gap="8px">
            {challenge.nfts.map((nft, i) => (
              <Box
                key={`challenge-${i}`}
                position="relative"
                width="100%"
                pt="100%"
              >
                <Image
                  alt={nft.title}
                  src={nft.image}
                  fill
                  style={{ borderRadius: '8px' }}
                />
              </Box>
            ))}
          </Grid>
          <Text
            mt="32px"
            fontWeight={800}
            fontSize="20px"
            lineHeight="25px"
            color={color.primary}
          >
            📝 Please verify in this way
          </Text>
          <Box as="ul" mt="16px">
            <ListItem type="check">
              Upload a photo taken
              <br />
              during the ETH SEOUL Hackathon! 📷
            </ListItem>
          </Box>

          {challenge.id === challengeList[0].id && (
            <Grid pt="10px" gap="10px" gridTemplateColumns="repeat(3, 1fr)">
              {[1, 2, 3].map((x) => (
                <Box
                  key={`example-img-${x}`}
                  position="relative"
                  width="100%"
                  pb="100%"
                  borderRadius="8px"
                  overflow="hidden"
                >
                  <Image
                    alt={`example-img-${x}`}
                    src={`/images/challenge/example_${x}.png`}
                    fill
                  />
                  <Box
                    zIndex={1}
                    position="absolute"
                    display="flex"
                    bg={color.background.grey2}
                    bottom="0"
                    width="32px"
                    height="32px"
                    borderTopRightRadius="8px"
                  >
                    <Text
                      mt="7px"
                      mx="auto"
                      fontWeight="900"
                      fontSize="22px"
                      lineHeight="1"
                      color={color.white}
                    >
                      {x < 3 ? 'O' : 'X'}
                    </Text>
                  </Box>
                </Box>
              ))}
              <Box></Box>
            </Grid>
          )}

          <Text
            mt="32px"
            fontWeight={800}
            fontSize="20px"
            lineHeight="25px"
            color={color.primary}
          >
            😲 Please be aware of the challenge when participating!
          </Text>
          <Box
            as="ul"
            mt="16px"
            mb="21px"
            gap="10px"
            display="flex"
            flexDirection="column"
          >
            <ListItem>
              After verification by the moderator, any inappropriate photos will
              be considered as a challenge failure.
            </ListItem>
            <ListItem>
              Please upload a clear photo that clearly shows it's from the ETH
              SEOUL Hackathon
            </ListItem>
          </Box>
        </Box>
      </Box>
      <Box
        position="fixed"
        zIndex="1"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
        width="100%"
        maxWidth="500px"
        px="20px"
        pb="34px"
        bg={color.background.main}
      >
        <Button
          onClick={() => router.push(`/challenge/${id}/participate`)}
          disabled={challenge.id !== challengeList[0].id}
          mt="auto"
          padding="16px 20px"
          h="fit-content"
          fontWeight="800"
          fontSize="24px"
          lineHeight="30px"
          borderRadius="21px"
          {...(challenge.id !== challengeList[0].id && {
            background: '#6D6D6D',
          })}
        >
          {challenge.id === challengeList[0].id ? 'Join' : 'Coming Soon'}
        </Button>
      </Box>
    </>
  );
}
