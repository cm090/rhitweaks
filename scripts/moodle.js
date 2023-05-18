let courseData = [['Dashboard', 'https://moodle.rose-hulman.edu/my']];
let quarter;

const checkForUpdates = () => {
    const d = new Date();
    const currentVersion = chrome.runtime.getManifest().version;
    return fetch(`https://raw.githubusercontent.com/cm090/rhitweaks/main/manifest.json?${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`).then(res => res.text()).then(data => {
        const globalVersion = data.split('\"version\": \"')[1].split('\"')[0];
        if (currentVersion != globalVersion) {
            const button = '<a class="btn btn-primary mr-1" href="https://github.com/cm090/rhitweaks/releases" target="_blank" style="margin-left:5px"><div class="fa fa-info" style="margin-right:8px"></div>Update available</a>';
            if (document.querySelector('#rmtButtons'))
                document.querySelector('#rmtButtons').innerHTML = button + document.querySelector('#rmtButtons').innerHTML;
            else
                document.querySelector('#page-header .card-body div').innerHTML += button;
            return true;
        }
        return false;
    }).then(update => Promise.resolve(update));
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
    let start = false;
    const activeCourse = (document.querySelector('[data-key="coursehome"] .media-body')) ? document.querySelector('[data-key="coursehome"] .media-body').innerText : '';
    if (document.querySelectorAll(".sectionname").length > 1)
        document.querySelectorAll(".sectionname").forEach(item => {
            if (!courseData.find(el => el[0] == item.innerText) && item.id)
                courseData.push([item.innerText, `#${item.id}`]);
        });
    document.querySelectorAll("#nav-drawer > nav.list-group > ul > li").forEach((item, i) => {
        item.style.display = '';
        let text = item.querySelector('.media-body').innerText;
        if (!start) {
            if (text == 'My courses') {
                start = true;
                item.onclick = () => alert('Settings moved to the RHITweaks menu');
                return;
            } else if (item.querySelector('a').href == window.location.href)
                item.querySelector('a').classList.add('active');
            else if (!['Participants', 'Badges', 'Download center', 'Dashboard', 'Site home', 'Calendar', 'Private files', 'Content bank'].includes(text)
                && i != 0 && !courseData.find(el => el[0] == text))
                courseData.push([text, item.querySelector('a').href]);
        } else {
            if (text.length > 2 && !courseData.find(el => el[0] == text))
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
    if (document.querySelector('.navbar .navbar-brand'))
        document.querySelector('.navbar .navbar-brand').href = '/my';
    return Promise.resolve();
}

const addButtons = () => {
    if (window.location.pathname != '/my/') return Promise.resolve(false);
    if (document.querySelector("#page-header > div > div > div").clientWidth <= 833) return Promise.resolve();
    return fetch(chrome.runtime.getURL('assets/moodle/header-buttons.html')).then(res => {
        return res.text();
    }).then(data => {
        let element = document.querySelector("#page-header > div > div > div > div.d-flex.flex-wrap")
        element.innerHTML = data + element.innerHTML;
        onresize = () => checkButtons();
        checkButtons();
    }).then(() => Promise.resolve(true));
}

const checkButtons = () => {
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
        } else if (e.key == 'Enter') {
            document.querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`).click();
            document.querySelector('#rmtSearchInput').value = '';
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
                if (item[1].includes('#section-'))
                    document.getElementById('rmtResultList').innerHTML += `<div style="margin:0" onclick="window.location='${item[1]}';window.location.reload()">${item[0]}</div>`;
                else
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
        if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'k') {
            createList({ target: { value: '' } });
            document.getElementById('rmtSearchInput').value = '';
            $('#rmtSearch').modal('show');
        }
    });
    document.querySelector('nav .simplesearchform').addEventListener('click', e => $('#rmtSearch').modal('show'));
    return Promise.resolve();
}

const searchCode = () => {
    if (window.location.href.includes('submission') || window.location.href.includes('#bypass')) return Promise.resolve();
    return fetch(chrome.runtime.getURL('assets/moodle/search-modal.html')).then(res => {
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
        if (document.querySelector("#ek-widget > ul.evalkit-widget-links > li > a"))
            document.querySelector("#ek-widget > ul.evalkit-widget-links > li > a").addEventListener('click', e => {
                e.preventDefault();
                window.open(e.target.href, '_blank');
            });
    } catch (e) {
        setTimeout(waitForjQuery, 500);
    }
}

const start = () => {
    console.log('Starting RHITweaks by cm090\nhttps://github.com/cm090/rhitweaks');
    modifyURL().then(() => {
        console.log('RHITweaks > Finished URL check');
        setStyle();
    }).then(() => {
        console.log('RHITweaks > Custom styles activated');
        cleanSideMenu();
    }).then(() => {
        console.log('RHITweaks > Side menu modified');
        addButtons();
    }).then(res => {
        if (res) console.log('RHITweaks > Added custom buttons');
        else console.log('RHITweaks > Skipped custom buttons');
        checkForUpdates().then(res => {
            if (res) console.log('RHITweaks > Update available');
            else console.log('RHITweaks > Up to date');
        }).then(() => {
            document.addEventListener('keydown', e => {
                if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'k')
                    e.preventDefault();
            });
            setTimeout(searchCode, 2000);
        }).then(() => {
            console.log('RHITweaks > Search program ready, press Ctrl+K to use');
            console.log('RHITweaks > Done!');
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
        quarter = data.moodle.quarter || '';
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
        if (oldData.quarter != newData.quarter) {
            quarter = newData.quarter || '';
            cleanSideMenu();
        }
    });
}

storageListeners();