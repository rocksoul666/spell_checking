const dictionaryImport = import('dictionary-en')
const nspell = require('nspell')
const db = require('./db')

async function dataRoute(
    req,
    res,
    reqBody
) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    const user = await getUser()
    const response = await checkSpelling(reqBody.word)
    await saveQuery()
    const numberOfResponsesPerUser = await db.query('SELECT COUNT(*) FROM requests WHERE user_id = $1', [user.id])
    const numberOfResponsesPerWord = await db.query('SELECT COUNT(*) FROM requests WHERE word = $1', [reqBody.word])
    const finalResponse = `${response}\n${user.name} checked a word ${numberOfResponsesPerUser.rows[0].count} times.\nThe word "${reqBody.word}" was checked ${numberOfResponsesPerWord.rows[0].count} times.`
    res.end(finalResponse)

    async function saveQuery() {
        const query = 'INSERT INTO requests (word, response, user_id) VALUES ($1, $2, $3)'
        const values = [reqBody.word, response, user.id]
        await db.query(query, values)
    }

    async function getUser() {
        let user = await db.query('SELECT * FROM users WHERE name = $1', [reqBody.name])
        if (user.rows.length === 0) {
            user = await db.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [reqBody.name])
        }
        return user.rows[0]
    }
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