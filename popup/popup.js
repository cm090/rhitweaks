const moodleEnable = document.getElementById('moodleEnable');
const scheduleEnable = document.getElementById('scheduleEnable');
const moodleSettings = document.getElementById('moodleSettings');
const scheduleSettings = document.getElementById('scheduleSettings');
const moodlePage = document.getElementById('moodleSettingsPage');
const schedulePage = document.getElementById('scheduleSettingsPage');
const mainPage = document.getElementById('main');

window['moodleData'] = {};
window['scheduleData'] = {};
window['moodleDataTemplate'] = {
    'enabled': false,
    'bgColor': '#000000',
    'cardColor': '#eeeeee',
    'accentColor': '#800000',
    'sbColor': '#4e4e4e',
    'borderRadius': 12,
    'quarter': ''
}
window['scheduleDataTemplate'] = {
    'enabled': false
}

const toggleBtn = (selector, data) => {
    document.getElementById(`${selector}Settings`).style.display = data ? 'block' : 'none';
    let dataSelector = window[`${selector}Data`];
    dataSelector.enabled = data;
    chrome.storage.sync.set({
        [selector]: dataSelector
    });
}
const moodleSettingsFn = () => {
    chrome.storage.sync.get('moodle').then(data => {
        document.getElementById('bgColor').value = data.moodle.bgColor || '#000000';
        document.getElementById('bgColorText').value = document.getElementById('bgColor').value;
        document.getElementById('cardColor').value = data.moodle.cardColor || '#eeeeee';
        document.getElementById('cardColorText').value = document.getElementById('cardColor').value;
        document.getElementById('accentColor').value = data.moodle.accentColor || '#800000';
        document.getElementById('accentColorText').value = document.getElementById('accentColor').value;
        document.getElementById('sbColor').value = data.moodle.sbColor || '#4e4e4e';
        document.getElementById('sbColorText').value = document.getElementById('sbColor').value;
        document.getElementById('borderRadius').value = data.moodle.borderRadius || 12;
        document.getElementById('courseList').value = data.moodle.quarter || '';
        moodleData = data.moodle;
    });
    document.getElementById('bgColor').addEventListener('change', () => {
        document.getElementById('bgColorText').value = document.getElementById('bgColor').value;
        moodleData.bgColor = document.getElementById('bgColor').value;
        chrome.storage.sync.set({
            moodle: moodleData
        });
    });
    document.getElementById('bgColorText').addEventListener('click', () => document.getElementById('bgColor').click());
    document.getElementById('cardColor').addEventListener('change', () => {
        document.getElementById('cardColorText').value = document.getElementById('cardColor').value;
        moodleData.cardColor = document.getElementById('cardColor').value;
        chrome.storage.sync.set({
            moodle: moodleData
        });
    });
    document.getElementById('cardColorText').addEventListener('click', () => document.getElementById('cardColor').click());
    document.getElementById('accentColor').addEventListener('change', () => {
        document.getElementById('accentColorText').value = document.getElementById('accentColor').value;
        moodleData.accentColor = document.getElementById('accentColor').value;
        chrome.storage.sync.set({
            moodle: moodleData
        });
    });
    document.getElementById('accentColorText').addEventListener('click', () => document.getElementById('accentColor').click());
    document.getElementById('sbColor').addEventListener('change', () => {
        document.getElementById('sbColorText').value = document.getElementById('sbColor').value;
        moodleData.sbColor = document.getElementById('sbColor').value;
        chrome.storage.sync.set({
            moodle: moodleData
        });
    });
    document.getElementById('accentColorText').addEventListener('click', () => document.getElementById('accentColor').click());
    document.getElementById('borderRadius').addEventListener('input', e => {
        if (!e.target.value.includes('-')) {
            moodleData.borderRadius = parseInt(e.target.value);
            chrome.storage.sync.set({
                moodle: moodleData
            });
        } else if (e.target.value.isNaN || e.target.value == 0) {
            moodleData.borderRadius = 0;
            chrome.storage.sync.set({
                moodle: moodleData
            });
        } else
            e.target.value = e.target.value.replace('-', '');
    });
    document.getElementById('courseList').addEventListener('change', e => {
        if (e.target.value.length < 5) return;
        moodleData.quarter = parseInt(e.target.value.substring(0, 4)) + e.target.value.charAt(4);
        chrome.storage.sync.set({
            moodle: moodleData
        });
    });
}
const listeners = () => {
    moodleEnable.addEventListener('change', () => toggleBtn('moodle', moodleEnable.checked));
    scheduleEnable.addEventListener('change', () => toggleBtn('schedule', scheduleEnable.checked));
    moodleSettings.addEventListener('click', () => {
        moodlePage.style.display = 'block';
        mainPage.style.display = 'none';
        document.getElementById('reportBtn').style.display = 'none';
        document.getElementById('backBtn').style.display = '';
        document.getElementById('resetBtn').style.display = '';
        document.getElementById('resetBtn').setAttribute('page', 'moodle');
        document.querySelector(':root').style.height = '';
        moodleSettingsFn();
    });
    document.getElementById('backBtn').addEventListener('click', reset);
    scheduleSettings.addEventListener('click', () => {
        schedulePage.style.display = 'block';
        mainPage.style.display = 'none';
        document.getElementById('reportBtn').style.display = 'none';
        document.getElementById('backBtn').style.display = '';
        document.getElementById('resetBtn').style.display = '';
        document.getElementById('resetBtn').setAttribute('page', 'schedule');
        document.querySelector(':root').style.height = '';
    });
    document.getElementById('resetBtn').addEventListener('click', defaults);
    document.getElementById('reportBtn').addEventListener('click', () => {
        window.open('https://github.com/cm090/rhitweaks/issues');
    });
}
const getStorage = () => {
    chrome.storage.sync.get(['moodle', 'schedule']).then(data => {
        moodleData = data.moodle;
        scheduleData = data.schedule;
        if (!moodleData) {
            moodleData = moodleDataTemplate;
            chrome.storage.sync.set({
                moodle: moodleData
            });
        }
        if (!scheduleData) {
            scheduleData = scheduleDataTemplate;
            chrome.storage.sync.set({
                schedule: scheduleData
            });
        }
        Object.entries(data).forEach(item => {
            toggleBtn(item[0], item[1].enabled);
            document.getElementById(`${item[0]}Enable`).checked = item[1].enabled;
        });
    });
}
const reset = () => {
    moodlePage.style.display = 'none';
    schedulePage.style.display = 'none';
    mainPage.style.display = 'block';
    document.getElementById('reportBtn').style.display = '';
    document.getElementById('backBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('resetBtn').removeAttribute('page');
    document.querySelector(':root').style.height = (document.getElementById('main').clientHeight + document.querySelector("#mainContainer > div.footer").clientHeight) + 'px';
}
const defaults = e => {
    let selector = e.target.getAttribute('page');
    let dataSelector = window[`${selector}DataTemplate`];
    dataSelector.enabled = true;
    chrome.storage.sync.set({
        [selector]: dataSelector
    });
    switch (selector) {
        case 'moodle':
            moodleSettingsFn();
            break;
    }
}

const main = () => {
    getStorage();
    reset();
    listeners();
}

main();