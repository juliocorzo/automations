import type { CpuMetric } from '@prisma/client';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ReactNode } from 'react';
import { DateTime } from 'luxon';

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
    return <Typography sx={{ color: 'warning.dark' }} variant="body2">{coreTemperature}</Typography>;
  }

  if (coldestCores.includes(coreNumber)) {
    return <Typography sx={{ color: 'primary.dark' }} variant="body2">{coreTemperature}</Typography>;
  }

  return coreTemperature;
}

export function CpuDataGrid({ data, loading }: CpuDataGridProps) {
  return (
    <DataGrid
      sx={{
        borderRadius: 0,
        border: 'none',
      }}
      density="standard"
      autoPageSize
      loading={loading}
      rows={data.data}
      disableColumnMenu
      disableColumnSelector
      disableColumnFilter
      disableRowSelectionOnClick
      disableDensitySelector
      // sortModel={[{ field: 'id', sort: 'desc' }]}
      columns={[
        // {
        //   field: 'id', headerName: 'ID', maxWidth: 10, align: 'center',
        // },
        {
          field: 'created_at',
          description: 'Date the data was reported',
          headerName: 'Created At',
          minWidth: 160,
          renderCell: (params) => (
            <Typography variant="caption">
              {DateTime.fromISO(params.value).toFormat('y-LL-dd HH:mm:ss ZZZZ')}
            </Typography>
          ),
        },
        {
          field: 'cpu_package_power',
          description: 'Total CPU power draw',
          headerName: 'P (W)',
          headerAlign: 'center',
          align: 'center',
          maxWidth: 75,
        },
        {
          field: 'cpu_package_temp',
          description: 'Total CPU package temperature',
          headerName: 'P (C)',
          headerAlign: 'center',
          align: 'center',
          maxWidth: 75,
        },
        {
          field: 'cpu_cores_average_temp',
          description: 'Average temperature of all CPU cores',
          headerName: 'CA (C)',
          headerAlign: 'center',
          align: 'center',
          maxWidth: 75,
        },
        {
          field: 'cpu_core_max_temp',
          description: 'Maximum temperature of all CPU cores',
          headerName: 'CMa (C)',
          headerAlign: 'center',
          align: 'center',
          maxWidth: 75,
        },
        {
          field: 'cpu_core_min_temp',
          description: 'Minimum temperature of all CPU cores',
          headerName: 'CMi (C)',
          headerAlign: 'center',
          align: 'center',
          maxWidth: 75,
        },
        {
          field: 'cpu_core_0_temp',
          headerName: 'C0 (C)',
          description: 'Core 0 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            0,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_1_temp',
          headerName: 'C1 (C)',
          description: 'Core 1 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            1,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_2_temp',
          headerName: 'C2 (C)',
          description: 'Core 2 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            2,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_3_temp',
          headerName: 'C3 (C)',
          description: 'Core 3 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            3,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_4_temp',
          headerName: 'C4 (C)',
          description: 'Core 4 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            4,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_5_temp',
          headerName: 'C5 (C)',
          description: 'Core 5 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            5,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_6_temp',
          headerName: 'C6 (C)',
          description: 'Core 6 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            6,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_7_temp',
          headerName: 'C7 (C)',
          description: 'Core 7 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            7,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_8_temp',
          headerName: 'C8 (C)',
          description: 'Core 8 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            8,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_9_temp',
          headerName: 'C9 (C)',
          description: 'Core 9 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            9,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_10_temp',
          headerName: 'C10 (C)',
          description: 'Core 10 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            10,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_11_temp',
          headerName: 'C11 (C)',
          description: 'Core 11 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            11,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_12_temp',
          headerName: 'C12 (C)',
          description: 'Core 12 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            12,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        {
          field: 'cpu_core_13_temp',
          headerName: 'C13 (C)',
          description: 'Core 13 temperature',
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => renderCellTemperature(
            13,
            params.value,
            params.row.cpu_max_temp_cores,
            params.row.cpu_min_temp_cores,
          ),
          maxWidth: 75,
        },
        { field: 'cpu_core_utilization', headerName: 'Utilization (%)', align: 'center' },
      ]}
    />
  );
}
