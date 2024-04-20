import { styled, alpha } from '@mui/material/styles';
import { withTransientProps } from '@/utilities/styles/utilities';

export const Header = styled(
  'header',
  withTransientProps,
)<{ $hideBorder?: boolean }>(({ theme, $hideBorder = false }) => ({
  position: 'sticky',
  top: 0,
  transition: theme.transitions.create('top'),
  zIndex: theme.zIndex.appBar,
  backdropFilter: 'blur(20px)',
  boxShadow: !$hideBorder ? `inset 0px -1px 1px ${theme.palette.divider}` : 'none',
  backgroundColor: alpha(theme.palette.background.default, 0.7),
}));
