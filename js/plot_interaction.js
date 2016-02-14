$(document).ready( function(){
    $('#hawkeye').on('click', function(){
       console.log("Hawkeye"); 
    });
    
    $('[data-toggle="popover"]').popover();
    
    $('body').on('mouseover', 'path', function (event) {
        $(".popover").offset({ top: 0, left: 0 + 20 });
    });
});