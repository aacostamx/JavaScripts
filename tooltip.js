var xPos;
var yPos;

function showToolTip(msg,evt){
    if (evt) {
        var url = evt.target;
    }
    else {
        evt = window.event;
        var url = evt.srcElement;
    }
    xPos = evt.clientX;
    yPos = evt.clientY;

   var toolTip = document.getElementById("toolTip");
   if(toolTip==null)
   {
      toolTip = document.createElement("div");  
      toolTip.id = "toolTip";
      toolTip.className ="toolTip";
      document.body.appendChild(toolTip); 
   }
   toolTip.innerHTML = "<p>"+msg+"</p>";
   toolTip.style.top = parseInt(yPos)+10 + "px";
   toolTip.style.left = parseInt(xPos)+10 + "px";
   toolTip.style.visibility = "visible";
   
}

function hideToolTip(){
   var toolTip = document.getElementById("toolTip");
   toolTip.style.visibility = "hidden";
}