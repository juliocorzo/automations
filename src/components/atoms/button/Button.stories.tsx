import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mui/material';
import { Button, ButtonProps } from '@/components/atoms/button';
import { Divider } from '@/components/atoms/divider';
import { colors } from '@/utilities/styles/constants';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Template: Story = {
  args: {
    children: 'Primary',
  },
  render: function Render(args) {
    return <Button {...args} />;
  },
};

export const Colors: Story = {
  args: {},
  render: function Render(args) {
    return (
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        divider={<Divider responsiveBreakpoint="md" noSsr flexItem />}
      >
        {colors.map((color) => (
          <Button
            key={color}
            {...args}
            color={color as ButtonProps['color']}
          >
            {color}
          </Button>
        ))}
      </Stack>
    );
  },
};

export const Disabled: Story = {
  args: {},
  render: function Render(args) {
    return (
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        divider={<Divider responsiveBreakpoint="md" noSsr flexItem />}
      >
        <Button
          {...args}
        >
          Default
        </Button>
        <Button
          {...args}
          disabled
        >
          Disabled
        </Button>
        <Button
          {...args}
          disableElevation
        >
          Elevation
        </Button>
        <Button
          {...args}
          disableRipple
        >
          Ripple
        </Button>
        <Button
          {...args}
          disableFocusRipple
        >
          Focus Ripple
        </Button>
      </Stack>
    );
  },
};

export const Icon: Story = {
  args: {},
  render: function Render(args) {
    return (
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        divider={<Divider responsiveBreakpoint="md" noSsr flexItem />}
      >
        <Button {...args} startIcon={<SentimentVeryDissatisfiedIcon />} color="error">
          {'I\'m so angry!'}
        </Button>
        <Button {...args} endIcon={<SentimentVeryDissatisfiedIcon />} color="error">
          {'I\'m so angry!'}
        </Button>
        <Button {...args} startIcon={<SentimentVerySatisfiedIcon />} color="success">
          {'I\'m so happy!'}
        </Button>
        <Button {...args} endIcon={<SentimentVerySatisfiedIcon />} color="success">
          {'I\'m so happy!'}
        </Button>
      </Stack>
    );
  },
};

export const Sizes: Story = {
  args: {},
  render: function Render(args) {
    return (
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        divider={<Divider responsiveBreakpoint="md" noSsr flexItem />}
      >
        {['small', 'medium', 'large'].map((size) => (
          <Button
            key={size}
            {...args}
            size={size as ButtonProps['size']}
          >
            {size}
          </Button>
        ))}
      </Stack>
    );
  },
};

export const Variants: Story = {
  args: {},
  render: function Render(args) {
    return (
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        divider={<Divider responsiveBreakpoint="md" noSsr />}
        sx={{ width: 'fit-content', height: 'fit-content' }}
      >
        {['text', 'outlined', 'contained'].map((variant) => (
          <Button
            {...args}
            variant={variant as ButtonProps['variant']}
          >
            {variant}
          </Button>
        ))}
      </Stack>
    );
  },
};
