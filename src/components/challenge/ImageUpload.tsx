import { Box, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ExecutionType, ImageUploadStatus } from 'src/types';
import { Loading, Button } from '../common';
import { color } from '../styles/colors';

interface Props {
  timeLeft: number;
  onSubmit: (file: File) => void;
  execution: ExecutionType;
}

export default function ImageUpload({ timeLeft, onSubmit, execution }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState(timeLeft);
  const [status, setStatus] = useState<ImageUploadStatus>('none');

  const buttonAttributes = useMemo(() => {
    switch (status) {
      case 'load':
        return {
          bgColor: '#5B5B5B',
          color: color.white,
          disabled: true,
          text: 'Loading..',
        };
      case 'pending':
        return {
          bgColor: '#5B5B5B',
          color: color.white,
          disabled: true,
          text: '🤔 Pending',
        };
      case 'rejected':
        return {
          bgColor: color.warning,
          color: color.white,
          disabled: false,
          text: 'Reupload',
        };
      case 'success':
        return {
          bgColor: '#5B5B5B',
          color: color.white,
          disabled: true,
          text: '🎉  Success',
        };
      default:
        return {
          bgColor: color.primary,
          color: color.background.main,
          // disabled: status !== 'none',
          text: 'Upload',
        };
    }
  }, [status]);

  const handleClickUpload = () => {
    if (execution) {
      alert('You already uploaded image');
      return;
    }
    if (ref && ref.current) {
      ref.current.click();
    }
  };
  const handleChangeFile = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e && e.target && e.target.files) {
      onSubmit(e.target.files[0]);
    }
  };

  useEffect(() => {
    let val = timeLeft;
    setInterval(() => {
      if (val > 0) {
        val -= 1000;
        setTime(val);
      }
    }, 1000);
  }, []);

  const Status = (props) => {
    switch (props.status) {
      case 'pending':
        return (
          <Text
            mt="6px"
            fontWeight={500}
            lineHeight="20px"
            color={color.pending}
          >
            💬 Pending
          </Text>
        );
      case 'rejected':
        return (
          <Text
            mt="6px"
            fontWeight={500}
            lineHeight="20px"
            color={color.warning}
          >
            ❌ Reject
          </Text>
        );
      case 'success':
        return (
          <Text
            mt="6px"
            fontWeight={500}
            lineHeight="20px"
            color={color.primary}
          >
            🎉 Success
          </Text>
        );
      default:
        return (
          <Text
            mt="6px"
            fontWeight={500}
            lineHeight="20px"
            color={color.primary}
          >
            {dayjs(time).format('HH:mm:ss')} left
          </Text>
        );
    }
  };

  useEffect(() => {
    if (execution) {
      setStatus(execution.status);
    }
  }, [execution]);

  return (
    <>
      <Loading isLoading={false} />
      <Box mt="22px" display="flex">
        <Box
          ref={ref}
          as="input"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleChangeFile}
          display="none"
        />
        <Box
          position="relative"
          w="128px"
          h="128px"
          borderRadius="12px"
          overflow="hidden"
        >
          <Image
            alt="upload-image"
            src={execution?.imagePath || '/images/default_img.png'}
            fill
            sizes="100% auto"
            objectFit="cover"
          />
        </Box>
        <Box ml="24px" display="flex" flexDirection="column" h="inherit">
          <Text
            fontWeight={500}
            fontSize="20px"
            lineHeight="25px"
            {...(status === 'rejected' && { color: color.warning })}
          >
            {status === 'pending'
              ? "Please wait until it's verified"
              : status === 'rejected'
              ? 'The verification failed. Try again'
              : status === 'success'
              ? "It's verified"
              : 'Please upload a picture'}
          </Text>
          <Status status={execution?.status || status} />
        </Box>
      </Box>
      <Box
        zIndex={1}
        px="20px"
        pb="34px"
        position="fixed"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
        width="100%"
        maxWidth="500px"
        bg={color.background.main}
      >
        <Button
          onClick={handleClickUpload}
          disabled={buttonAttributes.disabled}
          padding="16px 20px"
          fontWeight="600"
          fontSize="17px"
          w="100%"
          height="fit-content"
          background={buttonAttributes.bgColor}
        >
          <Text
            color={buttonAttributes.color}
            fontWeight="800"
            fontSize="24px"
            lineHeight="30px"
          >
            {buttonAttributes.text}
          </Text>
        </Button>
      </Box>
    </>
  );
}
