import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../../components/Layout';
import SpeakingList from '../../components/SpeakingList';

const SpeakingPage = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          limit: 1000
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { templateKey: { eq: "speaking" } } }
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
                time
                event
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
    <Layout header="Speaking">
      <SpeakingList data={allMarkdownRemark.edges} />
    </Layout>
  );
};

export default SpeakingPage;
