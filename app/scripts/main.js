/* global d3, blockChart */
'use strict';

var data = [];

function generateItems(n) {
	var items = [];
	for (var k = 0; k < n; k += 1) {
		items.push({x: (100 - 1) * Math.random() + 1});
	}
	return items;
}

var chart = blockChart()
	.width(400)
	.height(200);

// Create the selection, bind the data and invoke the chart instance
d3.selectAll('#chart-container')
	.data([data])
	.call(chart);

d3.select('#btn-add').on('click', function() {

	data = data.concat(generateItems(10));

	d3.selectAll('#chart-container')
		.data([data])
		.call(chart);

});


d3.select('#btn-remove').on('click', function() {

	data = d3.shuffle(data).slice(0, Math.min(data.length - 1, data.length - 5));

	d3.selectAll('#chart-container')
		.data([data])
		.call(chart);
});

var megadata = [generateItems(20), generateItems(30)];

var divs = d3.select('#chart-mega-container')
	.selectAll('div.mini-container')
	.data(megadata);

divs.enter().append('div')
	.classed('mini-container', true);

divs.call(chart);










