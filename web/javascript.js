
var req;
var dynamicTable;

function init() {
    
    dynamicTable = document.getElementById("dynamicTable");
    dynamicTable.style.visibility = "hidden";
    
    var infoBox = document.getElementById("infoBox");
    infoBox.innerText = "loading...";
    infoBox.style.visibility = "visible";
    
    req = initRequest();
    req.open("GET", "prepareData", true);
    req.onreadystatechange = initCompletion;
    req.send(null);
    
}

function initCompletion() {
    if ((req.readyState != 4) || (req.status != 200)) return;
    //clearTable();
    var items = JSON.parse(req.responseText).items;
    /*for (i = 1; i > 10; i++) {
        addContentItem();
    }*/
    /*dynamicTable.style.visibility = "visible";
    infoBox.style.visibility = "hidden";*/
}

function addContentItem() {
    row = document.createElement("tr");
    cell = document.createElement("td");
    row.appendChild(cell);
    dynamicTable.appendChild(row);
}

function clearTable() {
    if (dynamicTable.getElementsByTagName("tr").length = 0) return;
    for (i = dynamicTable.childNodes.length - 1; i >= 0 ; i--) {
        dynamicTable.removeChild(dynamicTable.childNodes[i]);
    }
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