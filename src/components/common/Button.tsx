import React from 'react';
import { Button as Btn, ButtonProps } from '@chakra-ui/react';
import { color } from '../styles/colors';

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({
  children,
  disabled=false,
  isLoading=false,
  onClick,
  ...rest
}: Props & ButtonProps) => {
  const background = rest.background ? `${rest.background}`: ((disabled || isLoading) ? `${color.primary}80` : color.primary);
  return (
    <Btn
      type="button"
      disabled={disabled || isLoading}
      onClick={onClick}
      w="100%"
      fontWeight="800"
      fontSize="18px"
      lineHeight="100%"
      color={color.background.main}
      bgColor={background}
      borderRadius="7px"
      _hover={{ bg: background }}
      _active={{ bg: background }}
      _focus={{ bg: background }}
      {...rest}
    >
      {children}
    </Btn>
  )
};

export default Button;