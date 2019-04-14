import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Content, { HTMLContent } from '../components/Content';
import { darken, rgba } from 'polished';
import Layout from '../components/Layout';

const Section = styled.section`
  padding: 15px;

  h1 {
    color: ${({ theme }) => theme.textTitle};
  }

  h2 {
    font-size: 1.6em;
    margin-top: 1em;
    color: ${({ theme }) => theme.textTitle};
  }

  h3 {
    margin-top: 0.5em;
    color: ${({ theme }) => theme.textTitle};
  }

  a {
    color: ${({ theme }) => theme.activeColor};
  }

  blockquote {
    border-left: 3px solid rgb(229, 229, 235);
    padding: 0 0 0 0.5em;
    margin: 1.5em 0 2em 1em;
    color: ${rgba('#000', 0.6)};
  }

  strong {
    color: ${darken(0.1, '#575e70')};
  }

  pre {
    background-color: #292c34;
    color: #bbbbbb;
    padding: 0.5em;
    line-height: 1.5em;
    margin-top: 20px;
    margin-bottom: 0;
    overflow: auto;
    word-wrap: normal;
    border-radius: 5px;
  }
  code,
  kbd,
  samp {
    font-size: 1em;
    padding: 5px;
    background-color: #292c34;
    color: #bbbbbb;
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

const Title = styled.h1``;

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Section>
      {helmet || ''}
      <Title>{title}</Title>
      <PostContent content={content} />
      {tags && tags.length ? (
        <div style={{ marginTop: `4rem` }}>
          <h4>Tags</h4>
          <ul className="taglist">
            {tags.map(tag => (
              <li key={`${tag}tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.object,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.htmlAst}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;
