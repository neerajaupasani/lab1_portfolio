import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('../lib/projects.json');

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let colors = d3.scaleOrdinal(d3.schemeTableau10);

/*let rolledData = d3.rollups(
  projects,
  (v) => v.length,
  (d) => d.year,
);

let data = rolledData.map(([year, count]) => {
  return { value: count, label: year };
});*/




//let total = 0;

/*for (let d of data) {
  total += d;
}*/

//let angle = 0;

/*for (let d of data) {
  let endAngle = angle + (d / total) * 2 * Math.PI;
  arcData.push({ startAngle: angle, endAngle });
  angle = endAngle;
}*/







/*arcs.forEach((arc, idx) => {
  // TODO, fill in step for appending path to svg using D3
  d3.select('svg').append('path').attr('d', arc).attr('fill', colors(idx));

});*/

/*let legend = d3.select('.legend');
data.forEach((d, idx) => {
  legend
    .append('li')
    .attr('class', 'legend-list')
    .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
    
    .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
});*/


let query = '';

let searchInput = document.querySelector('.searchBar');

let selectedIndex = -1;

//let svg = d3.select('svg');
//svg.selectAll('path').remove();












// Select the h1 element
const projectsTitle = document.querySelector('.projects-title');

// Display the project count
projectsTitle.textContent = `${projects.length} Projects`;

const projectsContainer = document.querySelector('.projects');



renderProjects(projects, projectsContainer, 'h2');

/*searchInput.addEventListener('change', (event) => {
  // update query value
  query = event.target.value;
  // TODO: filter the projects
  let filteredProjects = projects.filter((project) => {
  let values = Object.values(project).join('\n').toLowerCase();
  return values.includes(query.toLowerCase());
  });



  // TODO: render updated projects!
  renderProjects(filteredProjects, projectsContainer, 'h2');

});*/

function renderPieChart(projectsGiven) {
  // Select the pie chart SVG
  let svg = d3.select('#projects-plot-pie');

  // Create legend
  let legend = d3.select('.legend');

  

  // Clear the old chart and legend
  svg.selectAll('*').remove();
  d3.select('.legend').selectAll('*').remove();

  // Group projects by year and count them
  let rolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year
  );

  // Convert grouped data into objects
  let newData = rolledData.map(([year, count]) => ({
    label: year,
    value: count
  }));

  // Generate pie slices
  let pieGenerator = d3.pie()
    .value((d) => d.value);

  let arcData = pieGenerator(newData);

  // Generate arc paths
  let arcs = arcData.map((d) => arcGenerator(d));


  // Draw pie chart
  arcs.forEach((arc, i) => {

    svg
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(i))
      .on('click', () => {

        // Select or deselect the clicked wedge
        selectedIndex = selectedIndex === i ? -1 : i;

        // Highlight the selected pie slice
        svg
          .selectAll('path')
          .attr('class', (_, idx) =>
            idx === selectedIndex ? 'selected' : ''
          );

        // Highlight the corresponding legend item
        legend
          .selectAll('li')
          .attr('class', (_, idx) =>
            idx === selectedIndex ? 'legend-list selected' : 'legend-list'
          );

        // Filter projects based on selected year
        if (selectedIndex === -1) {

          // Show all currently available projects
          renderProjects(projectsGiven, projectsContainer, 'h2');

        } else {

          // Get the selected year
          let selectedYear = newData[selectedIndex].label;

          // Filter projects by selected year
          let filteredProjects = projectsGiven.filter(
            (project) => project.year === selectedYear
          );

          // Display filtered projects
          renderProjects(
            filteredProjects,
            projectsContainer,
            'h2'
          );
        }

      });

  });


  // Create legend
  newData.forEach((d, i) => {

    legend
      .append('li')
      .attr('class', 'legend-list')
      .attr('style', `--color: ${colors(i)}`)
      .html(`
        <span class="swatch"></span>
        ${d.label}
        <em>(${d.value})</em>
      `)
      .on('click', () => {

        // Apply the same selection logic as the pie wedge
        selectedIndex = selectedIndex === i ? -1 : i;

        // Highlight selected pie slice
        svg
          .selectAll('path')
          .attr('class', (_, idx) =>
            idx === selectedIndex ? 'selected' : ''
          );

        // Highlight selected legend item
        legend
          .selectAll('li')
          .attr('class', (_, idx) =>
            idx === selectedIndex ? 'legend-list selected' : 'legend-list'
          );

        // Filter projects based on selected year
        if (selectedIndex === -1) {

          renderProjects(projectsGiven, projectsContainer, 'h2');

        } else {

          let selectedYear = newData[selectedIndex].label;

          let filteredProjects = projectsGiven.filter(
            (project) => project.year === selectedYear
          );

          renderProjects(
            filteredProjects,
            projectsContainer,
            'h2'
          );
        }

      });

  });

   // Create legend
  /*newData.forEach((d, i) => {

    legend
      .append('li')
      .attr('class', 'legend-list')
      .attr('style', `--color: ${colors(i)}`)
      .html(`
        <span class="swatch"></span>
        ${d.label}
        <em>(${d.value})</em>
      `)
      .on('click', () => {

        // Apply the same selection logic as the pie wedge
        selectedIndex = selectedIndex === i ? -1 : i;

        // Highlight selected pie slice
        svg
          .selectAll('path')
          .attr('class', (_, idx) =>
            idx === selectedIndex ? 'selected' : ''
          );

        // Highlight selected legend item
        legend
          .selectAll('li')
          .attr('class', (_, idx) =>
            idx === selectedIndex ? 'legend-list selected' : 'legend-list'
          );

        // Filter projects based on selected year
        if (selectedIndex === -1) {

          renderProjects(projectsGiven, projectsContainer, 'h2');

        } else {

          let selectedYear = newData[selectedIndex].label;

          let filteredProjects = projectsGiven.filter(
            (project) => project.year === selectedYear
          );

          renderProjects(
            filteredProjects,
            projectsContainer,
            'h2'
          );
        }

      });

  });*/


}

// Call this function on page load
renderPieChart(projects);

// Search projects and update the chart
searchInput.addEventListener('change', (event) => {

  let query = event.target.value.toLowerCase();

  let filteredProjects = projects.filter((project) => {

    let values = Object.values(project)
      .join('\n')
      .toLowerCase();

    return values.includes(query);
  });

  // Reset selected wedge when search changes
  selectedIndex = -1;

  // Update project list
  renderProjects(filteredProjects, projectsContainer, 'h2');

  // Update pie chart and legend
  renderPieChart(filteredProjects);

});

