import BaseLayout from '@/components/layouts/base';

type HomePageProps = {
  setTheme?: (key: 'dark' | 'light') => void;
  currentThemeKey? : 'dark' | 'light';
};

function HomePage({ setTheme = () => {}, currentThemeKey = 'dark' }: HomePageProps) {
  return (
    <BaseLayout
      title="automations"
      description="a space for experimentation"
      subheader={[
        {
          title: 'experiments',
          url: '/experiments',
        },
        {
          title: 'about',
          url: '/about',
        },
      ]}
      setTheme={setTheme}
      currentThemeKey={currentThemeKey}
    />
  );
}

export default HomePage;
