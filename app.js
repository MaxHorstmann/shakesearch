const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`http://shakesearch.eastus.azurecontainer.io:9200/shakespeare/_search?q=${data.query}`, { mode: 'cors'}).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results);
      });
    });
  },

  updateTable: (results) => {
    const table = document.getElementById("table-body");
    table.innerHTML = '';
    for (let hit of results.hits.hits) {
      let score = hit._score;
      let source = hit._source;
      let row = document.createElement('tr');
      row.innerHTML = `<tr><p class="mb-0">In <em>${source.play_name}:</em></p><p>${source.speaker}: ${source.text_entry}</p></tr>`;
      table.appendChild(row);
    }
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
