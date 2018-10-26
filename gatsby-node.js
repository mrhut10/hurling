/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const slugify = require('slugify')

//const load_content = require('./load_blogs')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  //load_content.processBlogs(node, actions);
  if (node.internal.type === 'MarkdownRemark') {
    if (node.fileAbsolutePath.match("/src/content/blogs/")) {
      createNodeField({ node, name: 'instance', value: `blog` })
      createNodeField({ node, name: 'slug', value: `/blog/${slugify(node.frontmatter.title)}` })

    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
    {
      allMarkdownRemark(filter: {fields: {instance: {eq: "blog"}}}) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
    
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/blog-post.js`),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              slug: node.fields.slug,
            },
          })
        })
        resolve()
      })
  })
}