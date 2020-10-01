const KeyBoard = function(){
  var properties = {
    key: {
      size: 60,
      textSize: 40
    }
  };

  var keyboardContainer = null;
  var keyBoardLayout = null;
  var maxCountOfKeyOnRow_Index = 0;

  var keyBoardSize = {
    w: 0,
    h: 0,
  }

  //render all keys by defined layout
  var renderKeys = function(){
    let oldPosY = 0;

    for(let [index,rows] of keyBoardLayout.entries()){ 
        let oldKey = null;     
        let x = 0, y = 0, w = 1, h = 1;
        let offset = {x: 10, y: 10};

        //declare postion and size of the key
        let pos = {x: 0, y : 0};
        let size = {w: 0, h: 0};
        let tbSize = {w: 0, h: 0};

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

                //calculate the size of the key
                size.w = properties.key.size * w;
                size.h = properties.key.size * h;

                //calculate the size of the textbox inside the key
                tbSize.w = (properties.key.textSize / properties.key.size) * size.w;
                tbSize.h = (properties.key.textSize / properties.key.size) * size.h;

                //calculate the position of the key
                if(oldKey == null){
                  pos.x = offset.x;
                }else{
                  pos.x = oldKey.pos.x + oldKey.size.w + properties.key.size * x;
                }

                if(index == 0){
                  pos.y = offset.y;
                }else{
                  pos.y = oldPosY + properties.key.size + properties.key.size * y;
                }

                //calculate the board width
                if(index == maxCountOfKeyOnRow_Index){
                  if(oldKey == null){
                    keyBoardSize.w += size.w + offset.x * 4;
                  }else{
                    if(x > 0){
                      keyBoardSize.w += size.w + properties.key.size * x;
                    }else{
                      keyBoardSize.w += size.w;
                    }
                  }
                  
                }

                oldKey = {
                  pos: {x: pos.x, y: pos.y},
                  size: {w: size.w, h: size.h}
                };

                $(DOMelement).css('top', pos.y + 'px');
                $(DOMelement).css('left', pos.x + 'px');
                $(DOMelement).css('width', size.w + 'px');
                $(DOMelement).css('height', size.h + 'px');

                $(DOMelement).find('.text').css('width', tbSize.w + 'px');
                $(DOMelement).find('.text').css('height', tbSize.h + 'px');

                //set the size for borders
                $(DOMelement).find('.angle-shadow.left-border-arrow').css('border-left-width', (size.w / 2) + 'px');
                $(DOMelement).find('.angle-shadow.top-border-arrow').css('border-top-width', (size.h / 2) + 'px');
                $(DOMelement).find('.angle-shadow.right-border-arrow').css('border-right-width', (size.w / 2) + 'px');
                $(DOMelement).find('.angle-shadow.bottom-border-arrow').css('border-bottom-width', (size.h / 2) + 'px');

                if(size.w > properties.key.size){
                    $(DOMelement).find('.angle-shadow.top-border-arrow').css('border-left-width', ((size.w / 2) - 10) + 'px');
                    $(DOMelement).find('.angle-shadow.top-border-arrow').css('border-right-width', ((size.w / 2) - 10) + 'px');
                    $(DOMelement).find('.angle-shadow.bottom-border-arrow').css('border-left-width', ((size.w / 2) - 10) + 'px');
                    $(DOMelement).find('.angle-shadow.bottom-border-arrow').css('border-right-width', ((size.w / 2) - 10) + 'px');
                }

                if(size.h > properties.key.size){
                  $(DOMelement).find('.angle-shadow.left-border-arrow').css('border-top-width', (20 + (size.h / 4)) + 'px');
                  $(DOMelement).find('.angle-shadow.left-border-arrow').css('border-bottom-width', (20 + (size.h / 4)) + 'px');
                  $(DOMelement).find('.angle-shadow.right-border-arrow').css('border-top-width', (20 + (size.h / 4)) + 'px');
                  $(DOMelement).find('.angle-shadow.right-border-arrow').css('border-bottom-width', (20 + (size.h / 4)) + 'px');
                }

                $(keyboardContainer).append(DOMelement);

                x = 0;
                w = 1;
                h = 1;   
            }

            if(typeof ele === 'object'){
                if(ele.hasOwnProperty("x")) x = ele['x'];
                if(ele.hasOwnProperty("y")) y = ele['y'];
                if(ele.hasOwnProperty("w")) w = ele['w'];
                if(ele.hasOwnProperty("h")) h = ele['h'];
            }
        } 
        
        //calculate the board height
        if(index == 0){
          keyBoardSize.h += size.h + offset.y * 4;
        }else{
          if(y > 0){
            keyBoardSize.h += size.w + properties.key.size * y;
          }else{
            keyBoardSize.h += size.w;
          }
        }

        y = 0;

        oldPosY = oldKey.pos.y;
    }
  };
  
  var adjustKeyboardContainer = function(){
    if(keyboardContainer == null){
      console.error("Keyboard Container is not defined");
    }else if(keyBoardSize.w == 0 || keyBoardSize.h == 0){   
      console.error("Keyboard size is zero")
    }else{
      $(keyboardContainer).css("width", keyBoardSize.w + "px");
      $(keyboardContainer).css("height", keyBoardSize.h + "px");
    }
  }

  var FindRowInLength = function(){
    //find the row which have a maxium count of keys
    var maxCountOfKeyOnRow = 0;


    for (const ele of keyBoardLayout[0]) {
      if(typeof ele === 'string') maxCountOfKeyOnRow++;
    }

    for (const [idx,row] of keyBoardLayout.entries()) {
      let currentCount = 0;
      for (const ele of row) {
        if(typeof ele === 'string') currentCount++;
      }

      if(currentCount > maxCountOfKeyOnRow){
        maxCountOfKeyOnRow = currentCount;
        maxCountOfKeyOnRow_Index = idx;
      }
    }
  }

  return {
    initialize: function(_keyboardContainer, keyBoardLayoutJson){
      keyboardContainer = _keyboardContainer;
      keyBoardLayout = keyBoardLayoutJson;
      FindRowInLength();
      renderKeys();
      adjustKeyboardContainer();
    },
    clear: function(){
      $(keyboardContainer).empty();
    }
  }
}