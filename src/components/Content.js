import React from 'react';
import PropTypes from 'prop-types';
import rehypeReact from 'rehype-react';
import ZoomImg from './ZoomImg';
import Iframe from './Iframe';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    img: ZoomImg,
    iframe: Iframe,
  },
}).Compiler;

export const HTMLContent = ({ content, className }) => (
  <div className={className}>{renderAst(content)}</div>
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

export default Content;
