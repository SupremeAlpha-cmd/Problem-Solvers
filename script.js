document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            id: 'proj1',
            image: 'assets/logo.png',
            title: 'Skholar',
            description: 'An all-in-one student app designed to cater to the needs of students, providing them with resources, collaboration tools, and much more.',
            link: 'projects.html',
            playStore: '#',
            appStore: '#'
        },
       
    ];

    const teamMembers = [
        {
            id: 'member1',
            image: 'assets/israel.jpg',
            name: 'Israel Irene Idemudia',
            role: 'Team Lead',
            intro: 'The strategic mind behind our projects, Israel leads with a passion for backend development and data, always seeing the bigger picture.',
            link: 'about.html#member1'
        },
        {
            id: 'member2',
            image: 'assets/javin.jpg',
            name: 'Oreoluwa Ifedinma Chiazor',
            role: 'Software Engineer',
            intro: 'Our versatile problem-solver, Oreoluwa crafts seamless experiences across web and mobile platforms with her broad engineering expertise.',
            link: 'about.html#member2'
        },
        {
            id: 'member3',
            image: 'assets/christabel.jpg',
            name: 'Christabel Obianuju Ojekwu',
            role: 'UI/UX Designer',
            intro: 'The creative force of our team, Christabel blends artistry with user-centric design to create intuitive and beautiful digital experiences.',
            link: 'about.html#member3'
        },
        {
            id: 'member4',
            image: 'assets/kingsley.jpg',
            name: 'Kingsley Ogedegbe',
            role: 'Backend Developer',
            intro: 'The architect of our digital backbone, Kingsley specializes in building the scalable and efficient server-side systems that power our apps.',
            link: 'about.html#member4'
        },
        {
            id: 'member5',
            image: 'assets/AKBAR 3.jpg',
            name: 'Annabel Akbar Aigbe',
            role: 'Web Developer',
            intro: 'Our front-end specialist, Annabel brings designs to life by creating beautiful, responsive, and interactive websites that captivate users.',
            link: 'about.html#member5'
        },
        {
            id: 'member6',
            image: 'assets/STEPH 2.jpg',
            name: 'Stephanie Odili Mordi',
            role: 'Quality Assurance Analyst',
            intro: 'Our guardian of quality, Stephanie meticulously tests our products to ensure they are bug-free, reliable, and meet the highest standards.',
            link: 'about.html#member6'
        }
    ];

    const projectsCarousel = document.getElementById('projectsCarousel');
    const teamCarousel = document.getElementById('teamCarousel');
    const projectModal = document.getElementById('projectModal');
    const teamModal = document.getElementById('teamModal');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // Populate Projects Carousel
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

    // Populate Team Carousel
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
        const cardWidth = teamCarousel.querySelector('.carousel-card').offsetWidth + 16; // Include gap

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

        prevBtn.addEventListener('click', () => {
            teamCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            teamCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        teamContainer.addEventListener('mouseenter', stopScrolling);
        teamContainer.addEventListener('mouseleave', startScrolling);

        startScrolling();
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
            projectModal.querySelector('#projectKnowMoreBtn').href = project.link;
            projectModal.classList.add('show');
        }
    }

    function openTeamModal(member) {
        if (teamModal) {
            teamModal.querySelector('#modalImage').src = member.image;
            teamModal.querySelector('#modalName').textContent = member.name;
            teamModal.querySelector('#modalRole').textContent = member.role;
            teamModal.querySelector('#modalIntro').textContent = member.intro;
            teamModal.querySelector('#knowMoreBtn').href = member.link;
            teamModal.classList.add('show');
        }
    }

    function closeModal() {
        if (projectModal) projectModal.classList.remove('show');
        if (teamModal) teamModal.classList.remove('show');
    }

    window.addEventListener('click', (event) => {
        if (event.target === projectModal || event.target === teamModal) {
            closeModal();
        }
    });

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', closeModal);
    });
});
