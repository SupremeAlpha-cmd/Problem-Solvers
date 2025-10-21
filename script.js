/* ================= TEAM SECTION ================= */
const teamCards = document.querySelectorAll(".team-card");
const teamModal = document.getElementById("teamModal");
const teamCloseBtn = teamModal?.querySelector(".close");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalIntro = document.getElementById("modalIntro");
const knowMoreBtn = document.getElementById("knowMoreBtn");

const teamData = {
  member1: {
    img: "pictures/israel.jpg",
    name: "Israel Irene Idemudia",
    role: "Team Lead",
    intro: "Bent on organising and making sure every project works perfectly well and moves smoothly. Works with the team members at all times. The chief backend developer that makes sure the unforseen side of every project runs smoothly.",
    link: "about.html#member1",
  },
  member2: {
    img: "pictures/javin.jpg",
    name: "Oreoluwa Ifedinma Chiazor",
    role: "Software Engineer",
    intro: " Designs, develops, tests, and maintains software systems by applying engineering principles to solve user problem",
    link: "about.html#member2",
  },
  member3: {
    img: "pictures/christabel.jpg",
    name: "Christabel Obianuju Ojekwu",
    role: "UI/UX Designer",
    intro: "Designs and build apps frameworks that are mind blowing. Bent on giving users the best experience (UX) while using the app with simplified, wonderful and eye catching designs(UI)",
    link: "about.html#member3",
  },
  member4: {
    img: "pictures/kingsley.jpg",
    name: "Kingsley Ogedegbe",
    role: "Backend Developer",
    intro: "Builds and maintains the unseen server-side components of the project, handling server-side logic, databases, and APIs to ensure the application functions correctly and securely behind the scenes",
    link: "about.html#member4",
  },
  member5: {
    img: "pictures/AKBAR 3.jpg",
    name: "Annabel Akbar Aigbe",
    role: "Web Developer",
    intro: "Responsible for building and designing websites that are top notch and with a touch of wonderful UI/UX",
    link: "about.html#member5",
  },
  member6: {
    img: "pictures/STEPH 2.jpg",
    name: "Stephanie Odili Mordi",
    role: "Quality Assurance Analyst",
    intro: "Responsible for testing, analysing projects, ready to make your project 99% standard and world class ",
    link: "about.html#member6",
  },
};

const teamCarousel = document.getElementById("teamCarousel");

function autoScrollTeam() {
  if (!teamCarousel) return;
  if (
    teamCarousel.scrollLeft + teamCarousel.clientWidth >=
    teamCarousel.scrollWidth
  ) {
    teamCarousel.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    teamCarousel.scrollBy({ left: 250, behavior: "smooth" });
  }
}
setInterval(autoScrollTeam, 3000);

teamCards.forEach((card) => {
  card.addEventListener("click", () => {
    const memberId = card.getAttribute("data-member");
    const member = teamData[memberId];

    modalImage.src = member.img;
    modalName.textContent = member.name;
    modalRole.textContent = member.role;
    modalIntro.textContent = member.intro;
    knowMoreBtn.href = member.link;

    teamModal.style.display = "flex";
    requestAnimationFrame(() => teamModal.classList.add("show"));
  });
});

teamCloseBtn?.addEventListener("click", () => {
  teamModal.classList.remove("show");
  setTimeout(() => (teamModal.style.display = "none"), 300);
});

window.addEventListener("click", (e) => {
  if (e.target === teamModal) {
    teamModal.classList.remove("show");
    setTimeout(() => (teamModal.style.display = "none"), 300);
  }
});

/* ================= PROJECTS SECTION ================= */
// Projects cards (both home & projects page)
const projectCards = document.querySelectorAll(".project-card");
const projectModal = document.getElementById("projectModal");
const projectImage = document.getElementById("projectImage");
const projectTitle = document.getElementById("projectTitle");
const projectDesc = document.getElementById("projectDesc");
const playStoreBtn = document.getElementById("playStoreBtn");
const iosBtn = document.getElementById("iosBtn");
const projectClose = projectModal.querySelector(".close");

const projects = {
  proj1: {
    img: "pictures/scholars.jpg",
    title: "All-in-One Student App",
    desc: "An app that provides students with resources, collaboration tools, and more.",
    play: "https://play.google.com/store/apps/details?id=yourapp",
    ios: "https://apps.apple.com/app/yourapp",
  },
  proj2: {
    img: "pictures/project2.jpg",
    title: "Campus AI Assistant",
    desc: "Your smart AI companion to make campus life easier.",
    play: "#",
    ios: "#",
  },
  proj3: {
    img: "pictures/project3.jpg",
    title: "Health Tracker",
    desc: "Track your wellness, productivity, and health in one place.",
    play: "#",
    ios: "#",
  },
};

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.dataset.project;
    const project = projects[id];

    projectImage.src = project.img;
    projectTitle.textContent = project.title;
    projectDesc.textContent = project.desc;

    if (document.body.classList.contains("projects-page")) {
      // Projects page: show download buttons
      playStoreBtn.style.display = "inline-block";
      iosBtn.style.display = "inline-block";
      playStoreBtn.href = project.play;
      iosBtn.href = project.ios;
    } else {
      // Home page: hide download buttons, add Know More
      playStoreBtn.style.display = "none";
      iosBtn.style.display = "none";

      let knowMoreBtn = document.createElement("a");
      knowMoreBtn.className = "know-more";
      knowMoreBtn.href = "projects.html#" + id;
      knowMoreBtn.textContent = "Know More";
      projectModal.querySelector(".modal-content").appendChild(knowMoreBtn);

      projectClose.addEventListener("click", () => knowMoreBtn.remove());
      window.addEventListener("click", (e) => {
        if (e.target === projectModal) knowMoreBtn.remove();
      });
    }

    projectModal.style.display = "flex";
    requestAnimationFrame(() => projectModal.classList.add("show"));
  });
});
