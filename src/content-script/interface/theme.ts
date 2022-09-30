import { LOGGER } from '@/content-script/utilities/logger';

export enum GitHubTheme {
  // These values correlate to the ones here: https://github.com/settings/appearance
  // Note that there must be a CSS class defined for each of the values below; see main.scss
  LIGHT_DEFAULT = 'prtc-light-default',
  LIGHT_HIGH_CONTRAST = 'prtc-light-high-contrast',
  LIGHT_PROTANOPIA = 'prtc-light-protanopia',
  LIGHT_TRITANOPIA = 'prtc-light-tritanopia',
  DARK_DEFAULT = 'prtc-dark-default',
  DARK_HIGH_CONTRAST = 'prtc-dark-high-contrast',
  DARK_PROTANOPIA = 'prtc-dark-protanopia',
  DARK_TRITANOPIA = 'prtc-dark-tritanopia',
  DARK_DIMMED = 'prtc-dark-dimmed'
}

export function getActiveGitHubTheme(): GitHubTheme {
  const html = document.querySelector('html');
  const theme = html?.getAttribute('data-color-mode');
  const lightModifier = html?.getAttribute('data-light-theme');
  const darkModifier = html?.getAttribute('data-dark-theme');
  if (theme === 'light') {
    if (lightModifier === 'light_high_contrast') {
      return GitHubTheme.LIGHT_HIGH_CONTRAST;
    } else if (lightModifier === 'light_colorblind') {
      return GitHubTheme.LIGHT_PROTANOPIA;
    } else if (lightModifier === 'light_tritanopia') {
      return GitHubTheme.LIGHT_TRITANOPIA;
    } else {
      return GitHubTheme.LIGHT_DEFAULT;
    }
  } else if (theme === 'dark') {
    if (darkModifier === 'dark_high_contrast') {
      return GitHubTheme.DARK_HIGH_CONTRAST;
    } else if (darkModifier === 'dark_colorblind') {
      return GitHubTheme.DARK_PROTANOPIA;
    } else if (darkModifier === 'dark_tritanopia') {
      return GitHubTheme.DARK_TRITANOPIA;
    } else if (darkModifier === 'dark_dimmed') {
      return GitHubTheme.DARK_DIMMED;
    } else {
      return GitHubTheme.DARK_DEFAULT;
    }
  } else {
    LOGGER.warn(`Encountered an unrecognized GitHub theme: "${theme}"`);
    return GitHubTheme.LIGHT_DEFAULT;
  }
}
