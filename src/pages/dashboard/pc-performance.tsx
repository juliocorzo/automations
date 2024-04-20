import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/layouts/dashboard';
import { MetricCard } from '@/components/atoms/metric-card';
import { useGetPerformanceMetricQuery } from '@/store/services/performance-metric';
import { DateTime } from 'luxon';

type PerformanceMetricsProps = {
  setTheme?: (key: 'dark' | 'light') => void;
  currentThemeKey?: 'dark' | 'light';
};

function generateBreadcrumbs(url: string): { title: string; url: string }[] {
  return url.split('/').slice(0).map((segment, index, segments) => ({
    title: segment,
    url: segments.slice(0, index + 1).join('/'),
  })).slice(1);
}

function PerformanceMetrics({
  setTheme = () => {},
  currentThemeKey = 'dark',
}: PerformanceMetricsProps) {
  const router = useRouter();
  const breadcrumbs = generateBreadcrumbs(router.pathname);
  const {
    data: metrics,
    error,
    isLoading,
  } = useGetPerformanceMetricQuery(undefined, { pollingInterval: 10000 });
  return (
    <DashboardLayout
      title="Performance Metrics"
      setTheme={setTheme}
      breadcrumbs={breadcrumbs}
      currentThemeKey={currentThemeKey}
      subheader={[
        {
          title: 'Experiments',
          url: '/experiments',
        },
        {
          title: 'About',
          url: '/about',
        },
      ]}
    >
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
        {!error && !isLoading && `Last updated ${DateTime.fromISO(metrics?.createdAt).toFormat('F') || 'never'}`}
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
