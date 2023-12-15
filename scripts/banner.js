const mainLinks = [
  {
    title: "Schedule Lookup",
    icon: "fas fa-calendar",
    url: "https://prodwebxe7-hv.rose-hulman.edu/regweb-cgi/reg-sched.pl",
  },
  {
    title: "Degree Evaluation",
    icon: "fas fa-graduation-cap",
    url: "https://dwprod-hv.rose-hulman.edu:9903/RespDashboard/",
  },
  {
    title: "Payments",
    icon: "fas fa-credit-card",
    url: "https://bannerssb.rose-hulman.edu/payment",
  },
  {
    title: "Timesheet",
    icon: "fas fa-clock",
    url: "https://bannerssb.rose-hulman.edu/EmployeeSelfService/ssb/timeEntry#/teApp/timesheet/dashboard/payperiod",
  },
  {
    title: "Registration",
    icon: "fas fa-clipboard-list",
    url: "https://bannerssb.rose-hulman.edu/StudentRegistrationSsb",
  },
  {
    title: "Grades",
    icon: "fas fa-pen",
    url: "https://bannerssb.rose-hulman.edu/StudentSelfService/ssb/studentGrades",
  },
  {
    title: "Financial Aid",
    icon: "fas fa-dollar-sign",
    url: "https://bannerssb.rose-hulman.edu/StudentSelfService/ssb/financialAid",
  },
  {
    title: "Transcript",
    icon: "fas fa-file",
    url: "https://bannerssb.rose-hulman.edu/StudentSelfService/ssb/academicTranscript",
  },
];

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
    url: "https://www.gradescope.com/",
  },
  {
    title: "Campus Groups",
    icon: "fas fa-users",
    url: "https://www.campusgroups.com/shibboleth/rosehulman",
  },
  {
    title: "Menu",
    icon: "fas fa-utensils",
    url: "https://rose-hulman.cafebonappetit.com/",
  },
];

const buildLinks = () => {
  let template = document.querySelector("#banner-home-card-template");
  mainLinks.forEach((item) => {
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
  template = document.querySelector("#banner-extra-links-template");
  extraLinks.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(
      ".card-title"
    ).innerHTML = `<i class="${item.icon}"></i> ${item.title}`;
    clone.querySelector(".card").addEventListener("click", () => {
      window.location.href = item.url;
    });
    document.querySelector("#banner-extra-links").appendChild(clone);
  });
  template.remove();
};

const runApp = () => {
  if (window.location.href.includes("BannerGeneralSsb/ssb/general#/home")) {
    const load = () => {
      if (!document.querySelector(".loading")) {
        fetch(chrome.runtime.getURL("assets/banner/home.html"))
          .then((res) => res.text())
          .then(
            (data) =>
              (document.querySelector(".gen-home-main-view").innerHTML = data)
          );
        setTimeout(buildLinks, 100);
      } else {
        setTimeout(load, 100);
      }
    };
    load();
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
