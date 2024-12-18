require('@babel/register');
const { dataRoute } = require('../src/dataRoute');
const { getHandler } = require('../src/getHandler');

describe('getHandler test', () => {
    it('getHandler', () => {
        const result = getHandler({
            url: '/data'
        })

        expect(result).toBe(dataRoute)
    })
})