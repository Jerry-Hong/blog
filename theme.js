import { rgba } from 'polished';

// https://www.colorhexa.com/343e55
// https://www.colorhexa.com/ff6200

export const theme = {
  dark: {
    COLOR: {
      BG: '#1e2330',
      TEXT: rgba('#fff3eb', 0.8),
      LINK: '#FF6200',
      TITLE: '#fff3eb',
      DESC_BG: 'rgba(255, 98, 0, 0.15)',
      INLINECODE_BG: '#292c34',
      INLINECODE: '#e5c07b',
      BLOCKCODE_BG: '#292c34',
      BLOCKCODE: '#BBBBBB',
      LOGO_EYE: 'rgba(238, 93, 11, 0.45)',
      LOGO_J: 'rgba(191, 153, 129, 0.28)',
      CARD_BG: '#252c3d',
      SHADOW: 'rgba(0, 0, 0, 0.3)',
    },
  },
  light: {
    COLOR: {
      BG: '#F6F7F8',
      TEXT: '#333E55',
      LINK: '#FF6200',
      TITLE: '#343E55',
      DESC_BG: 'rgba(244, 160, 107, 0.22)',
      INLINECODE_BG: '#292c34',
      INLINECODE: '#e5c07b',
      BLOCKCODE_BG: '#292c34',
      BLOCKCODE: '#BBBBBB',
      LOGO_EYE: '#FF6200',
      LOGO_J: '#343E55',
      CARD_BG: '#fff',
      SHADOW: rgba('#000', 0.1),
    },
  },
};
