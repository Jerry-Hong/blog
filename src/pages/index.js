import * as React from 'react';
import PostList from '../components/PostList';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';

const IndexPage = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          limit: 1000
          sort: { fields: frontmatter___date, order: DESC }
        ) {
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
    `
  );

  return (
    <Layout>
      <PostList data={allMarkdownRemark.edges} />
    </Layout>
  );
};

export default IndexPage;
