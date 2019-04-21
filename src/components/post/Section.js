import styled from 'styled-components';

export const Section = styled.section`
  color: var(--article_text);

  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--article_title);
    margin-top: 2.5em;
    margin-bottom: 1.5em;
  }

  h2 {
    font-size: 1.6em;
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
    padding: 0 0 0 0.5em;
    margin: 1.5em 0 2em 1em;
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
    padding: 0.5em;
    line-height: 1.5em;
    margin-top: 20px;
    margin-bottom: 0;
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
    font-size: 1em;
    padding: 3px;
    background-color: var(--inlinecode_bg);
    color: var(--inlinecode);
    border-radius: 5px;
  }

  li,
  p {
    line-height: 1.5em;
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
  .token.constant,
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
`;
