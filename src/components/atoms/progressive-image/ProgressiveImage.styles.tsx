import { styled } from '@mui/material';
import { withTransientProps } from '@/utilities/styles';

export const StyledImage = styled('img', withTransientProps)<{ $blur: boolean }>(({ $blur }) => ({
  filter: $blur ? 'blur(5px)' : 'blur(0px)',
  transition: 'filter 0.25s linear',
}));
