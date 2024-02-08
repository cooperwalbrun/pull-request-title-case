import { getSpecialCaseForm } from '@/content-script/core/special-cases';
import { capitalize, shouldNotCapitalize } from '@/content-script/core/capitalization';

export function titleCase(text: string): string {
  const words = text.split(' ');
  const slashExplodedWords = words.map(x => x.split('/'));
  const ret: string[] = [];
  slashExplodedWords.forEach((tokens, wordIndex) => {
    const current: string[] = [];
    for (const possiblyHyphenatedToken of tokens) {
      const hyphenParts = [];
      for (const token of possiblyHyphenatedToken.split('-')) {
        const specialCase = getSpecialCaseForm(token);
        if (specialCase !== undefined) {
          hyphenParts.push(specialCase);
        } else if (wordIndex === 0 || wordIndex === words.length - 1) {
          hyphenParts.push(capitalize(token));
        } else if (shouldNotCapitalize(token)) {
          hyphenParts.push(token.toLowerCase());
        } else {
          hyphenParts.push(capitalize(token));
        }
      }
      current.push(hyphenParts.join('-'));
    }
    ret.push(current.join('/'));
  });
  return ret.join(' ');
}
