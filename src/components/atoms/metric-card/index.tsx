import {
  Card, CardContent, Typography,
} from '@mui/material';
import { Slider } from '@/components/atoms/metric-card/MetricCard.styles';

export type PerformanceMetricReadableName =
  'Inlet Temperature' | 'Outlet Temperature' | 'Cooling Power' | 'Flow Rate' | 'CPU Temperature' |
  'CPU Power' | 'GPU Power' | 'Flow Rate' |
  'CPU Load' | 'GPU Temperature' | 'GPU Load' | 'Memory Load' |
  'Motherboard Front Temperature' | 'Motherboard Back Temperature' | 'Case Temperature' | 'Motherboard Chipset';

export type PerformanceMetricUnit = 'C' | 'W' | 'l/h' | '%';

export type MetricCardProps = {
  /** Performance metric title */
  title: PerformanceMetricReadableName;
  /** Value for the performance metric */
  value: number;
  /** Unit for the performance metric */
  unit: PerformanceMetricUnit;
  /** Minimum value for the performance metric */
  min: number;
  /** Maximum value for the performance metric */
  max: number;
};

export const MetricCard = ({
  title,
  value,
  unit,
  min,
  max,
}: MetricCardProps) => (
  <Card sx={{ minWidth: '240px' }}>
    <CardContent>
      <Typography
        color="textSecondary"
        gutterBottom
        variant="h6"
        component="h2"
      >
        {title}
      </Typography>
      <Typography variant="h3" component="div">
        {value}
        <Typography marginLeft={1} variant="h5" component="span">
          {unit}
        </Typography>
      </Typography>
      <Slider
          // color={color}
        track={false}
        disabled
        value={value}
        min={min}
        max={max}
        sx={{
          marginTop: 2,
          marginBottom: -2,
        }}
      />
    </CardContent>
  </Card>
);

export default MetricCard;
