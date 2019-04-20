import * as React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import PostList from '../components/PostList';
import Layout from '../components/Layout';

const Title = styled.h2`
  margin-top: 50px;
`;

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
      <Title>Hi, I'm Jerry.</Title>
      <Desc>
        I'm a software developer specializing in JavaScript and Functional
        Programming.I love learning new thing, and I also enjoy accessibly
        sharing what I learned and what I thought.
      </Desc>
      <Desc>
        Welcome to my Blog!
      </Desc>
      <SubTitle>Latest Posts</SubTitle>
      <PostList data={allMarkdownRemark.edges} />
    </Layout>
  );
};

export default IndexPage;
