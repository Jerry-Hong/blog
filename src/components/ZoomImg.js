import React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

const StyledFrame = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  background: white;
  transform: translateZ(0);
  z-index: ${({ isZoomed }) => (isZoomed ? 1 : 'auto')};
`;

const Frame = posed(StyledFrame)({
  init: {
    applyAtEnd: { display: 'none' },
    opacity: 0,
  },
  zoom: {
    applyAtStart: { display: 'block' },
    opacity: 1,
  },
});

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99],
};

const StyledImage = styled.img`
  margin: auto;
  cursor: ${({ isZoomed }) => (isZoomed ? 'zoom-out' : 'zoom-in')};
  z-index: ${({ isZoomed }) => (isZoomed ? 2 : 'auto')};
`;

const Image = posed(StyledImage)({
  init: {
    position: 'static',
    width: '100%',
    height: '100%',
    transition,
    flip: true,
  },
  zoom: {
    width: 'auto',
    height: 'auto',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition,
    flip: true,
  },
});

class ZoomImg extends React.Component {
  state = { isZoomed: false };

  zoomIn () {
    window.addEventListener('scroll', this.zoomOut);
    this.setState({ isZoomed: true });
  }

  zoomOut = () => {
    window.removeEventListener('scroll', this.zoomOut);
    this.setState({ isZoomed: false });
  };

  toggleZoom = () => (this.state.isZoomed ? this.zoomOut() : this.zoomIn());

  render () {
    const { isZoomed } = this.state;
    const { style: _, ...props } = this.props;
    const pose = isZoomed ? 'zoom' : 'init';
    console.log(this.props)
    return (
      <span
        style={props.className ? {
          position: 'absolute',
          top: 0,
          left: 0,
        } : {}}
        onClick={this.toggleZoom}
      >
        <Frame isZoomed={isZoomed} pose={pose} className="frame" />
        <Image isZoomed={isZoomed} pose={pose} {...props} />
      </span>
    );
  }
}

export default ZoomImg;
