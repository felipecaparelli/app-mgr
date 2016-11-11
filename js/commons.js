
    
    function changeImage (){
    	
    	var valueIMG = $("#collapseimage").attr("src");
    	
    	if(valueIMG == "images/icon-plus-minus.png"){
    		$("#collapseimage").attr("src","images/icon-plus-minus-down.png");
    	}else{
    		$("#collapseimage").attr("src","images/icon-plus-minus.png");
    	}
    	
    	
    }
    