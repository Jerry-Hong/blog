import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Content, { HTMLContent } from '../components/Content';
import Layout from '../components/Layout';
import { DOMAIN } from '../constants';
import DisqusComment from '../components/DisqusComment';
import { Title, Desc, Note } from '../components/post/Title';
import { Section } from '../components/post/Section';
import { TagList } from '../components/post/Tag';
import { SeriesPagination } from '../components/post/SeriesPagination.js';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  description,
  date,
  timeToRead,
  helmet,
  slug,
  previousLink,
  nextLink,
  series = '',
}) => {
  const PostContent = contentComponent || Content;

  return (
    <React.Fragment>
      <Section>
        {helmet || ''}
        <Title>{title}</Title>
        <Note>
          {date}. {timeToRead} mins read
        </Note>
        <Desc>{description}</Desc>
        <PostContent content={content} />
      </Section>
      <TagList tags={tags} />
      <SeriesPagination
        previousLink={previousLink}
        nextLink={nextLink}
        series={series}
      />
      <DisqusComment
        identifier={slug}
        shortname="jerry-blog"
        url={`${DOMAIN}/${slug}`}
      />
    </React.Fragment>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.object,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const SeriesPost = ({ data, pageContext: { next, previous } }) => {
  const { markdownRemark: post } = data;
  const title = R.pathOr('', ['frontmatter', 'title'], post);
  const series = R.pathOr('', ['frontmatter', 'series'], post);
  const description = R.pathOr('', ['frontmatter', 'description'], post);

  return (
    <Layout header={`Series / ${series}`}>
      <BlogPostTemplate
        content={post.htmlAst}
        contentComponent={HTMLContent}
        description={description}
        series={series}
        helmet={
          <Helmet titleTemplate="%s | J.H. Blog">
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta
              property="og:url"
              content={R.pipe(
                R.pathOr('', ['fields', 'slug']),
                R.concat(DOMAIN)
              )(post)}
            />
            <meta
              property="og:image"
              content={R.pipe(
                R.pathOr(null, [
                  'frontmatter',
                  'image',
                  'childImageSharp',
                  'fluid',
                  'src',
                ]),
                R.ifElse(R.isNil, R.identity, R.concat(DOMAIN))
              )(post)}
            />
            <meta
              property="og:article:published_time"
              content={R.pathOr('', ['frontmatter', 'date'], post)}
            />
            {R.pipe(
              R.pathOr([], ['frontmatter', 'tags']),
              R.map(tag => (
                <meta key={tag} property="og:article:tag" content={tag} />
              ))
            )(post)}
          </Helmet>
        }
        date={R.pathOr('', ['frontmatter', 'date'], post)}
        timeToRead={R.pathOr('', ['timeToRead'], post)}
        tags={R.pathOr([], ['frontmatter', 'tags'], post)}
        title={title}
        slug={R.pathOr('', ['fields', 'slug'], post)}
        previousLink={previous}
        nextLink={next}
      />
    </Layout>
  );
};

export default SeriesPost;

export const pageQuery = graphql`
  query SeriesPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      htmlAst
      timeToRead
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMM Do, YYYY")
        title
        series
        tags
        description
        image {
          childImageSharp {
            fluid(maxWidth: 770, quality: 64) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
