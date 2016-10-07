
var req, dynamicTable, infoBox;

function init() {
    
    dynamicTable = document.getElementById("dynamicTable");
    dynamicTable.style.display = "none";
    
    infoBox = document.getElementById("infoBox");
    infoBox.innerText = "loading...";
    infoBox.style.display = "";
    
    req = initRequest();
    req.open("GET", "prepareData", true);
    req.onreadystatechange = initCompletion;
    req.send(null);
    
}

function initCompletion() {
    
    if ((req.readyState != 4) || (req.status != 200)) return;
    
    clearTable();
    
    var items = JSON.parse(req.responseText).items;
    for (i = 0; i < items.length; i++) {
        addContentItem(items[i]);
    }
    
    dynamicTable.style.display = "";
    infoBox.style.display = "none";
    
}

function addContentItem(item) {
    row = document.createElement("tr");
    cell = document.createElement("td");
    cell.height = 165;
    cell.align = "center";
    row.appendChild(cell);
    dynamicTable.appendChild(row);
    cell.innerHTML = item;
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