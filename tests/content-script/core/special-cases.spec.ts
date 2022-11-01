import { getSpecialCaseForm } from '@/content-script/core/special-cases';

describe('getSpecialCaseForm()', () => {
  test('special words', () => {
    const testCases = {
      'test': undefined,
      'github': 'GitHub',
      'GitHub': 'GitHub', // No change test case
      '"github"': '"GitHub"',
      'readme': 'README',
      'readme.md': 'README.md',
      'contributing.md': 'CONTRIBUTING.md'
    };
    for (const [test, expected] of Object.entries(testCases)) {
      expect(getSpecialCaseForm(test)).toEqual(expected);
    }
  });

  test('acronyms', () => {
    const testCases = {
      'test': undefined,
      'sdlc': 'SDLC',
      'SDLC': 'SDLC', // No change test case
      '"sdlc"': '"SDLC"',
      '.ssh': '.ssh' // A dotfile which also happens to be an acronym
    };
    for (const [test, expected] of Object.entries(testCases)) {
      expect(getSpecialCaseForm(test)).toEqual(expected);
    }
  });

  test('dotfiles', () => {
    const testCases = {
      '.something': '.something',
      '.Something': '.Something',
      '.weirdCasing': '.weirdCasing',
      '.has-a-hyphen': '.has-a-hyphen',
      '.double.extension': '.double.extension'
    };
    for (const [test, expected] of Object.entries(testCases)) {
      expect(getSpecialCaseForm(test)).toEqual(expected);
    }
  });
});
