import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from '@/components/atoms/metric-card';
import { Grid } from '@mui/material';

const meta = {
  title: 'Components/MetricCard',
  component: MetricCard,
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Template: Story = {
  args: {
    title: 'Inlet Temperature',
    value: 29.1,
    unit: 'C',
    min: 15,
    max: 45,
  },
};

export const Multiple: Story = {
  args: {
    title: 'Inlet Temperature',
    value: 29.1,
    unit: 'C',
    min: 20,
    max: 45,
  },
  render: function Render(args) {
    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item>
          <MetricCard {...args} />
        </Grid>
        <Grid item>
          <MetricCard
            title="Outlet Temperature"
            value={29.9}
            unit="C"
            min={20}
            max={45}
          />
        </Grid>
        <Grid item>
          <MetricCard
            title="Cooling Power"
            value={158}
            unit="W"
            min={0}
            max={400}
          />
        </Grid>
        <Grid item>
          <MetricCard
            title="Flow Rate"
            value={180.6}
            unit="l/h"
            min={30}
            max={200}
          />
        </Grid>
      </Grid>
    );
  },
};
