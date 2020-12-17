const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`http://shakesearch.eastus.azurecontainer.io:9200/books/_search?q=${data.query}`).then((response) => {
      console.log(response);
      // response.json().then((results) => {
      //   Controller.updateTable(results);
      // });
    });
  },

  updateTable: (results) => {
    const table = document.getElementById("table-body");
    const rows = [];
    for (let result of results) {
      rows.push(`<tr>${result}<tr/>`);
    }
    table.innerHTML = rows;
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
