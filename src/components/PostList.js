import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import { format } from 'date-fns';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  margin: 0 auto;
`;

const PostList = ({ data = [] }) => {
  console.log(data);
  return (
    <Content>
      {data
        .map(post => post.node)
        .map(post => (
          <Card
            key={post.id}
            link={post.fields.slug}
            title={post.frontmatter.title}
            desc={post.frontmatter.description}
            note={`${format(
              new Date(post.frontmatter.date),
              'MMM Do, YYYY'
            )}. ${post.timeToRead} mins read`}
            cover={
              post.frontmatter.image
                ? post.frontmatter.image.childImageSharp.fluid
                : null
            }
          />
        ))}
    </Content>
  );
};

export default PostList;
