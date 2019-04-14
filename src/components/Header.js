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
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.COLOR.TITLE};
  margin: 0 20px;
`;

const Button = styled.span`
  color: ${({ theme }) => theme.COLOR.LINK};
  margin-left: auto;
  cursor: pointer;
`;

const ToggleThemeButton = ({ isDarkMode, onClick }) => (
  <Button onClick={onClick}>{isDarkMode ? <Sunrise /> : <Sunset />}</Button>
);

const Header = ({ isDarkMode, toggleMode }) => {
  return (
    <Content>
      <StyledLink to="/">
        <Logo />
        <Title>Jerry Blog</Title>
      </StyledLink>
      <ToggleThemeButton isDarkMode={isDarkMode} onClick={toggleMode} />
    </Content>
  );
};

export default Header;
