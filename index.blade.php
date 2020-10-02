@extends('retro.layouts.retro_main_layout')

@section('meta')
<meta charset="UTF-8">
<meta name="viewport" content="width=1366, initial-scale=1, maximum-scale=1">
<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<meta name="description" content="Guessing Keyboard Game">
<meta name="author" content="Quang Dinh Bui">
<meta property="og:url"                content="" />
<meta property="og:type"               content="game, media, entertainment" />
<meta property="og:title"              content="Guessking Keyboard Game" />
<meta property="og:description"        content="Guessing Keyboard Game" />
<meta property="og:image"              content="" />
<meta content="utf-8" http-equiv="encoding">
@endsection

@section('title')
Visual Keyboard Game
@endsection

@section('css')
<link rel="stylesheet" href="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Css/index.css') }}">
<link rel="stylesheet" href="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Css/Libs/animate.min.css') }}">
@endsection

@section('main-content')
<div style="margin-top: 60px"></div>
<div class="wrapper">
        <div id="author-container" class="txt center-container">
            <div id="author">
                Developed by Quang Dinh Bui. Visis <a href="https://github.com/bquangDinh/Guessing-Keyboard-Game.git" target="_blank">my github</a>
            </div>
        </div>
        <div id="result-panel" style="display: none;">
            <div id="resullt-panel-inner" class="bg-shadow bold-border">
                <button id="close-result-panel" class="bg-shadow bold-border txt">x</button>
                <div>
                    <p class="txt title-msg">Remembered Keys: </p> <span id="remembered-keys-msg" class="txt score-msg">0</span>
                </div>
                <div>
                    <p class="txt title-msg">Missed Keys: </p> <span id="missed-keys-msg" class="txt score-msg">0</span>
                </div>
                <div id="special-msg-container" class="txt">
                    -----------<span id="special-msg">Too Bad >.< </span>-----------
                </div>
            </div>
        </div>
        <div class="game-info-container">
            <div class="selecting-mode-container">
                <div class="selecting-mode__inner">
                    <button class="selecting-mode-btn bold-border bg-shadow" data-mode-name="easy">
                        Easy
                    </button>
                    <button class="selecting-mode-btn bold-border bg-shadow selected" data-mode-name="normal">
                        Normal
                    </button>
                    <button class="selecting-mode-btn bold-border bg-shadow" data-mode-name="hardcore">
                        Hardcore
                    </button>
                    <button class="selecting-mode-btn bold-border bg-shadow" data-mode-name="really">
                        Really?
                    </button>
                </div>
            </div>
            <div class="playing-panel center-container">
                <div class="playing-panel__main bold-border bg-shadow">
                    <div class="game-settings-panel panel" id="settings-panel">
                        <div class="grid-item center-container">
                            <button class="keyboard-select-btn bg-shadow bold-border selected" data-keyboard-name="ASNI_104">ANSI 104</button>
                        </div>
                        <div class="grid-item center-container">
                            <button class="keyboard-select-btn bg-shadow bold-border" data-keyboard-name="DEFAUT_60">DEFAULT 60%</button>
                        </div>
                        <div class="grid-item center-container">
                            <button class="keyboard-select-btn bg-shadow bold-border" data-keyboard-name="JD40">JD40</button>
                        </div>
                        <div class="grid-item center-container">
                            <button class="keyboard-select-btn bg-shadow bold-border" data-keyboard-name="PLANCK">PLANCK</button>
                        </div>
                        <div class="grid-item center-container">
                            <button class="keyboard-select-btn bg-shadow bold-border" data-keyboard-name="LEOPOLD_FC660M">Leopold</button>
                        </div>
                        <div class="grid-item center-container">
                            <button class="keyboard-select-btn bg-shadow bold-border" data-keyboard-name="" disabled></button> 
                        </div>
                        <div class="grid-item center-container">
                            <button id="play-btn" class="grid-item bg-shadow bold-border">
                                Play
                            </button>
                        </div> 
                    </div>
                    <div class="panel noselect" id="playing-panel" style="display: none;">
                        <span id="time-counter" class="txt">00:00</span>
                        <div id="letter-generator" class="txt txt-center">N</div>
                        <button id="stop-btn" class="txt bg-shadow bold-border">
                            Restart
                        </button>
                        <div class="progressbar-outer" id="letter-time-progressbar">
                            <div class="progressbar-inner">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-score-container center-container">
                <div class="game-score-container__inner bold-border bg-shadow">
                    <div class="upper">
                        <div class="txt txt-left title">Remembered Keys</div>
                        <div class="txt txt-center score-txt" id="remembered-keys-count">0</div>
                    </div>
                    <div class="lower">
                        <p class="txt txt-left title">Missed Keys</p>
                        <p class="txt txt-center score-txt" id="missed-keys-count">0</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="keyboard-container center-container">
            <div id="keyboard-main-container" class="bolder-border bg-shadow">

            </div>
        </div>
    </div>
@endsection

@section('js')
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/jquery-3.5.1.min.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/keyboard.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/scoreboard.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/playingboard.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/resultboard.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/chargenerator.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/progressbar.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/timer.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/game.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/Libs/flowtype.js') }}"></script>
<script src="{{ URL::asset('experiments/782fe2c8-4c23-4caa-8015-1e590f85ad0e/Assets/Js/index.js') }}"></script>
@endsection