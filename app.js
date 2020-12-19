const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`http://shakesearch.eastus.azurecontainer.io:9200/completeworks/_search?q=${data.query}`, { mode: 'cors'}).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results);
      });
    });
  },

  updateTable: (results) => {
    //console.log(results);
    const table = document.getElementById("table-body");
    const rows = [];
    for (let hit of results.hits.hits) {
      let score = hit._score;
      let source = hit._source;
      rows.push(`<tr>${source.content}<br>${source.title}<br>${score}</tr>`);
    }
    table.innerHTML = rows;
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
