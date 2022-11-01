import { getSpecialCaseForm } from '@/content-script/core/special-cases';
import { capitalize, shouldNotCapitalize } from '@/content-script/core/capitalization';

export function titleCase(text: string): string {
  const words = text.split(' ');
  const slashExplodedWords = words.map(x => x.split('/'));
  const ret: string[] = [];
  slashExplodedWords.forEach((tokens, wordIndex) => {
    const current: string[] = [];
    for (const token of tokens) {
      const specialCase = getSpecialCaseForm(token);
      if (specialCase !== undefined) {
        current.push(specialCase);
      } else if (wordIndex === 0 || wordIndex === words.length - 1) {
        current.push(capitalize(token));
      } else if (shouldNotCapitalize(token)) {
        current.push(token.toLowerCase());
      } else {
        current.push(capitalize(token));
      }
    }
    ret.push(current.join('/'));
  });
  return ret.join(' ');
}
