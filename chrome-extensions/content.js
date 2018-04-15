console.log("ahoj")

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message,sender,sendResponse){
    console.log(message.text)
    const content = `
        <style>
        #mydiv {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 1000;
            background-color: #f1f1f1;
            border: 1px solid #d3d3d3;
            text-align: center;
        }
        
        #mydivheader {
            padding: 10px;
            cursor: move;
            z-index: 10;
            background-color: #2196F3;
            color: #fff;
        }
        </style>

        <div id="mydivheader">Click here to move</div>
        <p>Move</p>
        <p>this</p>
        <p>DIV</p>

        <script src='jdrag.js'></script>        
    `
    const dragDiv = document.createElement('div')
    dragDiv.id = 'mydiv'
    dragDiv.innerHTML = content
    document.body.appendChild(dragDiv)

    const emails = []
    const elements = Array.from(document.getElementsByTagName("a"));
    console.log(elements)
    console.log(document.body.innerText.split(' '))
    elements.forEach(element => {
      for(let ch of element.innerText){
        if(ch === '@'){
          emails.push(element.innerText)
        }
      }

    })
    console.log(emails)
    
//Make the DIV element draggagle:
dragElement(document.getElementById(("mydiv")));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

    
}