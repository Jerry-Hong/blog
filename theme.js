import { rgba } from 'polished';

const COMMON_COLOR = {
  DARK_LIGHTEST: '#EDEDEF',
  DARK_LIGHTER: '#B8B8BF',
  DARK_LIGHT: '#82838E',
  DARK: '#4D4E5E',
  DARK_DARK: '#454655',
  DARK_DARKER: '#2E2F38',
  DARK_DARKEST: '#17171C',

  WHITE_LIGHTEST: '#FFFFFF',
  WHITE_LIGHTER: '#FFFFFF',
  WHITE_LIGHT: '#FFFFFF',
  WHITE: '#FFFFFF',
  WHITE_DARK: '#E6E6E6',
  WHITE_DARKER: '#999999',
  WHITE_DARKEST: '#4D4D4D',
};

export const theme = {
  dark: {
    COLOR: {
      BG: COMMON_COLOR.DARK_DARK,
      TEXT: COMMON_COLOR.DARK_LIGHTER,
      LINK: '#FF6200',
      TITLE: COMMON_COLOR.DARK_LIGHTEST,
      DESC_BG: 'rgba(255, 98, 0, 0.15)',
      INLINECODE_BG: '#292c34',
      INLINECODE: '#e5c07b',
      BLOCKCODE_BG: '#292c34',
      BLOCKCODE: '#BBBBBB',
      LOGO_EYE: 'rgba(238, 93, 11, 0.45)',
      LOGO_J: 'rgba(191, 153, 129, 0.28)',
      CARD_BG: COMMON_COLOR.DARK,
      SHADOW: rgba(COMMON_COLOR.DARK_DARKEST, 0.2),
    },
  },
  light: {
    COLOR: {
      BG: '#fff',
      TEXT: '#343E55',
      LINK: '#FF6200',
      TITLE: '#343E55',
      DESC_BG: 'rgba(244, 160, 107, 0.22)',
      INLINECODE_BG: '#292c34',
      INLINECODE: '#e5c07b',
      BLOCKCODE_BG: '#292c34',
      BLOCKCODE: '#BBBBBB',
      LOGO_EYE: '#FF6200',
      LOGO_J: '#343E55',
      CARD_BG: COMMON_COLOR.WHITE_LIGHT,
      SHADOW: rgba(COMMON_COLOR.WHITE_DARKEST, 0.1),
    },
  },
};
