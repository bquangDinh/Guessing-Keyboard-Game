const Timer = function(_timerDOM){
    var currentTime = 0;
    var initialTime = 0;
    var ins = null;
    var timerDOM = _timerDOM;

    var millisToMinutesAndSeconds = function(millis){
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    return {
        SetTime: function(_time){
            initialTime = _time;
            currentTime = initialTime;
        },
        Run: function(){
            var that = this;
            ins = setInterval(function(){
                currentTime -= 1000;
                $(timerDOM).text(millisToMinutesAndSeconds(currentTime));
                
                if(currentTime === 0){
                    that.Stop();
                    $(timerDOM).trigger('timer:out');
                }
            },1000);
        },
        Stop: function(){
            if(ins != null){
                clearInterval(ins);
            }
        },
        Reset: function(){
            this.Stop();
            currentTime = initialTime;
            $(timerDOM).text(millisToMinutesAndSeconds(currentTime));
        },
        GetTimerDOM: function(){
            return timerDOM;
        }
    }
}