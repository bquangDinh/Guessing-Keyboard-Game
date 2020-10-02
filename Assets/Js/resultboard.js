const ResultBoard = function(container, rmscoretb, mscoretb, spemsgtb){
    return {
        ShowResultBoard: function(rmscore, mscore, spemsg){
            $(rmscoretb).text(rmscore);
            $(mscoretb).text(mscore);
            $(spemsgtb).text(spemsg);
            $(container).show();
        },
        HideResultBoard: function(){
            $(container).hide();
        }
    }
}