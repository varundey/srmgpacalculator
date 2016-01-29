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
            if (w == "D" || w == 'd' || w == '5') { w = 5; }   
            if (w == "U" || w == 'u' || w == 'I'|| w == 'i'|| w == 'W'|| w == 'w') { w = 0; }   
            var mult = (l * w);
            $(this).find('input.row-total').val(mult ? mult : "");
            cr += isNumber(l) ? parseInt(l, 10) : 0;
            tt += isNumber(mult) ? mult : 0;
        }); //END .each
        $("#credit-grand-total").html("Total Credits: "+cr);
        $("#grade-grand-total").html("Total Grades: "+tt);
        $("#table-grand-total").html("GPA: "+(tt/cr).toFixed(3));
    }

    function addRow() {
        var dom = $("<tr class='calculation visible'><td class='mdl-data-table__cell--non-numeric' style='text-align:center;vertical-align:middle;font-family:Roboto;font-weight:500;font-size:15px;display:table-cell;'>"+(numRows+1)+"</td><td><div class='mdl-textfield mdl-js-textfield' style='display:table-cell;'><input class='mdl-textfield__input' style='text-align:center;' type='text' tabIndex="+(ti++)+" id='sub"+(numRows+1)+"Code'><label class='mdl-textfield__label' style='text-align:center;' for='sub"+(numRows+1)+"Code'>Subject "+(numRows+1)+" Code</label></div></td><td><div class='credit mdl-textfield mdl-js-textfield' style='display:table-cell;'><input class='credit mdl-textfield__input' style='text-align:center;' type='text' tabIndex="+(ti++)+" id='sub"+(numRows+1)+"Credits'><label class='mdl-textfield__label' style='text-align:center;' for='sub"+(numRows+1)+"Credits'>Subject "+(numRows+1)+" Credits</label></div></td><td><div class='grade mdl-textfield mdl-js-textfield' style='display:table-cell;'><input class='grade mdl-textfield__input' style='text-align:center;' type='text' tabIndex="+(ti++)+" id='sub"+(numRows+1)+"Grade'><label class='mdl-textfield__label' style='text-align:center;' for='sub"+(numRows+1)+"Grade'>Subject "+(numRows+1)+" Grade</label></div></td><td><div class='row-total mdl-textfield mdl-js-textfield' style='display:table-cell;'><input class='row-total mdl-textfield__input' style='text-align:center;' type='text' tabIndex='-1' readOnly id='subTotal'></div></td></tr>");
        $('#gpatable').append(dom);
                    componentHandler.upgradeDom();

        numRows++;
console.log(numRows);
        
    }
    function delRow() {
        if (numRows > 1) {
            $("#gpatable").find("tr").last().remove();
                        componentHandler.upgradeDom();

            numRows--;
            recalc();
        }
console.log(numRows);
    }
    $(function() {
        $("#gpa").on("keyup", ".calculation", recalc);
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
   