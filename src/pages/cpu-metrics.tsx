import { Box } from '@mui/material';
import { CpuDataGrid } from '@/components/molecules/cpu-data-grid';
import { useGetCpuMetricsQuery } from '@/store/services/pc-metrics';
import { DashboardLayout } from '@/components/layouts/dashboard';
// import { ui } from '@/constants/ui';

type CpuMetricsPageProps = {
  setTheme?: (key: 'dark' | 'light') => void;
  currentThemeKey? : 'dark' | 'light';
};

export default function CpuMetrics({ setTheme = () => {}, currentThemeKey = 'dark' }: CpuMetricsPageProps) {
  const {
    data = { data: [] }, isLoading, isFetching, isError,
  } = useGetCpuMetricsQuery(undefined, { pollingInterval: 60000 });

  if (isError) {
    return null;
  }

  return (
    <DashboardLayout
      title="CPU Metrics"
      description="Rolling 1-minute updates of CPU temperatures"
      setTheme={setTheme}
      currentThemeKey={currentThemeKey}
      breadcrumbs={
        [
          {
            title: 'summary',
            url: '/',
          },
          {
            title: 'daily',
            url: '/daily',
          },
          {
            title: 'cpu',
            url: '/daily/cpu',
          },
          {
            title: 'temperatures',
            url: '/daily/cpu/temperature',
          },
        ]
      }
      postcrumbs={
        [
          {
            title: 'explanation',
            url: '/daily/cpu/temperature/explanation',
          },
        ]
      }
    >
      <Box width="100vw" height="calc(100vh - 64px)">
        <CpuDataGrid
          loading={isLoading || isFetching}
          data={data}
        />
      </Box>
    </DashboardLayout>
  );
}
