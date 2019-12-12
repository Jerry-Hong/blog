import React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

const Content = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Iframe = props => {
  return (
    <LazyLoad once height={150}>
      <Content>
        <StyledIframe {...props} />
      </Content>
    </LazyLoad>
  );
};

export default Iframe;
