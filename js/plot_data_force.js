var w = 1200;
var h = 900;
                   
var force = d3.layout.force()
                     .nodes(dataset.nodes)
                     .links(dataset.edges)
                     .size([w, h])
                     .linkStrength(0.2)
                     .gravity(.1)    
                     .charge([-500])
                     .friction(0.1)            
                     .start();

var colors = d3.scale.category10();


var svg = d3.select("#drawing_area")
            .append("svg")
            .attr("width", w)
            .attr("height", h);         

        
var edges = svg.selectAll("path")
        .data(dataset.edges)
        .enter()
        .append("path")
        .attr("id", function(d, i) {
            return d.name;
        });       

var gnodes = svg.selectAll("g.gnode")
        .data(dataset.nodes)
        .enter()
        .append("g")
        .attr('type', "button")
        .attr('data-toggle', "modal")
        .attr('data-target', "#myModal")
        .classed('gnode', true);
     
var dragstart = function(d){
    d3.select(this).classed("fixed", d.fixed = true);
}  

var nodeSize = function(d){
    var size = 1;
            dataset.edges.forEach(function(obj){
                if(obj.name.split("_")[0] === d.name){
                    size++;
                }
            });
            return size * 10;
}

var nodes = gnodes
        .append("circle")
        .attr("r", function(d){
            return nodeSize(d);
        })
        .attr("id", function(d, i) {
            return dictionary.nodes[i].name;
        })
        .style("fill", function(d, i) {
                return colors(i);
        })
        .call(force.drag().on("dragstart", dragstart));


svg.selectAll("path").each(
    function(d,i){
        
    });            
            
var time = svg.selectAll('text')
    .data(years)
    .enter()
    .append('text')
    .text(function(d) {return d;})
    .attr('x', 300)
    .attr('y', function(d, i){
        return nodes[0][i].__data__.y;
    });

var isName = function(element, array){
    for(var i = 0; i < array.length; i++){
        if(array[i].name == element.name){
            return array[i].display;
        }
    }
    return '';
}
        
var label = gnodes.append("text")
            .text(function(d) {
                return isName(d, dictionary.nodes);
                })
            .style('stroke', '#FFF')
            .style('stroke-width', '1px')
            .style('paint-order', 'stroke')
            .style('fill', '#000')    
                ;             

label
    .attr("text-anchor", "middle")
    .attr("y", function(d){
        return -1 * nodeSize(d) - 5;
    });
        
force.on("tick", function(e) {
var k = e.alpha;
var left_right = 1;
    edges[0].forEach(function(d, i) {
        if(i == 0) {
            d.__data__.source.y = 120;
            d.__data__.source.x = w / 2;
        }
        else if (i == 2)
        {
            d.__data__.target.y = h - 200;
            d.__data__.target.x = w / 2;
        }
        else
        { 
            d.__data__.source.y += (d.__data__.source.depth * 120 - d.__data__.source.y);
            
            var size = 1;
            dataset.edges.forEach(function(obj){
                if(obj.name.includes(d.__data__.source.name)){
                    size++;
                }
            });
            
                d.__data__.source.x += (w / 2 - d.__data__.source.x) * k;
        }                          
    });

    edges.attr('d', function(d){
        var dx = d.target.x - d.source.x;
        var dy = d.target.y - d.source.y;
        var dr = Math.sqrt(dx * dx + dy * dy) * dx / dy;
        var jx = (d.target.x + d.source.x) / 2;
        var jy = (d.target.y + d.source.y) / 2;
        
        
        var sourcex = d.source.x < w ? d.source.x : w - 50;
        var sourcey = d.source.y; 
        var targetx = d.target.x < w ? d.target.x : w - 50;
        var targety = d.target.y; 
        
        if(d.name != 'spirit_hawkeye'){
            return "M" + sourcex + "," + sourcey + "A" + dr + "," + dr + " 0 0,1 " + targetx + "," + targety;                          
        } else {
            return "M" + sourcex + "," + sourcey + "A" + h/2 + "," + h/2 + " 0 0,0 " + targetx + "," + targety;
        }
    });

    gnodes.attr("transform", function(d) {             
        var x = d.x < w ? d.x : w - 50;
        var y = d.y;
        d.x = x; 
        return 'translate(' + [x, y] + ')'; 
    });
    
time
    .attr('x', 300)
    .attr('y', function(d, i){
        return nodes[0][i].__data__.y;
});   
            
});

                                                         