const virtualWidget = require('virtual-widget')
const assert = require('assert')
const d3 = require('d3')

module.exports = virtualWidget({
  init: function () {
    const el = document.createElementNS(d3.ns.prefix.svg, 'svg')
    render(el, this.state)
    return el
  },
  update: function (prev, el) {
    render(el, this.state)
  }
})

// Create a virtual-dom stream graph
// (obj, obj) -> null
function render (el, state) {
  const height = state.height
  const width = state.width
  const data = state.data

  assert.equal(typeof height, 'number', 'height should be a number')
  assert.equal(typeof width, 'number', 'width should be a number')
  assert.equal(typeof data, 'object', 'data must be an object')

  const stack = d3.layout.stack()
    .offset('wiggle')

  const values = d3.range(data.length).map(function (i) {
    return data[i].values
  })
  const layers = stack(values)
  const area = createArea(layers, height, width)
  const color = d3.scale.linear().range([ '#aad', '#556' ])

  const svg = d3.select(el)
    .attr('width', width)
    .attr('height', height)

  svg.selectAll('path')
    .data(layers)
    .enter()
    .append('path')
    .attr('d', area)
    .style('fill', function (d, i) {
      return color(hashString(data[i].name))
    })
}

// create svg area
// (obj, obj) -> obj
function createArea (layers, height, width) {
  var m = 200
  var x = d3.scale.linear()
    .domain([0, m - 1])
    .range([0, width])

  var y = d3.scale.linear()
    .domain([0, d3.max(layers, createLayer)])
    .range([height, 0])

  return d3.svg.area()
    .x(function (d) { return x(d.x) })
    .y0(function (d) { return y(d.y0) })
    .y1(function (d) { return y(d.y0 + d.y) })

  function createLayer (layer) {
    return d3.max(layer, function (d) {
      return d.y0 + d.y
    })
  }
}

// hash a string to a number 0.0 - 1.0
// str -> num
function hashString (str) {
  var hash = 0
  var i = null
  var len = null
  if (!str.length) return hash
  for (i = 0, len = str.length; i < len; i++) {
    hash += str.charCodeAt(i) / 100
  }
  return hash % 1
}
