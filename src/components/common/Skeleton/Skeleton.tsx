import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AnimatedText, ImageContainer } from './Skeleton.styles';

export default function Skeleton() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % 3;
      setTime(i);
    }, 1000);
  }, []);

  return (
    <Box 
      width="100%"
      flex={1}
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <ImageContainer>
        {[1, 2, 3].map(x => (
          <Image
            key={x}
            alt="skeleton-image"
            src={`/images/skeleton/skeleton_${x}.png`}
            className={`image-${x}`}
            width="110"
            height="110"
          />
        ))}
      </ImageContainer>
      <AnimatedText>
        Please wait a moment <span className='dot-1'>.</span><span className='dot-2'>.</span><span className='dot-3'>.</span>
      </AnimatedText>
    </Box>
  );
};
