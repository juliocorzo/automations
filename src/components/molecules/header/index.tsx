import {
  Box,
  Breadcrumbs,
  Container, Stack, Typography, IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Header as StyledHeader,
} from '@/components/molecules/header/Header.styles';
import { GradientButton } from '@/components/atoms/gradient-button';
import { toKebabCase } from '@/utilities/strings/case';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/NightsStayOutlined';

type HeaderProps = {
  /** Page title and main header */
  title: string;
  /** Page description */
  description?: string;
  /** Page subheader */
  subheader?: {
    /** Subheader title */
    title: string;
    /** Subheader URL */
    url: string;
  }[];
  /** Navigation links */
  breadcrumbs?: {
    title: string;
    url: string;
  }[];
  setTheme?: (key: 'dark' | 'light') => void;
  currentThemeKey?: 'dark' | 'light' | undefined;
};

export function Header({
  title,
  description,
  subheader = [],
  breadcrumbs = [],
  setTheme = () => {},
  currentThemeKey = undefined,
}: HeaderProps) {
  const hasSubheader = subheader?.length !== 0;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <StyledHeader>
      <Container
        maxWidth={false}
      >
        <Box
          sx={{
            minHeight: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: hasSubheader ? 'space-between' : 'center',
          }}
        >
          <Stack
            direction="row"
            spacing={2}
          >
            {breadcrumbs.length === 0 && (
              <Typography
                key="test"
                component={Link}
                href="/"
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                {title}
              </Typography>
            )}
            {breadcrumbs.length === 0 && description && (
              <Typography
                noWrap
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                {description}
              </Typography>
            )}
            {breadcrumbs.length > 0 && (
              <Breadcrumbs>
                <Typography
                  component={Link}
                  href="/"
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      color: 'success.main',
                    },
                  }}
                >
                  automations
                </Typography>
                {breadcrumbs.map(({ title: breadcrumbTitle, url }, index) => (
                  <Typography
                    key={toKebabCase(url)}
                    component={index + 1 < breadcrumbs.length ? Link : 'span'}
                    href={url}
                    sx={{
                      color: index + 1 < breadcrumbs.length ? 'inherit' : 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: index + 1 < breadcrumbs.length ? 'success.main' : 'text.primary',
                      },
                    }}
                  >
                    {breadcrumbTitle}
                  </Typography>
                ))}
              </Breadcrumbs>
            )}
          </Stack>
          <Stack
            direction="row"
            justifyContent="end"
            spacing={{ xs: 1, sm: 2 }}
          >
            {hasSubheader && subheader?.map(({ title: subheaderTitle, url }) => (
              <GradientButton
                variant="text"
                size="small"
                key={toKebabCase(subheaderTitle)}
                href={url}
                sx={{ mx: 1 }}
                component={Link}
              >
                {subheaderTitle}
              </GradientButton>
            ))}
            {currentThemeKey !== undefined && (
              <IconButton
                size="small"
                onClick={() => setTheme(currentThemeKey === 'dark' ? 'light' : 'dark')}
              >
                {currentThemeKey !== 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            )}

          </Stack>
        </Box>
      </Container>
    </StyledHeader>
  );
}

export default Header;
