const Game = function( _keyboard, _scoreboard, _playingboard, _resultBoard, _chargenerator, _progressbar, _timer){
    var selectedMode = "normal"; // default
    var status = 'not_play';
    const time = 60000; // 1 min
    var loadTime = 1000;
    var lastHitKeyIsCorrect = true;
    var alreadyHit = false;

    var animateCSSJquery  = function(element,animationName,callback){
        console.log('v');
        $(element).addClass('animate__animated ' + 'animate__' + animationName);
      
        function handleAnimationEnd(){
          $(element).removeClass('animate__animated');
          $(element).removeClass('animate__' + animationName);
          $(element).unbind('animationend');
      
          if(typeof callback === 'function') callback();
        }
      
        $(element).bind('animationend',handleAnimationEnd);
    } // just left it here for a while

    return {
        Initialize: function(){
            _timer.SetTime(time);
            _progressbar.Initialize(loadTime);
        },
        Play: function(){
            var that = this;

            status = 'playing';
            _playingboard.goPlayingPanel();
            _timer.Run();
            _progressbar.Run();
            _keyboard.hiddenAllKeys();

            let c = _chargenerator.GetRandomCharacter();  

            //refer issue: https://stackoverflow.com/a/15353226
            $(_progressbar.GetDOM()).unbind('time:out').on('time:out',function(e){
                _keyboard.showKeyHint(c);
                c = _chargenerator.GetRandomCharacter();  
                _progressbar.Reset();
                _progressbar.Run();

                if(alreadyHit == false){
                    _scoreboard.IncreMissedKeys();
                }

                //reset the alreadyHit for the next time
                alreadyHit = false;
            });

            $(_keyboard.getKeyboardContainerIns()).on('key:clicked', function(e, keyname){
                alreadyHit = true;
                if(keyname.normalize() == c.normalize()){
                    
                    animateCSSJquery(_scoreboard.GetRememberedKeyDOM(), 'rubberBand');
                    _scoreboard.IncreRememberedKeys();
                    lastHitKeyIsCorrect = true;
                }else{
                    console.log('sdasdas');
                    _scoreboard.IncreMissedKeys();
                    lastHitKeyIsCorrect = false;
                    animateCSSJquery(_scoreboard.GetMissedKeyDOM(), 'shakeX');
                }
            });

            $(_timer.GetTimerDOM()).on('timer:out', function(e){
                let rmScore = _scoreboard.GetRememberedKeys(); // remembered count
                let mScore = _scoreboard.GetMissedKeys(); //missed count
                let msg = "";

                if(mScore > rmScore){
                    if(mScore - rmScore > 10){
                        let msgs = [
                            "Too bad :\\",
                            "I can feel it",
                            "So bad :]"
                        ];

                        let index = Math.floor(Math.random() * msgs.length);
                        msg = msgs[index];
                    }else if(mScore - rmScore <= 10 && mScore - rmScore > 5){
                        let msgs = [
                            "Still too bad >.<",
                            "Ewwwwww",
                            ":))))))))))))"
                        ];

                        let index = Math.floor(Math.random() * msgs.length);
                        msg = msgs[index];
                    }else{
                        let msgs = [
                            "Hahahahaha",
                            "You did miss it?",
                            "Try another chance."
                        ];

                        let index = Math.floor(Math.random() * msgs.length);
                        msg = msgs[index];
                    }
                }else{
                    let msgs = [
                        "Not bad at all, huh?",
                        "Good as me",
                        "Great !"
                    ];

                    let index = Math.floor(Math.random() * msgs.length);
                    msg = msgs[index];
                }

                _resultBoard.ShowResultBoard(rmScore, mScore, msg);
                that.Stop();
            });
        },
        Stop: function(){
            status = 'stop';
            _timer.Stop();
            _progressbar.Stop();
        },
        Restart: function(){
            _timer.Reset();
            _progressbar.Reset();
            _playingboard.goSettingsPanel();
            _keyboard.showAllKeys();
            _scoreboard.Reset();
        },
        SetMode: function(mode){
            selectedMode = mode;
            if(selectedMode === 'easy') loadTime = 2500;
            if(selectedMode === 'normal') loadTime = 2000;
            if(selectedMode === 'hardcore') loadTime = 1000;
            if(selectedMode === 'really') loadTime = 500;

            _progressbar.Initialize(loadTime);
        }
    }
}