import type { Meta, StoryObj } from '@storybook/react';
import { GradientButton } from '@/components/atoms/gradient-button';

const meta = {
  title: 'Components/Atoms/GradientButton',
  component: GradientButton,
} satisfies Meta<typeof GradientButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Text: Story = {
  args: {
    variant: 'text',
    size: 'small',
  },
  render: function Render(args) {
    return (
      <GradientButton {...args}>
        Click me
      </GradientButton>
    );
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
  render: function Render(args) {
    return (
      <GradientButton {...args}>
        Click me
      </GradientButton>
    );
  },
};
