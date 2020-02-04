import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import PostList from '../components/PostList';
import Layout from '../components/Layout';
import SeriesList from '../components/SeriesList';
import SpeakingList from '../components/SpeakingList';
import { media } from '../utils/mediaQuery';

const Content = styled.div`
  margin-top: 50px;

  ${media.mobile`
    margin-top: unset;
  `}
`;

const Title = styled.h2``;

const Desc = styled.p`
  line-height: 1.5em;
`;

const SubTitle = styled.h2`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 20px;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const IndexPage = () => {
  const { posts, speakings, series } = useStaticQuery(
    graphql`
      query {
        posts: allMarkdownRemark(
          limit: 5
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
                    fluid(maxWidth: 600, quality: 64) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
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

        speakings: allMarkdownRemark(
          limit: 3
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
                    fluid(maxWidth: 600, quality: 64) {
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
    <Layout header="Home">
      <Content>
        <Title>Hi, I'm Jerry.</Title>
        <Desc>
          I'm a software developer specializing in JavaScript and Functional
          Programming.I love learning new thing, and I also enjoy accessibly
          sharing what I learned and what I thought.
        </Desc>
        <SubTitle>Latest Posts</SubTitle>
        <PostList data={posts.edges} />
        <SubTitle>Series</SubTitle>
        <SeriesList data={series.edges}/>
        <SubTitle>Speaking</SubTitle>
        <SpeakingList data={speakings.edges} />
      </Content>
    </Layout>
  );
};

export default IndexPage;
