 $(document).ready(function(){  
     
    $("body").scrollspy({
        target: "#myScrollspy",
        offset:50
    });

    $("nav").css("visibility","hidden");

    $("#myScrollspy").on("activate.bs.scrollspy", function(target){
        
        $("nav").css("visibility","visible");
        
        if(target.target.children[0].hash === "#title"){
            $("nav").css("visibility","hidden");
        }
        
    });
            
    $("#title").scroll(function(){
            $("nav").css("visibility","hidden"); 
    })

    $('nav li').on("click", function(){
        $('.active').removeClass("active");
        $(this).addClass("active");
    });
    
        $("[data-toggle=popover]")
      .popover()
       
});