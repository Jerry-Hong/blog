import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Content, { HTMLContent } from '../components/Content';
import { darken, rgba } from 'polished';

const Section = styled.section`
  position: relative;
  padding: 15px;

  h1 {
    color: ${({ theme }) => darken(0.2, theme.textTitle)};
  }

  h2 {
    font-size: 1.6em;
    margin-top: 1em;
    color: ${({ theme }) => darken(0.1, theme.textTitle)};
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
    background-color: #292C34;
    color: #BBBBBB;
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
    background-color: #292C34;
    color: #BBBBBB;
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
    color: #C778DD;
  }
  .token.tag {
    color: #61AFEF;
  }
  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted,
  .token.attr-value {
    color: #E5C07B;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string{
    color: #E06C74;
  }
  .token.atrule,
  .token.keyword {
    color: #51B6C3;
  }
  .token.function, .token.attr-name {
    color: #98C379;
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
    color: #D09966
  }
`;


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
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
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
          </div>
        </div>
      </div>
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
