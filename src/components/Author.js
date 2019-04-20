import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 2em;
  max-width: 600px;
`;

const Avatar = styled.img`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  margin-left: -3px;
  margin-right: 0.875em;
`;

const Desc = styled.p`
  display: flex;
  flex-direction: column;
  line-height: 1.5em;
`;

const Author = () => {
  return (
    <Content>
      <Avatar src="/img/author.jpg" alt="author avatar" />
      <Desc>
        <span>
          Hello, I'm <a href="/">Jerry Hong</a>.
        </span>
        <span>Welcome to my personal blog.</span>
      </Desc>
    </Content>
  );
};

export default Author;
