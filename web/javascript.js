
var req;

function init() {
    
    var dynamicTable = document.getElementById("dynamicTable");
    dynamicTable.style.visibility = "hidden";
    
    var infoBox = document.getElementById("infoBox");
    infoBox.innerText = "Data preparation...";
    infoBox.style.visibility = "visible";
    
    req = initRequest();
    req.open("GET", "prepareData", true);
    req.onreadystatechange = initCompletion;
    req.send(null);
    alert("done");
}

function initCompletion() {
    if ((req.readyState != 4) || (req.status != 200)) return;
    
}

function initRequest() {
    if (window.XMLHttpRequest) {
        if (navigator.userAgent.indexOf('MSIE') != -1) {
            isIE = true;
        }
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        isIE = true;
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}