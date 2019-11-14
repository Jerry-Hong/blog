import React from 'react';
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

const TagContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1em;
`;

const Tag = styled.span`
  border: 1px solid var(--link);
  border-radius: 3px;
  padding: 3px 5px;
  margin-bottom: 1em;
  margin-right: 1em;
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.1em;
`;

export const TagList = ({ tags }) =>
  tags && tags.length ? (
    <Content>
      <Title>
        <TagIcon size={20} style={{ marginRight: 5 }} />
        Tags
      </Title>
      <TagContent>
        {tags.map(tag => (
          <Tag key={`${tag}tag`}>
            <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
          </Tag>
        ))}
      </TagContent>
    </Content>
  ) : null;
