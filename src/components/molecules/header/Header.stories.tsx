import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/molecules/header';

const meta = {
  title: 'Components/Molecules/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  parameters: {
    theme: {
      default: 'light',
    },
  },
  args: {
    title: 'automations',
    description: 'a space for experimentation',
  },
  render: function Render(args) {
    return <Header {...args} />;
  },
};

export const WithSubheader: Story = {
  args: {
    title: 'automations',
    description: 'a space for experimentation',
    subheader: [
      {
        title: 'experiments',
        url: '/experiments',
      },
      {
        title: 'about',
        url: '/about',
      },
    ],
  },
  render: function Render(args) {
    return <Header {...args} />;
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: 'automations',
    description: 'a space for experimentation',
    subheader: [
      {
        title: 'experiments',
        url: '/experiments',
      },
      {
        title: 'about',
        url: '/about',
      },
    ],
    breadcrumbs: [
      {
        title: 'Experiments',
        url: '/experiments',
      },
      {
        title: 'AI',
        url: '/experiments/ai',
      },
      {
        title: 'OpenAI Whisper',
        url: '/experiments/ai/whisper',
      },
    ],
  },
  render: function Render(args) {
    return <Header {...args} />;
  },
};
