import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Book, ArrowRightCircle, ArrowLeftCircle } from 'react-feather';
import { media } from '../../utils/mediaQuery.js';

const SeriesContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--hr);
  border-bottom: 1px solid var(--hr);
  padding: 25px 0;
  margin-bottom: 3em;
`;

const SeriesTitle = styled.h4`
  margin: 0 0 0 10px;

  ${media.mobile`
    display: none;
  `}
`;

const SeriesTitleContent = styled.span`
  display: flex;
  align-items: center;
`;

const SeriesLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--text);
`;

const SeriesLinkText = styled.span`
  font-size: 1.1em;
  font-weight: 500;
  margin: 0 5px;
`;

export const SeriesPagination = ({ previousLink, series, nextLink  }) => (
  <SeriesContent>
    <SeriesLink to={previousLink}>
      <ArrowLeftCircle size={20} />
      <SeriesLinkText>Prev</SeriesLinkText>
    </SeriesLink>
    <SeriesTitleContent>
      <Book size={20} />
      <SeriesTitle>{series}</SeriesTitle>
    </SeriesTitleContent>
    <SeriesLink to={nextLink}>
      <SeriesLinkText>Next</SeriesLinkText>
      <ArrowRightCircle size={20} />
    </SeriesLink>
  </SeriesContent>
);
