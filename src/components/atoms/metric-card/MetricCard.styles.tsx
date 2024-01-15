import { withTransientProps } from '@/utilities/styles/utilities';
import { Slider as MuiSlider, sliderClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  blue, green, red, yellow,
} from '@mui/material/colors';

export const Slider = styled(MuiSlider, withTransientProps)(({ theme }) => ({
  [`& .${sliderClasses.rail}`]: {
    opacity: 1,
    backgroundImage: `linear-gradient(to right, ${blue[700]}, ${green[700]}, ${yellow[700]}, ${red[700]})`,
  },
  [`& .${sliderClasses.thumb}`]: {
    backgroundColor: theme.palette.text.primary,
    height: 8,
    width: 8,
  },
}));
