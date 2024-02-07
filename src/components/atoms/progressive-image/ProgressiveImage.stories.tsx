import type { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/client-api';
import { ProgressiveImage, ControlledProgressiveImage } from '@/components/atoms/progressive-image';
import {
  Card as MuiCard, CardHeader, Typography, IconButton, Tooltip,
} from '@mui/material';
import DownloadingIcon from '@mui/icons-material/Downloading';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const meta = {
  title: 'Components/ProgressiveImage',
  component: ProgressiveImage,
} satisfies Meta<typeof ProgressiveImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseUrl = 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/a6/77/0f/a6770f2a-6314-1243-a67d-8e4c59c8e29f/9781938570421.png';
const lowQualitySrc = `${baseUrl}/100x100bb.jpg`;
const highQualitySrc = `${baseUrl}/100000x100000-999.jpg`;

export const Card: Story = {
  args: {
    lowQualitySrc,
    highQualitySrc,
    alt: 'Cover of the audiobook "Tress of the Emerald Sea" by Brandon Sanderson',
  },
  render: function Render(args) {
    return (
      <MuiCard sx={{ width: '400px' }}>
        <CardHeader
          disableTypography
          title={<Typography variant="h5" noWrap>Tress of the Emerald Sea</Typography>}
          subheader="Brandon Sanderson"
          sx={{
            overflow: 'hidden',
            display: 'block',
          }}
        />
        <ProgressiveImage {...args} width={400} height={400} />
      </MuiCard>
    );
  },
};

export const ControlledCard: Story = {
  args: {
    lowQualitySrc,
    highQualitySrc,
    alt: 'Cover of the audiobook "Tress of the Emerald Sea" by Brandon Sanderson',
  },
  render: function Render(args) {
    const [loading, setLoading] = useState(true);
    return (
      <MuiCard sx={{ maxWidth: 400 }}>
        <CardHeader
          disableTypography
          title={<Typography variant="h5" noWrap>Tress of the Emerald Sea</Typography>}
          subheader="Brandon Sanderson"
          action={(
            <IconButton
              sx={{ marginTop: 1 }}
              aria-label="download"
              onClick={() => {
                setLoading(!loading);
              }}
            >
              <Tooltip title={`Click to set ${loading ? 'loaded' : 'loading'} state`} placement="top" disableInteractive>

                {loading ? <DownloadingIcon /> : <ArrowCircleDownIcon />}
              </Tooltip>
            </IconButton>
          )}
        />
        <ControlledProgressiveImage {...args} imageLoading={loading} width={400} height={400} />
      </MuiCard>
    );
  },
};

export const Raw: Story = {
  args: {
    lowQualitySrc,
    highQualitySrc,
    alt: 'Cover of the audiobook "Tress of the Emerald Sea" by Brandon Sanderson',
  },
  render: function Render(args) {
    return <ProgressiveImage {...args} />;
  },
};
