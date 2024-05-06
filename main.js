
import { links, navBarLabels, projects, skills } from './data.js';

function setContent(item) {
    document.querySelectorAll('.content').forEach(content => {
        content.innerHTML = item.innerHTML;
    });
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.add('light');
        return true;
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.remove('light');
        return false;
    }
}

// setLightMode();

function reSecureCallback() {
    document.querySelectorAll('.content-contact-form').forEach(reSecure => {
        reSecure.onsubmit = (ev) => {
            ev.preventDefault();
            const form = ev.target;
            const formData = new FormData(form);
            fetch('https://formspree.io/f/mgegddvb', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            }).then(response => {
                if (response.status === 200) {
                    form.reset();
                    alert('Message sent successfully');
                } else {
                    alert('Failed to send message');
                }
            });
            
            form.reset();
            
        };
    });
}



function setPage(url) {
    // remove all query params
    url = url.split('?')[0];
    if (url === '') {
        url = 'home';
    }

    const page_data = document.querySelector(`#raw-data`).getElementsByClassName(url)[0];
    
    if (page_data) {
        setContent(page_data);
    } else {
        const error_page = document.querySelector('#raw-data').getElementsByClassName('error')[0];
        document.title = "Jaysmito // 404";
        if (error_page) {
            setContent(error_page);
        } else {
            document.querySelectorAll('.content').forEach(content => {
                content.innerHTML = "<h1>404: Page not found</h1>";
            });
        }
    }

    reSecureCallback();
}

function navigateTo(url) {
    if (url === '#/dark-mode') {

        const navButton = document.querySelector('.nav-button[data-url="#/dark-mode"]');

        if(toggleDarkMode()) {
            navButton.querySelector('.nav-icon').classList.remove('fa-sun');
            navButton.querySelector('.nav-icon').classList.add('fa-moon');
        } else {
            navButton.querySelector('.nav-icon').classList.remove('fa-moon');
            navButton.querySelector('.nav-icon').classList.add('fa-sun');
        }
        return;
    }
    
    document.querySelectorAll('.nav-button').forEach(navButton => {
        if (navButton.getAttribute('data-url') === url) {
            navButton.classList.add('active');
        } else {
            navButton.classList.remove('active');
        }
    });

    if (url[0] === '#' || url == "") {
        window.history.replaceState({}, '', url);
        document.title = "Jaysmito // " + url.slice(2);
        setPage(url.slice(2));
    } else {
        window.open(url, '_blank');
    }
}

function navigateToCurrent() {
    navigateTo(window.location.hash);
}

document.querySelectorAll('.content-links-container').forEach(contentLinksContainer => {
    contentLinksContainer.innerHTML = "";
    links.forEach(link => {
        const contentLinksItem = document.createElement('div');
        contentLinksItem.classList.add('content-links-item');
        {
            const contentLinksText = document.createElement('div');
            contentLinksText.classList.add('content-links-text');
            contentLinksText.innerHTML = link.label + (link.id ? ` <span class="content-links-id">${link.id}</span>` : '');
            contentLinksItem.appendChild(contentLinksText);
        }
        {
            const contentLinksIcon = document.createElement('div');
            contentLinksIcon.classList.add('content-links-icon');
            {
                const icon = document.createElement('i');
                icon.classList.add('fa');
                for (const iconClass of link.icon.split(' ')) {
                    icon.classList.add(iconClass);
                }
                contentLinksIcon.appendChild(icon);
            }
            contentLinksItem.appendChild(contentLinksIcon);
        }
        // wrap it up in a a
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.style.width = '100%';
        linkElement.appendChild(contentLinksItem);
        contentLinksContainer.appendChild(linkElement);
    });
});

document.querySelectorAll('.content-projects-container').forEach(contentProjectsContainer => {
    contentProjectsContainer.innerHTML = "";
    projects.forEach(project => {
        const contentProjectsCard = document.createElement('div');
        contentProjectsCard.classList.add('content-projects-card');
        
        const projectImage = document.createElement('img');
        projectImage.src = project.image;
        projectImage.alt = project.name;
        projectImage.classList.add('content-projects-image');
        contentProjectsCard.appendChild(projectImage);
        
        const contentProjectsContent = document.createElement('div');
        contentProjectsContent.classList.add('content-projects-content');
        
        const projectTitle = document.createElement('h3');
        projectTitle.classList.add('content-projects-title');
        projectTitle.textContent = project.name;
        contentProjectsContent.appendChild(projectTitle);

        const projectStartCount = document.createElement('p');
        projectStartCount.classList.add('content-projects-star-count');
        projectStartCount.innerHTML = `<i class="fa fa-star"></i> Stars: ${project.stars}`;
        contentProjectsContent.appendChild(projectStartCount);
        
        const projectDescription = document.createElement('p');
        projectDescription.classList.add('content-projects-description');
        projectDescription.textContent = project.description;
        contentProjectsContent.appendChild(projectDescription);
        
        const projectLink = document.createElement('a');
        projectLink.href = project.url;
        projectLink.classList.add('content-projects-link');
        projectLink.textContent = 'View Project';
        contentProjectsContent.appendChild(projectLink);
        
        contentProjectsCard.appendChild(contentProjectsContent);
        contentProjectsContainer.appendChild(contentProjectsCard);
    });
});

document.querySelectorAll('.content-skills-container').forEach(contentSkillsContainer => {
    contentSkillsContainer.innerHTML = "";

    skills.forEach(skill => {
        const contentSkillsItem = document.createElement('div');
        contentSkillsItem.classList.add('content-skills-item');
        
        const skillName = document.createElement('div');
        skillName.classList.add('content-skills-name');
        skillName.textContent = skill.name;
        contentSkillsItem.appendChild(skillName);
        
        const contentSkillsProgress = document.createElement('div');
        contentSkillsProgress.classList.add('content-skills-progress');
        
        const contentSkillsProgressBar = document.createElement('div');
        contentSkillsProgressBar.classList.add('content-skills-progress-bar');
        contentSkillsProgressBar.style.width = `${skill.progress}%`;
        contentSkillsProgress.appendChild(contentSkillsProgressBar);
        
        const contentSkillsPercent = document.createElement('div');
        contentSkillsPercent.classList.add('content-skills-percent');
        contentSkillsPercent.textContent = `${skill.progress}%`;
        contentSkillsProgress.appendChild(contentSkillsPercent);
        
        contentSkillsItem.appendChild(contentSkillsProgress);
        
        contentSkillsContainer.appendChild(contentSkillsItem);
    });

});

// setup nav bar
document.querySelectorAll('.nav-bar').forEach(navBar => {
    navBar.innerHTML = "";
    const pieWheel = document.querySelector('.pie-wheel');
    pieWheel.innerHTML = "";
    navBarLabels.forEach(label => {
        const navItem = document.createElement('div');
        navItem.classList.add('nav-item');
        {
            const navButton = document.createElement('div');
            navButton.classList.add('nav-button');
            if (label.default) {
                navButton.classList.add('active');
            }
            navButton.setAttribute('data-url', label.url);
            navButton.onclick = (ev) => {
                navigateTo(label.url);
            }

            {
                const icon = document.createElement('i');
                icon.classList.add('nav-icon');
                label.icon.split(' ').forEach(iconClass => {
                    icon.classList.add(iconClass);
                });
                navButton.appendChild(icon);
            }
            navItem.appendChild(navButton);
        }
        {
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = label.label;
            navItem.appendChild(tooltip);
        }
        navBar.appendChild(navItem);


        const pieWheelItem = document.createElement('div');
        pieWheelItem.classList.add('pie-arc');
        pieWheelItem.setAttribute('data-index', navBarLabels.indexOf(label));
        pieWheelItem.setAttribute('data-label', label.label);
        pieWheelItem.setAttribute('data-url', label.url);
        pieWheelItem.innerHTML = `<i class="${label.icon}"></i>`;
        pieWheel.appendChild(pieWheelItem);
    });
});



navigateToCurrent();
window.onpopstate = navigateToCurrent;



document.body.addEventListener('contextmenu', e => e.preventDefault() & e.stopPropagation());
document.body.addEventListener('mousedown', onMouseDown);
document.body.addEventListener('mouseup', onMouseUp);
document.body.addEventListener('mousemove', onMouseMove);

let showing, anchorX, anchorY, min = 100;
const wheel = document.querySelector('.pie-wheel');

function onMouseDown(ev) {
    if (ev.button !== 2) return;
    let { clientX: x, clientY: y } = ev;
	showing = true;
	anchorX = x;
	anchorY = y;

	wheel.style.setProperty('--x', `${x}px`);
	wheel.style.setProperty('--y', `${y}px`);
	wheel.classList.add('on');

    document.querySelector('.pie-wheel').style.display = 'block';
}

function onMouseUp() {
    showing = false;
    document.querySelector('.pie-wheel').style.display = 'none';
    wheel.classList.remove('on');
    
    const index = parseInt(wheel.getAttribute('data-chosen')) - 1;
    if (!wheel.getAttribute('data-chosen') || index < 0) {
        wheel.setAttribute('data-chosen', 0);
        return;
    }
    
    wheel.setAttribute('data-chosen', 0);
    wheel.classList.remove('on');
    
    document.querySelector('.pie-wheel').style.display = 'none';
    
    navigateTo(navBarLabels[index].url);
}

function onMouseMove( ev ) {
    let { clientX: x, clientY: y } = ev;
	if (!showing) return;

	let dx = x - anchorX;
	let dy = y - anchorY;
	let mag = Math.sqrt(dx * dx + dy * dy);
	let index = 0;

	if (mag >= min) {
		let deg = Math.atan2(dy, dx) + 0.625 * Math.PI;
		while (deg < 0) deg += Math.PI * 2;
		index = Math.floor(deg / Math.PI * 4) + 1;
	}

	wheel.setAttribute('data-chosen', index);
}