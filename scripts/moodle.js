const cookieCheck = (search) => {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].split("=");
        if (c[0].substring(0, 1) == " ") {
            c[0] = c[0].substring(1);
        }
        if (c[0] === search) {
            return c[1];
        }
    }
    return false;
}
if (cookieCheck('filterQuarter') && !localStorage.getItem('filterQuarter')) localStorage.setItem('filterQuarter', cookieCheck('filterQuarter'));

let courseData = [['Dashboard', 'https://moodle.rose-hulman.edu/my']];
const checkForUpdates = () => {
    const d = new Date();
    const currentVersion = chrome.runtime.getManifest().version;
    return fetch('https://raw.githubusercontent.com/cm090/rhitweaks/main/manifest.json').then(res => res.text()).then(data => {
        const globalVersion = data.split('\"version\": \"')[1].split('\"')[0];
        if (currentVersion != globalVersion) {
            const element = document.querySelector("#nav-drawer > nav:nth-child(1) > ul > li:nth-child(1)").cloneNode(true);
            element.querySelector('a').classList.remove('active');
            element.querySelector('a').href = 'https://github.com/cm090/rhitweaks/releases';
            element.querySelector('a').target = '_blank';
            element.querySelector('.media-body').innerText = 'Update available!';
            element.querySelector('.media-body').classList.remove('font-weight-bold');
            element.querySelector('.icon').classList = 'icon fa fa-info fa-fw';
            document.querySelector("#nav-drawer > nav > ul").prepend(element);
        }
    }).then(() => Promise.resolve(true));
}

const setStyle = () => {
    let url = chrome.runtime.getURL('styles/moodle.css');
    return fetch(url).then(res => res.text()).then(data => {
        var s = document.createElement("style");
        s.innerHTML = data;
        document.getElementsByTagName("head")[0].appendChild(s);
    }).then(() => Promise.resolve());
}

const cleanSideMenu = () => {
    let quarter = localStorage.getItem('filterQuarter');
    let start = false;
    const activeCourse = (document.querySelector('[data-key="coursehome"] .media-body')) ? document.querySelector('[data-key="coursehome"] .media-body').innerText : '';
    if (document.querySelectorAll(".sectionname").length > 1)
        document.querySelectorAll(".sectionname").forEach(item => {
            courseData.push([item.innerText, `#${item.id}`]);
        });
    document.querySelectorAll("#nav-drawer > nav.list-group > ul > li").forEach((item, i) => {
        item.style.display = '';
        let text = item.querySelector('.media-body').innerText;
        if (!start) {
            if (text == 'My courses') {
                start = true;
                item.onclick = () => {
                    let newQuarter = prompt('Select a quarter (Ex: 2223F):');
                    newQuarter = parseInt(newQuarter.substring(0, 4)) + newQuarter.charAt(4);
                    document.cookie = `filterQuarter=${newQuarter};path=/;max-age=7884000;priority=high`;
                    localStorage.setItem('filterQuarter', newQuarter);
                    cleanSideMenu();
                }
                return;
            } else if (item.querySelector('a').href == window.location.href)
                item.querySelector('a').classList.add('active');
            else if (!['Participants', 'Badges', 'Download center', 'Dashboard', 'Site home', 'Calendar', 'Private files', 'Content bank'].includes(text) && i != 0)
                courseData.push([text, item.querySelector('a').href]);
        } else {
            if (text.length > 2)
                courseData.push([text, item.querySelector('a').href]);
            if (start && !text.includes(quarter))
                item.style.display = 'none';
            else if (text == activeCourse)
                item.querySelector('a').classList.add('active');
        }
    });
    return Promise.resolve();
}

const modifyURL = () => {
    if (((window.location.pathname.length < 2 && !window.location.search) || window.location.href.includes('enrol')) && !window.location.hash.includes('bypass'))
        window.location.pathname = '/my';
    document.querySelectorAll('a').forEach((link) => {
        if (link.href.includes('?forcedownload=1')) {
            link.href = link.href.split('?forcedownload')[0];
            link.target = '_blank';
        }
    });
    return Promise.resolve();
}

const addButtons = () => {
    if (window.location.pathname != '/my/') return Promise.resolve(false);
    if (document.querySelector("#page-header > div > div > div").clientWidth <= 833) return Promise.resolve();
    const d = new Date();
    return fetch(`https://raw.githubusercontent.com/cm090/rhit-moodle-tweaks/main/assets/header-buttons?${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`).then(res => {
        return res.text();
    }).then(data => {
        let element = document.querySelector("#page-header > div > div > div > div.d-flex.flex-wrap")
        element.innerHTML = data + element.innerHTML;
        onresize = () => checkButtons();
        checkButtons();
    }).then(() => Promise.resolve(true));
}

const checkButtons = () => {
    if (document.querySelector("#ek-widget > ul.evalkit-widget-links > li > a"))
        document.querySelector("#ek-widget > ul.evalkit-widget-links > li > a").onclick = () => { }
    document.querySelector('#rmtButtons').style.display = (document.querySelector("#page-header > div > div > div").clientWidth <= 833) ? 'none' : 'flex';
}

const searchListener = () => {
    let pos = 1;
    courseData.push(['My Rose-Hulman', 'https://rosehulman.sharepoint.com/sites/MyRH']);
    courseData.push(['Banner Web', 'https://bannerweb.rose-hulman.edu/login']);
    courseData.push(['Gradescope', 'https://www.gradescope.com']);
    courseData.push(['Campus Groups', 'https://www.campusgroups.com/shibboleth/rosehulman']);
    courseData.push(['Dining Hall Menu', 'https://rose-hulman.cafebonappetit.com']);
    document.getElementById('rmtSearchInput').addEventListener('keydown', e => {
        if (e.key == 'ArrowDown') {
            e.preventDefault();
            if (pos < document.querySelectorAll('#rmtSearch #rmtResultList div').length) {
                document.querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`).classList.remove('active');
                pos++;
                document.querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`).classList.add('active');
            }
        } else if (e.key == 'ArrowUp') {
            e.preventDefault();
            if (pos > 1) {
                document.querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`).classList.remove('active');
                pos--;
                document.querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`).classList.add('active');
            }
        } else if (event.key == 'Enter') {
            document.querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`).click();
            $('#rmtSearch').modal('hide');
        }
    });
    const createList = e => {
        pos = 1;
        let i = 0;
        document.getElementById('rmtResultList').innerHTML = '';
        courseData.forEach(item => {
            if (item[0].length <= 1) return;
            if (item[0].toLowerCase().includes(e.target.value.toLowerCase()) && i < 5) {
                document.getElementById('rmtResultList').innerHTML += `<div style="margin:0" onclick="window.location='${item[1]}'">${item[0]}</div>`;
                i++;
            }
            if (i == 5) return;
        });
        if (i == 0)
            document.getElementById('rmtResultList').innerHTML += `<div style="margin:0" onclick="window.location='https://moodle.rose-hulman.edu/search/index.php?q=${document.getElementById('rmtSearchInput').value}'">More results</div><p style="color:lightgray; font-size:12px; margin-top:5px; margin-bottom:0;">Courses older than 1 year might not show up in this list</p>`;
        document.querySelector('#rmtSearch #rmtResultList div:first-child').classList.add('active');
    }
    document.getElementById('rmtSearchInput').addEventListener('input', createList);
    createList({ target: { value: '' } });
    document.addEventListener('keydown', e => {
        if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'k')
            $('#rmtSearch').modal('show');
    });
    document.querySelector('nav .simplesearchform').addEventListener('click', e => $('#rmtSearch').modal('show'));
    return Promise.resolve();
}

const searchCode = () => {
    if (window.location.href.includes('submission') || window.location.href.includes('#bypass')) return Promise.resolve();
    const d = new Date();
    return fetch(`https://raw.githubusercontent.com/cm090/rhit-moodle-tweaks/main/assets/search-modal?${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`).then(res => {
        return res.text();
    }).then(data => {
        if (document.querySelector("#page-header")) document.querySelector("#page-header").innerHTML += data;
        else document.querySelector('footer').innerHTML += data;
        searchListener();
        waitForjQuery();
    }).then(() => Promise.resolve());
}

const waitForjQuery = () => {
    try {
        $("#rmtSearch").on('shown.bs.modal', () => {
            document.querySelector('#rmtSearch .modal-body input').focus();
            $('#rmtResultList').slideDown({
                start: function () {
                    $(this).css({
                        display: "block"
                    })
                },
                duration: 200
            });
        });
        $("#rmtSearch").on('show.bs.modal', () => {
            document.querySelector('#rmtResultList').style.display = 'none';
        });
    } catch (e) {
        setTimeout(waitForjQuery, 500);
    }
}

const start = () => {
    console.log('RMT > RHIT Moodle Tweaks by cm090\nhttps://github.com/cm090/rhit-moodle-tweaks');
    checkForUpdates().then(res => {
        if (res) console.log('RMT > Successfully checked for updates');
        else console.log('RMT > Skipped update check');
        modifyURL();
    }).then(() => {
        console.log('RMT > Finished URL check');
        setStyle();
    }).then(() => {
        console.log('RMT > Custom styles activated');
        cleanSideMenu();
    }).then(() => {
        console.log('RMT > Side menu modified, click "My courses" to change');
        addButtons().then(res => {
            if (res) console.log('RMT > Added custom buttons');
            else console.log('RMT > Skipped custom buttons');
            document.addEventListener('keydown', e => {
                if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'k')
                    e.preventDefault();
            });
            setTimeout(searchCode, 2000);
        }).then(() => {
            console.log('RMT > Search program ready, press Ctrl+K to use');
            console.log('RMT > Done!');
        });
    });
}

const storageListeners = () => {
    chrome.storage.sync.get('moodle').then(data => {
        let root = document.querySelector(':root');
        root.style.setProperty('--bg-color', data.moodle.bgColor || '#000000');
        root.style.setProperty('--card-color', data.moodle.cardColor || '#eeeeee');
        root.style.setProperty('--accent-color', data.moodle.accentColor || '#800000');
        root.style.setProperty('--highlight-color', data.moodle.sbColor || '#4e4e4e');
        root.style.setProperty('--border-radius', (data.moodle.borderRadius || 12) + 'px');
        if (data.moodle.enabled && document.getElementById('page-wrapper')) start();
    });
    chrome.storage.sync.onChanged.addListener(changes => {
        const oldData = changes.moodle.oldValue;
        const newData = changes.moodle.newValue;
        if (oldData.enabled != newData.enabled) {
            window.location.reload();
            return;
        }
        let root = document.querySelector(':root');
        root.style.setProperty('--bg-color', newData.bgColor || '#000000');
        root.style.setProperty('--card-color', newData.cardColor || '#eeeeee');
        root.style.setProperty('--accent-color', newData.accentColor || '#800000');
        root.style.setProperty('--highlight-color', newData.sbColor || '#4e4e4e');
        root.style.setProperty('--border-radius', (newData.borderRadius || 12) + 'px');
    });
}

storageListeners();