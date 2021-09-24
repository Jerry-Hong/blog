import styled from 'styled-components';

const langTagColor = [
  { lang: `javascript`, tag: `js`, marginTop: -23 },
  { lang: `js`, tag: `js`, marginTop: -23 },
  { lang: `jsx`, tag: `react` },
  { lang: `graphql`, tag: `graphql` },
  { lang: `gql`, tag: `graphql` },
  { lang: `html`, tag: `html`, marginTop: -23 },
  { lang: `css`, tag: `css`, marginTop: -23 },
  { lang: `shell`, tag: `console` },
  { lang: `sh`, tag: `console` },
  { lang: `bash`, tag: `console` },
  { lang: `yml`, tag: `yaml` },
  { lang: `yaml`, tag: `yaml` },
  { lang: `markdown`, tag: `markdown` },
  { lang: `md`, tag: `markdown` },
  { lang: `mdx`, tag: `mdx` },
  { lang: `json`, tag: `json` },
  { lang: `typescript`, tag: `typescript` },
  { lang: `ts`, tag: `typescript` },
  { lang: `haskell`, tag: `haskell` },
  { lang: `hs`, tag: `haskell` },
  { lang: `sql`, tag: `sql` },
];

const languageTags = langTagColor.map(
  ({ lang, tag, marginTop }) =>
    `pre.grvsc-container[data-language="${lang}"]::before {
        content: ' ';
        width: 24px;
        height: 24px;
        background-image: url(/icon/${tag}.svg);
        background-size: cover;
        position: absolute;
        margin-top: ${marginTop || '-18'}px;
        margin-left: 5px;
      }`
)

export const Section = styled.section`
  color: var(--article_text);
  ${languageTags.join(`\n`)}
  /* background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/7QA2UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAABkcAmcAFEtCVXBVcEpWYmw5SlRwM0pOSW82AP/iAhxJQ0NfUFJPRklMRQABAQAAAgxsY21zAhAAAG1udHJSR0IgWFlaIAfcAAEAGQADACkAOWFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmRlc2MAAAD8AAAAXmNwcnQAAAFcAAAAC3d0cHQAAAFoAAAAFGJrcHQAAAF8AAAAFHJYWVoAAAGQAAAAFGdYWVoAAAGkAAAAFGJYWVoAAAG4AAAAFHJUUkMAAAHMAAAAQGdUUkMAAAHMAAAAQGJUUkMAAAHMAAAAQGRlc2MAAAAAAAAAA2MyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAARkIAAFhZWiAAAAAAAAD21gABAAAAANMtWFlaIAAAAAAAAAMWAAADMwAAAqRYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9jdXJ2AAAAAAAAABoAAADLAckDYwWSCGsL9hA/FVEbNCHxKZAyGDuSRgVRd13ta3B6BYmxmnysab9908PpMP///9sAQwAGBAUFBQQGBQUFBwYGBwkPCgkICAkTDQ4LDxYTFxcWExUVGBsjHhgaIRoVFR4pHyEkJScoJxgdKy4rJi4jJicm/9sAQwEGBwcJCAkSCgoSJhkVGSYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYm/8IAEQgAGAAEAwAiAAERAQIRAf/EABcAAQEBAQAAAAAAAAAAAAAAAAABAwf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAAABEQIRAAAB6WCXAf/EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQAAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIRAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQERAT8BP//EABUQAQEAAAAAAAAAAAAAAAAAAAAx/9oACAEAAAY/Aqqv/8QAGhAAAgMBAQAAAAAAAAAAAAAAAREAQXFRgf/aAAgBAAABPyFqg2NUGwHgez//2gAMAwAAARECEQAAEAIP/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAhEBPxA//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAREBPxA//8QAGxAAAQQDAAAAAAAAAAAAAAAAAQAxYXERIVH/2gAIAQAAAT8Qse+zLqx77Mug4yCDYmXX/9k=); */

  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--article_title);
  }

  h2 {
    font-size: 1.6rem;
    line-height: 3rem;
    margin: 3rem 0 -0.5rem 0;
  }

  h3 {
    margin: 1.5rem 0 0 0;
  }

  a {
    margin: 0 3px;
    &.anchor {
      margin: 0 0 0 -20px;

      svg {
        fill: var(--link);
      }
    }
  }

  blockquote {
    border-left: 3px solid var(--article_blockquote);
    padding: 0 0 0 0.5rem;
    margin: 1.5rem 0 1.5rem 0;
    color: var(--article_blockquote);
  }

  strong {
    color: var(--text);
  }

  hr {
    background: var(--hr);
    height: 1px;
    border: none;
  }

  pre {
    padding: 1rem 0;
    line-height: 1.5;
    margin: 1.5rem 0 0 0;
    overflow: auto;
    word-wrap: normal;
    border-radius: 5px;

    code {
      padding: 0;
      border-radius: unset;
    }
  }

  code {
    font-family: PragmataPro, Lucida Console, Courier, monospace;
    font-size: 18px;
    padding: 0 5px;
    border-radius: 5px;
    background-color: rgb(40, 44, 52, 0.9);
    color: #e5c07b;
  }

  li,
  p {
    margin: 0.75rem 0;
    line-height: 1.5rem;
  }

  .one-monokai .mtk1 {
    color: #bbbbbb;
  }

  .grvsc-line {
    display: inline-block;
    padding-left: 1rem;
  }

  .grvsc-container .grvsc-line-highlighted {
    background-color: var(--code-line-highlighted);
    box-shadow: inset 2px 0 0 0 rgba(255, 255, 255, 0.5);
  }

  pre.grvsc-container[data-language='js']::before {

  }

  .gatsby-code-title {
    padding: 0.5rem 2rem;
    font-size: 1rem;
    font-weight: 700;

    background-color: black;
    color: rgb(204, 204, 204);
    z-index: 0;

    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    ~ pre {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      margin-top: 0;
    }

    ~ pre.grvsc-container[data-language]::before {
      margin-top: -45px;
    }
  }
`;
