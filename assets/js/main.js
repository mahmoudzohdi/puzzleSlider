$(document).ready(function(){
    $('.puzzle-slider-1').puzzleSlider();
    $('.puzzle-slider-2').puzzleSlider({
        slicesX: 10,
        slicesY: 7,
    });
    $('.puzzle-slider-3').puzzleSlider({
        state: 'hover'
    });
});