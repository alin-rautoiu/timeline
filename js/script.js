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
            
            $("#svg1").attr("height", "0");
            $("#svg1").attr("width", "0");
            connectAll();
                        
        });
        
$(document).on('scroll', '#title', function(){
    $("nav").css("visibility","hidden"); 
});

$(window).resize(function () {
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
    connectAll();
});