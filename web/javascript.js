
var req;
var dynamicTable, infoBoxTop, infoBoxBottom;
var itemsPerPage = 10, numberOfPages = 100;
var loadPageTopAllowed = true, loadPageBottomAllowed = true;

function init() {

    dynamicTable = document.getElementById("dynamicTable");
    infoBoxTop = document.getElementById("infoBoxTop");
    infoBoxBottom = document.getElementById("infoBoxBottom");

    loadPageBottom(10);

    window.onscroll = windowOnScroll;
    
}

function windowOnScroll() {
    
    if (loadPageTopAllowed == true) {
        var firstItem = dynamicTable.firstChild;
        if (firstItem && isVisible(firstItem)) {
            var prevPageNumber = Math.floor(firstItem.id.split("_")[1] / itemsPerPage);
            if (prevPageNumber >= 1) {
                infoBoxTop.innerText = "loading...";
                infoBoxTop.style.display = "";
                loadPageTop(prevPageNumber);
            }
        }
    }

    if (loadPageBottomAllowed == true) {
        var lastItem = dynamicTable.lastChild;
        if (lastItem && isVisible(lastItem)) {
            var nextPageNumber = Math.floor(lastItem.id.split("_")[1] / itemsPerPage) + 1;
            if (nextPageNumber <= numberOfPages) {
                infoBoxBottom.innerText = "loading...";
                infoBoxBottom.style.display = "";
                loadPageBottom(nextPageNumber);
            }
        }
    }
}

function isVisible(elem, topVisible, bottomVisible) {

    var coords = elem.getBoundingClientRect();
    var windowHeight = document.documentElement.clientHeight;

    topVisible = coords.top > 0 && coords.top < windowHeight; // видна верхняя граница
    bottomVisible = coords.bottom < windowHeight && coords.bottom > 0; // видна нижняя граница

    return topVisible || bottomVisible;

}

function loadPageTop(pageNumber) {

    loadPageTopAllowed = false;

    var url = "prepareData?pageNumber=" + pageNumber + "&r=" + Math.random();
    //history.pushState('', '', url); // меняем url в браузере, чтобы можно было добавить в закладки

    req = initRequest();
    req.open("GET", url, true);
    req.onreadystatechange = loadPageTopCompletion;
    req.send(null);

}

function loadPageTopCompletion() {

    if ((req.readyState != 4) || (req.status != 200)) {
        return;
    }

    var pagePositionTop = window.pageYOffset || document.documentElement.scrollTop;
    var items = JSON.parse(req.responseText).items;
    var generalOffset = 0;
    for (var i = items.length - 1; i >= 0; i--) {
        //if (document.getElementById("Item_" + items[i]) != null) continue;
        var row = createContentItem(items[i]);
        dynamicTable.insertBefore(row, dynamicTable.firstChild);
        generalOffset += row.offsetHeight;
    }
    window.scrollTo(0, generalOffset + pagePositionTop - infoBoxTop.offsetHeight);
    infoBoxTop.style.display = "none";
    loadPageTopAllowed = true;
    
    //window.location = "#item_91";
}

function loadPageBottom(pageNumber) {

    loadPageBottomAllowed = false;

    var url = "prepareData?pageNumber=" + pageNumber + "&r=" + Math.random();
    //history.pushState('', '', url); // меняем url в браузере, чтобы можно было добавить в закладки

    req = initRequest();
    req.open("GET", url, true);
    req.onreadystatechange = loadPageBottomCompletion;
    req.send(null);

}

function loadPageBottomCompletion() {

    if ((req.readyState != 4) || (req.status != 200)) {
        return;
    }

    var items = JSON.parse(req.responseText).items;
    for (var i = 0; i < items.length; i++) {
        //if (document.getElementById("Item_" + items[i]) != null) continue;
        var row = createContentItem(items[i]);
        dynamicTable.appendChild(row);
    }

    infoBoxTop.style.display = "none";
    loadPageBottomAllowed = true;
}

function createContentItem(item) {
    var row = document.createElement("tr");
    row.id = "item_" + item;
    var cell = document.createElement("td");
    cell.height = 163;
    cell.align = "center";
    cell.innerHTML = item;
    row.appendChild(cell);
    return row;
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