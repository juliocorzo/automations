import { styled, alpha, lighten } from '@mui/material/styles';

export const Header = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  transition: theme.transitions.create('top'),
  zIndex: theme.zIndex.appBar,
  backdropFilter: 'blur(20px)',
  boxShadow: `inset 0px -1px 1px ${lighten(theme.palette.background.default, 0.2)}`,
  backgroundColor: alpha(theme.palette.background.default, 0.7),
}));
