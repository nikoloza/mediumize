'use strict'

// Apply DOM root object
const rootDOM = document.createElement('div')
rootDOM.classList.add('mediumize_root')

// medium CSS urls
const glyphs = 'https://glyph.medium.com/css/e/sr/latin/e/ssr/latin/e/ssb/latin/m2.css'
const branding = 'https://cdn-static-1.medium.com/_/fp/css/main-branding-base.Ch8g7KPCoGXbtKfJaVXo_w.css'

// medium styles
const styles = `
<link rel="stylesheet" type="text/css" href="${branding}">
<link rel="stylesheet" type="text/css" href="${glyphs}" />
<style>
  .section-divider {
    margin-bottom: 0;
  }
</style>
` 

// append styles to rootDOM
rootDOM.innerHTML = styles

// class mapping per element
const CLASS_MAP = {
  body: ['sectionLayout--insetColumn', 'postArticle-content'],
  h1: ['ui-h1', 'graf--title', 'graf--h2'],
  h2: ['ui-h2', 'graf--h2'],
  h3: ['ui-h3', 'graf--h3'],
  h4: ['ui-h4', 'graf--h4'],
  h5: ['ui-h5'],
  h6: ['ui-h6'],
  p: ['graf--p', 'graf-after--p'],
  img: ['graf--figure', 'graf-after--p'],
  pre: ['graf--pre', 'graf-after--p'],
  blockquote: ['graf--blockquote', 'graf-after--p'],
  code: ['markup--code', 'markup--p-code'],
  ul: ['postList'],
  ol: ['postList'],
  li: ['graf--li', 'graf-after--p'],
  hr: ['section-divider'],
  a: ['markup--anchor', 'markup--p-anchor']
}

const DOM = {}
for (let prop in CLASS_MAP) {
  DOM[prop] = document.querySelectorAll(prop)
}

function toggleClass (action) {
  var action = action ? 'add' : 'remove'
  
  for (let prop in DOM) {
    let nodes = DOM[prop]
    let classNames = CLASS_MAP[prop]
    if (typeof nodes === 'object' && nodes.length > 0) {
      createArray(nodes.length).map((value, key) => {
        value = nodes[key]
        value.classList[action](...classNames)
      })
    } else if (nodes === document.body) {
      nodes.classList[action](...classNames)
    }
  }
}

// Receive Chrome background message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var root = document.querySelector('.mediumize_root')
  if (root) {
    root.remove()
    toggleClass(false)
    return
  }
  document.head.appendChild(rootDOM)
  toggleClass(true)
})

// helpers
function createArray (length) {
  return (new Array(length)).fill(void 0)
}