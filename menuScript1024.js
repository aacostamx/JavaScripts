///<reference path="jquery-1.2.6-vsdoc.js">

/*****************************************************/
//Seccion de control de teclas de acceso rapido.
document.onkeyup = KeyCheck;
function KeyCheck(e) {
    var KeyID = (window.event) ? event.keyCode : e.keyCode;
    switch (KeyID) {
        case 118:
            elem = document.getElementById("imgCatElectronico");
            elem.click();
            break;
        case 119:
            elem = document.getElementById("imgServicios");
            elem.click();
            break;
        case 120:
            elem = document.getElementById("imgVendedor");
            elem.click();
            break;
    }
}

function redireccionaURL(result){
    if(result.value!='null'){
        var table = result.value.Tables['RESULT'];
		var row = table.Rows[0];
		switch(row['TIPO'])
		{
		    case 1:
		        window.location = row['URL'];
		    break;
		    case 2:
		        window.open(row['URL'].toString(),row['TITULO'].toString(),row['PARAMETROS'].toString());
		    break;
		    case 3:
		        window.showModalDialog(row['URL'].toString(),row['TITULO'].toString(),row['PARAMETROS'].toString());
		    break;
		}
	}
}
		

/***************************************************/
function Browser() {
    var ua, s, i;
    this.isIE = false;
    this.isNS = false;
    this.version = null;

    ua = navigator.userAgent;

    s = "MSIE";
    if ((i = ua.indexOf(s)) >= 0) {
        this.isIE = true;
        this.version = parseFloat(ua.substr(i + s.length));
        return;
    }

    s = "Netscape6/";
    if ((i = ua.indexOf(s)) >= 0) {
        this.isNS = true;
        this.version = parseFloat(ua.substr(i + s.length));
        return;
    }

    // Treat any other "Gecko" browser as NS 6.1.

    s = "Gecko";
    if ((i = ua.indexOf(s)) >= 0) {
        this.isNS = true;
        this.version = 6.1;
        return;
    }
}

var browser = new Browser();

//----------------------------------------------------------------------------
// Code for handling the menu bar and active button.
//----------------------------------------------------------------------------

var activeButton = null;

// Capture mouse clicks on the page so any active button can be
// deactivated.

if (browser.isIE)
    document.onmousedown = pageMousedown;
else
    document.addEventListener("mousedown", pageMousedown, true);

function pageMousedown(event) {
    var el;
    if (activeButton == null)
        return;

    if (browser.isIE)
        el = window.event.srcElement;
    else
        el = (event.target.tagName ? event.target : event.target.parentNode);

    if (el == activeButton)
        return;

    if (getContainerWith(el, "DIV", "Lmenu") == null) {
        resetButton(activeButton);
        activeButton = null;
    }
}

String.prototype.trim = function() {
    return this.replace(/^\s*|\s*$/g, "");
}

function buttonClick(event, menuId) {
    var button;

	//alert(menuId);
    if (browser.isIE)
        button = window.event.srcElement;
    else
        button = event.currentTarget;

    button.blur();
    if (button.imgSrcNormal == null || button.imgSrcNormal.trim() == "") button.imgSrcNormal = button.src; //Respaldar el original solo la primera vez
    button.src = button.imgSrcOver;  //Ponemos el Over

    if (button.menu == null) {
        button.menu = document.getElementById(menuId);
        menuInit(button.menu);
    }

    if (activeButton != null)
        resetButton(activeButton);

    if (button != activeButton) {
        depressButton(button, menuId);
        activeButton = button;
    }
    else
        activeButton = null;

    return false;
}

function buttonMouseover(event, menuId) {
    var button;

    if (browser.isIE)
        button = window.event.srcElement;
    else
        button = event.currentTarget;

    if (activeButton != null && activeButton != button)
        buttonClick(event, menuId);
}

function depressButton(button, menuId) {
    var x, y;

    //button.className += " menuButtonActive"; //EKT: Se deja de usar estilos para el bonton inicial de menu porque se usan imagenes

	if(menuId == "mnuRootCatElectronico")
	{
    x = 8 ;//getPageOffsetLeft(button);
    y = 95;//getPageOffsetTop(button) + button.offsetHeight;
	}
	if(menuId == "mnuRootServicios")
	{
    x = 366 ;//getPageOffsetLeft(button);
    y = 95;
//    y = 95;//getPageOffsetTop(button) + button.offsetHeight;
	}
	if(menuId == "mnuRootVendedor")
	{
    x = 725 ;//getPageOffsetLeft(button);
    y = 95;//getPageOffsetTop(button) + button.offsetHeight;
	}
    if (browser.isIE) {
        x += button.offsetParent.clientLeft;
        y += button.offsetParent.clientTop;
    }
	
	//alert(x);
	//alert(y);

    button.menu.style.left = x + "px";
    button.menu.style.top = y + "px";
    button.menu.style.visibility = "visible";
}

function resetButton(button) {
    //removeClassName(button, "menuButtonActive"); //EKT: Se deja de usar estilos para el bonton inicial de menu porque se usan imagenes

    if (button.menu != null) {
        closeSubMenu(button.menu);
        button.menu.style.visibility = "hidden";
        button.src = button.imgSrcNormal;  //Ponemos el Normal
    }
}


function menuMouseover(event) {
	
    var menu;
    if (browser.isIE)
        menu = getContainerWith(window.event.srcElement, "DIV", "Lmenu");
    else
        menu = event.currentTarget;

    if (menu.activeItem != null)
        closeSubMenu(menu);
}

function menuItemMouseover(event, menuId, classId) {
    
    var item, menu, x, y;
    if (browser.isIE)
        item = getContainerWith(window.event.srcElement, "A", classId); //EKT: parametrizacion de los estilos
    else
        item = event.currentTarget;
    menu = getContainerWith(item, "DIV", "Lmenu");

    if (menu.activeItem != null)
        closeSubMenu(menu);
    menu.activeItem = item;

    item.className += " " + classId + "Highlight"; //EKT: parametrizacion de los estilos

    if (item.subMenu == null) {
        item.subMenu = document.getElementById(menuId);
        menuInit(item.subMenu);
    }

    x = getPageOffsetLeft(item) + item.offsetWidth;
    y = getPageOffsetTop(item);

    var maxX, maxY;

    if (browser.isNS) {
        maxX = window.scrollX + window.innerWidth;
        maxY = window.scrollY + window.innerHeight;
    }
    if (browser.isIE && browser.version < 6) {
        maxX = document.body.scrollLeft + document.body.clientWidth;
        maxY = document.body.scrollTop + document.body.clientHeight;
    }
    if (browser.isIE && browser.version >= 6) {        
        /*maxX = document.documentElement.scrollLeft + document.documentElement.clientWidth;
        maxY = document.documentElement.scrollTop + document.documentElement.clientHeight;*/
        //Correccion de la longitud maxima por falta DTD
        maxX = document.body.scrollLeft + document.body.clientWidth;
        maxY = document.body.scrollTop + document.body.clientHeight;
    }
    maxX -= item.subMenu.offsetWidth;
    maxY -= item.subMenu.offsetHeight;

    if (x > maxX)
        x = Math.max(0, x - item.offsetWidth - item.subMenu.offsetWidth + (menu.offsetWidth - item.offsetWidth));
    y = Math.max(0, Math.min(y, maxY));

    item.subMenu.style.left = x + "px";
    item.subMenu.style.top = y + "px";
    item.subMenu.style.visibility = "visible";

    if (browser.isIE)
        window.event.cancelBubble = true;
    else
        event.stopPropagation();
}

function closeSubMenu(menu) {
    if (menu == null || menu.activeItem == null)
        return;

    if (menu.activeItem.subMenu != null) {
        closeSubMenu(menu.activeItem.subMenu);
        //Remover el IFRAME
        //if ($("#if_" + menu.activeItem.subMenu.id).length == 1) $("#if_" + menu.activeItem.subMenu.id).remove();
        menu.activeItem.subMenu.style.visibility = "hidden";
        menu.activeItem.subMenu = null;        
    }
    removeClassName(menu.activeItem, "Highlight", true);
    menu.activeItem = null;
}

function menuInit(menu) {
    var itemList, spanList
    var textEl, arrowEl;
    var itemWidth;
    var w, dw;
    var i, j;

    if (browser.isIE) {
        //Agregar el IFRAME
        //$("#"+menu.id).append('<iframe id="if_' + menu.id + '" class="frameMenu"></iframe>');
        //menu.style.lineHeight = "2.5ex"; //Alto de la linea
        spanList = menu.getElementsByTagName("SPAN");
        for (i = 0; i < spanList.length; i++) {
            if (hasClassName(spanList[i], "LmenuItemArrow")) {
                spanList[i].style.fontFamily = "Webdings";
                spanList[i].innerText = "4";
            } 
        }
    }

    itemList = menu.getElementsByTagName("A");
    if (itemList.length > 0)
        itemWidth = itemList[0].offsetWidth;
    else
        return;

    for (i = 0; i < itemList.length; i++) {
        spanList = itemList[i].getElementsByTagName("SPAN")
        textEl = null
        arrowEl = null;
        for (j = 0; j < spanList.length; j++) {
            if (hasClassName(spanList[j], "LmenuItemText"))
                textEl = spanList[j];
            if (hasClassName(spanList[j], "LmenuItemArrow"))
                arrowEl = spanList[j];
        }

        //Correccion de altura de tags <A> por falta de DTD
        if (parseInt(itemList[i].currentStyle.minHeight.replace("px", "")) > itemList[i].clientHeight)
            itemList[i].style.height = itemList[i].currentStyle.minHeight;

        if (textEl != null && arrowEl != null) {
            //Correccion de paddingRight por poner paddingLeft al tag <A> (se inicializa siempre el valor por default definido en estilo)
            textEl.originalWidth = textEl.originalWidth == null ? textEl.currentStyle.paddingRight : textEl.originalWidth;
            textEl.style.paddingRight = textEl.originalWidth;
            textEl.style.paddingRight = (itemWidth - (textEl.offsetWidth + arrowEl.offsetWidth)) + "px";

            //Correccion de paadingRight para tags <A> que sean mayores a 1 linea de texto por falta de DTD
            if (textEl.offsetHeight > parseInt(itemList[i].currentStyle.minHeight.replace("px", ""))) {
                textEl.style.paddingRight = parseInt(textEl.style.paddingRight.replace("px", "")) + (itemWidth - (textEl.offsetWidth + arrowEl.offsetWidth + parseInt(itemList[i].currentStyle.paddingLeft.replace("px", ""))));
            }
        }
    }

    if (browser.isIE) {
        w = itemList[0].offsetWidth;
        itemList[0].style.width = w + "px";
        dw = itemList[0].offsetWidth - w;
        w -= dw;
        itemList[0].style.width = w + "px";
    }
}

function getContainerWith(node, tagName, className) {
    while (node != null) {
        if (node.tagName != null && node.tagName == tagName && hasClassName(node, className))
            return node;
        node = node.parentNode;
    }

    return node;
}

function hasClassName(el, name) {
    var i, list;
    list = el.className.split(" ");
    for (i = 0; i < list.length; i++)
        if (list[i] == name)
        return true;

    return false;
}

function removeClassName(el, name, like) {
    var i, curList, newList;
    if (el.className == null)
        return;
    newList = new Array();
    curList = el.className.split(" ");
    for (i = 0; i < curList.length; i++)
        if ((!like && curList[i] != name) || (like && curList[i].indexOf(name) == -1)) //EKT: Se agrega la validacion para buscar en forma de LIKE
        newList.push(curList[i]);
    el.className = newList.join(" ");
}

function getPageOffsetLeft(el) {
    var x;
    x = el.offsetLeft;
    if (el.offsetParent != null)
        x += getPageOffsetLeft(el.offsetParent);

    return x;
}

function getPageOffsetTop(el) {
    var y;
    y = el.offsetTop;
    if (el.offsetParent != null)
        y += getPageOffsetTop(el.offsetParent);

    return y;
}