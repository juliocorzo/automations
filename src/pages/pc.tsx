import { Grid, Typography } from '@mui/material';
import DashboardLayout from '@/components/layouts/dashboard';
import { MetricCard } from '@/components/atoms/metric-card';
import { useGetPerformanceMetricQuery } from '@/store/services/performance-metric';

function PerformanceMetrics() {
  const {
    data: metrics,
    error,
    isLoading,
  } = useGetPerformanceMetricQuery(undefined, { pollingInterval: 10000 });
  return (
    <DashboardLayout title="Performance Metrics">
      <Typography variant="h4" component="h1" marginTop={4}>
        Performance Metrics
      </Typography>
      <Typography
        variant="h5"
        component="p"
        gutterBottom
        sx={{ color: (theme) => theme.palette.text.disabled }}
      >
        {isLoading && 'Loading latest metrics...'}
        {error && 'Failed to load metrics'}
        {!error && !isLoading && `Last updated ${metrics?.createdAt || 'never'}`}
      </Typography>
      {!isLoading && !error && metrics && (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="left"
          alignItems="flex-start"
          marginTop={2}
        >
          <Grid item>
            <MetricCard
              title="CPU Temperature"
              value={metrics.cpuTemperature}
              unit="C"
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>
            <MetricCard
              title="CPU Power"
              value={metrics.cpuPower}
              unit="W"
              min={0}
              max={320}
            />
          </Grid>
        </Grid>
      )}
    </DashboardLayout>
  );
}

export default PerformanceMetrics;
