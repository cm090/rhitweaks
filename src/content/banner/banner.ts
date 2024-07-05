import { bannerDefaults } from '../../defaults';
import { BannerData, BannerLink } from '../../types';
import homePage from './home-page.html';
import additionalLinks from './modules/additionalLinks';
import bannerDataHandler from './modules/bannerData';
import facultyLinks from './modules/facultyLinks';
import studentLinks from './modules/studentLinks';

const buildLinks = (links: BannerLink[]) => {
  const homeCardTemplate = document.querySelector(
    '#banner-home-card-template',
  ) as HTMLTemplateElement;
  const homeLinks = document.querySelector('#banner-home');
  if (homeCardTemplate && homeLinks) {
    links.forEach((item) => {
      const clone = homeCardTemplate.content.cloneNode(true) as HTMLElement;
      const title = clone.querySelector('.card-title');
      const card = clone.querySelector('.card');
      if (!title || !card) {
        return;
      }
      title.innerHTML = `<i class="${item.icon}"></i> ${item.title}`;
      card.addEventListener('click', () => {
        window.location.href = item.url;
      });
      homeLinks.appendChild(clone);
    });
    homeCardTemplate.remove();
  }
  const additionalCardTemplate = document.querySelector(
    '#banner-extra-links-template',
  ) as HTMLTemplateElement;
  const extraLinks = document.querySelector('#banner-extra-links');
  if (additionalCardTemplate && extraLinks) {
    additionalLinks.forEach((item) => {
      const clone = additionalCardTemplate.content.cloneNode(
        true,
      ) as HTMLElement;
      const title = clone.querySelector('.card-title');
      const card = clone.querySelector('.card');
      if (!title || !card) {
        return;
      }
      title.innerHTML = `<i class="${item.icon}"></i> ${item.title}`;
      card.addEventListener('click', () => {
        window.open(item.url, '_blank');
      });
      extraLinks.appendChild(clone);
    });
    additionalCardTemplate.remove();
  }
};

const runApp = (links: BannerData['links']) => {
  try {
    addHomepageLinks(links);
    handleSidebarMenu();

    const logo = document.querySelector('#branding') as HTMLAnchorElement;
    logo.href = 'https://bannerssb.rose-hulman.edu/BannerGeneralSsb';

    import('./styles.css');
  } catch {
    setTimeout(() => runApp(links), 100);
  }
};

const addHomepageLinks = (links: BannerData['links']) => {
  const linkData = links === 'student' ? studentLinks : facultyLinks;
  if (window.location.href.includes('BannerGeneralSsb/ssb/general#/home')) {
    const load = () => {
      if (!document.querySelector('.loading')) {
        const mainView = document.querySelector('.gen-home-main-view');
        if (mainView) {
          mainView.innerHTML = homePage;
        }
        setTimeout(() => buildLinks(linkData), 100);
      } else {
        setTimeout(load, 100);
      }
    };
    load();
  } else if (window.location.href.includes('logout/timeoutPage')) {
    window.location.href = 'https://bannerweb.rose-hulman.edu/login';
  }
};

const handleSidebarMenu = () => {
  const bannerMenu = document.querySelector('#bannerMenu');
  if (bannerMenu) {
    bannerMenu.addEventListener('click', () => {
      let back = document.querySelector('#backButton') as HTMLButtonElement;
      while (back) {
        back.click();
        back = document.querySelector('#backButton') as HTMLButtonElement;
      }
      const bannerList = document.querySelector(
        '#list_Banner',
      ) as HTMLButtonElement;
      if (bannerList) {
        bannerList.click();
      }
      const changeHomepage = () => {
        const menuList = document.querySelector('#list') as HTMLElement;
        try {
          const menuTitle = document.querySelector(
            '#list span.menu-common',
          ) as HTMLElement;
          if (menuList && menuTitle && menuList.innerText === 'Banner') {
            menuTitle.innerText = 'Home';
            document
              .querySelectorAll('#list, #list div.menu-item, #list a')
              .forEach((item) =>
                item.addEventListener('click', () => {
                  window.location.href =
                    'https://bannerssb.rose-hulman.edu/BannerGeneralSsb';
                  const menuContainer =
                    document.querySelector('#menuContainer');
                  if (menuContainer) {
                    menuContainer.classList.remove('show');
                  }
                }),
              );
          }
        } catch {
          // Ignore
        }
        if (menuList.offsetHeight > 0) {
          setTimeout(changeHomepage, 100);
        }
      };
      changeHomepage();
    });
  }
};

const getData = () => {
  bannerDataHandler.removeChangeListeners();
  bannerDataHandler
    .getDataObject()
    .then((data) => {
      const bannerData = { ...bannerDefaults, ...data };
      attemptAppStart(bannerData);
    })
    .catch(() => attemptAppStart(bannerDefaults));
  bannerDataHandler.onDataChanged((oldData, newData) => {
    if (oldData.enabled != newData.enabled) {
      window.location.reload();
      return;
    }
    attemptAppStart(newData);
  });
};

const attemptAppStart = (data: BannerData) => {
  if (data.enabled) {
    runApp(data.links);
  }
};

getData();
