import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { Sunrise, Sunset } from 'react-feather';
import { Link } from 'gatsby';

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 15px;
  margin-bottom: 15px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    #logo-eye {
      fill: var(--logo_eye);
    }
    #logo-j {
      fill: var(--logo_j);
    }
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: var(--title);
  margin: 0 20px;
`;

const Button = styled.span`
  color: var(--link);
  margin-left: auto;
  cursor: pointer;
`;

const INVERT_THEME = {
  dark: 'light',
  light: 'dark',
};

const ToggleThemeButton = ({ mode, onClick }) => (
  <Button
    onClick={() => onClick(INVERT_THEME[mode])}
  >
    {mode === 'dark' ? <Sunrise /> : <Sunset />}
  </Button>
);

const Header = ({ mode, toggleMode }) => {
  return (
    <Content>
      <StyledLink to="/">
        <Logo />
        <Title>J.H. Blog</Title>
      </StyledLink>
      <ToggleThemeButton mode={mode} onClick={toggleMode} />
    </Content>
  );
};

export default Header;
