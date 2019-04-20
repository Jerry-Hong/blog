import React from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { normalize, rgba } from 'polished';
import Header from './Header';
import { theme, COMMON_COLORS } from '../constants/theme';
import { DOMAIN } from '../constants/index';
import FixedHeader from './FixedHeader';
import { media } from '../utils/mediaQuery';

const Continer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg);
  transition: background-color 0.3s;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 15px;

  ${media.mobile`
    margin-bottom: 50px;
  `};
`;

const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: inherit;
  }

  ${normalize()}

  html {
    font-family: 'Noto Sans TC', sans-serif;
    box-sizing: border-box;
    overflow-y: scroll;
  }

  body, body.light {
    --bg: ${theme[THEME.LIGHT].COLOR.BG};
    --text: ${theme[THEME.LIGHT].COLOR.TEXT};
    --link: ${theme[THEME.LIGHT].COLOR.LINK};
    --title: ${theme[THEME.LIGHT].COLOR.TITLE};
    --desc_bg: ${theme[THEME.LIGHT].COLOR.DESC_BG};
    --inlinecode_bg: ${rgba(theme[THEME.LIGHT].COLOR.INLINECODE_BG, 0.8)};
    --inlinecode: ${theme[THEME.LIGHT].COLOR.INLINECODE};
    --blockcode_bg: ${theme[THEME.LIGHT].COLOR.BLOCKCODE_BG};
    --blockcode: ${theme[THEME.LIGHT].COLOR.BLOCKCODE};
    --logo_eye: ${theme[THEME.LIGHT].COLOR.LOGO_EYE};
    --logo_j: ${theme[THEME.LIGHT].COLOR.LOGO_J};
    --article_text: ${rgba(theme[THEME.LIGHT].COLOR.TEXT, 0.88)};
    --article_title: ${rgba(theme[THEME.LIGHT].COLOR.TITLE, 0.88)};
    --article_blockquote: ${rgba(theme[THEME.LIGHT].COLOR.TEXT, 0.7)};
    --hr: ${rgba(theme[THEME.LIGHT].COLOR.TITLE, 0.3)};
    --shadow: ${theme[THEME.LIGHT].COLOR.SHADOW};
    --card_bg: ${theme[THEME.LIGHT].COLOR.CARD_BG};
    --active: ${theme[THEME.LIGHT].COLOR.ACTIVE};
    --white: ${COMMON_COLORS.WHITE};

    color: var(--text);
    background-color: var(--bg);
  }

  body.dark {
    --bg: ${theme[THEME.DARK].COLOR.BG};
    --text: ${theme[THEME.DARK].COLOR.TEXT};
    --link: ${theme[THEME.DARK].COLOR.LINK};
    --title: ${theme[THEME.DARK].COLOR.TITLE};
    --desc_bg: ${theme[THEME.DARK].COLOR.DESC_BG};
    --inlinecode_bg: ${rgba(theme[THEME.DARK].COLOR.INLINECODE_BG, 0.8)};
    --inlinecode: ${theme[THEME.DARK].COLOR.INLINECODE};
    --blockcode_bg: ${theme[THEME.DARK].COLOR.BLOCKCODE_BG};
    --blockcode: ${theme[THEME.DARK].COLOR.BLOCKCODE};
    --logo_eye: ${theme[THEME.DARK].COLOR.LOGO_EYE};
    --logo_j: ${theme[THEME.DARK].COLOR.LOGO_J};
    --article_text: ${rgba(theme[THEME.DARK].COLOR.TEXT, 0.88)};
    --article_title: ${rgba(theme[THEME.DARK].COLOR.TITLE, 0.88)};
    --article_blockquote: ${rgba(theme[THEME.DARK].COLOR.TEXT, 0.7)};
    --hr: ${rgba(theme[THEME.DARK].COLOR.TITLE, 0.3)};
    --shadow: ${theme[THEME.DARK].COLOR.SHADOW};
    --card_bg: ${theme[THEME.DARK].COLOR.CARD_BG};
    --active: ${theme[THEME.DARK].COLOR.ACTIVE};
    --white: ${COMMON_COLORS.WHITE};
    
    color: var(--text);
    background-color: var(--bg);
  }

  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */  
    color: var(--link);
  }
`;

class Layout extends React.Component {
  state = {
    theme: null,
  };

  componentDidMount () {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  changeMode = mode => {
    window.__setPreferredTheme(mode);
  };

  render () {
    return (
      <StaticQuery
        query={graphql`
          query SITE_METADATA_QUERY {
            site {
              siteMetadata {
                title
                description
              }
            }
          }
        `}
        render={({
          site: {
            siteMetadata: { title, description },
          },
        }) => (
          <React.Fragment>
            <GlobalStyle />
            <Helmet>
              <html lang="zh" />
              <title>{title}</title>
              <meta name="description" content={description} />

              <link
                rel="apple-touch-icon"
                sizes="152x152"
                href="/img/j_logo-152x152.png"
              />
              <link
                rel="icon"
                type="image/png"
                href="/img/j_logo-144x144.png"
                sizes="144x144"
              />
              <link rel="mask-icon" href="/img/j_logo.svg" color="#ff4400" />
              <meta name="theme-color" content="#fff" />

              <meta property="og:type" content="website" />
              <meta property="og:title" content={title} />
              <meta property="og:url" content={DOMAIN} />
              <meta
                property="og:image"
                content={`${DOMAIN}/img/j_logo-144x144.png`}
              />
            </Helmet>
            <Continer>
              <Content>
                <Header toggleMode={this.changeMode} mode={this.state.theme} />
                {this.props.children}
              </Content>
              <FixedHeader
                toggleMode={this.changeMode}
                mode={this.state.theme}
              />
            </Continer>
          </React.Fragment>
        )}
      />
    );
  }
}

export default Layout;
