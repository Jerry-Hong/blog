import styled from 'styled-components';
require('katex/dist/katex.min.css');

export const Section = styled.section`
  color: var(--article_text);
  /* background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/7QA2UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAABkcAmcAFEtCVXBVcEpWYmw5SlRwM0pOSW82AP/iAhxJQ0NfUFJPRklMRQABAQAAAgxsY21zAhAAAG1udHJSR0IgWFlaIAfcAAEAGQADACkAOWFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmRlc2MAAAD8AAAAXmNwcnQAAAFcAAAAC3d0cHQAAAFoAAAAFGJrcHQAAAF8AAAAFHJYWVoAAAGQAAAAFGdYWVoAAAGkAAAAFGJYWVoAAAG4AAAAFHJUUkMAAAHMAAAAQGdUUkMAAAHMAAAAQGJUUkMAAAHMAAAAQGRlc2MAAAAAAAAAA2MyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAARkIAAFhZWiAAAAAAAAD21gABAAAAANMtWFlaIAAAAAAAAAMWAAADMwAAAqRYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9jdXJ2AAAAAAAAABoAAADLAckDYwWSCGsL9hA/FVEbNCHxKZAyGDuSRgVRd13ta3B6BYmxmnysab9908PpMP///9sAQwAGBAUFBQQGBQUFBwYGBwkPCgkICAkTDQ4LDxYTFxcWExUVGBsjHhgaIRoVFR4pHyEkJScoJxgdKy4rJi4jJicm/9sAQwEGBwcJCAkSCgoSJhkVGSYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYm/8IAEQgAGAAEAwAiAAERAQIRAf/EABcAAQEBAQAAAAAAAAAAAAAAAAABAwf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAAABEQIRAAAB6WCXAf/EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQAAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIRAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQERAT8BP//EABUQAQEAAAAAAAAAAAAAAAAAAAAx/9oACAEAAAY/Aqqv/8QAGhAAAgMBAQAAAAAAAAAAAAAAAREAQXFRgf/aAAgBAAABPyFqg2NUGwHgez//2gAMAwAAARECEQAAEAIP/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAhEBPxA//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAREBPxA//8QAGxAAAQQDAAAAAAAAAAAAAAAAAQAxYXERIVH/2gAIAQAAAT8Qse+zLqx77Mug4yCDYmXX/9k=); */

  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--article_title);
    margin: 3rem 0 0 0;
  }

  h2 {
    font-size: 1.6rem;
    line-height: 3rem;
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
    background-color: var(--blockcode_bg);
    color: var(--blockcode);
    padding: 0.5rem;
    line-height: 1.5rem;
    margin: 1.5rem 0 0 0;
    overflow: auto;
    word-wrap: normal;
    border-radius: 5px;
  }
  code {
    font-family: Lucida Console, Courier, monospace;
  }
  code[class*='language-text'],
  kbd,
  samp {
    font-size: 1rem;
    padding: 3px;
    background-color: var(--inlinecode_bg);
    color: var(--inlinecode);
    border-radius: 5px;
  }

  li,
  p {
    margin: 0.75rem 0;
    line-height: 1.5rem;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: slategray;
  }
  .token.punctuation {
    color: #999;
  }
  .namespace {
    opacity: 0.7;
  }
  
  .token.property,
  .token.boolean,
  .token.number,
  .token.symbol,
  .token.deleted {
    color: #c778dd;
  }
  .token.tag {
    color: #61afef;
  }
  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted,
  .token.attr-value {
    color: #e5c07b;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #e06c74;
  }
  .token.atrule,
  .token.keyword {
    color: #51b6c3;
  }
  .token.function,
  .token.attr-name {
    color: #98c379;
  }
  .token.regex,
  .token.important,
  .token.variable {
    color: #e90;
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  .token.parameter {
    color: #d09966;
  }

  .gatsby-highlight-code-line {
    background-color: #000;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #f99;
  }
`;
