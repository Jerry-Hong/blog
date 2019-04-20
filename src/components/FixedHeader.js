import React from 'react';
import styled from 'styled-components';
import { media } from '../utils/mediaQuery';

const Content = styled.div`
  display: none;

  ${media.mobile`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: var(--bg);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 10;
  `}
`;

const Title = styled.h4`
  font-size: 0.9em;
`;

const FixedHeader = ({ title }) => {
  return (
    <Content>
      <Title>{title}</Title>
    </Content>
  );
};

export default FixedHeader;
