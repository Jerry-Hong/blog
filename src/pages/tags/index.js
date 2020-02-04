import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { kebabCase } from 'lodash';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { media } from '../../utils/mediaQuery';

const Title = styled.h3`
  ${media.mobile`
    display: none;
  `}
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <Layout header="Tags">
    <Title>Tags</Title>
    <Content>
      {group.map(tag => (
        <Card
          key={tag.fieldValue}
          link={`/tags/${kebabCase(tag.fieldValue)}/`}
          title={tag.fieldValue}
          note={`${tag.totalCount} posts`}
          style={{
            width: 'auto',
            flex: '1 0 auto',
            margin: 10,
          }}
        />
      ))}
    </Content>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
