 $(document).ready(function(){
     
            $("body").scrollspy({
                target: "#myScrollspy"
            });
            
            $("#myScrollspy").on("activate.bs.scrollspy", function(){
                
                console.log("event");
                
            });
            
            $('nav li').on("click", function(){
               $('.active').removeClass("active");
               $(this).addClass("active");
            });
        });