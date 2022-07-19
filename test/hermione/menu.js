const assetr = require('assert')

describe('test 1', () => {

    await this.browser.url('https://github.com/gemini-testing/hermione')

    const title = await this.browser.$('#readme h1').getText()
    assert.equal(title, 'Hermione')

})