import React from 'react';

import { Button as AntButton, ButtonProps } from 'antd';
import styled from 'styled-components';

const Button = styled(AntButton)`
  border: none;
  border-radius: 8px;

  &:hover,
  &:active,
  &:focus {
    background: transparent;
    color: white;
  }
`;

export interface GradientButtonProps extends ButtonProps {
  gradient: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  style = {},
  gradient,
  ...restProps
}) => {
  return (
    <div
      style={{
        display: 'inline-block',
        backgroundImage: gradient,
        padding: 1,
        borderRadius: 8,
      }}
    >
      <Button
        type="default"
        {...restProps}
        style={{
          padding: '8px 24px',
          height: 40,
          lineHeight: '40px',
          ...style,
        }}
        // gradient={gradient}
      >
        {children}
      </Button>
    </div>
  );
};
