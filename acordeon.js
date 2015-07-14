$(document).ready(function() {
		  $('div.acordeon:eq(0)> div').hide();  
		  $('div.acordeon:eq(0)> .clausulado').click(function() {
				$(this).next().slideToggle('fast',"swing", function() {
						  if($(this).is(":hidden")) {
							$(".marg1").removeClass("rotar rotar2");
							$(".marg1").addClass("rotar2");
						  }
						  else{
							$(".marg1").removeClass("rotar rotar2");
							$(".marg1").addClass("rotar");
						  }
        });
	  });
	});

