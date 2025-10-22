document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            id: 'proj1',
            image: 'assets/logo.png',
            title: 'All-in-One Student App',
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
            intro: 'Israel is a passionate leader with a vision for the future of technology.',
            link: 'about.html#member1'
        },
        {
            id: 'member2',
            image: 'assets/javin.jpg',
            name: 'Oreoluwa Ifedinma Chiazor',
            role: 'Software Engineer',
            intro: 'Oreoluwa is a skilled software engineer who loves to solve complex problems.',
            link: 'about.html#member2'
        },
        {
            id: 'member3',
            image: 'assets/christabel.jpg',
            name: 'Christabel Obianuju Ojekwu',
            role: 'UI/UX Designer',
            intro: 'Christabel is a creative UI/UX designer who is passionate about creating user-friendly interfaces.',
            link: 'about.html#member3'
        },
        {
            id: 'member4',
            image: 'assets/kingsley.jpg',
            name: 'Kingsley Ogedegbe',
            role: 'Backend Developer',
            intro: 'Kingsley is a backend developer who is passionate about building scalable and efficient systems.',
            link: 'about.html#member4'
        },
        {
            id: 'member5',
            image: 'assets/AKBAR 3.jpg',
            name: 'Annabel Akbar Aigbe',
            role: 'Web Developer',
            intro: 'Annabel is a web developer who is passionate about creating beautiful and responsive websites.',
            link: 'about.html#member5'
        },
        {
            id: 'member6',
            image: 'assets/STEPH 2.jpg',
            name: 'Stephanie Odili Mordi',
            role: 'Quality Assurance Analyst',
            intro: 'Stephanie is a quality assurance analyst who is passionate about ensuring the quality of our products.',
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
        teamMembers.forEach(member => {
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

    // Carousel Navigation
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        const cardWidth = carousel.querySelector('.carousel-card').offsetWidth;

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
    });
});
