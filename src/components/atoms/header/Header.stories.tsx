import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/atoms/header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Template: Story = {
  args: {
    title: 'interesting title',
    description: 'interesting description',
  },
  render: function Render(args) {
    return <Header {...args} />;
  },
};
