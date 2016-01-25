const createApp = require('virtual-app')
const vdom = require('virtual-dom')
const hyperx = require('hyperx')
const xtend = require('xtend')

const createGraph = require('..')

const hx = hyperx(vdom.h)

const body = document.querySelector('body')
if (body.parentNode) body.parentNode.removeChild(body)
const app = createApp(document.querySelector('html'), vdom)
const render = app.start(modify, {
  data: updateData(),
  height: 500,
  width: 960
})

// render application
render(function (state) {
  return hx`
    <body>
      <button
        style="position: fixed;"
        onclick=${app.send({ type: 'transition' })}>
        transition
      </button>
      ${createGraph({
        height: state.height,
        width: state.width,
        data: state.data
      })}
    </body>
  `
})

// modify state
// (obj, obj) -> obj
function modify (action, state) {
  if (action.type === 'transition') {
    return xtend(state, { data: updateData() })
  }
}

// generate graph data
// null -> obj
function updateData () {
  return [
    { name: 'apples', values: bumpLayer(400) },
    { name: 'bananas', values: bumpLayer(400) },
    { name: 'cherries', values: bumpLayer(400) },
    { name: 'dates', values: bumpLayer(400) },
    { name: 'plums', values: bumpLayer(400) },
    { name: 'pears', values: bumpLayer(400) }
  ]

  function bumpLayer (n) {
    var a = []
    var i = null
    for (i = 0; i < n; ++i) a[i] = 0
    for (i = 0; i < 5; ++i) bump(a)
    return a.map(function (d, i) {
      return {x: i, y: Math.max(0, d)}
    })

    function bump (a) {
      const x = 1 / (0.1 + Math.random())
      const y = 2 * Math.random() - 0.5
      const z = 10 / (0.1 + Math.random())
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z
        a[i] += x * Math.exp(-w * w)
      }
    }
  }
}
