function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


// COLORPICKER

var colorList = ['000000', '993300', '333300', '003300', '003366', '000066', '333399', '333333',
    '660000', 'FF6633', '666633', '336633', '336666', '0066FF', '666699', '666666', 'CC3333', 'FF9933', '99CC33', '669966', '66CCCC', '3366FF', '663366', '999999', 'CC66FF', 'FFCC33', 'FFFF66', '99FF66', '99CCCC', '66CCFF', '993366', 'CCCCCC', 'FF99CC'];
var picker = $('#color-picker');
let div = document.createElement('div')
for (var i = 0; i < colorList.length; i++) {
    picker.append('<li class="color-item" data-hex="' + '#' + colorList[i] + '" style="background-color:' + '#' + colorList[i] + ';"></li>');
}

$('body').click(function () {
    picker.fadeOut();
});

$('.call-picker').click(function (event) {
    event.stopPropagation();
    picker.fadeIn();
    picker.children('li').hover(function () {
        var codeHex = $(this).data('hex');

        $('.color-holder').css('background-color', codeHex);
        $('#backgroundColor').val(codeHex);
        $('#backgroundColor').click()
    });
});

// #textColor

var textColorList = ['000000', '993300', '333300', '003300', '003366', '000066', '333399', '333333',
    '660000', 'FF6633', '666633', '336633', '336666', '0066FF', '666699', '666666', 'CC3333', 'FF9933', '99CC33', '669966', '66CCCC', '3366FF', '663366', '999999', 'CC66FF', 'FFCC33'];
var textPicker = $('#textColor-picker');

for (var i = 0; i < textColorList.length; i++) {
    textPicker.append('<li class="color-item" data-hex="' + '#' + textColorList[i] + '" style="background-color:' + '#' + textColorList[i] + ';"></li>');
}

$('body').click(function () {
    textPicker.fadeOut();
});

$('.call-textPicker').click(function (event) {
    event.stopPropagation();
    textPicker.fadeIn();
    textPicker.children('li').hover(function () {
        var codeHex = $(this).data('hex');

        $('.textColor-holder').css('background-color', codeHex);
        $('#textColor').val(codeHex);
        $('#textColor').click();
    });
    
    
});