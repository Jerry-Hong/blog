import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PostList from '../../components/PostList';
import Layout from '../../components/Layout';

const Posts = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          limit: 1000
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
    <Layout header="Posts">
      <PostList data={allMarkdownRemark.edges} />
    </Layout>
  );
};

export default Posts;
