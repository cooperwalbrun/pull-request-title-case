import { titleCase } from '@/content-script/core/title-casing';

const testCases = {
  'ci/cd': 'CI/CD',
  'c++': 'C++',
  'testing a zesty test': 'Testing a Zesty Test',
  'release v1': 'Release v1',
  'release v1.0.0': 'Release v1.0.0',
  'release V1.0.0': 'Release v1.0.0',
  'fixinG a github workflow bug': 'Fixing a GitHub Workflow Bug',
  'contains the number 2 in the title': 'Contains the Number 2 in the Title',
  'of and the': 'Of and The',
  'multiple   spaces': 'Multiple   Spaces',
  'mentioning the word github': 'Mentioning the Word GitHub',
  'wrap in "quotes"': 'Wrap in "Quotes"',
  'something with i/o in the title': 'Something with I/O in the Title',
  'ends in a special case word like devops': 'Ends in a Special Case Word Like DevOps',
  'github pull request title-case helper': 'GitHub Pull Request Title-Case Helper'
};

test('titleCase()', () => {
  for (const [test, expected] of Object.entries(testCases)) {
    expect(titleCase(test)).toEqual(expected);
  }
});
