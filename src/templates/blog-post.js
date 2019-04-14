import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { format } from 'date-fns';
import Content, { HTMLContent } from '../components/Content';
import Layout from '../components/Layout';

const Section = styled.section`
  padding: 15px;
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
    color: var(--link);
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

const Title = styled.h1`
  margin-top: 0.3em;
  margin-bottom: 0.3em;
`;
const Note = styled.span``;
const Desc = styled.div`
  display: inline-block;
  padding: 10px;
  margin-top: 3.5em;
  border-radius: 5px;
  background-color: var(--desc_bg);
  color: var(--article_title);
  line-height: 1.5em;
`;

const TagList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin-top: 3em;
  align-items: center;

  &::before {
    content: 'Tags: ';
    margin-right: 10px;
  }
`;

const Tag = styled.li`
  margin-right: 10px;
`;

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  description,
  date,
  timeToRead,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Section>
      {helmet || ''}
      <Title>{title}</Title>
      <Note>
        {format(new Date(date), 'MMM Do, YYYY')}. {timeToRead} mins read
      </Note>
      <Desc>{description}</Desc>

      <PostContent content={content} />
      {tags && tags.length ? (
        <TagList>
          {tags.map(tag => (
            <Tag key={`${tag}tag`}>
              <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
            </Tag>
          ))}
        </TagList>
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
        date={post.frontmatter.date}
        timeToRead={post.timeToRead}
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
        description
      }
    }
  }
`;
