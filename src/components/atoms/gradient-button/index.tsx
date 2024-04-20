import type { ButtonProps } from '@mui/material';
import { StyledButton } from '@/components/atoms/gradient-button/GradientButton.styles';

type GradientButtonProps = ButtonProps;

function GradientButton({ children, variant = 'outlined', ...props }: GradientButtonProps) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

export { GradientButton };
