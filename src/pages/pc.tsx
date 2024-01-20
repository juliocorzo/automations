import { Grid, Typography } from '@mui/material';
import DashboardLayout from '@/components/layouts/dashboard';
import { MetricCard } from '@/components/atoms/metric-card';
import { useGetPerformanceMetricQuery } from '@/store/services/performance-metric';

const PerformanceMetrics = () => {
  const {
    data: metrics,
    error,
    isLoading,
  } = useGetPerformanceMetricQuery(null as unknown as void, { pollingInterval: 10000 });
  return (
    <DashboardLayout title="Performance Metrics">
      <Typography variant="h2" component="h1">
        Performance Metrics
      </Typography>
      <Typography
        variant="h4"
        component="p"
        gutterBottom
        sx={{ color: (theme) => theme.palette.text.disabled }}
      >
        {/* {JSON.stringify(metrics, null, 2)} */}
      </Typography>
      {!isLoading && !error && metrics && (
        <>
          <Typography variant="h4" component="p" gutterBottom>
            Liquid cooling
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="left"
            alignItems="flex-start"
          >
            <Grid item>
              <MetricCard
                title="Outlet Temperature"
                value={metrics.outletTemperature}
                unit="C"
                min={20}
                max={45}
              />
            </Grid>
            <Grid item>
              <MetricCard
                title="Inlet Temperature"
                value={metrics.inletTemperature}
                unit="C"
                min={20}
                max={45}
              />
            </Grid>
            <Grid item>
              <MetricCard
                title="Cooling Power"
                value={metrics.coolingPower}
                unit="W"
                min={0}
                max={400}
              />
            </Grid>
            <Grid item>
              <MetricCard
                title="Flow Rate"
                value={metrics.flowRate}
                unit="l/h"
                min={30}
                max={200}
              />
            </Grid>
          </Grid>
          <Typography marginTop={2} variant="h4" component="p" gutterBottom>
            CPU
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="left"
            alignItems="flex-start"
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
                title="CPU Load"
                value={metrics.cpuLoad}
                unit="%"
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
          <Typography marginTop={2} variant="h4" component="p" gutterBottom>
            GPU
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="left"
            alignItems="flex-start"
          >
            <Grid item>
              <MetricCard
                title="GPU Temperature"
                value={metrics.gpuTemperature}
                unit="C"
                min={0}
                max={84}
              />
            </Grid>
            <Grid item>
              <MetricCard
                title="GPU Load"
                value={metrics.gpuLoad}
                unit="%"
                min={0}
                max={100}
              />
            </Grid>
            <Grid item>
              <MetricCard
                title="GPU Power"
                value={metrics.gpuPower}
                unit="W"
                min={0}
                max={450}
              />
            </Grid>
          </Grid>
          <Typography marginTop={2} variant="h4" component="p" gutterBottom>
            Air
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="left"
            alignItems="flex-start"
          >
            <Grid item>
              <MetricCard
                title="Motherboard Front Temperature"
                value={metrics.airMotherboardFrontTemperature}
                unit="C"
                min={0}
                max={45}
              />
            </Grid>
            <Grid item>
              <MetricCard
                title="Motherboard Back Temperature"
                value={metrics.airMotherboardBackTemperature}
                unit="C"
                min={0}
                max={45}
              />
            </Grid>
            <Grid item>
              <MetricCard
                title="Case Temperature"
                value={metrics.airCaseTemperature}
                unit="C"
                min={0}
                max={45}
              />
            </Grid>
          </Grid>
        </>
      )}
    </DashboardLayout>
  );
};

export default PerformanceMetrics;
