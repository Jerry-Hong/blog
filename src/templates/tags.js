import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { media } from '../utils/mediaQuery';

const Title = styled.h3`
  ${media.mobile`
    display: none;
  `}
`;

class TagRoute extends React.Component {
  render () {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;

    return (
      <Layout header={`Tags / ${tag}`}>
        <Helmet title={`${tag} | ${title}`} />
        <Title>Tag / {tag}</Title>
        <PostList data={posts} />
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          fields {
            slug
          }
          frontmatter {
            tags
            templateKey
            title
            description
            date
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
