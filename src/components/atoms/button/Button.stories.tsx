import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/atoms/button';

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
