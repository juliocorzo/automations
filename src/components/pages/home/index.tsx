import { Typography } from '@mui/material';
import HomeLayout from '@/components/layouts/home';

const HomePage = () => (
  <HomeLayout title="ROCS-II Home">
    <Typography variant="h2" component="h1">
      ROCS-II Home
    </Typography>
    <Typography
      variant="h4"
      component="p"
      gutterBottom
      sx={{ color: (theme) => theme.palette.text.disabled }}
    >
      Name pending
    </Typography>
  </HomeLayout>
);

export default HomePage;
