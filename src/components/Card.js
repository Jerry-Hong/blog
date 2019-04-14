import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  max-width: 600px;
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 5px 10px 15px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 15px;
`;

const Title = styled.h2`
  font-size: 1.4em;
  margin: 0 0 0.5em 0;
`;

const Desc = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 2em;
  line-height: 1.5em;
`;

const Note = styled.span`
  margin-top: auto;
  color: rgba(0, 0, 0, 0.6);
`;

const Card = ({ title, desc, note, link, cover }) => {
  return (
    <CardLink to={link}>
      {cover && (
        <Img
          fluid={cover}
          style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
        />
      )}
      <Content>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <Note>{note}</Note>
      </Content>
    </CardLink>
  );
};

export default Card;
