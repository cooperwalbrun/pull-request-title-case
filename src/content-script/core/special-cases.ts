import { FULL_REGEX } from '@/content-script/utilities/constants';

const SPECIAL_CASES = [
  'AppCode',
  'AppSync',
  'CLion',
  'CloudFront',
  'DataGrip',
  'DataSpell',
  'DevOps',
  'DynamoDB',
  'ESLint',
  'GitHub',
  'GitOps',
  'GraphQL',
  'HashiCorp',
  'IntelliJ',
  'JavaScript',
  'MongoDB',
  'NoSQL',
  'OpenShift',
  'OpenSSL',
  'PostCSS',
  'PostgreSQL',
  'PowerShell',
  'PyCharm',
  'PyPI',
  'RDBMS',
  'ReSharper',
  'TypeScript',
  'WebStorm'
];

const ACRONYMS = [
  'API',
  'AWS',
  'CD', // This is defined so that the "CD" part of "CI/CD" works
  'CI', // This is defined so that the "CI" part of "CI/CD" works
  'CICD',
  'CIDR',
  'CLI',
  'CSS',
  'DB',
  'DHCP',
  'DNS',
  'EC2',
  'FTP',
  'FTPS',
  'gRPC',
  'GUI',
  'HCL',
  'HTML',
  'HTML5',
  'HTTP',
  'HTTPS',
  'IaC',
  'IaaS',
  'IO',
  'ITIL',
  'JS',
  'JSON',
  'JSX',
  'MSSQL',
  'PaaS',
  'RDP',
  'S3',
  'SaaS',
  'SCSS',
  'SDLC',
  'SQL',
  'SSH',
  'SSL',
  'TS',
  'TLS',
  'TSX',
  'UI',
  'URL',
  'VCS',
  'VS',
  'WAF',
  'XML',
  'YAML',
  'YML'
];

const SOFTWARE_FILES = [
  'CHANGELOG.md',
  'codecov.yml',
  'CODEOWNERS',
  'CONTRIBUTING.md',
  'favicon.ico',
  'favicon.jpg',
  'favicon.png',
  'favicon.svg',
  'lint-staged.config.cjs',
  'lint-staged.config.js',
  'node_modules',
  'postcss.config.cjs',
  'postcss.config.js',
  'README',
  'README.md',
  'robots.txt',
  'src',
  'stylelint.config.cjs',
  'stylelint.config.js',
  'tsconfig.json',
  'tsconfig.node.json', // This file is provisioned as part of Vite project templates, so it is popular enough to justify an entry here
  'vite.config.js',
  'vite.config.ts'
];

const DOTFILES = [
  '.aws',
  '.bashrc',
  '.cargo',
  '.docker',
  '.eslintignore',
  '.eslintrc.js',
  '.gitattributes',
  '.gitconfig',
  '.github',
  '.gitignore',
  '.husky',
  '.idea',
  '.m2',
  '.prettierignore',
  '.prettierrc.js',
  '.pypirc',
  '.rustup',
  '.sbt',
  '.ssh',
  '.stylelintignore',
  '.terraform'
];

// The .sort() below is so that dotfiles are guaranteed to come first (they take precedence in
// situations where a dotfile's name is both an acronym and a proper dotfile such as .ssh or .aws)
const MASTER_LIST = SPECIAL_CASES.concat(ACRONYMS).concat(DOTFILES).concat(SOFTWARE_FILES).sort();

export function getSpecialCaseForm(token: string): string | undefined {
  if (FULL_REGEX.SEMANTIC_VERSION.test(token.toLowerCase())) {
    return token.toLowerCase();
  }
  for (const x of MASTER_LIST) {
    const position = token.toLowerCase().indexOf(x.toLowerCase());
    if (position !== -1) {
      const beforeWord = token.slice(0, position);
      const afterWord = token.slice(position + x.length);
      const isPossessive = FULL_REGEX.POSSESSIVE.test(afterWord.toLowerCase());
      if (
        FULL_REGEX.NON_ALPHABETICAL.test(beforeWord) &&
        (FULL_REGEX.NON_ALPHABETICAL.test(afterWord) || isPossessive)
      ) {
        if (isPossessive) {
          return beforeWord + x + afterWord.toLowerCase();
        } else {
          return beforeWord + x + afterWord;
        }
      }
    }
  }
  if (FULL_REGEX.DOTFILE.test(token)) {
    // This condition comes after the MASTER_LIST section because we want to be able to control the
    // "proper" casing of dotfiles
    return token;
  }
  return undefined;
}
