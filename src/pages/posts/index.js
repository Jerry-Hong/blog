import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import PostList from '../../components/PostList';
import Layout from '../../components/Layout';

const Posts = () => {
  const { allMarkdownRemark, site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
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
                date(formatString: "MMM Do, YYYY")
                image {
                  childImageSharp {
                    fluid(maxWidth: 600, quality: 64, srcSetBreakpoints: [768]) {
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
      <Helmet title={`Posts | ${site.siteMetadata.title}`} />
      <PostList data={allMarkdownRemark.edges} />
    </Layout>
  );
};

export default Posts;
