$(document).ready(function(){ 
    var numRows = 5, ti = 15;

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function recalc() {
        var cr = 0, gr = 0, tt = 0;
        $("#gpa").find('tr').each(function() {
            var l = $(this).find('input.credit').val();
            var w = $(this).find('input.grade').val();
            if (w == "S" || w == 's' || w == '10') { w = 10; }
            if (w == "A" || w == 'a' || w == '9') { w = 9; }
            if (w == "B" || w == 'b' || w == '8') { w = 8; }
            if (w == "C" || w == 'c' || w == '7') { w = 7; }
            if (w == "D" || w == 'd' || w == '6') { w = 6; }
            var mult = (l * w);
            $(this).find('input.row-total').val(mult ? mult : "");
            gr += isNumber(w) ? parseInt(w, 10) : 0;
            cr += isNumber(l) ? parseInt(l, 10) : 0;
            tt += isNumber(mult) ? mult : 0;
        }); //END .each
        $("#credit-grand-total").html(cr);
        $("#grade-grand-total").html(gr);
        $("#table-grand-total").html((tt/cr).toFixed(3));
    }

    function addRow() {
        var dom = $("<tr class='calculation visible' ><td>"
                        +(numRows+1)+
                    "</td><td><input class='input-md form-control' tabindex="+(ti++)+" type='text'></td><td class='credit'><input class='credit form-control input-md' tabindex="+
                    (ti++)+" type='text'></td><td class='grade'><input class='grade form-control input-md' tabindex="+
                    (ti++)+" type='text'></td><td class='row-total'><input class='row-total form-control' tabindex='-1' readonly type='text'></td></tr>");
        $('#gpatable').append(dom);
        numRows++;
console.log(numRows);
        
    }
    function delRow() {
        if (numRows > 1) {
            $("#gpatable").find("tr").last().remove();
            numRows--;
            recalc();
        }
console.log(numRows);
    }
    $(function() {
        $("#gpa").on("click", ".calculation", recalc);
        $("#gpa").on("keyup blur", ".form-control", recalc);
        $("#gpa").on("keyup", ".grade:last", function() { addRow(); } );
        $("#add_row").on("click", function() { addRow() });
        $("#delete_row").on("click", function() { delRow() } );
    });



    function calculateRow() {
        $('.grade').keyup(function() {
            var rowtotal = 0;
            var $row = $(this).closest("tr");
            var credit = $row.find('.credit').val();
            var grade = $row.find('.grade').val();
            rowtotal = credit * grade;
            if (isNaN(rowtotal)) {
                $row.find('.row-total').val("Missing an Input");
            } else {
                $row.find('.row-total').val(rowtotal);
            }
        });
    }

     $("#gpatable").on("keyup",".credit",function(){
        var val=$(this).val();
                var invalidChars = /[^0-9]/gi
        
                  if(invalidChars.test(val)) {
                            val= val.replace(invalidChars,"");
                            $(this).val(val);
                      }
    });
})
   