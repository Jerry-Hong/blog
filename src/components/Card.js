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
  color: var(--text);
  border-radius: 5px;
  background: var(--card_bg);
  box-shadow: 0px 2px 5px var(--shadow);
  margin-bottom: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Title = styled.h2`
  color: var(--title);
  font-size: 1.4em;
  margin: 0 0 0.5em 0;
`;

const Desc = styled.p`
  margin: 0;
  margin-bottom: 2em;
  line-height: 1.5em;
`;

const Note = styled.span`
  margin-top: auto;
`;

const Card = ({ title, desc, note, link, cover, style }) => {
  return (
    <CardLink to={link} style={style}>
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
