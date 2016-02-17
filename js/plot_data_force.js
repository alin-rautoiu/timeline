var w = 1200;
var h = 1000;

var dataset = {
        nodes: [
                { name: "spirit", depth: 1 }, //0
                { name: "krigstein", depth: 2}, //1
                { name: "fury", depth: 3}, //2
                { name: "master", depth: 4}, //3
                { name: "daredevil", depth: 5}, //4
                { name: "nhawk", depth: 6}, //5
                { name: "hawkeye", depth: 7}, //6
                { name: "invisible", depth: 0}, //7
                { name: "bendisdare", depth: 5.5}, //4
                
                
        ],
        edges: [
                { source: 0, target: 2, name: 'spirit_fury'},
                { source: 0, target: 4, name: 'spirit_daredevil'},
                { source: 0, target: 6, name: 'spirit_hawkeye'},
                { source: 1, target: 4, name: 'krigstein_daredevil'},
                { source: 2, target: 3, name: 'fury_master'},                                                
                { source: 2, target: 4, name: 'fury_daredevil'},
                { source: 2, target: 6, name: 'fury_hawkeye'},
                { source: 3, target: 6, name: 'master_daredevil'},
                { source: 4, target: 8, name: 'daredevil_bendisdare'},
                { source: 8, target: 6, name: 'bendisdare_hawkeye'},
                { source: 4, target: 6, name: 'daredevil_hawkeye'},                                                
                { source: 5, target: 6, name: 'nhawk_hawkeye'},
                { source: 7, target: 0, name: 'hawkeye_invisile'}
        ]
};

var years = [1940, 1955, 1965, 1970, 1981, 2002, 2006, 2012];
                     
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
            return d.name;
        })
        .style("fill", function(d, i) {
                return colors(i);
        })
        .on('mouseover', function(d){
            //d3.select(this).style({opacity:'0.8'});
        })
        .on('mouseout', function(d){
            //d3.select(this).style({opacity:'1'});
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
        
var label = gnodes.append("text")
            .text(function(d) {return d.name});             

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
                
                if(size >= 3) left_right *= -1;
                
                d.__data__.source.x += (w / 2 + (size * left_right * 80) - d.__data__.source.x) * k;
                if(d.__data__.source.x >= w - nodeSize(d) * 2){
                    d.__data__.source.x = w - nodeSize(d) * 2;
                }
                else if(d.__data__.source.x <= nodeSize(d) * 2) {
                    d.__data__.source.x = nodeSize(d) * 2;
                }
            }                          
        });

        edges.attr('d', function(d){
          var dx = d.target.x - d.source.x;
          var dy = d.target.y - d.source.y;
          var dr = Math.sqrt(dx * dx + dy * dy);
          
          return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        });

       gnodes.attr("transform", function(d) { 
            return 'translate(' + [d.x, d.y] + ')'; 
       });
       
    time
    .attr('x', 300)
    .attr('y', function(d, i){
        return nodes[0][i].__data__.y;
    });   
                
    });
    
                                                         