/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const slugify = require('slugify')

const load_content = require('./load_blogs')

exports.onCreateNode = ({ node, actions }) => {
  load_content.processBlogs(node, actions);
}