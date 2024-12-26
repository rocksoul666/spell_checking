const dictionaryImport = import('dictionary-en');
const nspell = require('nspell')
const db = require('./db');

async function dataRoute(
    req,
    res,
    reqBody
) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    const response = await checkSpelling(reqBody.word)
    const query = 'INSERT INTO requests (word, response) VALUES ($1, $2)'
    const values = [reqBody.word, response]
    await db.query(query, values)
    res.end(response)
}

async function checkSpelling(word) {
    const dictionary = await dictionaryImport
    const { default: dict } = dictionary
    const spelling = nspell(dict.aff, dict.dic)

    const wordIsCorrect = spelling.correct(word)
    if (wordIsCorrect) return 'Word is correct'

    const suggestedWordsArray = spelling.suggest(word)
    if (suggestedWordsArray.length === 0) return 'No suggestions.'
    console.dir(suggestedWordsArray)

    return `Suggested correct word: ${suggestedWordsArray[0]}`
}

module.exports = {
    dataRoute,
    checkSpelling
}