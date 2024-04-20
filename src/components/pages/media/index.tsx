import { ChangeEvent, useEffect, useState } from 'react';
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Card,
  CardHeader,
  Typography,
  CardActionArea,
  Tooltip,
  Button,
} from '@mui/material';
import Image from 'next/image';
import { LoadingButton } from '@mui/lab';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useSearchInternalAudiobookQuery } from '@/store/media/internal/audiobook';
import { toKebabCase, toTitleCase } from '@/utilities/strings/case';
import { removeRepeatedChar, slugify } from '@/utilities/strings/sanitize';
import { ProgressiveImage } from '@/components/atoms/progressive-image';
import BaseLayout from '@/components/layouts/base';

const downloadSources = ['apple', 'audible'] as const;
type DownloadSources = typeof downloadSources[number];

type HomePageProps = {
  setTheme: (key: 'dark' | 'light') => void;
  currentThemeKey: 'dark' | 'light';
};

export default function HomePage({ setTheme, currentThemeKey }: HomePageProps) {
  const [downloadSource, setDownloadSource] = useState<DownloadSources | null>('apple');
  const [preSearchString, setPreSearchString] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState<string | null>(null);
  const [mode, setMode] = useState<'download' | 'preview'>('download');
  const [loading, setLoading] = useState(false);

  const {
    data: searchResults,
    isLoading: searchResultsLoading,
  } = useSearchInternalAudiobookQuery(encodeURIComponent(searchTerm), { skip: !loading });
  const handleDownloadSourceChange = (
    event: React.MouseEvent<HTMLElement>,
    newDownloadSource: DownloadSources,
  ) => {
    if (newDownloadSource !== null) {
      setDownloadSource(newDownloadSource);
    }
  };

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'download' | 'preview',
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleSearch = (
    newSearchTerm: string,
  ) => {
    setLoading(true);
    setLastSearchTerm(newSearchTerm);
    setSearchTerm(newSearchTerm);
  };

  const handleDownloadClick = async ({ imageUrl, title, author }: {
    imageUrl: string, title: string, author: string }) => {
    const response = await fetch(imageUrl);

    const url = window.URL.createObjectURL(await response.blob());
    const a = document.createElement('a');
    a.href = url;
    a.download = removeRepeatedChar(`cover${slugify(toKebabCase(`${author}-${title}`))}.jpg`, '-');
    a.click();
  };

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPreSearchString(event.target.value);
  };

  const showError = searchResults
  && searchResults.length === 0
  && searchTerm === lastSearchTerm && !loading;

  const provider = downloadSource === 'apple' ? 'iTunes' : 'Audible';

  useEffect(() => {
    if (searchResults) {
      setLoading(false);
    }
  }, [searchResults]);

  return (
    <BaseLayout title="audiobook" setTheme={setTheme} currentThemeKey={currentThemeKey}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        margin="auto"
      >
        <Grid item sm="auto">
          <ToggleButtonGroup
            value={downloadSource}
            exclusive
            onChange={handleDownloadSourceChange}
            aria-label="download source"
            sx={{
              height: 55,
            }}
          >
            {downloadSources.map((source) => (
              <Tooltip
                key={source}
                title={`Use ${provider} metadata scraping`}
                placement="top"
                arrow
              >
                <ToggleButton
                  // WIP, no other sources exist yet
                  value={source}
                  disabled={source !== 'apple' || searchResultsLoading}
                >
                  <Image
                    style={{
                      filter: `invert(${downloadSource === source ? 1 : 0.5}) sepia(0) saturate(2) hue-rotate(170deg)`,
                    }}
                    src={`/icons/${source}.svg`}
                    width="22"
                    height="22"
                    alt={`${source} logo for download selection button`}
                  />
                </ToggleButton>
              </Tooltip>
            ))}
          </ToggleButtonGroup>
        </Grid>
        <Grid item sm="auto">
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            aria-label="mode"
            sx={{ height: 55 }}
          >
            {['preview', 'download'].map((currentMode) => (
              <Tooltip
                key={currentMode}
                title={`${toTitleCase(currentMode)} image on click`}
                placement="top"
                arrow
              >
                <ToggleButton
                  value={currentMode}
                  // WIP, still need to figure out how to preview
                  disabled={currentMode === 'preview'}
                >
                  {currentMode === 'download' ? <DownloadIcon /> : <PreviewIcon />}
                </ToggleButton>
              </Tooltip>

            ))}
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            label="Title"
            value={preSearchString}
            onChange={handleTextInputChange}
            disabled={searchResultsLoading}
            fullWidth
            error={showError}
            helperText={showError ? 'No results found' : ''}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter' && (preSearchString !== '' && preSearchString !== searchTerm)) {
                handleSearch(preSearchString);
              }
            }}
          />
        </Grid>
        {/* //TODO: Add option to drop down more options for search */}
        <Grid item sm="auto">
          <Button
            sx={{
              height: 55,
            }}
            disabled
            variant="outlined"
            color="info"
          >
            <PlaylistAddIcon />
          </Button>
        </Grid>
        <Grid item sm="auto">
          <LoadingButton
            fullWidth
            disabled={!downloadSource || preSearchString === '' || preSearchString === searchTerm}
            variant="outlined"
            color="success"
            loading={loading}
            onClick={() => handleSearch(preSearchString)}
            sx={{
              height: 55,
            }}
          >
            Search
          </LoadingButton>
        </Grid>
      </Grid>
      {searchResults && searchResults?.length > 0 && (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          marginTop={2}
        >
          {searchResults.map((result) => (
            <Grid item key={result.coverUrlLarge}>
              <Card sx={{ width: '400px', maxWidth: '400px' }}>
                <CardActionArea
                  // disabled={index === 0}
                  onClick={() => handleDownloadClick({
                    imageUrl: result.coverUrlLarge,
                    author: result.artist,
                    title: result.name,
                  })}
                >
                  <CardHeader
                    disableTypography
                    title={<Typography variant="h5" noWrap>{result.name}</Typography>}
                    subheader={result.artist}
                    sx={{ overflow: 'hidden', display: 'block' }}
                  />
                  <ProgressiveImage
                    lowQualitySrc={result.coverUrlSmall}
                    highQualitySrc={result.coverUrlLarge}
                    alt={result.name}
                    width={400}
                    height={400}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </BaseLayout>
  );
}
