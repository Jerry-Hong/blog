import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import SeriesList from '../../components/SeriesList';
import Layout from '../../components/Layout';

const SeriesPage = () => {
  const { series, site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        series: allMarkdownRemark(
          limit: 1000
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { type: { eq: "series-data" } } }
        ) {
          edges {
            node {
              id
              fields {
                postsCount
              }
              frontmatter {
                type
                title
                description
                image {
                  childImageSharp {
                    fluid(maxWidth: 600, quality: 64) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                link
              }
            }
          }
        }
      }
    `
  );
  return (
    <Layout header="Series">
      <Helmet title={`Series | ${site.siteMetadata.title}`} />
      <SeriesList data={series.edges} />
    </Layout>
  );
};

export default SeriesPage;
