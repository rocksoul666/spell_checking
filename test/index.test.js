require('@babel/register');
const { rootRoute } = require('../src/rootRoute');
const { getHandler } = require('../src/getHandler');

describe('getHandler test', () => {
    it('getHandler', () => {
        const result = getHandler({
            url: '/'
        })

        expect(result).toBe(rootRoute)
    })
})