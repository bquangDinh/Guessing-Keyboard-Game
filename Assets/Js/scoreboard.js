const ScoreBoard = function(_rememberedKeysDOM, _missedKeysDOM){
    var rememberedKeysDOM = _rememberedKeysDOM;
    var missedKeysDOM = _missedKeysDOM;

    var currentRememberedKeys = 0;
    var currentMissedKeys = 0;

    return {
        Initialize: function(){
            $(rememberedKeysDOM).text(currentRememberedKeys);
            $(missedKeysDOM).text(currentMissedKeys);
        },
        IncreRememberedKeys: function(){
            ++currentRememberedKeys;
            $(rememberedKeysDOM).text(currentRememberedKeys);
        },
        IncreMissedKeys: function(){
            ++currentMissedKeys;
            $(missedKeysDOM).text(currentMissedKeys);
        },
        GetRememberedKeys: function(){
            return currentRememberedKeys;
        },
        GetMissedKeys: function(){
            return currentMissedKeys;
        },
        GetRememberedKeyDOM: function(){
            return rememberedKeysDOM;
        },
        GetMissedKeyDOM: function(){
            return missedKeysDOM;
        },
        Reset: function(){
            currentRememberedKeys = 0;
            currentMissedKeys = 0;

            $(rememberedKeysDOM).text(currentRememberedKeys);
            $(missedKeysDOM).text(currentMissedKeys);
        }
    };
}