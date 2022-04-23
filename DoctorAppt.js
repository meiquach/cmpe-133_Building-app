function Filled() {
    var a = document.forms["Form"]["f1"].value;
    var b = document.forms["Form"]["f2"].value;
    var c = document.forms["Form"]["f3"].value;
    var d = document.forms["Form"]["f4"].value;
    var e = document.forms["Form"]["f5"].value;
    var f = document.forms["Form"]["f6"].value;
    
    if (a == null || a == "" || b == null || b == "" || c == null || c == "" || d == null || d == "" || e == null || e == "" || f == null || f == "") {
        alert("Please Fill All Required Field (*)");
    } else {
        var blur = document.getElementById("blur");
        blur.classList.toggle("active");
        document.getElementById("popup").style.display = "block";
    }
}

function closeForm() {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    document.getElementById("popup").style.display = "none";
}
