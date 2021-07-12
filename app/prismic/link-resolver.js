export default function (doc) {
  console.log(doc)
  if (doc.type === 'blog-post') {
    return '/posts/' + doc.uid
  }
  return '/'
}
