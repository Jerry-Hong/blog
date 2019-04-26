import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Sunrise, Sunset, Book, Cast, Box } from 'react-feather';
import Logo from './Logo';
import { media } from '../utils/mediaQuery';
import { Menu, MenuLink } from './Menu';

const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 25px;
  ${media.mobile`
    display: none;
  `}
`;

const TitleLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;

  > svg {
    .logo-eye {
      fill: var(--logo_eye);
    }
    .logo-j {
      fill: var(--logo_j);
    }
  }
`;

const Title = styled.h1`
  font-size: 1.3em;
  color: var(--title);
  margin: 0 15px;
`;

const StyledMenuLink = styled(MenuLink)`
  margin-left: 25px;
`;

const Button = styled.span`
  color: var(--link);
  margin-left: 30px;
  cursor: pointer;
`;

const INVERT_THEME = {
  dark: 'light',
  light: 'dark',
};

const ToggleThemeButton = ({ mode, onClick }) => (
  <Button onClick={() => onClick(INVERT_THEME[mode])}>
    {mode === 'dark' ? <Sunrise /> : <Sunset />}
  </Button>
);

const Header = ({ mode, toggleMode }) => {
  return (
    <Content>
      <TitleLink to="/">
        <Logo size={30} />
        <Title>J.H. Blog</Title>
      </TitleLink>
      <Menu>
        <StyledMenuLink to="/posts">
          <Box style={{ marginRight: 10 }} size={20} />
          Posts
        </StyledMenuLink>
        <StyledMenuLink to="/series">
          <Book style={{ marginRight: 8 }} size={20} />
          Series
        </StyledMenuLink>
        <StyledMenuLink to="/speaking">
          <Cast style={{ marginRight: 10 }} size={21} />
          Speaking
        </StyledMenuLink>
      </Menu>
      <ToggleThemeButton mode={mode} onClick={toggleMode} />
    </Content>
  );
};

export default Header;
