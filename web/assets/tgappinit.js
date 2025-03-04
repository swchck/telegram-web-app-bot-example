/*
 * This part of code is used to initialize the demo app and set up the event handlers we need.
 */

Telegram.WebApp.onEvent('themeChanged', function () {
    document.getElementById('theme_data').innerHTML = JSON.stringify(Telegram.WebApp.themeParams, null, 2);
});

if (DemoApp.initDataUnsafe.query_id) {
    document.getElementById('main_btn').style.display = 'block';
}
document.getElementById('with_webview_btn').style.display = !!DemoApp.initDataUnsafe.query_id && !DemoApp.initDataUnsafe.receiver ? 'block' : 'none';
document.getElementById('webview_data').innerHTML = JSON.stringify(DemoApp.initDataUnsafe, null, 2);

document.getElementById('theme_data').innerHTML = JSON.stringify(Telegram.WebApp.themeParams, null, 2);
document.getElementById('regular_link').setAttribute('href', document.getElementById('regular_link').getAttribute('href') + location.hash);
document.getElementById('text_field').focus();
document.getElementById('regular_field').addEventListener('input', function (e) {
    const val = this.value.toLowerCase();
    if (val.indexOf('progress') >= 0) {
        Telegram.WebApp.MainButton.showProgress();
    } else {
        Telegram.WebApp.MainButton.hideProgress();
    }
});

document.getElementById('ver').innerHTML = Telegram.WebApp.version;
document.getElementById('platform').innerHTML = Telegram.WebApp.platform;

if (DemoApp.initDataUnsafe.receiver) {
    document.getElementById('peer_wrap').style.display = 'block';
    document.getElementById('peer_name').innerHTML = DemoApp.initDataUnsafe.receiver.first_name + ' ' + DemoApp.initDataUnsafe.receiver.last_name;
    if (DemoApp.initDataUnsafe.receiver.photo_url) {
        document.getElementById('peer_photo').setAttribute('src', DemoApp.initDataUnsafe.receiver.photo_url);
    } else {
        document.getElementById('peer_photo').style.display = 'none';
    }
} else if (DemoApp.initDataUnsafe.chat) {
    document.getElementById('peer_wrap').style.display = 'block';
    document.getElementById('peer_name').innerHTML = DemoApp.initDataUnsafe.chat.title;
    if (DemoApp.initDataUnsafe.chat.photo_url) {
        document.getElementById('peer_photo').setAttribute('src', DemoApp.initDataUnsafe.chat.photo_url);
    } else {
        document.getElementById('peer_photo').style.display = 'none';
    }
}

DemoApp.checkInitData();
DemoApp.init();

function setViewportData() {
    document.querySelector('.viewport-border').setAttribute('text', window.innerWidth + ' x ' + round(Telegram.WebApp.viewportHeight, 2))
    document.querySelector('.viewport-stable_border').setAttribute('text', window.innerWidth + ' x ' + round(Telegram.WebApp.viewportStableHeight, 2) +
        ' | is_expanded: ' + (Telegram.WebApp.isExpanded ? 'true' : 'false'));
}

Telegram.WebApp.setHeaderColor('secondary_bg_color');
Telegram.WebApp.onEvent('viewportChanged', setViewportData);
setViewportData();

// bg color picker
const bgColorSel = document.getElementById('bg_color_sel')
const bgColorInput = document.getElementById('bg_color_input')
let prevBgColorValue = bgColorSel.value
bgColorInput.value = Telegram.WebApp.backgroundColor
document.body.style.setProperty('--bg-color', Telegram.WebApp.backgroundColor)

bgColorInput.addEventListener('change', function (e) {
    const color = e.target.value;
    document.getElementById('bg_color_val').textContent = color;
    bgColorSel.value = 'custom';
    prevBgColorValue = bgColorSel.value;
    Telegram.WebApp.setBackgroundColor(color);
    document.body.style.setProperty('--bg-color', Telegram.WebApp.backgroundColor);
})

bgColorSel.addEventListener('change', function (e) {
    const color = e.target.value;
    if (color === 'custom') {
        bgColorSel.value = prevBgColorValue;
        const input = bgColorInput;
        input.focus();
        input.click();
    } else {
        document.getElementById('bg_color_val').textContent = 'custom...';
        Telegram.WebApp.setBackgroundColor(color);
        document.body.style.setProperty('--bg-color', Telegram.WebApp.backgroundColor);
        bgColorInput.value = Telegram.WebApp.backgroundColor;
        prevBgColorValue = bgColorSel.value;
    }
})

// header color picker
const headerColorSel = document.getElementById('header_color_sel')
const headerColorInput = document.getElementById('header_color_input')
let prevHeaderColorValue = headerColorSel.value
headerColorInput.value = Telegram.WebApp.headerColor
document.body.style.setProperty('--header-color', Telegram.WebApp.headerColor)

headerColorSel.value = 'secondary_bg_color'

headerColorInput.addEventListener('change', function (e) {
    const color = e.target.value;
    document.getElementById('header_color_val').textContent = color;
    headerColorSel.value = 'custom';
    prevHeaderColorValue = headerColorSel.value;
    Telegram.WebApp.setHeaderColor(color);
    document.body.style.setProperty('--header-color', Telegram.WebApp.headerColor);
})

headerColorSel.addEventListener('change', function (e) {
    const color = e.target.value;
    if (color === 'custom') {
        headerColorSel.value = prevHeaderColorValue;
        const input = headerColorInput;
        input.focus();
        input.click();
    } else {
        document.getElementById('header_color_val').textContent = 'custom...';
        Telegram.WebApp.setHeaderColor(color);
        document.getElementById('top_sect').classList.toggle('second', color === 'secondary_bg_color');
        document.body.style.setProperty('--header-color', Telegram.WebApp.headerColor);
        headerColorInput.value = Telegram.WebApp.headerColor;
        prevHeaderColorValue = headerColorSel.value;
    }
})

// bottom bar color picker
const bbarColorSel = document.getElementById('bbar_color_sel')
const bbarColorInput = document.getElementById('bbar_color_input')
let prevBbarColorValue = bbarColorSel.value;
bbarColorInput.value = Telegram.WebApp.bottomBarColor;
document.body.style.setProperty('--bottom-bar-color', Telegram.WebApp.bottomBarColor);

bbarColorInput.addEventListener('change', function (e) {
    const color = e.target.value;
    document.getElementById('bbar_color_val').textContent = color;
    bbarColorSel.value = 'custom';
    prevBbarColorValue = bbarColorSel.value;
    Telegram.WebApp.setBottomBarColor(color);
    document.body.style.setProperty('--bottom-bar-color', Telegram.WebApp.bottomBarColor);
})

bbarColorSel.addEventListener('change', function (e) {
    const color = e.target.value;
    if (color === 'custom') {
        bbarColorSel.value = prevBbarColorValue;
        const input = bbarColorInput;
        input.focus();
        input.click();
    } else {
        document.getElementById('bbar_color_val').textContent = 'custom...';
        Telegram.WebApp.setBottomBarColor(color);
        document.body.style.setProperty('--bottom-bar-color', Telegram.WebApp.bottomBarColor);
        bbarColorInput.value = Telegram.WebApp.bottomBarColor;
        prevBbarColorValue = bbarColorSel.value;
    }
})

// theme
Telegram.WebApp.onEvent('themeChanged', function () {
    bgColorInput.value = Telegram.WebApp.backgroundColor
    document.body.setAttribute('style', '--bg-color:' + Telegram.WebApp.backgroundColor)
})

const orientBtn = document.getElementById('orient_btn')
if (Telegram.WebApp.isOrientationLocked) {
    orientBtn.innerHTML = 'Unlock Orientation'
} else {
    orientBtn.innerHTML = 'Lock Orientation'
}

// permissions
try {
    DemoApp.testClipboard(document.getElementById('clipboard_test'));
} catch (e) { }
try {
    DemoApp.loadCloudKeys();
} catch (e) { }
try {
    DemoApp.biometricInit();
} catch (e) { }
try {
    DemoApp.fullscreenInit();
} catch (e) { }
try {
    DemoApp.accelerometerInit();
} catch (e) { }
try {
    DemoApp.deviceOrientationInit();
} catch (e) { }
try {
    DemoApp.gyroscopeInit();
} catch (e) { }
try {
    DemoApp.locationInit();
} catch (e) { }
try {
    DemoApp.homeScreenInit();
} catch (e) { }
try {
    DemoApp.emojiStatusInit();
} catch (e) { }
try {
    DemoApp.activityInit();
} catch (e) { }