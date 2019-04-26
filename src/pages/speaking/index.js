import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../../components/Layout';
import SpeakingList from '../../components/SpeakingList';

const SpeakingPage = () => {
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
      <Helmet title={`Speaking | ${site.siteMetadata.title}`} />
      <SpeakingList data={allMarkdownRemark.edges} />
    </Layout>
  );
};

export default SpeakingPage;
