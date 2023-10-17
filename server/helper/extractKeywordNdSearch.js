const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const stopWords = require("stopwords").english;
const performQuery = require("../config/dbConnect")
// const dbDetail = require("./qaDetailsDb.js");

// const dbDetail = require("./yoyo1")
let dbDetail= []

async function fillDb(){
  try {
    dbDetail = await performQuery("select * from dbo.questionDb");
    // console.log(dbDetail)
  } catch (error) {
    console.error("Error:", error);
  }
}

fillDb();
console.log(dbDetail)
stopWords.push("explain");
stopWords.push("approach");

// const db = [
//     {question:'Why is DP used ?',answer: 'DP is commonly used in programming'},
//     {question: 'How many ways are there in dp ? ',answer : 'DP has 2 ways to solve a problem'},
//     {question: 'Why is backtracking used ?',answer : 'Backtracking is a important concept in DSA'}
// ]
const db = [];

dbDetail.forEach((element) => {
  let q = String(element.question),
    a = String(element.answer);
  db.push({ q, a });
});

// console.log(dbDetail)

function processUserInput(userInput) {
  const tokens = tokenizer.tokenize(userInput.toLowerCase());
  const filteredTokens = tokens.filter((token) => !stopWords.includes(token));
  console.log("The obtained tokens are :" + filteredTokens);
  return filteredTokens;
}

// function queryDb(mainWord) {
//   const yo = dbDetail.filter((entry) =>
//     String(entry.question).toLowerCase().includes(mainWord)
//   );
//   return yo;
// }

function queryDb(queryWords) {
  let arr = [];
  let arr1d = [];
  for (let i = 0; i < queryWords.length; i++) {
    yo = dbDetail.filter((entry) =>
      String(entry.question).toLowerCase().includes(queryWords[i])
    );
    arr1d = arr.concat(...yo);
  }
  return arr1d;
}

function checkForAllTokens(queryWords) {
  if (queryWords.length === 1) {
    const response = dbDetail.filter((entry) =>
      String(entry.question).toLowerCase().includes(queryWords[0])
    );
    console.log("hi 1 ", response);
    return response;
  } else if (queryWords.length === 2) {
    const response = dbDetail.filter(
      (entry) =>
        String(entry.question).toLowerCase().includes(queryWords[0]) &&
        String(entry.question).toLowerCase().includes(queryWords[1])
    );
    console.log("hi 2 ", response);
    return response;
  } else if (queryWords.length === 3) {
    const response = dbDetail.filter(
      (entry) =>
        String(entry.question).toLowerCase().includes(queryWords[0]) &&
        String(entry.question).toLowerCase().includes(queryWords[1]) &&
        String(entry.question).toLowerCase().includes(queryWords[2])
    );
    console.log("hi 3 ", response);
    return response;
  } else if (queryWords.length === 4) {
    const response = dbDetail.filter(
      (entry) =>
        String(entry.question).toLowerCase().includes(queryWords[0]) &&
        String(entry.question).toLowerCase().includes(queryWords[1]) &&
        String(entry.question).toLowerCase().includes(queryWords[2]) &&
        String(entry.question).toLowerCase().includes(queryWords[3])
    );
    console.log("hi 4 ", response);
    return response;
  }
  return [];
}

// console.log(queryDb('dp'))

// function performNLP(query){
//     const mainWord = processUserInput(query);
//     console.log(mainWord);
//     const matchingSentences = queryDb(mainWord);
//     console.log('User question : '+ query);
//     console.log('Main Word :'+ mainWord);
//     console.log('Matching sentences : ');
//     yo = []
//     matchingSentences.forEach(entry=> yo.push(entry.answer))
//     console.log(yo)
//     console.log("---\n\n");
// }

//Working nlp
// function performNLP(query) {
//   const mainWord = processUserInput(query);
//   console.log(mainWord);
//   const matchingSentences = queryDb(mainWord[0]);
//   console.log("User question : " + query);
//   console.log("Main Word :" + mainWord);
//   console.log("Matching sentences : ");
//   console.log(matchingSentences)
//   return matchingSentences
// }

function performNLP(query) {
  const mainWord = processUserInput(query);
  let containsAllTokens =
    checkForAllTokens(mainWord).length === 0
      ? queryDb(mainWord)
      : checkForAllTokens(mainWord);
  console.log(containsAllTokens);
  // if(containsAllTokens.length===0)
  //   return queryDb(mainWord)
  console.log("User question : " + query);
  console.log("Main Word :" + mainWord);
  return containsAllTokens;
}

// performNLP("What is ComVeh ?");
module.exports = {performNLP, fillDb};
