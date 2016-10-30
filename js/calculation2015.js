$(document).ready(function() {
    function t(t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
    }

    function a() {
        var a = 0,
            i = 0,
            e = 0;
        $("#gpa").find("tr").each(function() {
            var d = $(this).find("input.credit").val(),
                l = $(this).find("input.grade").val();
            ("O" == l || "o" == l || "10" == l) && (l = 10), ("a+" == l || "A+" == l || "9" == l) && (l = 9), ("A" == l || "a" == l || "8" == l) && (l = 8), ("b+" == l || "B+" == l || "7" == l) && (l = 7), ("c" == l || "C" == l || "6" == l) && (l = 6), ("d" == l || "D" == l || "5" == l) && (l = 5), ("p" == l || "P" == l || "4" == l) && (l = 4);
            var n = d * l;
            $(this).find("input.row-total").val(n ? n : ""), i += t(l) ? parseInt(l, 10) : 0, a += t(d) ? parseInt(d, 10) : 0, e += t(n) ? n : 0
        }), $("#credit-grand-total").html("Total Credits: " + a), $("#table-grand-total").html("GPA: " + (e / a).toFixed(3)), $("#grade-grand-total").html("Total Grades: " + e)
    }

    function i() {
        var t = $("<tr class='calculation visible'><td>" + (d + 1) + "</td><td><div class='row'><div class='input-field col s12'><input type='text' id='" + (d + 1) + "Code' tabIndex='" + l++ + "'><label for='" + (d + 1) + "Code'>Code</label></div></div></td><td><div class='row'><div class='credit input-field col s12'><input class='credit' type='text' tabIndex='" + l++ + "' id='" + (d + 1) + "Credits'><label for='" + (d + 1) + "Credits'>Credits</label></div></div></td><td><div class='row'><div class='grade input-field col s12'><input class='grade' maxlength='2' type='text' tabIndex='" + l++ + "' id='" + (d + 1) + "Grade'><label for='" + (d + 1) + "Grade'>Grade</label></div></div></td><td><div class='row'><div class='row-total input-field col s12'><input class='row-total' type='text' readonly tabIndex='-1'></div></div></td></tr>");
        $("#gpatable").append(t), d++
    }

    function e() {
        d > 1 && ($("#gpatable").find("tr").last().remove(), d--, a())
    }
    $(".button-collapse").sideNav();
    var d = 5,
        l = 15;
    $(function() {
        $("#gpa").on("keyup", ".calculation", a), $("#gpa").on("keyup blur", ".form-control", a), $("#gpa").on("keyup", ".grade:last", function() {
            i()
        }), $("#add_row").on("click", function() {
            i()
        }), $("#delete_row").on("click", function() {
            e()
        })
    }), $("#gpatable").on("keyup", ".credit", function() {
        var t = $(this).val(),
            a = /[^0-9]/gi;
        a.test(t) && (t = t.replace(a, ""), $(this).val(t))
    }), $("#gpatable").on("keyup", ".grade", function() {
        var t = $(this).val(),
            a = /[^oabcdp10987654+]/gi;		//TODO: Make this regex stronger
        a.test(t) && (t = t.replace(a, ""), $(this).val(t))
    })
});
