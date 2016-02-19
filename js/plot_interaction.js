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
                { name: "bendisdare", depth: 6.5}, //8
                
                
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

$(document).ready( function(){
    $('#hawkeye').on('click', function(){
       console.log("Hawkeye"); 
    });
    
    $('[data-toggle="popover"]').popover();
    
    $('body').on('mouseover', 'path', function (event) {
        $(".popover").offset({ top: 0, left: 0 + 20 });
    });
    var isMouseDown = false;
    var isDragging = false;
    var draggedCircle = '';
        
    $('circle').on('mousedown', function(){
        isMouseDown = true;
        draggedCircle = $(this); 
        dataset.edges.forEach(function(d){
            $('#' + d.name).css('stroke', '#ccc');
        });
    });
    
    $('circle').on('mousemove', function(){
           isDragging = isMouseDown && true;
    });
    
    $('circle').on('mouseover', function(){
        var r = $(this).attr('r');
        var name = $(this).attr('id');
        var color = $(this).css('fill');
        dataset.edges.forEach(function(d){
            $('#' + d.name).css('stroke', '#ccc');
        });
        $(this).siblings('text').animate({
           top: 20
        },{
          step: function(top){
              $(this).css('font-size', top);
          }  
        }, 250);
        
        if(!isDragging){
            dataset.edges.forEach(function(d){
                if(d.name.includes(name)){                   
                    $('#' + d.name).css('stroke', color);                    
                } 
            });
        }
    });
    
    $('path').on('mouseover', function(){
        if(!isDragging){
            $(this).css('stroke', 'yellow');
        }
    })
    
    $('path').on('mouseout', function(){
        $(this).css('stroke', '#ccc');
    })
    
    $('circle').on('mouseout', function(){
        if(!isDragging){
            var r = $(this).attr('r');
            $(this).siblings('text').animate({
                top: 14
            },{
                step: function(top){
                    $(this).css('font-size', top);
                }  
            }, 250);
        }
        dataset.edges.forEach(function(d){
               $('#' + d.name).css('stroke', '#ccc');
        });
    });
    
    $('svg').on('click', function(){
        if(isDragging){
            isDragging = false;
            isMouseDown = false;
            $(draggedCircle).siblings('text').animate({
                top: 14
            },{
                step: function(top){
                    $(this).css('font-size', top);
                }  
            }, 250); 
        }
    });
    
    $('path').on('click', function(){
        $('#edge_detail').empty();
        var name = $(this).attr('id');
        $('#edge_detail').append('<h1>' + name + '</h1>');
        $('#edge_detail').append('<p>' + lorem + '<p>');
    })
    
    $('svg').on('mouseout', function(){
        dataset.edges.forEach(function(d){
               $('#' + d.name).css('stroke', '#ccc');
        });
    });
});

var lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."