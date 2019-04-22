const R = require('ramda');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const kebabCase = s =>
  s
    .replace(/([A-Z])/g, ' $1')
    .replace(/(\W+)/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { ne: "series" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              series
              templateKey
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;
      if (edge.node.frontmatter.templateKey) {
        createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            id,
          },
        });
      }
    });
    return graphql(`
      {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "series" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                series
                templateKey
                tags
              }
            }
            previous {
              fields {
                slug
              }
            }
            next {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      const series = result.data.allMarkdownRemark.edges;
      series.forEach(edge => {
        const id = edge.node.id;
        if (edge.node.frontmatter.templateKey) {
          createPage({
            path: edge.node.fields.slug,
            tags: edge.node.frontmatter.tags,
            component: path.resolve(
              `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
            ),
            // additional data can be passed via context
            context: {
              previous: edge.previous && edge.previous.fields.slug,
              next: edge.next && edge.next.fields.slug,
              id,
            },
          });
        }
      });
      const tags = R.pipe(
        R.map(R.pathOr([], ['node', 'frontmatter', 'tags'])),
        R.flatten,
        R.uniq
      )(posts.concat(series));

      // Make tag pages
      tags.forEach(tag => {
        const tagPath = `/tags/${kebabCase(tag)}/`;

        createPage({
          path: tagPath,
          component: path.resolve(`src/templates/tags.js`),
          context: {
            tag,
          },
        });
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.sourceNodes = ({ actions, getNodes }) => {
  const { createNodeField } = actions;
  const nodes = getNodes();
  const markdownNodes = R.filter(
    R.pathEq(['internal', 'type'], 'MarkdownRemark')
  )(nodes);

  const seriesList = R.filter(R.pathEq(['frontmatter', 'type'], 'series-data'))(
    markdownNodes
  );

  seriesList.forEach(seriesNode => {
    const seriesId = R.path(['frontmatter', 'id'], seriesNode);
    const seriesPosts = R.pipe(
      R.filter(R.pathEq(['frontmatter', 'series'], seriesId)),
      R.map(R.path(['frontmatter']))
    )(markdownNodes);
    createNodeField({
      node: seriesNode,
      name: 'posts',
      value: seriesPosts,
    });
    createNodeField({
      node: seriesNode,
      name: 'postsCount',
      value: seriesPosts.length,
    });
  });
};
