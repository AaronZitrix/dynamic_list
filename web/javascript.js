
var req, dynamicTable, infoBox, itemsPerPage = 10;

function init() {

    dynamicTable = document.getElementById("dynamicTable");
    infoBox = document.getElementById("infoBox");

    loadPage(1);

    window.onscroll = windowOnScroll;

}

function windowOnScroll() {
    var lastItem = dynamicTable.lastChild;
    if (lastItem == null)
        return;

    if (isVisible(lastItem)) {
        var nextPageNumber = lastItem.id.split("_")[1] / itemsPerPage + 1;
        if (Number.isInteger(nextPageNumber))
            loadPage(nextPageNumber);
    }
}

function isVisible(elem, topVisible, bottomVisible) {

    var coords = elem.getBoundingClientRect();
    var windowHeight = document.documentElement.clientHeight;

    topVisible = coords.top > 0 && coords.top < windowHeight; // видна верхняя граница
    bottomVisible = coords.bottom < windowHeight && coords.bottom > 0; // видна нижняя граница

    return topVisible || bottomVisible;

}

function loadPage(pageNumber) {

    infoBox.innerText = "loading...";
    infoBox.style.display = "";

    var url = "prepareData?pageNumber=" + pageNumber;
    //history.pushState('', '', url); // меняем url в браузере, чтобы можно было добавить в закладки

    req = initRequest();
    req.open("GET", url, true);
    req.onreadystatechange = loadPageCompletion;
    req.send(null);

}

function loadPageCompletion() {

    if ((req.readyState != 4) || (req.status != 200))
        return;

    var items = JSON.parse(req.responseText).items;
    for (i = 0; i < items.length; i++) {
        addContentItem(items[i]);
    }

    infoBox.style.display = "none";

}

function addContentItem(item) {
    row = document.createElement("tr");
    row.id = "item_" + item;
    cell = document.createElement("td");
    cell.height = 163;
    cell.align = "center";
    row.appendChild(cell);
    dynamicTable.appendChild(row);
    cell.innerHTML = item;
}

function clearTable() {
    if (dynamicTable.getElementsByTagName("tr").length = 0)
        return;
    for (i = dynamicTable.childNodes.length - 1; i >= 0; i--) {
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