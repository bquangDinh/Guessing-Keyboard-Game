const PlayingBoard = function(_panels){
    return {
        goSettingsPanel: function(){
            $(panels.settings_panel).show();
            $(panels.playing_panel).hide();
        },
        goPlayingPanel: function(){
            $(panels.settings_panel).hide();
            $(panels.playing_panel).show();
        }
    }
}