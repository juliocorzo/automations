import { Box } from '@mui/material';
import { CpuDataGrid } from '@/components/molecules/cpu-data-grid';
import { useGetCpuMetricsQuery } from '@/store/services/pc-metrics';

export default function CpuMetrics() {
  const {
    data, isFetching, isError,
  } = useGetCpuMetricsQuery(undefined, { pollingInterval: 60000 });

  if (!data || isError) {
    return null;
  }

  return (
    <Box width="100vw" height="100vh">
      <CpuDataGrid loading={isFetching} data={data} />
    </Box>
  );
}
