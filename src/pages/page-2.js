import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const SecondPage = ({ data }) => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <h2>Blog posts</h2>
    <ul>
      {data.blogPosts.edges.map(edge => edge.node.childMarkdownRemark).map(remarkData => <li><h3><Link to={remarkData.fields.slug}>{remarkData.frontmatter.title}</Link></h3></li>)}
    </ul>
  </Layout>
)
//{data.blogPosts.edges.node.map(blog => <li>hello</li>)}
export default SecondPage
//<ul>
//    {data.blogPosts.edges.node.map(blog => <li><h3><Link to={blog.fields.slug}>{blog.frontmatter.title}</Link></h3></li>)}
//</ul>
//{data.blogPosts.edges.map(edge => edge.node.childMarkdownRemark).map(remarkData => <li><h3><Link to={remarkData.fields.slug}>{remarkData.frontmatter.title}</Link></h3></li>)}

export const query = graphql`
{
  blogPosts: allFile(filter: {sourceInstanceName: {eq: "blog"}, extension: {eq: "md"}}) {
    edges {
      node {
        id
        childMarkdownRemark {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
          }
          excerpt(pruneLength: 20)
        }
      }
    }
  }
  alt: allMarkdownRemark(filter: {fields: {instance: {eq: "blog"}}}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter{
          title
          date
        }
        excerpt(pruneLength:50)
      }
    }
  }
}

`