    var numRows = 2, ti = 5;

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function recalc() {
    var cr = 0,
        gr = 0,
        tt = 0;
    $("#gpa").find('tr').each(function () {
        var l = $(this).find('input.credit').val();
        var w = $(this).find('input.grade').val();
        if(w=="S" || w=='s'|| w=='10'){w=10;}
        if(w=="A"|| w=='a'|| w=='9'){w=9;}
        if(w=="B"|| w=='b'|| w=='8'){w=8;}
        if(w=="C"|| w=='c'|| w=='7'){w=7;}
        if(w=="D"|| w=='d'|| w=='6'){w=6;}
        var mult = (l * w);
        $(this).find('input.row-total').val(mult ? mult : "");
        gr += isNumber(w) ? parseInt(w, 10) : 0;
        cr += isNumber(l) ? parseInt(l, 10) : 0;
        tt += isNumber(mult) ? mult : 0;
    }); //END .each

    $("#credit-grand-total").html(cr);
    $("#grade-grand-total").html(gr);
    $("#table-grand-total").html(tt/cr);
}

function addRow() {

    $('#addr' + numRows).html("<td class='credit'><input name='credit" + numRows + "' type='text' class='credit form-control input-md' value='' tabindex='" + (ti++) + "' /></td><td class='grade'><input  name='grade" + numRows + "' type='text' class='grade form-control input-md' value='' tabindex='" + (ti++) + "' /></td><td class='row-total'><input type='text' class='row-total form-control' value='' readonly /></td>");

    $('#gpa tr:last').after('<tr id="addr' + (numRows + 1) + '" class="calculation visible"></tr>');
    numRows++;
}

function delRow() {
    if (numRows > 1) {
        $("#addr" + (numRows - 1)).remove();
        numRows--;
    }
}
$(function () {
    $("#gpa").on("click", ".calculation", recalc);
    $("#gpa").on("keyup blur", ".form-control", recalc);
    $("#gpa").on("keyup", ".credit:last", function () {
        if (!$(this).data("done")) { // only do this once per field
            $(this).data("done", true);
            addRow();
        }
    });
    $("#add_row").on("click",function() {addRow()});
    $("#delete_row").on("click",function() {delRow()});
});

function calculateSum() {
    var sum = 0;
    //iterate through each textboxes and add the values
    $(".row-total").each(function () {
        //add only if the value is number
        if (!isNaN(this.value) && this.value.length !== 0) {
            sum += parseFloat(this.value);
        }
    });
    //.toFixed() method will roundoff the final sum to 2 decimal places
    $(".table-total").val(sum.toFixed(2));
}

function calculateRow() {

    $('.credit, .grade').keyup(function () {
        var rowtotal = 0;
        var $row = $(this).closest("tr");
        var credit = parseFloat($row.find('.credit').val());
        var grade = parseFloat($row.find('.grade').val());
        rowtotal = credit * grade;
        alert($("#grade").val()); //remove after testing

        if (isNaN(rowtotal)) {
            $row.find('.row-total').val("Missing an Input");
        } else {
            $row.find('.row-total').val(rowtotal);
        }
        calculateSum();
    });
}

    