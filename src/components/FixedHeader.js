import React from 'react';
import * as R from 'ramda';
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
      <Title>
        {R.ifElse(
          R.pipe(
            R.length,
            R.gt(30)
          ),
          R.identity,
          R.pipe(
            R.slice(0, 30),
            R.concat(R.__, '...')
          )
        )(title)}
      </Title>
    </Content>
  );
};

export default FixedHeader;
