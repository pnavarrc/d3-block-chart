/* global d3 */
/* exported blockChart */
'use strict';

function blockChart() {

	var me = {
		width: 600,
		height: 400,
		margin: {left: 10, top: 10, right: 10, bottom: 10},
		x: function(d) { return d.x; }
	};

	function init(selection) {
		selection.each(function() {

			var svg = d3.select(this);

			svg.append('g').classed('chart', true);
			svg.append('g').classed('axis xaxis', true);
		});
	}

	function chart(selection) {
		selection.each(function(data) {

			var div = d3.select(this),
					svg = div.selectAll('svg').data([data]);

			// Compute the chart inner width and height
			var margin = me.margin,
					width = me.width - me.margin.left - me.margin.right,
					height = me.height - me.margin.top - me.margin.bottom,
					barWidth = 10;

			// Create the SVG element on enter, and set its dimensions
			svg.enter().append('svg').call(init);

			svg
				.attr('width', me.width)
				.attr('height', me.height);

			// Select the group for the chart and the x-axis.
			var gchart = svg.select('g.chart'),
					gxaxis = svg.select('g.xaxis');

			// Translate the groups to account for the margin
			gchart
				.attr('transform', 'translate(' + [margin.left, margin.top] + ')');
			
			gxaxis
				.attr('transform', function() {
					var dx = margin.left,
							dy = margin.top + height;
					return 'translate(' + [dx, dy] + ')';
				});

			var xScale = d3.scale.linear()
				.domain([0, 100])
				.range([0, width - barWidth]);

			// Create the selection for the rectangles
			var rect = gchart.selectAll('rect.item').data(data, me.x);

			// Create the enter selection and initialize the element attributes
			rect.enter().append('rect')
				.classed('item', true)
				.attr('width', barWidth)
				.attr('height', height)
				.attr('x', xScale(0));

			// Update the elements with new data
			rect.transition().duration(1e3)
				.attr('x', function(d) { return xScale(me.x(d)); });

			// Remove elements that don't have data bound to them
			rect.exit()
				.transition().duration(1e3)
				.style('fill', '#EDC951')
				.style('stroke', '#EDC951')
				.style('stroke-width', 1)
				.remove();

		});
	}

	 // Accessor methods
  function createAccessor(attr) {
    return function(value) {
      if (!arguments.length) { return me[attr]; }
        me[attr] = value;
        return chart;
    };
  }

  for (var attr in me) {
    if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
      chart[attr] = createAccessor(attr);
    }
  }

  return chart;
}
