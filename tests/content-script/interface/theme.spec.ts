import { getActiveGitHubTheme, GitHubTheme } from '@/content-script/interface/theme';
import { setTheme } from '../../utilities';

describe('getActiveGitHubTheme()', () => {
  test('no theme found', () => {
    expect(getActiveGitHubTheme()).toEqual(GitHubTheme.LIGHT_DEFAULT);
  });

  for (const theme of Object.values(GitHubTheme)) {
    test(theme, () => {
      setTheme(theme);
      expect(getActiveGitHubTheme()).toEqual(theme);
    });
  }
});
