// Constants for buttons and pages
const moodleEnable = document.getElementById("moodleEnable");
const scheduleEnable = document.getElementById("scheduleEnable");
const bannerEnable = document.getElementById("bannerEnable");
const moodleSettings = document.getElementById("moodleSettings");
const scheduleSettings = document.getElementById("scheduleSettings");
const bannerSettings = document.getElementById("bannerSettings");
const settingsBtn = document.getElementById("additionalSettings");
const bannerBtn = document.getElementById("bannerSettings");
const moodlePage = document.getElementById("moodleSettingsPage");
const schedulePage = document.getElementById("scheduleSettingsPage");
const bannerPage = document.getElementById("bannerSettingsPage");
const mainPage = document.getElementById("main");
const settingsPage = document.getElementById("additionalSettingsPage");
const pinnedCoursesSettingsPage = document.getElementById(
  "pinnedCoursesSettingsPage"
);

// Local data storage
window["moodleData"] = {};
window["scheduleData"] = {};
window["bannerData"] = {};

// Template data
window["moodleDataTemplate"] = {
  enabled: false,
  bgColor: "#000000",
  textColor: "#1d2125",
  cardColor: "#eeeeee",
  accentColor: "#800000",
  sbColor: "#000000",
  timeFormat: 12,
  pinnedCoursesDisplay: "dropdown",
  pinnedCourses: [],
};
window["scheduleDataTemplate"] = {
  enabled: false,
  bgColor: "#141414",
  accentColor: "#800000",
  textColor: "#ffffff",
  borderColor: "#808080",
};
window["bannerDataTemplate"] = {
  enabled: false,
  links: "student",
};

/**
 * Toggles the display of a settings element and updates the corresponding data based on a boolean value.
 * @param selector the name of a setting or feature that the toggle button controls
 * @param data boolean value that determines whether to display or hide the settings for the given selector
 */
const toggleBtn = (selector, data) => {
  if (document.getElementById(`${selector}Settings`)) {
    document.getElementById(`${selector}Settings`).style.display = data
      ? "block"
      : "none";
  }
  let dataSelector = window[`${selector}Data`];
  dataSelector.enabled = data;
  chrome.storage.local.set({ [selector]: dataSelector });
};

/**
 * Retrieves Moodle settings from Chrome storage and sets the corresponding values in the HTML document
 */
const moodleSettingsFn = () => {
  chrome.storage.local.get("moodle").then((data) => {
    document.getElementById("bgColor").value =
      data.moodle.bgColor || moodleDataTemplate.bgColor;
    document.getElementById("bgColorText").value =
      document.getElementById("bgColor").value;
    document.getElementById("textColor").value =
      data.moodle.textColor || moodleDataTemplate.textColor;
    document.getElementById("textColorText").value =
      document.getElementById("textColor").value;
    document.getElementById("cardColor").value =
      data.moodle.cardColor || moodleDataTemplate.cardColor;
    document.getElementById("cardColorText").value =
      document.getElementById("cardColor").value;
    document.getElementById("accentColor").value =
      data.moodle.accentColor || moodleDataTemplate.accentColor;
    document.getElementById("accentColorText").value =
      document.getElementById("accentColor").value;
    document.getElementById("sbColor").value =
      data.moodle.sbColor || moodleDataTemplate.sbColor;
    document.getElementById("sbColorText").value =
      document.getElementById("sbColor").value;
    document.getElementById("timeFormat").value =
      data.moodle.timeFormat || moodleDataTemplate.timeFormat;
    moodleData = data.moodle;
  });
};

/**
 * Sets event listeners for various HTML elements and updates the moodleData object and Chrome storage accordingly
 */
const moodleSettingsListeners = () => {
  document.getElementById("bgColor").addEventListener("input", () => {
    document.getElementById("bgColorText").value =
      document.getElementById("bgColor").value;
    moodleData.bgColor = document.getElementById("bgColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("resetBgColor").addEventListener("click", () => {
    document.getElementById("bgColor").value = moodleDataTemplate.bgColor;
    document.getElementById("bgColorText").value =
      document.getElementById("bgColor").value;
    moodleData.bgColor = document.getElementById("bgColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("bgColorText").addEventListener("input", () => {
    if (document.getElementById("bgColorText").value.length !== 7) {
      return;
    }
    document.getElementById("bgColor").value =
      document.getElementById("bgColorText").value;
    document.getElementById("bgColor").dispatchEvent(new Event("input"));
  });
  document.getElementById("textColor").addEventListener("input", () => {
    document.getElementById("textColorText").value =
      document.getElementById("textColor").value;
    moodleData.textColor = document.getElementById("textColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("resetTextColor").addEventListener("click", () => {
    document.getElementById("textColor").value = moodleDataTemplate.textColor;
    document.getElementById("textColorText").value =
      document.getElementById("textColor").value;
    moodleData.textColor = document.getElementById("textColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("textColorText").addEventListener("input", () => {
    if (document.getElementById("textColorText").value.length !== 7) {
      return;
    }
    document.getElementById("textColor").value =
      document.getElementById("textColorText").value;
    document.getElementById("textColor").dispatchEvent(new Event("input"));
  });
  document.getElementById("cardColor").addEventListener("input", () => {
    document.getElementById("cardColorText").value =
      document.getElementById("cardColor").value;
    moodleData.cardColor = document.getElementById("cardColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("resetCardColor").addEventListener("click", () => {
    document.getElementById("cardColor").value = moodleDataTemplate.cardColor;
    document.getElementById("cardColorText").value =
      document.getElementById("cardColor").value;
    moodleData.cardColor = document.getElementById("cardColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("cardColorText").addEventListener("input", () => {
    if (document.getElementById("cardColorText").value.length !== 7) {
      return;
    }
    document.getElementById("cardColor").value =
      document.getElementById("cardColorText").value;
    document.getElementById("cardColor").dispatchEvent(new Event("input"));
  });
  document.getElementById("accentColor").addEventListener("input", () => {
    document.getElementById("accentColorText").value =
      document.getElementById("accentColor").value;
    moodleData.accentColor = document.getElementById("accentColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("resetAccentColor").addEventListener("click", () => {
    document.getElementById("accentColor").value =
      moodleDataTemplate.accentColor;
    document.getElementById("accentColorText").value =
      document.getElementById("accentColor").value;
    moodleData.accentColor = document.getElementById("accentColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("accentColorText").addEventListener("input", () => {
    if (document.getElementById("accentColorText").value.length !== 7) {
      return;
    }
    document.getElementById("accentColor").value =
      document.getElementById("accentColorText").value;
    document.getElementById("accentColor").dispatchEvent(new Event("input"));
  });
  document.getElementById("sbColor").addEventListener("input", () => {
    document.getElementById("sbColorText").value =
      document.getElementById("sbColor").value;
    moodleData.sbColor = document.getElementById("sbColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("resetSbColor").addEventListener("click", () => {
    document.getElementById("sbColor").value = moodleDataTemplate.sbColor;
    document.getElementById("sbColorText").value =
      document.getElementById("sbColor").value;
    moodleData.sbColor = document.getElementById("sbColor").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document.getElementById("sbColorText").addEventListener("input", () => {
    if (document.getElementById("sbColorText").value.length !== 7) {
      return;
    }
    document.getElementById("sbColor").value =
      document.getElementById("sbColorText").value;
    document.getElementById("sbColor").dispatchEvent(new Event("input"));
  });
  document.getElementById("timeFormat").addEventListener("change", () => {
    moodleData.timeFormat = document.getElementById("timeFormat").value;
    chrome.storage.local.set({ moodle: moodleData });
  });
  document
    .getElementById("pinnedCoursesSettings")
    .addEventListener("click", () => {
      moodlePage.style.display = "none";
      pinnedCoursesSettingsPage.style.display = "block";
      document.querySelector(":root").style.height = "430px";
      pinnedCoursesSettingsFn();
    });
};

/**
 * Retrieves schedule settings from Chrome storage and sets the corresponding values in the HTML document
 */
const scheduleSettingsFn = () => {
  chrome.storage.local.get("schedule").then((data) => {
    document.getElementById("schedBgColor").value =
      data.schedule.bgColor || scheduleDataTemplate.bgColor;
    document.getElementById("schedBgColorText").value =
      document.getElementById("schedBgColor").value;
    document.getElementById("schedAccentColor").value =
      data.schedule.accentColor || scheduleDataTemplate.accentColor;
    document.getElementById("schedAccentColorText").value =
      document.getElementById("schedAccentColor").value;
    document.getElementById("schedTextColor").value =
      data.schedule.textColor || scheduleDataTemplate.textColor;
    document.getElementById("schedTextColorText").value =
      document.getElementById("schedTextColor").value;
    document.getElementById("schedBorderColor").value =
      data.schedule.borderColor || scheduleDataTemplate.borderColor;
    document.getElementById("schedBorderColorText").value =
      document.getElementById("schedBorderColor").value;
    scheduleData = data.schedule;
  });
};

/**
 * Adds event listeners for various HTML elements and updates the scheduleData object and Chrome storage accordingly
 */
const scheduleSettingsListeners = () => {
  document.getElementById("schedBgColor").addEventListener("input", () => {
    document.getElementById("schedBgColorText").value =
      document.getElementById("schedBgColor").value;
    scheduleData.bgColor = document.getElementById("schedBgColor").value;
    chrome.storage.local.set({ schedule: scheduleData });
  });
  document.getElementById("resetSchedBgColor").addEventListener("click", () => {
    document.getElementById("schedBgColor").value =
      scheduleDataTemplate.bgColor;
    document.getElementById("schedBgColorText").value =
      document.getElementById("schedBgColor").value;
    scheduleData.bgColor = document.getElementById("schedBgColor").value;
    chrome.storage.local.set({ schedule: scheduleData });
  });
  document.getElementById("schedBgColorText").addEventListener("input", () => {
    if (document.getElementById("schedBgColorText").value.length !== 7) {
      return;
    }
    document.getElementById("schedBgColor").value =
      document.getElementById("schedBgColorText").value;
    document.getElementById("schedBgColor").dispatchEvent(new Event("input"));
  });
  document.getElementById("schedAccentColor").addEventListener("input", () => {
    document.getElementById("schedAccentColorText").value =
      document.getElementById("schedAccentColor").value;
    scheduleData.accentColor =
      document.getElementById("schedAccentColor").value;
    chrome.storage.local.set({ schedule: scheduleData });
  });
  document
    .getElementById("resetSchedAccentColor")
    .addEventListener("click", () => {
      document.getElementById("schedAccentColor").value =
        scheduleDataTemplate.accentColor;
      document.getElementById("schedAccentColorText").value =
        document.getElementById("schedAccentColor").value;
      scheduleData.accentColor =
        document.getElementById("schedAccentColor").value;
      chrome.storage.local.set({ schedule: scheduleData });
    });
  document
    .getElementById("schedAccentColorText")
    .addEventListener("input", () => {
      if (document.getElementById("schedAccentColorText").value.length !== 7) {
        return;
      }
      document.getElementById("schedAccentColor").value =
        document.getElementById("schedAccentColorText").value;
      document
        .getElementById("schedAccentColor")
        .dispatchEvent(new Event("input"));
    });
  document.getElementById("schedTextColor").addEventListener("input", () => {
    document.getElementById("schedTextColorText").value =
      document.getElementById("schedTextColor").value;
    scheduleData.textColor = document.getElementById("schedTextColor").value;
    chrome.storage.local.set({ schedule: scheduleData });
  });
  document
    .getElementById("resetSchedTextColor")
    .addEventListener("click", () => {
      document.getElementById("schedTextColor").value =
        scheduleDataTemplate.textColor;
      document.getElementById("schedTextColorText").value =
        document.getElementById("schedTextColor").value;
      scheduleData.textColor = document.getElementById("schedTextColor").value;
      chrome.storage.local.set({ schedule: scheduleData });
    });
  document
    .getElementById("schedTextColorText")
    .addEventListener("input", () => {
      if (document.getElementById("schedTextColorText").value.length !== 7) {
        return;
      }
      document.getElementById("schedTextColor").value =
        document.getElementById("schedTextColorText").value;
      document
        .getElementById("schedTextColor")
        .dispatchEvent(new Event("input"));
    });
  document.getElementById("schedBorderColor").addEventListener("input", () => {
    document.getElementById("schedBorderColorText").value =
      document.getElementById("schedBorderColor").value;
    scheduleData.borderColor =
      document.getElementById("schedBorderColor").value;
    chrome.storage.local.set({ schedule: scheduleData });
  });
  document
    .getElementById("resetSchedBorderColor")
    .addEventListener("click", () => {
      document.getElementById("schedBorderColor").value =
        scheduleDataTemplate.borderColor;
      document.getElementById("schedBorderColorText").value =
        document.getElementById("schedBorderColor").value;
      scheduleData.borderColor =
        document.getElementById("schedBorderColor").value;
      chrome.storage.local.set({ schedule: scheduleData });
    });
  document
    .getElementById("schedBorderColorText")
    .addEventListener("input", () => {
      if (document.getElementById("schedBorderColorText").value.length !== 7) {
        return;
      }
      document.getElementById("schedBorderColor").value =
        document.getElementById("schedBorderColorText").value;
      document
        .getElementById("schedBorderColor")
        .dispatchEvent(new Event("input"));
    });
};

/**
 * Adds event listeners for modifying the pinned courses menu
 */
const pinnedCoursesSettingsListeners = () => {
  document
    .getElementById("selectCourseDisplay")
    .addEventListener("change", (e) => {
      moodleData.pinnedCoursesDisplay = e.target.value;
      chrome.storage.local.set({ moodle: moodleData });
    });
  document.getElementById("selectCourse").addEventListener("change", (e) => {
    const splitAt = e.target.value.indexOf(",");
    const selected = [
      e.target.value.substring(0, splitAt),
      e.target.value.substring(splitAt + 1),
    ];
    document.getElementById("courseLabel").disabled = selected === "";
    document.getElementById("courseLabel").value =
      selected === "" ? "" : selected[1];
  });
  document.getElementById("courseLabel").addEventListener("focusout", () => {
    const selected = document.getElementById("selectCourse").value.split(",");
    const item = moodleData.pinnedCourses.findIndex(
      (item) => item[0] === selected[0]
    );
    moodleData.pinnedCourses[item] = [
      selected[0],
      document.getElementById("courseLabel").value,
    ];
    chrome.storage.local.set({ moodle: moodleData });
    pinnedCoursesSettingsFn(selected[0]);
  });
  document
    .getElementById("deleteCourseFromList")
    .addEventListener("click", () => {
      if (document.getElementById("selectCourse").selectedIndex === 0) return;
      if (confirm("Are you sure you want to remove this course?")) {
        const index = document.getElementById("selectCourse").selectedIndex - 1;
        moodleData.pinnedCourses.splice(index, 1);
        chrome.storage.local.set({ moodle: moodleData });
        document.getElementById("selectCourse").selectedIndex = 0;
        document.getElementById("courseLabel").disabled = true;
        pinnedCoursesSettingsFn();
      }
    });
  document.getElementById("resetCourseList").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset your pinned courses?")) {
      moodleData.pinnedCourses = [];
      chrome.storage.local.set({ moodle: moodleData });
    }
  });
};

/**
 * Retrieves pinned courses settings from Chrome storage and sets the corresponding values in the HTML document
 */
const pinnedCoursesSettingsFn = (selected = "") => {
  document.getElementById("resetBtn").style.display = "none";
  chrome.storage.local.get("moodle").then((data) => {
    document.getElementById("selectCourseDisplay").value =
      data.moodle.pinnedCoursesDisplay ||
      moodleDataTemplate.pinnedCoursesDisplay;
    data = data.moodle.pinnedCourses || moodleDataTemplate.pinnedCourses;
    document.getElementById("courseLabel").value =
      selected !== "" ? data.find((item) => item[0] === selected)[1] : "";
    const courses = data.map((course) => {
      return `<option value="${course}" ${
        selected === course[0] ? "selected" : ""
      }>${course[1]}</option>`;
    });
    document.getElementById("selectCourse").innerHTML = `<option value="" ${
      selected === "" ? "selected" : ""
    } disabled>Select a course</option>${courses.join("")}`;
  });
};

const bannerWebSettingsListeners = () => {
  chrome.storage.local.get("banner").then((data) => {
    document.getElementById("selectLinks").value =
      data.banner.links || bannerDataTemplate.links;
    bannerData = data.banner;
  });
  document.getElementById("selectLinks").addEventListener("change", (e) => {
    bannerData.links = e.target.value;
    chrome.storage.local.set({ banner: bannerData });
  });
};

/**
 * Adds event listeners to buttons for importing and exporting data in JSON format to and from Chrome storage
 */
const additionalSettingsListeners = () => {
  document.getElementById("import").addEventListener("click", () => {
    const fileSelector = document.createElement("input");
    fileSelector.type = "file";
    fileSelector.accept = "application/json";
    fileSelector.addEventListener("change", (e) => {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (data) => {
        let contents;
        try {
          contents = JSON.parse(data.target.result);
        } catch (e) {
          alert("Invalid file selected");
          return;
        }
        if (!contents.moodle || !contents.schedule || !contents.version) {
          alert("Invalid file selected");
          return;
        }
        if (contents.version != chrome.runtime.getManifest().version)
          alert(
            "The data you're trying to import is from an older version of RHITweaks. Some of your settings may not be updated."
          );
        chrome.storage.local.set({
          moodle: contents.moodle,
          schedule: contents.schedule,
          banner: contents.banner,
        });
        document.getElementById("import").style.backgroundColor = "green";
        document.getElementById("import").style.border = "1px solid green";
        setTimeout(() => {
          document.getElementById("import").style.background = "";
          document.getElementById("import").style.borderColor = "";
        }, 2000);
      };
      reader.readAsText(file);
    });
    fileSelector.click();
    fileSelector.remove();
  });
  document.getElementById("export").addEventListener("click", () => {
    let data = { version: chrome.runtime.getManifest().version };
    chrome.storage.local.get(["moodle", "schedule", "banner"], (result) => {
      Object.entries(result).forEach((item) => {
        data[item[0]] = item[1];
      });
      const a = document.createElement("a");
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      a.href = URL.createObjectURL(blob);
      a.download = "rhitweaks.json";
      a.click();
      URL.revokeObjectURL(a.href);
      a.remove();
    });
  });
  chrome.storage.sync.getBytesInUse().then((b) => {
    document.getElementById("migrateToLocalStorage").style.display =
      b > 0 ? "block" : "none";
  });
  document
    .getElementById("migrateToLocalStorage")
    .addEventListener("click", () => {
      chrome.storage.sync.get(["moodle", "schedule", "banner"], (result) => {
        chrome.storage.local.set({
          moodle: result.moodle,
          schedule: result.schedule,
          banner: result.banner,
        });
      });
      chrome.storage.sync.clear();
      document.getElementById("migrateToLocalStorage").style.display = "none";
    });
};

/**
 * Adds event listeners to various elements
 */
const listeners = () => {
  moodleEnable.addEventListener("change", () => {
    toggleBtn("moodle", moodleEnable.checked);
    requestHostPermissions();
  });
  scheduleEnable.addEventListener("change", () => {
    toggleBtn("schedule", scheduleEnable.checked);
    requestHostPermissions();
  });
  bannerEnable.addEventListener("change", () => {
    toggleBtn("banner", bannerEnable.checked);
    requestHostPermissions();
  });
  moodleSettings.addEventListener("click", () => {
    moodlePage.style.display = "block";
    mainPage.style.display = "none";
    document.getElementById("helpBtn").style.display = "none";
    document.getElementById("reportBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "";
    document.getElementById("resetBtn").style.display = "";
    document.getElementById("resetBtn").setAttribute("page", "moodle");
    document.querySelector(":root").style.height = "";
    document.querySelector(":root").style.height = "";
    moodleSettingsFn();
  });
  moodleSettingsListeners();
  scheduleSettings.addEventListener("click", () => {
    schedulePage.style.display = "block";
    mainPage.style.display = "none";
    document.getElementById("helpBtn").style.display = "none";
    document.getElementById("reportBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "";
    document.getElementById("resetBtn").style.display = "";
    document.getElementById("resetBtn").setAttribute("page", "schedule");
    document.querySelector(":root").style.height = "";
    scheduleSettingsFn();
  });
  scheduleSettingsListeners();
  settingsBtn.addEventListener("click", () => {
    settingsPage.style.display = "block";
    mainPage.style.display = "none";
    document.getElementById("helpBtn").style.display = "none";
    document.getElementById("reportBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "";
    document.querySelector(":root").style.height = "";
  });
  bannerWebSettingsListeners();
  bannerBtn.addEventListener("click", () => {
    bannerPage.style.display = "block";
    mainPage.style.display = "none";
    document.getElementById("helpBtn").style.display = "none";
    document.getElementById("reportBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "";
    document.querySelector(":root").style.height = "";
  });
  pinnedCoursesSettingsListeners();
  additionalSettingsListeners();
  document.getElementById("backBtn").addEventListener("click", reset);
  document.getElementById("resetBtn").addEventListener("click", defaults);
  document.getElementById("helpBtn").addEventListener("click", () => {
    window.open("https://link.canon.click/rhitweaks/wiki");
  });
  document.getElementById("reportBtn").addEventListener("click", () => {
    window.open("https://link.canon.click/rhitweaks/issues");
  });
};

/**
 * Retrieves data from Chrome storage and sets default values if the data is not present
 * Updates the UI based on retrieved data
 */
const getStorage = () => {
  chrome.storage.local.get(["moodle", "schedule", "banner"]).then((data) => {
    Object.entries(data).forEach((item) => {
      window[item[0] + "Data"] = item[1];
      toggleBtn(item[0], item[1].enabled);
      document.getElementById(`${item[0]}Enable`).checked = item[1].enabled;
    });
    if (!moodleData) {
      moodleData = moodleDataTemplate;
      chrome.storage.local.set({ moodle: moodleData });
    }
    if (!scheduleData) {
      scheduleData = scheduleDataTemplate;
      chrome.storage.local.set({ schedule: scheduleData });
    }
    if (!bannerData) {
      bannerData = bannerDataTemplate;
      chrome.storage.local.set({ banner: bannerData });
    }
  });
};

/**
 * Resets the display and visibility of certain elements
 */
const reset = () => {
  if (pinnedCoursesSettingsPage.style.display === "block") {
    pinnedCoursesSettingsPage.style.display = "none";
    moodlePage.style.display = "block";
    document.getElementById("resetBtn").style.display = "";
    document.querySelector(":root").style.height = "";
  } else {
    moodlePage.style.display = "none";
    schedulePage.style.display = "none";
    bannerPage.style.display = "none";
    settingsPage.style.display = "none";
    pinnedCoursesSettingsPage.style.display = "none";
    mainPage.style.display = "block";
    document.getElementById("helpBtn").style.display = "";
    document.getElementById("reportBtn").style.display = "";
    document.getElementById("backBtn").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("resetBtn").removeAttribute("page");
    document.querySelector(":root").style.height =
      document.getElementById("main").clientHeight +
      document.querySelector("#mainContainer > div.footer").clientHeight +
      "px";
  }
};

/**
 * Sets default settings object and calls a corresponding function based on the page selector
 */
const defaults = (e) => {
  if (!confirm("Are you sure you want to reset all settings?")) return;
  let selector = e.target.getAttribute("page");
  let dataSelector = window[`${selector}DataTemplate`];
  dataSelector.enabled = true;
  chrome.storage.local.set({ [selector]: dataSelector });
  switch (selector) {
    case "moodle":
      moodleSettingsFn();
      break;
    case "schedule":
      scheduleSettingsFn();
      break;
  }
};

const setYear = () => {
  document.getElementById("year").innerText = `-${new Date().getFullYear()}`;
};

const requestHostPermissions = () => {
  chrome.permissions.request({
    origins: [
      "https://moodle.rose-hulman.edu/*",
      "https://prodwebxe-hv.rose-hulman.edu/*",
      "https://prodwebxe7-hv.rose-hulman.edu/*",
      "https://bannerssb.rose-hulman.edu/*",
      "https://print.rhit.cf/*",
      "https://print.rose-hulman.edu:9192/*",
    ],
  });
};

/**
 * Initializes the program
 */
const main = () => {
  document.querySelector("#versionNumber").innerText +=
    chrome.runtime.getManifest().version;
  setYear();
  getStorage();
  reset();
  listeners();
};

main();
