const {
  uniqueNamesGenerator,
  adjectives,
  animals,
} = require("unique-names-generator");

module.exports = uniqueNamesGenerator({
  dictionaries: [adjectives, animals],
  separator: "-",
  length: 2,
});
