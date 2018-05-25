var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        document.addEventListener("backbutton", onBackKeyDown, false);
    },
    receivedEvent: function (id) {
        dprint('Received Event: ' + id);
    }
};

app.initialize();
function dprint(msg) {
    // comment out to turn off all debug messages located here
    console.log(msg);
}

$(document).ready(function () {
    $('.carousel').carousel('pause');
    // override back button
    document.addEventListener("backbutton", onBackKeyDown, false);
    //enterMenu();
});


$(".carousel-inner").swipe({
    swipeLeft: function () {
        dprint('Received Event: swipeLeft');
        $(this).parent().carousel('next');
    },
    swipeRight: function () {
        dprint('Received Event: swipeRight');
        $(this).parent().carousel('prev');
    },
    threshold: 200,
    excludedElements: "label, button, input, select, textarea, .noSwipe"
});

$('#myCarousel').on('slide.bs.carousel', function (e) {
    var page = $('.item.active').attr('id');
    dprint('Received Event: ' + e.direction + ":" + page);

    if (e.direction == 'left') {
        if (page == 'today') {
            dprint('Received Event: swipeLeft block ' + page);
            e.preventDefault();
        }
    } else {
        if (page == 'home') {
            dprint('Received Event: swipeRight block ' + page);
            e.preventDefault();
        }
    }
});

function jump(pageID) {
    $('#myCarousel .carousel-inner div.active').removeClass('active');
    $('#'+pageID).addClass('active');
}

var lastTimeBackPress = 0;
var timePeriodToExit = 2000;
function onBackKeyDown(e) {
    e.preventDefault();
    var page = $('.item.active').attr('id');
    dprint('Received Event: onBackKeyDown:' + page);
    if (page == 'home') {
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            navigator.app.exitApp();
        } else {
            window.plugins.toast.showWithOptions({
                message: "Press again to exit.",
                duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                position: "bottom",
                addPixelsY: -40  // added a negative value to move it up a bit (default 0)
            });
            lastTimeBackPress = new Date().getTime();
        }
    } else {
        $('.carousel').carousel('prev');
    }
}

$(document).on('click', '.cfx-topbar .material-icons', function (e) {
    var target = $(this).data('index');
    dprint('Received Event: menu click:' + target + ":" + $(this).text() + ":" + JSON.stringify($(this)) + ":" + $(this).data);
    $('.carousel').carousel(target);
    switch (target) {
        case 1:
            $(this).parent().carousel('home');
            break;
        case 2:
            $(this).parent().carousel('note');
            break;
        case 3:
            $(this).parent().carousel('list');
            break;
        case 4:
            $(this).parent().carousel('today');
            break;
    }
});

// side menu
$(document).on('click', '#sidemenu-open', function (e) {
    e.preventDefault();
    enterMenu();
});
$(document).on('click', '#sidemenu-close', function (e) {
    e.preventDefault();
    exitMenu();
});

function enterMenu() {
    $('#sidemenu').css({ 'display': 'block' }).addClass('animated slideInRight');
    $('#overlay').fadeIn();
    setTimeout(function () {
        $('#sidemenu').removeClass('animated slideInRight');
    }, 1000);
}

function exitMenu() {
    $('#sidemenu').addClass('animated slideOutRight');
    $('#overlay').fadeOut();
    setTimeout(function () {
        $('#sidemenu').removeClass('animated slideOutRight').css({ 'display': 'none' });
    }, 1000);
}

//Secondary views
var secondaryViews = [];
var activeView;
function enterSecondaryView(id) {
    activeView = id;
    var animation = 'slideInLeft';
    processSecondaryViewsArrayOnEnter();
    $(document).scrollTop(0);
    doEnterAction();
    $('#' + activeView).css({ 'display': 'block' }).addClass('animated ' + animation);
    setTimeout(function () {
        $('#' + activeView).removeClass('animated ' + animation);
        if (secondaryViews.length > 1) {
            $('#' + secondaryViews[secondaryViews.length - 2]).hide();
        }
        activeView = '';
    }, 1000);
}
function processSecondaryViewsArrayOnEnter() {
    if ($.inArray(activeView, secondaryViews) == -1) {
        secondaryViews.push(activeView);
    }
}
function doEnterAction() {
    dprint('doEnterAction:' + activeView);
    if (activeView == 'dashboard') {
        //here your specific stuff
    } else if (activeView == 'group_work') {
        //here your specific stuff
    } else if (activeView == 'search') {
        //here your specific stuff
    } else if (activeView == 'share') {
        //here your specific stuff
    }
}

function exitSecondaryView(id, sender) {
    activeView = id;
    var animation = 'slideOutLeft';
    processSecondaryViewsArrayOnLeave();
    doLeaveAction();
    $('#' + activeView).addClass('animated ' + animation);
    setTimeout(function () {
        $(document).scrollTop(0);
        $('#' + activeView).css('display', 'none').removeClass('animated ' + animation);
        activeView = '';
    }, 1000);
}
function processSecondaryViewsArrayOnLeave() {
    if (secondaryViews.length > 1) {
        $('#' + secondaryViews[secondaryViews.length - 2]).show();
    }
    secondaryViews.pop();
}
function doLeaveAction() {
    dprint('doLeaveAction:' + activeView);
    if (activeView == 'dashboard') {
        //here your specific stuff
    } else if (activeView == 'group_work') {
        //here your specific stuff
    } else if (activeView == 'search') {
        //here your specific stuff
    } else if (activeView == 'share') {
        //here your specific stuff
    }
}

$(document).on('click', '.dashboard', function (e) {
    e.preventDefault();
    exitMenu();
    enterSecondaryView('dashboard');
});
$(document).on('click', '.group_work', function (e) {
    e.preventDefault();
    exitMenu();
    enterSecondaryView('group_work');
});
$(document).on('click', '.search', function (e) {
    e.preventDefault();
    exitMenu();
    enterSecondaryView('search');
});
$(document).on('click', '.share', function (e) {
    e.preventDefault();
    exitMenu();
    enterSecondaryView('share');
});

$(".secondary-view").swipe({
    swipeLeft: function () {
        var activeView = $(this).attr('id');
        exitSecondaryView(activeView);
    },
    threshold: 200,
    excludedElements: "label, button, input, select, textarea, .noSwipe"
});

$(".back-button").swipe({
    swipeLeft: function () {
        var activeView = $(this).attr('id');
        exitSecondaryView(activeView);
    },
    threshold: 200,
    excludedElements: "label, button, input, select, textarea, .noSwipe"
});

var lastTimeBackPress = 0;
var timePeriodToExit = 2000;
function onBackKeyDown(e) {
    e.preventDefault();
    e.stopPropagation();
    if (secondaryViews.length == 0) {
        dprint('sv length is 0');
        var page = $('.item.active').attr('id');
        if (page == 'home') {
            if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                navigator.app.exitApp();
            } else {
                window.plugins.toast.showWithOptions({
                    message: "Press again to exit.",
                    duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                    position: "bottom",
                    addPixelsY: -40  // added a negative value to move it up a bit (default 0)
                });
                lastTimeBackPress = new Date().getTime();
            }
        } else {
            $('.carousel').carousel('prev');
        }
    } else {
        var activeView = secondaryViews[secondaryViews.length - 1];
        exitSecondaryView(activeView);
    }
}
