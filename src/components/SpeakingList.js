import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const SpeakList = ({ data = [] }) => {
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
            note={`${post.frontmatter.event}. ${post.frontmatter.time}`}
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

export default SpeakList;
