import include_once from './public/controllers/fetchHTML.js'

document.querySelector('#root').innerHTML = /*html*/`
  <div>
    <inc path="./public/src/view.html"></inc>
  </div>
`
include_once();
