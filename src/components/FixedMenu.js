import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Sunrise, Sunset, Book, Cast, Box } from 'react-feather';
import Logo from './Logo';
import { media } from '../utils/mediaQuery';
import { MenuLink } from './Menu';

const Content = styled.div`
  position: fixed;
  bottom: 0;
  display: none;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 15px 20px;
  background: var(--bg);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);

  ${media.mobile`
    display: flex;
  `}
`;

const TitleLink = styled(Link)`
  > svg {
    .logo-eye {
      fill: var(--logo_eye);
    }
    .logo-j {
      fill: var(--logo_j);
    }
  }
`;

const Button = styled.span`
  color: var(--link);
  cursor: pointer;
`;

const INVERT_THEME = {
  dark: 'light',
  light: 'dark',
};

const ToggleThemeButton = ({ mode, onClick }) => (
  <Button onClick={() => onClick(INVERT_THEME[mode])}>
    {mode === 'dark' ? <Sunrise size={22} /> : <Sunset size={22} />}
  </Button>
);

const FixedMenu = ({ mode, toggleMode }) => {
  return (
    <Content>
      <MenuLink to="/posts" aria-label="Go to posts page">
        <Box size={20} />
      </MenuLink>
      <MenuLink to="/series" aria-label="Go to series page">
        <Book size={20} />
      </MenuLink>
      <TitleLink to="/" aria-label="Go to home page">
        <Logo size={30} />
      </TitleLink>
      <MenuLink to="/speaking" aria-label="Go to speaking page">
        <Cast size={21} />
      </MenuLink>
      <ToggleThemeButton mode={mode} onClick={toggleMode} />
    </Content>
  );
};

export default FixedMenu;
