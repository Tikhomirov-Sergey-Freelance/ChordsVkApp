import EntityHelper from './abstract-helper'

describe('server/database/helpers/abstract-helper', () => {

    beforeEach(() => {
        EntityHelper.mapKey = ['a', 'b', 'c', 'd', 'e']
    })

    test('should return empty array if empty mapKey', () => {
        EntityHelper.mapKey = []
        const entity = { a: 1, b: 'a', c: null, d: {}, e: undefined }
        expect(EntityHelper.entityToArray(entity)).toEqual([])
    })

    test('should ignore keys without mapKey dictionary', () => {
        const entity = { a: 1, b: 'a', c: null, d: {}, e: 3, j: 5 }
        expect(EntityHelper.entityToArray(entity)).toEqual([1,'a', null, {}, 3])
    })

    test('should return all values with any types', () => {
        const entity = { a: 1, b: 'a', c: null, d: {}, e: 3 }
        expect(EntityHelper.entityToArray(entity)).toEqual([1,'a', null, {}, 3])
    })

    test('should throw error if miss key in entity', () => {
        const entity = { a: 1 }
        expect(() => EntityHelper.entityToArray(entity)).toThrow()
    })

    test('should throw error if entity mapped key is undefined', () => {
        const entity = { a: 1, b: 'a', c: null, d: {}, e: undefined }
        expect(() => EntityHelper.entityToArray(entity)).toThrow()
    })

    afterAll(() => {
        EntityHelper.mapKey = []
    })
})