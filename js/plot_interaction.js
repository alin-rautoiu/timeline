$(document).ready( function(){
    $('#hawkeye').on('click', function(){
       console.log("Hawkeye"); 
    });
    
    $('#edge_detail').hide();
    
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
        $('#drawing_area').css('left', -300);
        $('#edge_detail').show();
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