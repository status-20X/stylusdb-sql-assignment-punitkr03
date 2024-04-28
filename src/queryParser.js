// src/queryParser.js

function parseQuery(query) {
  const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
  const match = query.match(selectRegex);

  if (match) {
    const [, fields, table, whereString] = match;
    const whereClause = whereString ? parseWhereClause(whereString) : null;
    return {
      fields: fields.split(",").map((field) => field.trim()),
      table: table.trim(),
      whereClause,
    };
  } else {
    throw new Error("Invalid query format");
  }
}

function parseWhereClause(whereString) {
  const conditions = whereString.split(/ AND | OR /i);
  return conditions.map((condition) => {
    const [field, operator, value] = condition.split(/\s+/);
    return { field, operator, value };
  });
}

console.log(parseQuery("SELECT id, name FROM sample WHERE age = 25"));
module.exports = parseQuery;
