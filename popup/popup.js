// Constants for buttons and pages
const moodleEnable = document.getElementById('moodleEnable');
const scheduleEnable = document.getElementById('scheduleEnable');
const moodleSettings = document.getElementById('moodleSettings');
const scheduleSettings = document.getElementById('scheduleSettings');
const settingsBtn = document.getElementById('additionalSettings');
const moodlePage = document.getElementById('moodleSettingsPage');
const schedulePage = document.getElementById('scheduleSettingsPage');
const mainPage = document.getElementById('main');
const settingsPage = document.getElementById('additionalSettingsPage');

// Local data storage
window['moodleData'] = {};
window['scheduleData'] = {};

// Template data
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
    'enabled': false,
    'bgColor': '#000000',
    'accentColor': '#800000',
    'textColor': '#ffffff',
    'borderColor': '#808080'
}

/**
 * Toggles the display of a settings element and updates the corresponding data based on a boolean value.
 * @param selector the name of a setting or feature that the toggle button controls
 * @param data boolean value that determines whether to display or hide the settings for the given selector
 */
const toggleBtn = (selector, data) => {
    document.getElementById(`${selector}Settings`).style.display = data ? 'block' : 'none';
    let dataSelector = window[`${selector}Data`];
    dataSelector.enabled = data;
    chrome.storage.sync.set({ [selector]: dataSelector });
}

/**
 * Retrieves Moodle settings from Chrome storage and sets the corresponding values in the HTML document
 */
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
}

/**
 * Sets event listeners for various HTML elements and updates the moodleData object and Chrome storage accordingly
 */
const moodleSettingsListeners = () => {
    document.getElementById('bgColor').addEventListener('change', () => {
        document.getElementById('bgColorText').value = document.getElementById('bgColor').value;
        moodleData.bgColor = document.getElementById('bgColor').value;
        chrome.storage.sync.set({ moodle: moodleData });
    });
    document.getElementById('bgColorText').addEventListener('click', () => document.getElementById('bgColor').click());
    document.getElementById('cardColor').addEventListener('change', () => {
        document.getElementById('cardColorText').value = document.getElementById('cardColor').value;
        moodleData.cardColor = document.getElementById('cardColor').value;
        chrome.storage.sync.set({ moodle: moodleData });
    });
    document.getElementById('cardColorText').addEventListener('click', () => document.getElementById('cardColor').click());
    document.getElementById('accentColor').addEventListener('change', () => {
        document.getElementById('accentColorText').value = document.getElementById('accentColor').value;
        moodleData.accentColor = document.getElementById('accentColor').value;
        chrome.storage.sync.set({ moodle: moodleData });
    });
    document.getElementById('accentColorText').addEventListener('click', () => document.getElementById('accentColor').click());
    document.getElementById('sbColor').addEventListener('change', () => {
        document.getElementById('sbColorText').value = document.getElementById('sbColor').value;
        moodleData.sbColor = document.getElementById('sbColor').value;
        chrome.storage.sync.set({ moodle: moodleData });
    });
    document.getElementById('accentColorText').addEventListener('click', () => document.getElementById('accentColor').click());
    document.getElementById('borderRadius').addEventListener('input', e => {
        if (!e.target.value.includes('-'))
            moodleData.borderRadius = parseInt(e.target.value);
        else if (e.target.value.isNaN || e.target.value == 0)
            moodleData.borderRadius = 0;
        else
            e.target.value = e.target.value.replace('-', '');
        chrome.storage.sync.set({ moodle: moodleData });
    });
    document.getElementById('courseList').addEventListener('change', e => {
        if (e.target.value.length < 5) return;
        moodleData.quarter = parseInt(e.target.value.substring(0, 4)) + e.target.value.charAt(4);
        chrome.storage.sync.set({ moodle: moodleData });
    });
}

/**
 * Retrieves schedule settings from Chrome storage and sets the corresponding values in the HTML document
 */
const scheduleSettingsFn = () => {
    chrome.storage.sync.get('schedule').then(data => {
        document.getElementById('schedBgColor').value = data.schedule.bgColor || '#000000';
        document.getElementById('schedBgColorText').value = document.getElementById('schedBgColor').value;
        document.getElementById('schedAccentColor').value = data.schedule.accentColor || '#800000';
        document.getElementById('schedAccentColorText').value = document.getElementById('schedAccentColor').value;
        document.getElementById('schedTextColor').value = data.schedule.textColor || '#ffffff';
        document.getElementById('schedTextColorText').value = document.getElementById('schedTextColor').value;
        document.getElementById('schedBorderColor').value = data.schedule.borderColor || '#808080';
        document.getElementById('schedBorderColorText').value = document.getElementById('schedBorderColor').value;
        scheduleData = data.schedule;
    });
}

/**
 * Sets event listeners for various HTML elements and updates the scheduleData object and Chrome storage accordingly
 */
const scheduleSettingsListeners = () => {
    document.getElementById('schedBgColor').addEventListener('change', () => {
        document.getElementById('schedBgColorText').value = document.getElementById('schedBgColor').value;
        scheduleData.bgColor = document.getElementById('schedBgColor').value;
        chrome.storage.sync.set({ schedule: scheduleData });
    });
    document.getElementById('schedAccentColor').addEventListener('change', () => {
        document.getElementById('schedAccentColorText').value = document.getElementById('schedAccentColor').value;
        scheduleData.accentColor = document.getElementById('schedAccentColor').value;
        chrome.storage.sync.set({ schedule: scheduleData });
    });
    document.getElementById('schedTextColor').addEventListener('change', () => {
        document.getElementById('schedTextColorText').value = document.getElementById('schedTextColor').value;
        scheduleData.textColor = document.getElementById('schedTextColor').value;
        chrome.storage.sync.set({ schedule: scheduleData });
    });
    document.getElementById('schedBorderColor').addEventListener('change', () => {
        document.getElementById('schedBorderColorText').value = document.getElementById('schedBorderColor').value;
        scheduleData.borderColor = document.getElementById('schedBorderColor').value;
        chrome.storage.sync.set({ schedule: scheduleData });
    });
}

/**
 * Adds event listeners to buttons for importing and exporting data in JSON format to and from Chrome storage
 */
const additionalSettingsListeners = () => {
    document.getElementById('import').addEventListener('click', () => {
        const fileSelector = document.createElement('input');
        fileSelector.type = 'file';
        fileSelector.accept = 'application/json';
        fileSelector.addEventListener('change', e => {
            const file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = data => {
                let contents;
                try {
                    contents = JSON.parse(data.target.result);
                } catch (e) {
                    alert('Invalid file selected');
                    return;
                }
                if (!contents.moodle || !contents.schedule || !contents.version) {
                    alert('Invalid file selected');
                    return;
                }
                if (contents.version != chrome.runtime.getManifest().version)
                    alert('The data you\'re trying to import is from an older version of RHITweaks. Some of your settings may not be updated.');
                chrome.storage.sync.set({
                    moodle: contents.moodle,
                    schedule: contents.schedule
                });
                document.getElementById('import').style.backgroundColor = 'green';
                document.getElementById('import').style.border = '1px solid green';
                setTimeout(() => {
                    document.getElementById('import').style.background = '';
                    document.getElementById('import').style.borderColor = '';
                }, 2000);
            }
            reader.readAsText(file);
        });
        fileSelector.click();
        fileSelector.remove();
    });
    document.getElementById('export').addEventListener('click', () => {
        let data = { 'version': chrome.runtime.getManifest().version };
        chrome.storage.sync.get(['moodle', 'schedule'], result => {
            data.moodle = result.moodle;
            data.schedule = result.schedule;
            const a = document.createElement('a');
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            a.href = URL.createObjectURL(blob);
            a.download = 'rhitweaks.json';
            a.click();
            URL.revokeObjectURL(a.href);
            a.remove();
        });
    });
}

/**
 * Adds event listeners to various elements
 */
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
        document.querySelector(':root').style.height = '';
        moodleSettingsFn();
    });
    moodleSettingsListeners();
    scheduleSettings.addEventListener('click', () => {
        schedulePage.style.display = 'block';
        mainPage.style.display = 'none';
        document.getElementById('reportBtn').style.display = 'none';
        document.getElementById('backBtn').style.display = '';
        document.getElementById('resetBtn').style.display = '';
        document.getElementById('resetBtn').setAttribute('page', 'schedule');
        document.querySelector(':root').style.height = '';
        scheduleSettingsFn();
    });
    scheduleSettingsListeners();
    settingsBtn.addEventListener('click', () => {
        settingsPage.style.display = 'block';
        mainPage.style.display = 'none';
        document.getElementById('reportBtn').style.display = 'none';
        document.getElementById('backBtn').style.display = '';
        document.querySelector(':root').style.height = '';
    });
    additionalSettingsListeners();
    document.getElementById('backBtn').addEventListener('click', reset);
    document.getElementById('resetBtn').addEventListener('click', defaults);
    document.getElementById('reportBtn').addEventListener('click', () => {
        window.open('https://github.com/cm090/rhitweaks/issues');
    });
}

/**
 * Retrieves data from Chrome storage and sets default values if the data is not present
 * Updates the UI based on retrieved data
 */
const getStorage = () => {
    chrome.storage.sync.get(['moodle', 'schedule']).then(data => {
        moodleData = data.moodle;
        scheduleData = data.schedule;
        if (!moodleData) {
            moodleData = moodleDataTemplate;
            chrome.storage.sync.set({ moodle: moodleData });
        }
        if (!scheduleData) {
            scheduleData = scheduleDataTemplate;
            chrome.storage.sync.set({ schedule: scheduleData });
        }
        Object.entries(data).forEach(item => {
            toggleBtn(item[0], item[1].enabled);
            document.getElementById(`${item[0]}Enable`).checked = item[1].enabled;
        });
    });
}

/**
 * Resets the display and visibility of certain elements
 */
const reset = () => {
    moodlePage.style.display = 'none';
    schedulePage.style.display = 'none';
    settingsPage.style.display = 'none';
    mainPage.style.display = 'block';
    document.getElementById('reportBtn').style.display = '';
    document.getElementById('backBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('resetBtn').removeAttribute('page');
    document.querySelector(':root').style.height = (document.getElementById('main').clientHeight + document.querySelector("#mainContainer > div.footer").clientHeight) + 'px';
}

/**
 * Sets default settings object and calls a corresponding function based on the page selector
 */
const defaults = e => {
    let selector = e.target.getAttribute('page');
    let dataSelector = window[`${selector}DataTemplate`];
    dataSelector.enabled = true;
    chrome.storage.sync.set({ [selector]: dataSelector });
    switch (selector) {
        case 'moodle':
            moodleSettingsFn();
            break;
        case 'schedule':
            scheduleSettingsFn();
            break;
    }
}

/**
 * Initializes the program
 */
const main = () => {
    getStorage();
    reset();
    listeners();
}

main();