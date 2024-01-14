import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import type { ReactNode } from 'react';

export interface ButtonProps extends MuiButtonProps {
  /** If `true`, the button text will be uppercased. */
  uppercase?: boolean;
  disabled?: boolean;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  children?: ReactNode;
  fullWidth?: boolean;
}

/**
 * Material UI Button component with predefined commonly-used defaults
 */
export const Button = ({
  uppercase = false,
  disabled = false,
  color = 'primary',
  variant = 'contained',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) => (
  <MuiButton
    color={color}
    variant={variant}
    disabled={disabled}
    size={size}
    fullWidth={fullWidth}
    {...props}
    sx={{
      textTransform: uppercase ? 'uppercase' : 'none',
    }}
  >
    {children}
  </MuiButton>
);

export default Button;
