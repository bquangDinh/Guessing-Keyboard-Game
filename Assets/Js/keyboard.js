var KeyLayout = [
    [
      "Esc",
      {
        "x": 1
      },
      "F1",
      "F2",
      "F3",
      "F4",
      {
        "x": 0.5
      },
      "F5",
      "F6",
      "F7",
      "F8",
      {
        "x": 0.5
      },
      "F9",
      "F10",
      "F11",
      "F12",
      {
        "x": 0.25
      },
      "PrtSc",
      "Scroll Lock",
      "Pause\nBreak"
    ],
    [
      {
        "y": 0.5
      },
      "~\n`",
      "!\n1",
      "@\n2",
      "#\n3",
      "$\n4",
      "%\n5",
      "^\n6",
      "&\n7",
      "*\n8",
      "(\n9",
      ")\n0",
      "_\n-",
      "+\n=",
      {
        "w": 2
      },
      "Backspace",
      {
        "x": 0.25
      },
      "Insert",
      "Home",
      "PgUp",
      {
        "x": 0.25
      },
      "Num Lock",
      "/",
      "*",
      "-"
    ],
    [
      {
        "w": 1.5
      },
      "Tab",
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "{\n[",
      "}\n]",
      {
        "w": 1.5
      },
      "|\n\\",
      {
        "x": 0.25
      },
      "Delete",
      "End",
      "PgDn",
      {
        "x": 0.25
      },
      "7\nHome",
      "8\n↑",
      "9\nPgUp",
      {
        "h": 2
      },
      "+"
    ],
    [
      {
        "w": 1.75
      },
      "Caps Lock",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ":\n;",
      "\"\n'",
      {
        "w": 2.25
      },
      "Enter",
      {
        "x": 3.5
      },
      "4\n←",
      "5",
      "6\n→"
    ],
    [
      {
        "w": 2.25
      },
      "Shift",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      "<\n,",
      ">\n.",
      "?\n/",
      {
        "w": 2.75
      },
      "Shift",
      {
        "x": 1.25
      },
      "↑",
      {
        "x": 1.25
      },
      "1\nEnd",
      "2\n↓",
      "3\nPgDn",
      {
        "h": 2
      },
      "Enter"
    ],
    [
      {
        "w": 1.25
      },
      "Ctrl",
      {
        "w": 1.25
      },
      "Win",
      {
        "w": 1.25
      },
      "Alt",
      {
        "a": 7,
        "w": 6.25
      },
      "",
      {
        "a": 4,
        "w": 1.25
      },
      "Alt",
      {
        "w": 1.25
      },
      "Win",
      {
        "w": 1.25
      },
      "Menu",
      {
        "w": 1.25
      },
      "Ctrl",
      {
        "x": 0.25
      },
      "←",
      "↓",
      "→",
      {
        "x": 0.25,
        "w": 2
      },
      "0\nIns",
      ".\nDel"
    ]
  ];

const KeyBoard = {
    properties:{
        key:{
            size: 60,
            offset: 10,
            textSize: 40
        }
    },
    initialize: function(){
        let x = 0;
        let y = 0;
        let w = 1;
        let h = 1;

        let offsetX = 10, offsetY = 10;
        let oldPosX = 0, oldPosY = 0;

        let keySize = this.properties.key.size + this.properties.key.offset;
        let rawKeySize = this.properties.key.size;
        let rawKeyTextSize = this.properties.key.textSize;

        for(let [index,rows] of KeyLayout.entries()){
            let posX = 0, posY = 0;
            let width = 0, height = 0;
            let tbWidth = 0, tbHeight = 0;

            //because the array includes objects
            //using idx from array entries will cause missing idx which is needed 
            //to calculate pos X
            let idx = 0;
            for(let ele of rows){
                if(typeof ele === 'string'){
                    //create DOM element
                    let DOMelement = $(
                        `
                    <div class="key bold-border sm-shadow" type="button" data-key-name="${ele}">
                        <span class="text">${ele}</span>

                        <div class="angle-shadow left-border-arrow"></div>
                        <div class="angle-shadow top-border-arrow"></div>
                        <div class="angle-shadow right-border-arrow"></div>
                        <div class="angle-shadow bottom-border-arrow"></div>
                    </div>
                    `
                    );
                    
                    //if there is the first row
                    //then we set the first key to offset position
                    //every keys after the first key will folow the first key's position
                    
                    //check whether it is the first row
                    if(index == 0){
                        posY = offsetY;
                    }else{
                        posY = oldPosY + keySize + (keySize * y);
                    }

                    //check whether it is the first key
                    if(idx == 0){
                        posX = offsetX;
                    }else{
                        posX = oldPosX + keySize + (keySize * x); 
                    }

                    //remember the old position
                    //to calculate the next key position
                    oldPosX = posX;

                    //set position for the key
                    $(DOMelement).css("top", posY + "px");
                    $(DOMelement).css("left", posX + "px");
                    
                    //calculate the size of the key
                    width = rawKeySize * w;
                    height = rawKeySize * h;

                    //set size for the key
                    $(DOMelement).css("width", width + "px");
                    $(DOMelement).css("height", height + "px");
                    
                    //calculate the size of the textbox inside the key
                    tbWidth = (rawKeyTextSize / rawKeySize) * width;
                    tbHeight = (rawKeyTextSize / rawKeySize) * height;

                    //set the size for the textbox
                    $(DOMelement).find(".text").css("width", tbWidth + "px");
                    $(DOMelement).find('.text').css('height', tbHeight + 'px');

                    //set the size for borders
                    $(DOMelement).find('.angle-shadow.left-border-arrow').css('border-left-width', (width / 2) + 'px');
                    $(DOMelement).find('.angle-shadow.top-border-arrow').css('border-top-width', (height / 2) + 'px');
                    $(DOMelement).find('.angle-shadow.right-border-arrow').css('border-right-width', (width / 2) + 'px');
                    $(DOMelement).find('.angle-shadow.bottom-border-arrow').css('border-bottom-width', (height / 2) + 'px');

                    if(width != rawKeySize){
                        console.log(width);
                        $(DOMelement).find('.angle-shadow.top-border-arrow').css('border-left-width', (27 + (width / 4)) + 'px');
                        $(DOMelement).find('.angle-shadow.top-border-arrow').css('border-right-width', (27 + (width / 4)) + 'px');
                        $(DOMelement).find('.angle-shadow.bottom-border-arrow').css('border-left-width', (27 + (width / 4)) + 'px');
                        $(DOMelement).find('.angle-shadow.bottom-border-arrow').css('border-right-width', (27 + (width / 4)) + 'px');
                    }

                    if(height != rawKeySize){
                        $(DOMelement).find('.angle-shadow.left-border-arrow').css('border-top-width', (27 + (height / 2)) + 'px');
                        $(DOMelement).find('.angle-shadow.left-border-arrow').css('border-bottom-width', (27 + (height / 2)) + 'px');
                        $(DOMelement).find('.angle-shadow.right-border-arrow').css('border-top-width', (27 + (height / 2)) + 'px');
                        $(DOMelement).find('.angle-shadow.right-border-arrow').css('border-bottom-width', (27 + (height / 2)) + 'px');
                    }

                    //append the key to the container
                    $("#keyboard-main-container").append(DOMelement);

                    //after done a key, reset x
                    x = 0;

                    w = 1;
                    h = 1;

                    ++idx;
                }

                if(typeof ele === 'object'){
                    if(ele.hasOwnProperty("x")) x = ele['x'];
                    if(ele.hasOwnProperty("y")) y = ele['y'];
                    if(ele.hasOwnProperty("w")) w = ele['w'];
                    if(ele.hasOwnProperty("h")) h = ele['h'];
                }
            }

            //after done a row, reset y to zero
            y = 0;

            //remember the old position
            //to calculate the next key position
            oldPosY = posY;
            
            if(index == 2) break;
        }
    }
};