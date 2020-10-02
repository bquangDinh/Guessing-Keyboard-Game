const ProgressBar = function(progressbarDOM, initialPercentage, _properties){
    var innerDOM = $(progressbarDOM).find('.progressbar-inner').first();

    var properties = {
        step: 50
    };

    properties = Object.assign(properties, _properties);

    var step = 50;
    var totalTime = 1000;
    var currentTime = 0;
    var ins = null;

    var ClampPercentage = function(percentage){
        if(percentage > 100) percentage = 100;
        if(percentage < 0) percentage = 0;
        return percentage;
    }

    var SetPercentage = function(percentage){
        percentage = ClampPercentage(percentage);
        $(innerDOM).css('width', percentage + '%');
    };

    initialPercentage = ClampPercentage(initialPercentage);

    //initialize the progressbar with the given initial percentage
    $(innerDOM).css('width', initialPercentage + '%');

    return {
        Initialize: function(_totalTime){
            totalTime = _totalTime;
            currentTime = totalTime;
        },
        Run: function(){
            ins = setInterval(function(){
                percent = (currentTime / totalTime) * 100;
                currentTime -= step;
                SetPercentage(percent);
                
                if(percent == 0){
                    $(progressbarDOM).trigger('time:out');
                }
            }, properties.step);
        },
        Stop: function(){
            if(ins !== null){
                clearInterval(ins);
            }
        },
        Reset: function(){
            this.Stop();
            $(innerDOM).css('width', '100%');
            currentTime = totalTime;
        },
        GetDOM: function(){
            return progressbarDOM;
        }
    }
}