const extraLinks = [
  {
    title: "Moodle",
    icon: "fas fa-graduation-cap",
    url: "https://moodle.rose-hulman.edu",
  },
  {
    title: "My Rose-Hulman",
    icon: "fas fa-globe",
    url: "https://rosehulman.sharepoint.com/sites/MyRH",
  },
  {
    title: "Gradescope",
    icon: "fas fa-signal",
    url: "https://www.gradescope.com",
  },
  {
    title: "Campus Groups",
    icon: "fas fa-users",
    url: "https://www.campusgroups.com/shibboleth/rosehulman",
  },
  {
    title: "Menu",
    icon: "fas fa-utensils",
    url: "https://rose-hulman.cafebonappetit.com",
  },
  {
    title: "Print Release",
    icon: "fas fa-print",
    url: "https://print.rhit.cf",
  },
];

const buildLinks = () => {
  fetch(chrome.runtime.getURL("assets/banner/studentLinks.json"))
    .then((res) => res.text())
    .then((data) => {
      const template = document.querySelector("#banner-home-card-template");
      JSON.parse(data).forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(
          ".card-title"
        ).innerHTML = `<i class="${item.icon}"></i> ${item.title}`;
        clone.querySelector(".card").addEventListener("click", () => {
          window.location.href = item.url;
        });
        document.querySelector("#banner-home").appendChild(clone);
      });
      template.remove();
    });
  const template = document.querySelector("#banner-extra-links-template");
  extraLinks.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(
      ".card-title"
    ).innerHTML = `<i class="${item.icon}"></i> ${item.title}`;
    clone.querySelector(".card").addEventListener("click", () => {
      window.open(item.url, "_blank");
    });
    document.querySelector("#banner-extra-links").appendChild(clone);
  });
  template.remove();
};

const runApp = () => {
  try {
    if (window.location.href.includes("BannerGeneralSsb/ssb/general#/home")) {
      const load = () => {
        if (!document.querySelector(".loading")) {
          try {
            fetch(chrome.runtime.getURL("assets/banner/home.html"))
              .then((res) => res.text())
              .then(
                (data) =>
                  (document.querySelector(".gen-home-main-view").innerHTML =
                    data)
              );
          } catch {
            // Ignore
          }
          setTimeout(buildLinks, 100);
        } else {
          setTimeout(load, 100);
        }
      };
      load();
    } else if (window.location.href.includes("logout/timeoutPage")) {
      window.location.href = "https://bannerweb.rose-hulman.edu/login";
    }

    document.querySelector("#bannerMenu").addEventListener("click", () => {
      let back = document.querySelector("#backButton");
      while (back) {
        back.click();
        back = document.querySelector("#backButton");
      }
      document.querySelector("#list_Banner").click();
      const changeHomepage = () => {
        try {
          if (document.querySelector("#list").innerText === "Banner") {
            document.querySelector("#list span.menu-common").innerText = "Home";
            document
              .querySelectorAll("#list, #list div.menu-item, #list a")
              .forEach((item) =>
                item.addEventListener("click", () => {
                  window.location.href =
                    "https://bannerssb.rose-hulman.edu/BannerGeneralSsb";
                  document
                    .querySelector("#menuContainer")
                    .classList.remove("show");
                })
              );
          }
        } catch {
          // Ignore
        }
        if (document.querySelector("#menuList").offsetHeight > 0) {
          setTimeout(changeHomepage, 100);
        }
      };
      changeHomepage();
    });

    document.querySelector("#branding").href =
      "https://bannerssb.rose-hulman.edu/BannerGeneralSsb";

    fetch(chrome.runtime.getURL("styles/banner.css"))
      .then((res) => res.text())
      .then(
        (data) =>
          (document.querySelector("head").innerHTML += `<style>${data}</style>`)
      );
  } catch {
    setTimeout(runApp, 100);
  }
};

const getData = () => {
  chrome.storage.local.get("banner").then((data) => {
    if (data.banner.enabled) runApp();
    chrome.storage.local.onChanged.addListener((changes) => {
      const oldData = changes.banner.oldValue;
      const newData = changes.banner.newValue;
      if (oldData.enabled != newData.enabled) {
        window.location.reload();
        return;
      }
    });
  });
};

getData();
