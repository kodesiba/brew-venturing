d3.json("http://127.0.0.1:5000/api/v1.0/breweries", function (data) {

    function tabulate(data, columns, colnames) {
          var table = d3.select('body').append('table').classed('table-responsive table-striped table-light', true)
          var thead = table.append('thead')
          var	tbody = table.append('tbody');
  
          // append the header row
          thead.append('tr')
            .selectAll('th')
            .data(colnames).enter()
            .append('th')
              .text(function (colnames) { return colnames; });
  
          // create a row for each object in the data
          var rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr');
  
          // create a cell in each row for each column
          var cells = rows.selectAll('td')
            .data(function (row) {
              return columns.map(function (column) {
                return {column: column, value: row[column]};
              });
            })
            .enter()
            .append('td')
              .text(function (d) { return d.value; });
  
        return table;
      }
  
      // render the table
      tabulate(data, 
        ['CompanyName', 'YearEstablished', 'street', 'City','County','latitude','longitude','google_rating','google_numratings','Employee','AnnualSales'],
        ['Company Name', 'Year Established', 'Street', 'City','County','Latitude','Longitude','Google Rating','Number of Google Ratings','Employee','Annual Sales']
        );
})