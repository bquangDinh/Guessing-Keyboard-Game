var keyBoardContainer = $("#keyboard-main-container");
var rememberedKeysDOM = $("#remembered-keys-count");
var missedKeysDOM = $("#missed-keys-count");
var letterDOM = $("#letter-generator");

var progressbarDOM = $("#letter-time-progressbar");

var timerDOM = $("#time-counter");

var resultPanelDOM = $("#result-panel");
var rmScoreTbox = $("#remembered-keys-msg");
var mScoreTbox = $("#missed-keys-msg");
var spemsgTbox = $("#special-msg");

var panels = {
  settings_panel: $("#settings-panel"),
  playing_panel: $("#playing-panel")
};

var keyBoard = KeyBoard(keyBoardContainer);
var scoreBoard = ScoreBoard(rememberedKeysDOM, missedKeysDOM);
var playingBoard = PlayingBoard(panels);
var resultBoard = ResultBoard(resultPanelDOM, rmScoreTbox, mScoreTbox, spemsgTbox);
var charGenerator = CharGenerator(letterDOM, keyBoard);
var progressBarController = ProgressBar(progressbarDOM, 100);
var timerController = Timer(timerDOM);
var gameController = Game(keyBoard, scoreBoard, playingBoard, resultBoard, charGenerator, progressBarController, timerController);

var ANSI104 = [
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
      "Space",
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

var DEFAULT_60 = [
    [
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
      "Backspace"
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
      "|\n\\"
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
      "Enter"
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
      "Shift"
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
      "Space",
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
      "Ctrl"
    ]
];

var JD40 = [
    [
      "Esc",
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
      "Back<br>Space"
    ],
    [
      {
        "w": 1.25
      },
      "Tab",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      {
        "w": 1.75
      },
      "Enter"
    ],
    [
      {
        "w": 1.75
      },
      "Shift",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      "<\n.",
      {
        "w": 1.25
      },
      "Shift",
      "Fn"
    ],
    [
      {
        "w": 1.25
      },
      "Hyper",
      "Super",
      "Meta",
      {
        "a": 7,
        "w": 6.25
      },
      "Space",
      {
        "a": 4,
        "w": 1.25
      },
      "Meta",
      {
        "w": 1.25
      },
      "Super"
    ]
];

var PLANCK = [
    [
      {
        "a": 7
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
      "Back Space"
    ],
    [
      "Esc",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ";",
      "'"
    ],
    [
      "Shift",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      ",",
      ".",
      "/",
      "Return"
    ],
    [
      "Space",
      "Ctrl",
      "Alt",
      "Super",
      "&dArr;",
      {
        "w": 2
      },
      "Space",
      "&uArr;",
      "&larr;",
      "&darr;",
      "&uarr;",
      "&rarr;"
    ]
];

var LEOPOLD_FC660M = [
    [
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
        "x": 0.5
      },
      "Insert"
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
        "x": 0.5
      },
      "Delete"
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
      "Enter"
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
        "w": 2.25
      },
      "Shift",
      "↑"
    ],
    [
      {
        "w": 1.25
      },
      "Ctrl",
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
      "Ctrl",
      {
        "w": 1.25
      },
      "Menu",
      "←",
      "↓",
      "→"
    ]
];

var KeyLayoutsMap = new Map();
KeyLayoutsMap["ASNI_104"] = ANSI104;
KeyLayoutsMap["DEFAUT_60"] = DEFAULT_60;
KeyLayoutsMap["JD40"] = JD40;
KeyLayoutsMap["PLANCK"] = PLANCK;
KeyLayoutsMap["LEOPOLD_FC660M"] = LEOPOLD_FC660M;

$(document).ready(function(e){
    //default keyboard
    keyBoard.initialize(KeyLayoutsMap["ASNI_104"]);
    scoreBoard.Initialize();

    gameController.Initialize();

    $(".keyboard-select-btn").click(function(e){
        $('.keyboard-select-btn.selected').removeClass('selected');
        $(this).addClass('selected');

        //select keyboard from KeyLayoutsMap
        let keyBoardName = $(this).data('keyboard-name');
        let keyboardLayout = KeyLayoutsMap[keyBoardName];

        if(keyboardLayout !== 'undefined'){
            keyBoard.clear();
            keyBoard.initialize(keyboardLayout);
        }else{
            console.error('Selected keyboard is undefined');
        }
    });

    $('.selecting-mode-btn').click(function(e){
      let modename = $(this).data('mode-name');
      $('.selecting-mode-btn.selected').removeClass('selected');
      $(this).addClass('selected');

      gameController.SetMode(modename);
    });

    $("#playing-panel").dblclick(function(e){
      console.log('Stop');
    });

    $("#play-btn").click(function(e){
      $('.selecting-mode-btn').addClass('disabled').prop('disabled',true);
      gameController.Play();
    });

    $("#stop-btn").click(function(e){
      $('.selecting-mode-btn').removeClass('disabled').prop('disabled',false);
      gameController.Restart();
    });

    $("#close-result-panel").click(function(e){
      $("#result-panel").hide();
    });
});

$("#letter-generator").flowtype({
  minFont: 40,
  maxFont: 50
});
