import { Divider as MuiDivider } from '@mui/material';
import type { DividerProps as MuiDividerProps } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles';
import type { Breakpoint } from '@mui/system';

export interface DividerProps extends Omit<MuiDividerProps, 'orientation'> {
  /** Breakpoint at which to switch from vertical to horizontal orientation */
  responsiveBreakpoint?: Breakpoint;
  /** Set this option to true if the component will only be rendered client-side. */
  noSsr?: boolean;
}

export function Divider({
  responsiveBreakpoint = 'md',
  noSsr = false,
  ...props
}: DividerProps) {
  const isMobile = useMediaQuery(({
    breakpoints,
  }: Theme) => breakpoints.down(responsiveBreakpoint), { noSsr });

  return (
    <MuiDivider {...props} orientation={!isMobile ? 'vertical' : 'horizontal'} />
  );
}

export default Divider;
