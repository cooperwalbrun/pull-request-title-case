import { PARTIAL_REGEX } from '@/content-script/utilities/constants';

const ARTICLES = ['a', 'an', 'the'];
const CONJUNCTIONS = ['and', 'but', 'for', 'nor', 'or', 'so', 'yet'];
const PREPOSITIONS = ['against', 'as', 'between', 'from', 'in', 'of', 'on', 'to', 'via', 'with'];
const PREFIXES = ['pre', 'post', 'anti', 'co'];

function equalsAnyIgnoreNonAlphabetical(text: string | undefined, list: string[]): boolean {
  const search = text?.replaceAll(PARTIAL_REGEX.NON_ALPHABETICAL_GLOBAL, '') ?? '';
  return (
    text !== undefined && list.find(t => search.toLowerCase() === t.toLowerCase()) !== undefined
  );
}

export function shouldNotCapitalize(token: string): boolean {
  return (
    equalsAnyIgnoreNonAlphabetical(token, ARTICLES) ||
    equalsAnyIgnoreNonAlphabetical(token, CONJUNCTIONS) ||
    equalsAnyIgnoreNonAlphabetical(token, PREPOSITIONS)
  );
}

export function capitalize(tokenPossiblyContainingHyphens: string): string {
  const tokens = tokenPossiblyContainingHyphens.split('-');
  if (tokens.length > 0) {
    if (equalsAnyIgnoreNonAlphabetical(tokens[0], PREFIXES)) {
      tokens[0] = capitalizeSingleToken(tokens[0] ?? '');
      return tokens.join('-');
    } else {
      return tokens.map(capitalizeSingleToken).join('-');
    }
  } else {
    return capitalizeSingleToken(tokenPossiblyContainingHyphens);
  }
}

function capitalizeSingleToken(token: string): string {
  if (token.length > 0) {
    let position = -1;
    for (const character of token) {
      position++;
      if (PARTIAL_REGEX.ALPHABETICAL.test(character)) {
        break;
      }
    }
    return (
      token.slice(0, position) +
      (token[position]?.toUpperCase() ?? '') +
      token.slice(position + 1).toLowerCase()
    );
  } else {
    return '';
  }
}
