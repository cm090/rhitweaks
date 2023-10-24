const printListener = () => {
  document.addEventListener("keydown", (e) => {
    if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == "p") {
      e.preventDefault();
      window.location += "#print";
      location.reload();
    }
  });
};

const getData = () => {
  chrome.storage.local.get("schedule").then((data) => {
    let root = document.querySelector(":root");
    root.style.setProperty("--bg-color", data.schedule.bgColor || "#000000");
    root.style.setProperty(
      "--accent-color",
      data.schedule.accentColor || "#800000"
    );
    root.style.setProperty(
      "--text-color",
      data.schedule.textColor || "#ffffff"
    );
    root.style.setProperty(
      "--border-color",
      data.schedule.borderColor || "#808080"
    );
    if (data.schedule.enabled) runApp(true);
  });
  chrome.storage.local.onChanged.addListener((changes) => {
    const oldData = changes.schedule.oldValue;
    const newData = changes.schedule.newValue;
    if (oldData.enabled != newData.enabled) {
      window.location.reload();
      return;
    }
    let root = document.querySelector(":root");
    root.style.setProperty("--bg-color", newData.bgColor || "#000000");
    root.style.setProperty("--accent-color", newData.accentColor || "#800000");
    root.style.setProperty("--text-color", newData.textColor || "#ffffff");
    root.style.setProperty("--border-color", newData.borderColor || "#808080");
  });
};

const setStyles = () => {
  if (
    document.forms[0] &&
    document.querySelector(
      "body > form > table > tbody > tr:nth-child(4) > td:nth-child(1)"
    ) &&
    document
      .querySelector(
        "body > form > table > tbody > tr:nth-child(4) > td:nth-child(1)"
      )
      .innerText.includes("Last Name")
  ) {
    const quarters = document.forms[0].termcode.innerHTML;
    fetch(chrome.runtime.getURL("assets/schedule/home.html")).then((res) =>
      res.text().then((data) => {
        document.querySelector("html").innerHTML = data;
        document.querySelector("#quarters").innerHTML = quarters;
        document.querySelector("html").setAttribute("page", "home");
      })
    );
  } else if (document.title.includes("Course Matrix View")) {
    fetch(chrome.runtime.getURL("assets/schedule/matrix.html"))
      .then((res) => res.text())
      .then(
        (data) =>
          (document.querySelector("body").innerHTML =
            data + document.querySelector("body").innerHTML)
      );
    document.querySelector("html").setAttribute("page", "matrix");
  } else if (document.querySelectorAll("table").length > 1) {
    fetch(chrome.runtime.getURL("assets/schedule/detail.html"))
      .then((res) => res.text())
      .then(
        (data) =>
          (document.querySelector("body").innerHTML =
            data + document.querySelector("body").innerHTML)
      );
    document.querySelector("html").setAttribute("page", "detail");
  } else if (document.title.includes("Schedule Options")) {
    fetch(chrome.runtime.getURL("assets/schedule/lookup.html"))
      .then((res) => res.text())
      .then(
        (data) =>
          (document.querySelector("body").innerHTML =
            data + document.querySelector("body").innerHTML)
      );
    document.querySelector("html").setAttribute("page", "lookup");
  }
  fetch(chrome.runtime.getURL("styles/schedule.css"))
    .then((res) => res.text())
    .then(
      (data) =>
        (document.querySelector("head").innerHTML += `<style>${data}</style>`)
    );
  document.querySelectorAll("table").forEach((table) => {
    table.setAttribute("bgcolor", "");
  });
};

const runApp = (allowPrint) => {
  if (window.location.hash == "#print" && allowPrint) {
    window.print();
    window.history.back();
    runApp(false);
    return;
  }
  printListener();
  setStyles();

  setTimeout(() => {
    document.getElementById("signOut").onclick = () =>
      (window.location.href =
        "https://prodwebxe-hv.rose-hulman.edu/regweb-cgi/CASlogout.pl?url=https%3A%2F%2Fprodwebxe-hv.rose-hulman.edu%3A443%2Fregweb-cgi%2Freg-sched.pl");
    document.getElementById("downloadRoster").onclick = () => {
      const name = prompt("Enter course name").toUpperCase();
      document.querySelectorAll("#courseRosterDownload input")[0].value = name;
      document.querySelectorAll("#courseRosterDownload input")[1].click();
    };
  }, 1000);
};

getData();
