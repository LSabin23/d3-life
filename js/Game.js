function runGame () {
  var gameSpace = document.getElementById('game')
  var w = gameSpace.offsetWidth
    console.log(gameSpace.offsetWidth)
  var h = gameSpace.offsetHeight
  console.log(gameSpace.offsetHeight)
  var columns = 20
  var rows = 20
  var wRatio = w/columns
  var hRatio = h/rows
  var radius = Math.min(Math.floor(w/(2*columns)),Math.floor(h/(2*rows)))
  var enterColor = document.getElementById('enterColorChoice').value

var grid = new CellGrid(rows,columns)
grid.reset()

var svg = d3.select('#game').append('svg:svg')
    .attr('width', w)
    .attr('height', h)

var circle = svg.selectAll('circle')

; (function(){
    grid.step()

    circle = circle.data(grid.aliveCells(),function(d){return d.n})
    circle.enter().append('circle')
            .attr('cx', function(d){return d.x*wRatio + radius})
            .attr('cy', function(d){return d.y*hRatio + radius})
            .transition().duration(5000)
                .attr('r', radius)
                .style('fill', enterColor)

    circle.exit()
        .style('fill','purple')
        .transition().duration(5000)
            .attr('r', 0)
        .remove()

    setTimeout(arguments.callee,5000)
})()
}

var start = document.getElementById('start')
start.addEventListener('click', runGame)
