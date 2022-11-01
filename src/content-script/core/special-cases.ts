import { FULL_REGEX } from '@/content-script/utilities/constants';

const SPECIAL_CASES = [
  'AppCode',
  'CHANGELOG.md',
  'CLion',
  'CloudFront',
  'CODEOWNERS',
  'CONTRIBUTING.md',
  'DataGrip',
  'DataSpell',
  'DevOps',
  'ESLint',
  'GitHub',
  'GitOps',
  'GraphQL',
  'HashiCorp',
  'IntelliJ',
  'JavaScript',
  'PostCSS',
  'PyCharm',
  'PyPI',
  'README',
  'README.md',
  'ReSharper',
  'TypeScript',
  'WebStorm'
];

const ACRONYMS = [
  'AWS',
  'CD', // This is defined so that the "CD" part of "CI/CD" works
  'CI', // This is defined so that the "CI" part of "CI/CD" works
  'CICD',
  'CIDR',
  'CSS',
  'HTML',
  'HTML5',
  'HTTP',
  'HTTPS',
  'JSON',
  'JSX',
  'S3',
  'SCSS',
  'SDLC',
  'SSH',
  'SSL',
  'TLS',
  'TSX',
  'URL',
  'VCS',
  'WAF',
  'XML',
  'YAML',
  'YML'
];

const MASTER_LIST = SPECIAL_CASES.concat(ACRONYMS);

export function getSpecialCaseForm(token: string): string | undefined {
  if (FULL_REGEX.SEMANTIC_VERSION.test(token.toLowerCase())) {
    return token.toLowerCase();
  }
  if (FULL_REGEX.DOTFILE.test(token)) {
    // If the token is a dotfile (.gitignore, .gitkeep, etc)
    return token;
  }
  for (const x of MASTER_LIST) {
    const position = token.toLowerCase().indexOf(x.toLowerCase());
    if (position !== -1) {
      const beforePosition = token.slice(0, position);
      const afterPosition = token.slice(position + x.length);
      if (
        FULL_REGEX.NON_ALPHABETICAL.test(beforePosition) &&
        FULL_REGEX.NON_ALPHABETICAL.test(afterPosition)
      ) {
        return beforePosition + x + afterPosition;
      }
    }
  }
  return undefined;
}
