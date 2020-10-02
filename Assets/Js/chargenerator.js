const CharGenerator = function(dom, keyboard){
    var charDOM = dom;

    var getRandom = function(){
        let characters = keyboard.getFullKeyboardLayout();
        let index = Math.floor(Math.random() * characters.length);
        return characters[index];
    }

    return {
        GetRandomCharacter: function(){
            let character = getRandom();
            $(charDOM).text(character);
            return character;
        }
    }
}