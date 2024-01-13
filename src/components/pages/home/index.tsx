import { Typography } from '@mui/material';
import HomeLayout from '@/components/layouts/home';

const HomePage = () => (
  <HomeLayout title="ROCS-II Home">
    <Typography variant="h2" component="h1">
      automations
    </Typography>
    <Typography
      variant="h4"
      component="p"
      gutterBottom
      sx={{ color: (theme) => theme.palette.text.disabled }}
    >
      Because I really want to code when I get home from work
    </Typography>
  </HomeLayout>
);

export default HomePage;
