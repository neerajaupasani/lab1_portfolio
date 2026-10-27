import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

// Select the h1 element
const projectsTitle = document.querySelector('.projects-title');

// Display the project count
projectsTitle.textContent = `${projects.length} Projects`;

const projectsContainer = document.querySelector('.projects');



renderProjects(projects, projectsContainer, 'h2');

