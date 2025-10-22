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

    if (projectsCarousel) {
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.dataset.project = project.id;
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
            `;
            projectCard.addEventListener('click', () => openProjectModal(project));
            projectsCarousel.appendChild(projectCard);
        });
    }

    if (teamCarousel) {
        const teamMembersDoubled = [...teamMembers, ...teamMembers];
        teamMembersDoubled.forEach(member => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';
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

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    function openProjectModal(project) {
        if (projectModal) {
            document.getElementById('projectImage').src = project.image;
            document.getElementById('projectTitle').textContent = project.title;
            document.getElementById('projectDesc').textContent = project.description;
            document.getElementById('projectKnowMoreBtn').href = project.link;
            projectModal.classList.add('show');
        }
    }

    function openTeamModal(member) {
        if (teamModal) {
            document.getElementById('modalImage').src = member.image;
            document.getElementById('modalName').textContent = member.name;
            document.getElementById('modalRole').textContent = member.role;
            document.getElementById('modalIntro').textContent = member.intro;
            document.getElementById('knowMoreBtn').href = member.link;
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

    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
});
