import { FULL_REGEX } from '@/content-script/utilities/constants';

const SPECIAL_CASES = [
  'AppCode',
  'AppSync',
  'CLion',
  'CloudFormation',
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
  'IPv4',
  'IPv6',
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
  'ReSharper',
  'TypeScript',
  'WebStorm'
];

const ACRONYMS = [
  'ALB',
  'APA',
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
  'ECR',
  'EFS',
  'EKS',
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
  'IAM',
  'IO',
  'ITIL',
  'JS',
  'JSON',
  'JSX',
  'JVM',
  'LLVM',
  'MLA',
  'MSSQL',
  'NLB',
  'PaaS',
  'RBAC',
  'RDBMS',
  'RDP',
  'ROSA',
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
  'UAT',
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
  '__init__.py',
  'clippy.toml',
  'CHANGELOG.md',
  'codecov.yml',
  'CODEOWNERS',
  'CONTRIBUTING.md',
  'dist',
  'Dockerfile',
  'favicon.ico',
  'favicon.jpg',
  'favicon.png',
  'favicon.svg',
  'jest.config.cjs',
  'jest.config.js',
  'lib.rs',
  'lint-staged.config.cjs',
  'lint-staged.config.js',
  'main.rs',
  'makefile',
  'manifest.json',
  'Makefile.toml',
  'mypy.ini',
  'node_modules',
  'package-lock.json',
  'package.json',
  'postcss.config.cjs',
  'postcss.config.js',
  'pyproject.toml',
  'README',
  'README.md',
  'robots.txt',
  'rust-toolchain.toml',
  'rustfmt.toml',
  'setup.cfg',
  'src',
  'stylelint.config.cjs',
  'stylelint.config.js',
  'tox.ini',
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
  '.dockerignore',
  '.eslintignore',
  '.eslintrc.cjs',
  '.eslintrc.js',
  '.gitattributes',
  '.gitconfig',
  '.github',
  '.gitignore',
  '.gitkeep',
  '.husky',
  '.idea',
  '.m2',
  '.prettierignore',
  '.prettierrc.cjs',
  '.prettierrc.js',
  '.pypirc',
  '.rustup',
  '.sbt',
  '.scalafmt.conf',
  '.ssh',
  '.stylelintignore',
  '.terraform',
  '.terraform-docs.yml'
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
