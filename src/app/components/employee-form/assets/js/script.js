// JavaScript code goes here (if needed)
document.addEventListener("DOMContentLoaded", function () {
  const sidebarMenuItems = document.querySelectorAll(".sidebar-menu li");

  sidebarMenuItems.forEach((item) => {
    const submenu = item.querySelector(".submenu");
    const arrowLeft = item.querySelector(".arrow-left");
    const arrowDown = item.querySelector(".arrow-down");
    const link = item.querySelector("a");

    if (submenu) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        // arrowLeft.style.display = 'none';
        // arrowDown.style.display = 'block';
        submenu.classList.toggle("show");
        arrowLeft.classList.toggle("arrow-hidden");
        arrowDown.classList.toggle("arrow-hidden");
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".sidbar-link");
  const currentUrl = window.location.href;
  // console.log(link);
  navLinks.forEach((link) => {
    if (link.href === currentUrl) {
      link.classList.add("active");
      // Check if this link is part of a submenu
      if (link.closest(".submenu")) {
        // If so, open the submenu
        link.closest(".submenu").querySelector("ul").style.display = "block";
      }
    }
  });
});

// Menu Toggle
const dashboardtitle = document.querySelector(".dashboard-title");
if (dashboardtitle) {
  const sidebar = document.querySelector(".sidebar");
  // const sidebarMobile = document.getElementById('sidebar-mobile');

  dashboardtitle.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-mobile");
  });
}

const expended = document.querySelector(".expended");
if (expended) {
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");

  expended.addEventListener("click", () => {
    if (sidebar.style.width == "0%") {
      sidebar.style.width = "20%";
      content.style.width = "80%";
      expended.classList.toggle("expended-conserve");
    } else {
      sidebar.style.width = "0%";
      content.style.width = "100%";
      expended.classList.toggle("expended-conserve");
    }
  });
}

// Help Section

// Get references to sidebar and button elements

const sidebar = document.getElementById("help-sidebar");
const toggleButton = document.getElementById("help-toggleButton");
const arrowLeftHelp = document.querySelector(".help-left-icon");
const arrowRightHelp = document.querySelector(".help-right-icon");
const menuItems = document.querySelectorAll("#help-sidebar nav ul li");

const coll = document.querySelectorAll(".collapsible");
const down = document.querySelectorAll(".down");
coll.forEach((item) => {
  item.addEventListener("click", function () {
    const down = item.querySelector(".down");
    down.classList.toggle("up-down");
    // console.log(down);
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});
// coll.forEach(item => {
//   // console.log(item);
//     item.addEventListener('click', function() {
//       // console.log(item);
//        item.classList.toggle('up-down');
//     });
// });

// Add event listener to toggle button
if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    // Toggle sidebar by changing its right position
    if (sidebar.style.right === "0px") {
      sidebar.style.right = "-300px"; // Hide sidebar
    } else {
      sidebar.style.right = "0px"; // Show sidebar
    }

    arrowLeftHelp.classList.toggle("arrow-hidden");
    arrowRightHelp.classList.toggle("arrow-hidden");
  });
}

// Add event listeners to menu items with submenus
menuItems.forEach((menuItem) => {
  const submenu = menuItem.querySelector("ul");
  if (submenu) {
    // console.log(submenu);
    menuItem.addEventListener("click", () => {
      toggleSubmenu(submenu);
    });
  }
});

// Function to toggle the visibility of a submenu
function toggleSubmenu(submenu) {
  console.log(submenu);
  if (submenu.style.display === "flex") {
    submenu.style.display = "none"; // Hide submenu
  } else {
    submenu.style.display = "flex"; // Show submenu
  }
}

// content validation section
function generateShortUrl() {
  const longUrlInput = document.getElementById("linklonger");
  const shortUrlInput = document.getElementById("linkshorter");
  const longUrl = longUrlInput.value;
  const shortUrl =
    "https://short.url/" + Math.random().toString(36).substr(2, 7);
  shortUrlInput.value = shortUrl;
}

function copyShortUrl() {
  const shortUrlInput = document.getElementById("linkshorter");
  shortUrlInput.select();
  document.execCommand("copy");
}

// Sms, Non-masking
// const circle = document.getElementById('circle');
// const newNumber = 99; // Change this to the desired number
// circle.textContent = newNumber;

// Summany section
// const dynamicCircle = document.getElementById('dynamicCircle');
// let count = 80;
// dynamicCircle.style.setProperty('--percentage', count);
// setInterval(() => {
// count++;
//  if (count > 100) count = 0; // Reset count if it exceeds 100
//  dynamicCircle.innerText = count;
//  dynamicCircle.style.setProperty('--percentage', count);
//}, 1000); // Update count and border gradient percentage every second
