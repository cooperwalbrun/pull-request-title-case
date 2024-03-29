import { capitalize, shouldNotCapitalize } from '@/content-script/core/capitalization';

test('shouldNotCapitalize()', () => {
  const testCases = {
    '': false,
    '   ': false,
    'test': false,
    '"test"': false,
    'of': true,
    'and': true,
    '"and': true,
    'brand': false,
    'andies': false
  };

  for (const [test, expected] of Object.entries(testCases)) {
    expect(shouldNotCapitalize(test)).toBe(expected);
  }
});

test('capitalize()', () => {
  // The testCases below should test only a single "token", which depends on the logic in
  // title-casing.ts (i.e. how we choose to split up incoming text into smaller chunks)
  const testCases = {
    '': '',
    '   ': '   ',
    'test': 'Test',
    '"test"': '"Test"'
  };

  for (const [test, expected] of Object.entries(testCases)) {
    expect(capitalize(test)).toEqual(expected);
  }
});
