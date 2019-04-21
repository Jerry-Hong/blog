import React from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import Card from './Card';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const SeriesList = ({ data = [] }) => {
  return (
    <Content>
      {R.pipe(
        R.map(R.prop('node')),
        R.map(series => (
          <Card
            key={R.path(['frontmatter', 'title'], series)}
            title={R.path(['frontmatter', 'title'], series)}
            link={`/series/${R.path(['frontmatter', 'link'], series)}`}
            cover={R.path(
              ['frontmatter', 'image', 'childImageSharp', 'fluid'],
              series
            )}
            desc={R.path(['frontmatter', 'description'], series)}
            note={`共 ${R.path(['fields', 'postsCount'], series)} 篇文章`}
          />
        ))
      )(data)}
    </Content>
  );
};

export default SeriesList;
