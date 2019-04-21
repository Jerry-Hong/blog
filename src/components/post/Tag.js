import * as React from 'react';
import styled from 'styled-components';
import { Tag as TagIcon } from 'react-feather';
import { Link } from 'gatsby';
import { kebabCase } from '../../utils/ramdaExtention';

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 3em;
  margin-bottom: 2.5em;
`;

const TagListContent = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const Tag = styled.li`
  border: 1px solid var(--link);
  border-radius: 3px;
  margin-bottom: 1em;
  margin-right: 1em;
  padding: 0 3px;
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.1em;
`;

export const TagList = ({ tags }) =>
  tags &&
  tags.length && (
    <Content>
      <Title>
        <TagIcon size={20} style={{ marginRight: 5 }} />
        Tags
      </Title>
      <TagListContent>
        {tags.map(tag => (
          <Tag key={`${tag}tag`}>
            <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
          </Tag>
        ))}
      </TagListContent>
    </Content>
  );
