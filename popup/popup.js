const moodleEnable = document.getElementById('moodleEnable');
const scheduleEnable = document.getElementById('scheduleEnable');
const moodleSettings = document.getElementById('moodleSettings');
const scheduleSettings = document.getElementById('scheduleSettings');
const moodlePage = document.getElementById('moodleSettingsPage');
const schedulePage = document.getElementById('scheduleSettingsPage');
const mainPage = document.getElementById('main');

window['moodleData'] = {};
window['scheduleData'] = {};
const moodleDataTemplate = {
    'enabled': false,
    'bgColor': '#000000',
    'accentColor': '#800000',
    'borderRadius': 12
}
const scheduleDataTemplate = {
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
        document.getElementById('accentColor').value = data.moodle.accentColor || '#800000';
        document.getElementById('accentColorText').value = document.getElementById('accentColor').value;
        document.getElementById('borderRadius').value = data.moodle.borderRadius || 12;
        moodleData = data.moodle;
    });
    document.getElementById('bgColor').addEventListener('change', () => {
        document.getElementById('bgColorText').value = document.getElementById('bgColor').value;
        moodleData.bgColor = document.getElementById('bgColor').value;
        chrome.storage.sync.set({
            moodle: moodleData
        });
    });
    document.getElementById('accentColor').addEventListener('change', () => {
        document.getElementById('accentColorText').value = document.getElementById('accentColor').value;
        moodleData.accentColor = document.getElementById('accentColor').value;
        chrome.storage.sync.set({
            moodle: moodleData
        });
    });
    document.getElementById('borderRadius').addEventListener('input', e => {
        if (!e.target.value.includes('-')) {
            moodleData.borderRadius = parseInt(e.target.value);
            chrome.storage.sync.set({
                moodle: moodleData
            });
        } else
            e.target.value = e.target.value.replace('-', '');
    });
}
const listeners = () => {
    moodleEnable.addEventListener('change', () => toggleBtn('moodle', moodleEnable.checked));
    scheduleEnable.addEventListener('change', () => toggleBtn('schedule', scheduleEnable.checked));
    moodleSettings.addEventListener('click', () => {
        moodlePage.style.display = 'block';
        mainPage.style.display = 'none';
        document.getElementById('backBtn').style.display = '';
        moodleSettingsFn();
    });
    document.getElementById('backBtn').addEventListener('click', reset);
    scheduleSettings.addEventListener('click', () => {
        schedulePage.style.display = 'block';
        mainPage.style.display = 'none';
        document.getElementById('backBtn').style.display = '';
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
    document.getElementById('backBtn').style.display = 'none';
}

const main = () => {
    getStorage();
    reset();
    listeners();
}

main();