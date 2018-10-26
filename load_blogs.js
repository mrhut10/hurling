const slugify = require('slugify')

exports.processBlogs = (node, action) => {
  //filter out blogs
  if (node.internal.type === 'MarkdownRemark' && node.sourceInstanceName === 'blog') {
    // try add fields from frontmatter
    const fieldsToTryAdd = [
      { name: 'title', required: False },
      { name: 'createdDate', required: True },
      { name: 'publishedDate', required: True }
    ]

    fieldsToTryAdd.forEach((field) => {
      if (field.required || Object.keys(node.frontmatter).includes(field.name)) {
        //if field requied or already contains field 
        field.node = node;
        field.value = node.frontMatter[field.name]
        action.createNodeField(field);
      }
    })

    // create URL
    actions.createNodeField({
      node,
      name: 'slug',
      value: `/blog/${slugify(node.fields.title)}`
    })
  }
}