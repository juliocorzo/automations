import type { CpuMetric } from '@prisma/client';
import { Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ReactNode } from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AcUnitIcon from '@mui/icons-material/AcUnit';

type CpuDataGridProps = {
  loading: boolean;
  data: {
    data: CpuMetric[];
  };
};

function renderCellTemperature(
  coreNumber: number,
  coreTemperature: number,
  hottestCores: number[],
  coldestCores: number[],
): ReactNode {
  if (hottestCores.includes(coreNumber)) {
    return <Chip icon={<WhatshotIcon fontSize="small" />} label={coreTemperature} color="warning" variant="outlined" />;
  }

  if (coldestCores.includes(coreNumber)) {
    return <Chip icon={<AcUnitIcon fontSize="small" />} label={coreTemperature} color="primary" variant="outlined" />;
  }

  return coreTemperature;
}

export function CpuDataGrid({ data, loading }: CpuDataGridProps) {
  return (
    <DataGrid
      density="standard"
      autoPageSize
      loading={loading}
      rows={data.data}
      sortModel={[{ field: 'created_at', sort: 'desc' }]}
      columns={[
        {
          field: 'id', headerName: 'ID', maxWidth: 10, align: 'center',
        },
        {
          field: 'created_at', description: 'Date the data was reported', headerName: 'Created At', minWidth: 200,
        },
        {
          field: 'cpu_package_power', description: 'Total CPU power draw', headerName: 'Package (W)', align: 'center',
        },
        { field: 'cpu_package_temp', headerName: 'Package (C)', align: 'center' },
        { field: 'cpu_cores_average_temp', headerName: 'Core Avg (C)', align: 'center' },
        { field: 'cpu_core_max_temp', headerName: 'Core Max (C)', align: 'center' },
        { field: 'cpu_core_min_temp', headerName: 'Core Min (C)', align: 'center' },
        {
          field: 'cpu_core_0_temp',
          headerName: 'Core 0 (C)',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            0,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
        },
        {
          field: 'cpu_core_1_temp',
          headerName: 'Core 1 (C)',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            1,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
        },
        {
          field: 'cpu_core_2_temp',
          headerName: 'Core 2 (C)',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            2,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
        },
        {
          field: 'cpu_core_3_temp',
          headerName: 'Core 3 (C)',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            3,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
        },
        {
          field: 'cpu_core_4_temp',
          headerName: 'Core 4 (C)',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            4,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
        },
        {
          field: 'cpu_core_5_temp',
          headerName: 'Core 5 (C)',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            5,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
        },
        {
          field: 'cpu_core_6_temp',
          headerName: 'Core 6 (C)',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            6,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
        },
        {
          field: 'cpu_core_7_temp',
          headerName: 'Core 7 (C)',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            7,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
        },
        { field: 'cpu_core_utilization', headerName: 'Utilization (%)', align: 'center' },
      ]}
    />
  );
}
