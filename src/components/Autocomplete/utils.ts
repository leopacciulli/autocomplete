// The hack here was to save time, I extracted these features from the Autosuggest Highlight library, to match and parse to highlight the text.
import { remove as removeDiacritics } from 'remove-accents';

const whitespacesRegex = /\s+/;

const specialCharsRegex = /[.*+?^${}()|[\]\\]/g;

const escapeRegexCharacters = (str: string): string => {
  return str.replace(specialCharsRegex, '\\$&');
};

export const match = (text: string, query: string): number[][] => {
  const cleanedTextArray = Array.from(text).map(x => removeDiacritics(x));
  let cleanedText = cleanedTextArray.join('');

  query = removeDiacritics(query);

  console.log(cleanedText);

  return query
    .trim()
    .split(whitespacesRegex)
    .filter((word: string) => word.length > 0)
    .reduce((result: number[][], word: string) => {
      const wordLen = word.length;
      const prefix = '';
      const regex = new RegExp(prefix + escapeRegexCharacters(word), 'i');
      let occurrence;
      let index;

      occurrence = regex.exec(cleanedText);

      while (occurrence) {
        index = occurrence.index;

        const cleanedLength = cleanedTextArray
          .slice(index, index + wordLen)
          .join('').length;
        const offset = wordLen - cleanedLength;

        const initialOffset =
          index - cleanedTextArray.slice(0, index).join('').length;

        const indexes = [
          index + initialOffset,
          index + wordLen + initialOffset + offset,
        ];

        if (indexes[0] !== indexes[1]) {
          result.push(indexes);
        }

        cleanedText =
          cleanedText.slice(0, index) +
          new Array(wordLen + 1).join(' ') +
          cleanedText.slice(index + wordLen);

        occurrence = regex.exec(cleanedText);
      }

      return result;
    }, [])
    .sort((match1, match2) => match1[0] - match2[0]);
};

export const parse = (
  text: string,
  matches: number[][],
): Array<{
  text: string;
  highlight: boolean;
}> => {
  const result = [];

  if (matches.length === 0) {
    result.push({
      text,
      highlight: false,
    });
  } else if (matches[0][0] > 0) {
    result.push({
      text: text.slice(0, matches[0][0]),
      highlight: false,
    });
  }

  matches.forEach((match, i) => {
    const startIndex = match[0];
    const endIndex = match[1];

    result.push({
      text: text.slice(startIndex, endIndex),
      highlight: true,
    });

    if (i === matches.length - 1) {
      if (endIndex < text.length) {
        result.push({
          text: text.slice(endIndex, text.length),
          highlight: false,
        });
      }
    } else if (endIndex < matches[i + 1][0]) {
      result.push({
        text: text.slice(endIndex, matches[i + 1][0]),
        highlight: false,
      });
    }
  });

  return result;
};
