import { GitHubTheme } from '@/interface/theme';
import type { JSONObject } from '@/types';

const THEME_DATA: JSONObject<JSONObject<string>> = {
  [GitHubTheme.LIGHT_HIGH_CONTRAST]: {
    'data-color-mode': 'light',
    'data-light-theme': 'light_high_contrast',
    'data-dark-theme': 'dark'
  },
  [GitHubTheme.LIGHT_PROTANOPIA]: {
    'data-color-mode': 'light',
    'data-light-theme': 'light_colorblind',
    'data-dark-theme': 'dark'
  },
  [GitHubTheme.LIGHT_TRITANOPIA]: {
    'data-color-mode': 'light',
    'data-light-theme': 'light_tritanopia',
    'data-dark-theme': 'dark'
  },
  [GitHubTheme.LIGHT_DEFAULT]: {
    'data-color-mode': 'light',
    'data-light-theme': 'light',
    'data-dark-theme': 'dark'
  },
  [GitHubTheme.DARK_HIGH_CONTRAST]: {
    'data-color-mode': 'dark',
    'data-light-theme': 'light',
    'data-dark-theme': 'dark_high_contrast'
  },
  [GitHubTheme.DARK_PROTANOPIA]: {
    'data-color-mode': 'dark',
    'data-light-theme': 'light',
    'data-dark-theme': 'dark_colorblind'
  },
  [GitHubTheme.DARK_TRITANOPIA]: {
    'data-color-mode': 'dark',
    'data-light-theme': 'light',
    'data-dark-theme': 'dark_tritanopia'
  },
  [GitHubTheme.DARK_DIMMED]: {
    'data-color-mode': 'dark',
    'data-light-theme': 'light',
    'data-dark-theme': 'dark_dimmed'
  },
  [GitHubTheme.DARK_DEFAULT]: {
    'data-color-mode': 'dark',
    'data-light-theme': 'light',
    'data-dark-theme': 'dark'
  }
};

export function setTheme(theme: GitHubTheme): void {
  if (Object.prototype.hasOwnProperty.call(THEME_DATA, theme)) {
    for (const [key, value] of Object.entries(THEME_DATA[theme] ?? {})) {
      document.documentElement.setAttribute(key, value);
    }
  }
}

export function awaitableTimeout(milliseconds: number): Promise<number> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
