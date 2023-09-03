let courseData = [['Dashboard', 'https://moodle.rose-hulman.edu/my']];
let moodleData = {};
const additionalData = {
    timeFormat: 12,
    pinnedCourses: [],
};

const setStyle = async () => {
    let url = chrome.runtime.getURL('styles/moodle.css');
    const res = await fetch(url);
    const data = await res.text();
    var s = document.createElement("style");
    s.innerHTML = data;
    document.getElementsByTagName("head")[0].appendChild(s);
    if (document.querySelector('.gradeparent'))
        document.querySelector("#available_shortcuts_popup").style.display = 'none';
    return await Promise.resolve();
}

const modifyURL = () => {
    if (((window.location.pathname.length < 2 && !window.location.search) ||
        window.location.href.includes('enrol')) && !window.location.hash.includes('bypass'))
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

const addButtons = async () => {
    if (window.location.pathname != '/my/') return Promise.reject();
    if (document.querySelector("#page-content").clientWidth > 833) {
        const res = await fetch(chrome.runtime.getURL('assets/moodle/header-buttons.html'));
        const data = await res.text();
        let element = document.querySelector("#page-content");
        element.innerHTML = data + element.innerHTML;
    }
    onresize = () => checkButtons();
    return await Promise.resolve();
}

const checkButtons = () => document.querySelector('#rmtButtons').style.display
    = (document.querySelector("#page-content").clientWidth <= 833) ? 'none' : 'flex';

const searchListener = () => {
    const wait = () => {
        const navItems = document.querySelectorAll('#course-index .courseindex-section');
        if (navItems)
            navItems.forEach(item => {
                const header = item.querySelector('.courseindex-section-title .courseindex-link');
                courseData.push([header.innerText, header.href]);
            });
        else setTimeout(wait, 500);
    }
    wait();

    let pos = 1;
    if (window.location.href.includes('course/'))
        courseData.push(['Grades',
            Array.from(document.querySelectorAll(".more-nav > li"))
                .find(item => item.querySelector('a').innerText.includes('Grades')).querySelector('a').href
        ]);
    additionalData.pinnedCourses.forEach(item =>
        courseData.push([item[1], `/course/view.php?id=${item[0]}`])
    );
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
                    document.getElementById('rmtResultList').innerHTML +=
                        `<div style="margin:0" onclick="window.location='${item[1]}';window.location.reload()">${item[0]}</div>`;
                else
                    document.getElementById('rmtResultList').innerHTML +=
                        `<div style="margin:0" onclick="window.location='${item[1]}'">${item[0]}</div>`;
                i++;
            }
            if (i == 5) return;
        });
        if (i == 0)
            document.getElementById('rmtResultList').innerHTML +=
                `<div style="margin:0" onclick="window.location='https://moodle.rose-hulman.edu/search/index.php?q=${document.getElementById('rmtSearchInput').value}'">More results</div><p style="color:lightgray; font-size:12px; margin-top:5px; margin-bottom:0;">Courses older than 1 year might not show up in this list</p>`;
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
    if (document.querySelector('nav .simplesearchform'))
        document.querySelector('nav .simplesearchform').addEventListener('click', e => $('#rmtSearch').modal('show'));
    return Promise.resolve();
}

const updateTimelineFormat = () => {
    if (!document.querySelector('.block-timeline')) return Promise.reject();
    document.querySelectorAll('.block-timeline').forEach(timeline => {
        document.querySelectorAll('.timeline-event-list-item small.text-right').forEach(item => {
            const time = item.innerText.split(' ')[0].split(':');
            if (additionalData.timeFormat == 12) {
                if (parseInt(time[0]) > 12) {
                    time[0] = parseInt(time[0]) - 12;
                    item.innerText = `${time[0]}:${time[1]} PM`;
                    return;
                } else if (parseInt(time[0]) == 0)
                    time[0] = 12;
                item.innerText = `${parseInt(time[0])}:${time[1]} AM`;
            } else if (item.innerText.split(' ').length > 1) {
                const half = item.innerText.split(' ')[1] === "AM" ? time[0] === "12" ? -12 : 0 : 12;
                item.innerText = `${String(parseInt(time[0]) + half).padStart(2, '0')}:${time[1]}`;
            }
        });
    });
    return Promise.resolve();
}

const searchCode = async () => {
    if (window.location.href.includes('submission') || window.location.href.includes('#bypass'))
        return Promise.resolve();
    const res = await fetch(chrome.runtime.getURL('assets/moodle/search-modal.html'));
    const data = await res.text();
    if (document.querySelector("#page-header")) document.querySelector("#page-header").innerHTML += data;
    else document.querySelector('footer').innerHTML += data;
    searchListener();
    waitForJQuery();
    return await Promise.resolve();
}

const waitForJQuery = () => {
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
        setTimeout(waitForJQuery, 500);
    }
}

const updateCourseDropdown = () => {
    const menuItem = document.querySelector('.navbar-nav [data-key="mycourses"]');
    if (menuItem.querySelector('.custom-dropdown')) menuItem.querySelector('.custom-dropdown').remove();
    const div = document.createElement('div');
    div.classList.add('dropdown-menu', 'custom-dropdown');
    if (additionalData.pinnedCourses.length == 0)
        div.innerHTML = '<p class="mx-2 mb-0">No pinned courses<br />Add one <a href="/my/courses.php">here</a></p>';
    else
        additionalData.pinnedCourses.forEach(item => {
            const a = document.createElement('a');
            a.classList.add('dropdown-item');
            a.href = `/course/view.php?id=${item[0]}`;
            a.innerText = item[1];
            div.appendChild(a);
        });
    document.querySelector('body').appendChild(div);
    menuItem.onmouseenter = () => div.classList.add('show');
    div.onmouseenter = () => div.classList.add('show');
    document.querySelector("#page-wrapper > nav > div.primary-navigation > nav").onmouseleave
        = () => div.classList.remove('show');
    div.onmouseleave = () => div.classList.remove('show');
}

const start = () => {
    console.log('Starting RHITweaks by cm090\nhttps://github.com/cm090/rhitweaks');
    modifyURL().then(() => {
        console.log('RHITweaks > Finished URL check');
        setStyle();
    }).then(() => {
        console.log('RHITweaks > Custom styles activated');
        addButtons()
            .then(() => console.log('RHITweaks > Added custom buttons'),
                () => console.log('RHITweaks > Skipped custom buttons'));
    }).then(() => {
        const wait = () => {
            if (document.querySelector('.block_timeline [data-region="event-list-loading-placeholder"].hidden'))
                updateTimelineFormat()
                    .then(() => console.log('RHITweaks > Timeline format updated'),
                        () => console.log('RHITweaks > Skipped timeline format update'));
            else setTimeout(wait, 500);
        }
        if (document.querySelector('.block_timeline')) wait();
    }).then(() => {
        document.addEventListener('keydown', e => {
            if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'k')
                e.preventDefault();
        });
        setTimeout(searchCode, 2000);
        console.log('RHITweaks > Search program ready, press Ctrl+K to use');
    }).then(() => {
        updateCourseDropdown();
        if (!window.location.pathname.includes("/my/courses.php"))
            return;
        const addNavItems = () => {
            document.querySelectorAll('.dashboard-card-deck .dashboard-card, .list-group .course-listitem').forEach(card => {
                if (card.querySelector('.dropdown-menu').innerHTML.includes('navbar'))
                    card.querySelector('.dropdown-menu a:last-child').remove();
                const navItem = document.createElement('a');
                navItem.classList.add('dropdown-item');
                navItem.href = '#';
                navItem.innerText = additionalData.pinnedCourses.find(item => item[0] ==
                    card.getAttribute('data-course-id')) ? "Unpin from navbar" : "Pin to navbar";
                navItem.addEventListener('click', () => {
                    if (navItem.innerText == "Pin to navbar") {
                        const name = card.querySelector('.coursename .multiline').innerText;
                        additionalData.pinnedCourses.push([
                            card.getAttribute('data-course-id'),
                            name.split(' ')[0].search(/(?:\w+\d+)/) !== -1 ? name.split(' ')[0] : name
                        ]);
                    }
                    else
                        additionalData.pinnedCourses = additionalData.pinnedCourses.filter(item =>
                            item[0] != card.getAttribute('data-course-id')
                        );
                    addNavItems();
                    updateCourseDropdown();
                    chrome.storage.sync.set({ moodle: { ...moodleData, pinnedCourses: additionalData.pinnedCourses } });
                });
                card.querySelector('.dropdown-menu').append(navItem);
            });
        }
        const wait = () => {
            if (document.querySelector('.dashboard-card-deck .dashboard-card') ||
                document.querySelector('.course-listitem .coursename')) {
                addNavItems();
            }
            else setTimeout(wait, 500);
        }
        document.querySelectorAll('.main-inner a').forEach(item => item.addEventListener('click', () =>
            setTimeout(wait, 500)
        ));
        document.querySelector('.main-inner .searchbar input').addEventListener('input', () =>
            setTimeout(wait, 1500)
        );
        wait();
    })
}

const storageListeners = () => {
    chrome.storage.sync.get('moodle').then(data => {
        moodleData = data.moodle;
        let root = document.querySelector(':root');
        root.style.setProperty('--bg-color', data.moodle.bgColor || '#000000');
        root.style.setProperty('--card-color', data.moodle.cardColor || '#eeeeee');
        root.style.setProperty('--accent-color', data.moodle.accentColor || '#800000');
        root.style.setProperty('--sidebar-color', data.moodle.sbColor || '#000000');
        additionalData.timeFormat = data.moodle.timeFormat || 12;
        additionalData.pinnedCourses = data.moodle.pinnedCourses || [];
        if (data.moodle.enabled && document.getElementById('page-wrapper')) {
            start();
        }
    });
    chrome.storage.sync.onChanged.addListener(changes => {
        const oldData = changes.moodle.oldValue;
        const newData = changes.moodle.newValue;
        if (oldData.enabled != newData.enabled) {
            window.location.reload();
            return;
        }
        moodleData = newData;
        let root = document.querySelector(':root');
        root.style.setProperty('--bg-color', newData.bgColor || '#000000');
        root.style.setProperty('--card-color', newData.cardColor || '#eeeeee');
        root.style.setProperty('--accent-color', newData.accentColor || '#800000');
        root.style.setProperty('--sidebar-color', newData.sbColor || '#000000');
        additionalData.timeFormat = newData.timeFormat || 12;
        additionalData.pinnedCourses = newData.pinnedCourses || [];
        updateCourseDropdown();
        updateTimelineFormat().catch(() => null);
    });
}

storageListeners();