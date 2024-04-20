import { Button, styled } from '@mui/material';
import { withTransientProps } from '@/utilities/styles/utilities';

function getWidth({ variant, size }: { variant?: string; size?: string }): string {
  if (variant === 'text' && size === 'small') {
    return 'calc(100% + 2px)';
  }
  return 'calc(100% + 2px)';
}

export const StyledButton = styled(
  Button,
  withTransientProps,
)<{}>(({ theme: { palette, shape }, variant, size }) => ({
  ...(variant === 'outlined') && {
    borderColor: palette.grey[400],
  },
  borderRadius: shape.borderRadius + -0.5,
  zIndex: 0,
  color: palette.text.primary,
  backgroundColor: 'transparent',
  textTransform: 'unset',
  '&:before': {
    borderRadius: shape.borderRadius,
    content: '""',
    background: `
      linear-gradient(
        90deg,
        #5d4eff,
        #52a4ff,
        #00f9ff,
        #50ff7f,
        #44ff32,
        #50ff7f,
        #00f9ff,
        #52a4ff,
        #5d4eff
      )
    `,
    position: 'absolute',
    top: variant === 'outlined' ? -1 : -1.5,
    left: variant === 'outlined' ? -1 : -1.25,
    backgroundSize: '400%',
    zIndex: -1,
    width: getWidth({ variant, size }),
    height: 'calc(100% + 2px)',
    animation: 'glowing 20s infinite linear',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover': {
    borderColor: 'transparent',
    '&:before': {
      opacity: 1,
      borderRadius: shape.borderRadius + -0.5,
    },
  },
  '&:focus-visible': {
    '&:before': {
      opacity: 1,
      borderRadius: shape.borderRadius + -0.5,
    },
  },
  '&:after': {
    zIndex: -1,
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: palette.background.default,
    top: 0,
    left: 0,
    borderRadius: shape.borderRadius + -0.5,
  },
  '@keyframes glowing': {
    '0%': {
      backgroundPosition: '0 0',
    },
    '50%': {
      backgroundPosition: '400% 0',
    },
    '100%': {
      backgroundPosition: '0 0',
    },
  },
}));
