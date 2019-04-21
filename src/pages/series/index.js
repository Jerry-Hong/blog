import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SeriesList from '../../components/SeriesList';
import Layout from '../../components/Layout';

const SeriesPage = () => {
  const { series } = useStaticQuery(
    graphql`
      query {
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
                    fluid(maxWidth: 240, quality: 64) {
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
      <SeriesList data={series.edges}/>
    </Layout>
  );
};

export default SeriesPage;
