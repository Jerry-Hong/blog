import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import useSiteMetadata from './SiteMetadata';
import Header from './Header';
import { theme } from '../../theme';

const Continer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.3s;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
};

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleMode = useCallback(() => {
    setDarkMode(state => {
      return !state;
    });
  }, []);

  return (
    <ThemeProvider theme={theme[isDarkMode ? THEME.DARK : THEME.LIGHT]}>
      <Continer>
        <Content>
          <Helmet>
            <html lang="zh" />
            <title>{title}</title>
            <meta name="description" content={description} />

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/img/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              href="/img/favicon-32x32.png"
              sizes="32x32"
            />
            <link
              rel="icon"
              type="image/png"
              href="/img/favicon-16x16.png"
              sizes="16x16"
            />

            <link
              rel="mask-icon"
              href="/img/safari-pinned-tab.svg"
              color="#ff4400"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Noto+Sans+TC"
              rel="stylesheet"
            />
            <meta name="theme-color" content="#fff" />

            <meta property="og:type" content="business.business" />
            <meta property="og:title" content={title} />
            <meta property="og:url" content="/" />
            <meta property="og:image" content="/img/og-image.jpg" />
          </Helmet>
          <Header toggleMode={toggleMode} isDarkMode={isDarkMode} />
          <div>{children}</div>
        </Content>
      </Continer>
    </ThemeProvider>
  );
};

export default Layout;
