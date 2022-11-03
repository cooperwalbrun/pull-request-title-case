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
      "readme's": "README's",
      'contributing.md': 'CONTRIBUTING.md',
      'GRPC': 'gRPC', // Something that follows an unintuitive capitlization scheme
      'Src': 'src', // Something that should never be capitalized
      'Codecov.yml': 'codecov.yml' // Something that should never be capitalized
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
      'iaas': 'IaaS',
      "api's": "API's",
      "api'S": "API's"
    };
    for (const [test, expected] of Object.entries(testCases)) {
      expect(getSpecialCaseForm(test)).toEqual(expected);
    }
  });

  test('dotfiles', () => {
    const testCases = {
      '.aws': '.aws', // A dotfile which also happens to be an acronym
      '.m2': '.m2', // A dotfile which contains a number
      '.something': '.something',
      '.Something': '.Something',
      '.weirdCasing': '.weirdCasing',
      '.prettierrc.Js': '.prettierrc.js',
      ".gitignore's": ".gitignore's",
      ".GITIGNORE's": ".gitignore's",
      '.has-a-hyphen': '.has-a-hyphen',
      '.double.extension': '.double.extension'
    };
    for (const [test, expected] of Object.entries(testCases)) {
      expect(getSpecialCaseForm(test)).toEqual(expected);
    }
  });
});
