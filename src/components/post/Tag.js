import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { kebabCase } from '../../utils/ramdaExtention';

const TagListContent = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin-top: 3em;
  align-items: center;

  &::before {
    content: 'Tags: ';
    margin-right: 10px;
  }
`;

const Tag = styled.li`
  margin-right: 10px;
`;

export const TagList = ({ tags }) =>
  tags &&
  tags.length && (
    <TagListContent>
      {tags.map(tag => (
        <Tag key={`${tag}tag`}>
          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
        </Tag>
      ))}
    </TagListContent>
  );
