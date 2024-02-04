import { ChangeEvent, useEffect, useState } from 'react';
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Card,
  CardMedia,
  CardHeader,
  Typography,
  CardActionArea,
  Tooltip,
} from '@mui/material';
import Image from 'next/image';
import { LoadingButton } from '@mui/lab';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import DashboardLayout from '@/components/layouts/dashboard';
import { useSearchAppleAudiobookQuery } from '@/store/media/apple/audiobook';
import { toKebabCase, toTitleCase } from '@/utilities/strings/case';
import { removeRepeatedChar, slugify } from '@/utilities/strings/sanitize';

const downloadSources = ['apple', 'audible'] as const;
type DownloadSources = typeof downloadSources[number];

export default function Audiobook() {
  const [downloadSource, setDownloadSource] = useState<DownloadSources | null>('apple');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState<string | null>(null);
  const [mode, setMode] = useState<'download' | 'preview'>('download');
  const [loading, setLoading] = useState(false);

  const {
    data: searchResults,
    isLoading: searchResultsLoading,
  } = useSearchAppleAudiobookQuery(searchTerm, { skip: !loading });

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
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
    <DashboardLayout title="audiobook">
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
                  value={source}
              // WIP, no other sources exist yet
                  disabled={source !== 'apple' || searchResultsLoading}
                >
                  <Image style={{ filter: `invert(${downloadSource === source ? 1 : 0.50}) sepia(0) saturate(2) hue-rotate(170deg)` }} src={`/icons/${source}.svg`} width="22" height="22" alt={`${source} logo for download selection button`} />
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
            sx={{
              height: 55,
            }}
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
            value={searchTerm}
            onChange={handleInputChange}
            disabled={searchResultsLoading}
            fullWidth
            error={showError}
            helperText={showError ? 'No results found' : ''}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter' && searchTerm !== '') {
                handleSearch(searchTerm);
              }
            }}
          />
        </Grid>
        <Grid item sm="auto">
          <LoadingButton
            fullWidth
            disabled={!downloadSource || searchTerm === ''}
            variant="outlined"
            color="success"
            loading={loading}
            onClick={() => handleSearch(searchTerm)}
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
              <Card sx={{ maxWidth: '400px' }}>
                <CardActionArea onClick={() => handleDownloadClick({
                  imageUrl: result.coverUrlLarge,
                  author: result.artist,
                  title: result.name,
                })}
                >
                  <CardHeader
                    disableTypography
                    title={<Typography variant="h5" noWrap>{result.name}</Typography>}
                    subheader={result.artist}
                    sx={{
                      overflow: 'hidden',
                      display: 'block',
                    }}
                  />
                  <CardMedia
                    component="img"
                    height="400"
                    width="400"
                    image={result.coverUrlLarge}
                    alt={result.name}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </DashboardLayout>
  );
}
