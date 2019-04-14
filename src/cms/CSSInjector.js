import React from 'react';
import { StyleSheetManager } from 'styled-components';

class CSSInjector extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      iframeRef: '',
    };
  }

  componentDidMount () {
    const iframe = document.getElementsByTagName('iframe')[0];
    const iframeHeadElem = iframe.contentDocument.head;
    this.setState({ iframeRef: iframeHeadElem });
  }

  render () {
    return (
      <div>
        {this.state.iframeRef && (
          <StyleSheetManager target={this.state.iframeRef}>
            {this.props.children}
          </StyleSheetManager>
        )}
      </div>
    );
  }
}

export default CSSInjector;
