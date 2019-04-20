import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../../../components/Layout';
import PostList from '../../../components/PostList';
import { media } from '../../../utils/mediaQuery';

const FullImage = styled.div`
  background-image: url(${({ src }) => src});
  max-width: 600px;
  height: 400px;
  background-size: cover;
  background-position: top left;
  background-attachment: fixed;
  margin: 0 auto 30px auto;
  border-radius: 5px;

  ${media.mobile`
    background-position: bottom;
  `}
`;
const ImageContent = styled.div`
  display: flex;
  height: 100%;
  line-height: 1;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const ImageTitle = styled.h1`
  color: var(--white);
`;

const RxjsPages = () => {
  const { allMarkdownRemark, file } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "rxjs-thirtydays.png" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allMarkdownRemark(
        limit: 1000
        sort: { fields: frontmatter___date, order: ASC }
        filter: { frontmatter: { templateKey: { eq: "series" } } }
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
  `);

  return (
    <Layout>
      <FullImage src={file.childImageSharp.fluid.src}>
        <ImageContent>
          <ImageTitle>30 天精通 RxJS</ImageTitle>
        </ImageContent>
      </FullImage>
      <PostList data={allMarkdownRemark.edges} />
    </Layout>
  );
};

export default RxjsPages;
