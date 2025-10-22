function initializeApp() {
    // DOM Elements
    const projectsCarousel = document.getElementById('projectsCarousel');
    const teamCarousel = document.getElementById('teamCarousel');
    const projectsGrid = document.getElementById('projects-grid');
    const teamGridContainer = document.getElementById('team-grid-container');
    const projectModal = document.getElementById('projectModal');
    const teamModal = document.getElementById('teamModal');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // Fetch and populate data
    async function loadData() {
        try {
            const [projectsResponse, teamResponse] = await Promise.all([
                fetch('projects.json').catch(err => console.warn('projects.json not found, skipping...', err)),
                fetch('team.json').catch(err => console.warn('team.json not found, skipping...', err))
            ]);

            const projects = projectsResponse ? await projectsResponse.json() : [];
            const teamMembers = teamResponse ? await teamResponse.json() : [];

            // Populate UI elements based on available data
            if (projects.length > 0) {
                populateProjects(projects);
            }
            if (teamMembers.length > 0) {
                populateTeam(teamMembers);
                populateAboutTeam(teamMembers); 
            }

        } catch (error) {
            console.error('Failed to load data:', error);
        }
    }

    function populateAboutTeam(teamMembers) {
        if (teamGridContainer) {
            teamMembers.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.className = 'about-member';
                memberDiv.id = member.id;
                memberDiv.setAttribute('role', 'article');
                memberDiv.setAttribute('aria-labelledby', `${member.id}-name`);

                memberDiv.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <div class="info">
                        <h3 id="${member.id}-name">${member.name}</h3>
                        <p class="role">${member.role}</p>
                        <p>${member.bio}</p>
                        <div class="social-links">
                            <a href="${member.social.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                            <a href="${member.social.github}" target="_blank"><i class="fa-brands fa-github"></i></a>
                            <a href="${member.social.twitter}" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
                        </div>
                    </div>
                `;
                teamGridContainer.appendChild(memberDiv);
            });
        }
    }

    // Populate Projects (Carousel and Grid)
    function populateProjects(projects) {
        if (projectsCarousel) {
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'carousel-card';
                projectCard.dataset.project = project.id;
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <h3>${project.title}</h3>
                `;
                projectCard.addEventListener('click', () => openProjectModal(project));
                projectsCarousel.appendChild(projectCard);
            });
        }

        if (projectsGrid) {
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.id = project.id;
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="download-buttons">
                            <a href="${project.playStoreUrl}" class="btn playstore" target="_blank">Play Store</a>
                            <a href="${project.appStoreUrl}" class="btn ios" target="_blank">App Store</a>
                            <a href="${project.websiteUrl}" class="btn website" target="_blank">Website</a>
                        </div>
                    </div>
                `;
                projectsGrid.appendChild(projectCard);
            });
        }
    }

    // Populate Team Carousel
    function populateTeam(teamMembers) {
        if (teamCarousel) {
            const duplicatedTeamMembers = [...teamMembers, ...teamMembers];

            duplicatedTeamMembers.forEach(member => {
                const teamCard = document.createElement('div');
                teamCard.className = 'carousel-card';
                teamCard.dataset.member = member.id;
                teamCard.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                `;
                teamCard.addEventListener('click', () => openTeamModal(member));
                teamCarousel.appendChild(teamCard);
            });

            const teamContainer = teamCarousel.parentElement;
            const prevBtn = teamContainer.querySelector('.prev');
            const nextBtn = teamContainer.querySelector('.next');
            
            let cardWidth = 0;
            const firstCard = teamCarousel.querySelector('.carousel-card');
            if (firstCard) {
                cardWidth = firstCard.offsetWidth + 16; 
            }

            let scrollInterval;

            const startScrolling = () => {
                scrollInterval = setInterval(() => {
                    if (teamCarousel.scrollLeft >= (teamCarousel.scrollWidth / 2)) {
                        teamCarousel.scrollLeft = 0;
                    }
                    teamCarousel.scrollBy({ left: 1, behavior: 'smooth' });
                }, 20);
            };

            const stopScrolling = () => {
                clearInterval(scrollInterval);
            };

            if(prevBtn && nextBtn){
                prevBtn.addEventListener('click', () => {
                    teamCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                });
    
                nextBtn.addEventListener('click', () => {
                    teamCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
                });
            }

            teamContainer.addEventListener('mouseenter', stopScrolling);
            teamContainer.addEventListener('mouseleave', startScrolling);

            startScrolling();
        }
    }

    // Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Modal Functions
    function openProjectModal(project) {
        if (projectModal) {
            projectModal.querySelector('#projectImage').src = project.image;
            projectModal.querySelector('#projectTitle').textContent = project.title;
            projectModal.querySelector('#projectDesc').textContent = project.description;
            const knowMoreBtn = projectModal.querySelector('#projectKnowMoreBtn');
            if (knowMoreBtn) {
                 knowMoreBtn.href = `projects.html#${project.id}`;
            }
            projectModal.classList.add('show');
        }
    }

    function openTeamModal(member) {
        if (teamModal) {
            teamModal.querySelector('#modalImage').src = member.image;
            teamModal.querySelector('#modalName').textContent = member.name;
            teamModal.querySelector('#modalRole').textContent = member.role;
            teamModal.querySelector('#modalIntro').textContent = member.intro;
            const knowMoreBtn = teamModal.querySelector('#knowMoreBtn');
            if (knowMoreBtn) {
                knowMoreBtn.href = `about.html#${member.id}`;
            }
            teamModal.classList.add('show');
        }
    }

    function closeModal() {
        if (projectModal) projectModal.classList.remove('show');
        if (teamModal) teamModal.classList.remove('show');
    }

    // Event listeners for closing modals
    window.addEventListener('click', (event) => {
        if (event.target === projectModal || event.target === teamModal) {
            closeModal();
        }
    });

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Load all data on startup
    loadData();
}