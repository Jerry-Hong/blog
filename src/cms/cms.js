import CMS from 'netlify-cms';
import React from 'react';

import BlogPostPreview from './preview-templates/BlogPostPreview';
import CSSInjector from './CSSInjector';

CMS.registerPreviewTemplate('blog', props => (
  <CSSInjector>
    <BlogPostPreview {...props} />
  </CSSInjector>
));
