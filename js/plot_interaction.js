$(document).ready( function(){
    $('#hawkeye').on('click', function(){
       console.log("Hawkeye"); 
    });
    
    $('[data-toggle="popover"]').popover();
    
    $('body').on('mouseover', 'path', function (event) {
        $(".popover").offset({ top: 0, left: 0 + 20 });
    });
    
    $('circle').on('mouseover', function(){
        var r = $(this).attr('r');
        $(this).siblings('text').animate({
           //top: -1 * (r) - 5 + 'px'
           top: 20
        },{
          step: function(top){
              $(this).attr('font-size', top);
          }  
        }, 500);
    });
    
    
    $('circle').on('mouseout', function(){
        var r = $(this).attr('r');
        $(this).siblings('text').animate({
           //top: -1 * (r) - 5 + 'px'
           top: 14
        },{
          step: function(top){
              $(this).attr('font-size', top);
          }  
        }, 500);
    });
    
    $('path').on('click', function(){
        $('#edge_detail').empty();
        var name = $(this).attr('id');
        $('#edge_detail').append('<h1>' + name + '</h1>');
        $('#edge_detail').append('<p>' + lorem + '<p>');
    })
});

var lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."