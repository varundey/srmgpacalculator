$(document).ready(function(){ 

    	$(".button-collapse").sideNav();
        	
	
	var numRows = 5, ti = 15;

    	function isNumber(n) {
        	return !isNaN(parseFloat(n)) && isFinite(n);
    	}

    	function recalc() {
        	var cr = 0, gr = 0, tt = 0;
        	$("#gpa").find('tr').each(function() {
            		var l = $(this).find('input.credit').val();
    		        var w = $(this).find('input.grade').val();
            		if (w == 's' || w=='S' || w=='10') {w = 10; }
            		if (w == 'a' || w=='A' || w=='9')  {w = 9; }
            		if (w == 'b' || w=='B' || w=='8')  {w = 8; }
            		if (w == 'c' || w=='C' || w=='7')  {w = 7; }
            		if (w == 'd' || w=='D' || w=='5')  {w = 5; }
            		var mult = (l * w);
            		$(this).find('input.row-total').val(mult ? mult : "");
            		gr += isNumber(w) ? parseInt(w, 10) : 0;
            		cr += isNumber(l) ? parseInt(l, 10) : 0;
            		tt += isNumber(mult) ? mult : 0;
        	}); //END .each
        	$("#credit-grand-total").html("Total Credits: "+cr);
        	$("#table-grand-total").html("GPA: "+(tt/cr).toFixed(3));
            $("#grade-grand-total").html("Total Grades: "+tt);
    	}

    	function addRow() {
        	var dom = $("<tr class='calculation visible'><td>"+(numRows+1)+"</td><td><div class='row'><div class='input-field col s12'><input type='text' id='"+(numRows+1)+"Code' tabIndex='"+(ti++)+"'><label for='"+(numRows+1)+"Code'>Code</label></div></div></td><td><div class='row'><div class='credit input-field col s12'><input class='credit' type='text' tabIndex='"+(ti++)+"' id='"+(numRows+1)+"Credits'><label for='"+(numRows+1)+"Credits'>Credits</label></div></div></td><td><div class='row'><div class='grade input-field col s12'><input class='grade' maxlength='1' type='text' tabIndex='"+(ti++)+"' id='"+(numRows+1)+"Grade'><label for='"+(numRows+1)+"Grade'>Grade</label></div></div></td><td><div class='row'><div class='row-total input-field col s12'><input class='row-total' type='text' readonly tabIndex='-1'></div></div></td></tr>");
        	$('#gpatable').append(dom);
        	numRows++;
    	}

    	function delRow() {
        	if (numRows > 1) {
        		$("#gpatable").find("tr").last().remove();
	        	numRows--;
            		recalc();
        	}
    	}

    	$(function() {
        	$("#gpa").on("keyup", ".calculation", recalc);
        	$("#gpa").on("keyup blur", ".form-control", recalc);
        	$("#gpa").on("keyup", ".grade:last", function() { addRow(); } );
        	$("#add_row").on("click", function() { addRow() });
        	$("#delete_row").on("click", function() { delRow() } );
    	});

     	$("#gpatable").on("keyup",".credit",function(){
        	var crval=$(this).val();
                var invalidChars = /[^0-9]/gi
                if(invalidChars.test(crval)) {
                	crval = crval.replace(invalidChars,"");
                       	$(this).val(crval);
                }
    	});

        $("#gpatable").on("keyup",".grade",function(){
            var grval=$(this).val();
                var invalidChars = /[^sabcdiuw9875]/ig
                if(invalidChars.test(grval)) {
                    grval = grval.replace(invalidChars,"");
                        $(this).val(grval);
                }
        });
})