export const BUTTON_ID = 'prtc-button';

export const PARTIAL_REGEX = {
  // These regular expressions can match any part of a body of text
  ALPHABETICAL: /[a-zA-Z]/,
  NON_ALPHABETICAL: /[^a-zA-Z]/,
  NON_ALPHABETICAL_GLOBAL: /[^a-zA-Z]/g
};

export const FULL_REGEX = {
  // These regular expressions should only match the entire text (i.e. begin with ^ and end with $)
  NON_ALPHABETICAL: /^[^a-zA-Z]*$/,
  DOTFILE: /^\.[a-zA-Z.-]+('s[^a-zA-Z]*)?$/, // Includes an optional match for the POSSESSIVE pattern at the end
  POSSESSIVE: /^'s[^a-zA-Z]*$/,
  SEMANTIC_VERSION: /^v[0-9]+\.?([0-9]+\.?)*$/
};
