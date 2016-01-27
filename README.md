# virtual-streamgraph [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Create a [virtual-dom][14] [streamgraph][12]. Useful to visualize
[time series data][13].

![example](./example/example.png)

## Usage
```js
const vgraph = require('virtual-streamgraph')
const vdom = require('virtual-dom')
const hyperx = require('hyperx')
const hx = hyperx(vdom.h)

const data = [
  { name: 'apples', values: : [ { x: 1, y: 55 }, { x: 2, y: 65 }, { x: 3, y: 67 }] },
  { name: 'bananas', values: : [ { x: 1, y: 55 }, { x: 2, y: 65 }, { x: 3, y: 67 }] },
  { name: 'cherries', values: : [ { x: 1, y: 55 }, { x: 2, y: 65 }, { x: 3, y: 67 }] },
  { name: 'dates', values: : [ { x: 1, y: 55 }, { x: 2, y: 65 }, { x: 3, y: 67 }] }
]

const tree = hx`
  <section className="my-graph">
    ${createGraph({ height: 500, width: 960, data: state.data })}
  </section>
`
console.log(vdom.create(tree).toString())
```

## API
### vgraph(opts)
Create a new `virtual-streamgraph` from data. Opts can contain the following
fields:
- __opts.data:__ set data to be rendered
- __opts.width:__ set width dimension of the graph
- __opts.height:__ set height dimension of the graph
- __opts.min:__ optional, set lower bound for graph
- __opts.max:__ optional, set upper bound for graph
- __opts.limit:__ optional, limit amount of data points to be displayed

## See Also
- [d3/wiki/stack-layout](https://github.com/mbostock/d3/wiki/Stack-Layout)
- [d3-shape/stacks](https://github.com/d3/d3-shape#stackOffsetWiggle)

## Installation
```sh
$ npm install virtual-streamgraph
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/virtual-streamgraph.svg?style=flat-square
[3]: https://npmjs.org/package/virtual-streamgraph
[4]: https://img.shields.io/travis/yoshuawuyts/virtual-streamgraph/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/virtual-streamgraph
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/virtual-streamgraph/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/virtual-streamgraph
[8]: http://img.shields.io/npm/dm/virtual-streamgraph.svg?style=flat-square
[9]: https://npmjs.org/package/virtual-streamgraph
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[12]: http://www.visualisingdata.com/2010/08/making-sense-of-streamgraphs/
[13]: https://en.wikipedia.org/wiki/Time_series
[14]: https://github.com/Matt-Esch/virtual-dom
