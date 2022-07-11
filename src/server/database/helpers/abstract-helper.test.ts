import EntityHelper from './abstract-helper'

class TestHelper extends EntityHelper {

    static setMapKey(newMap: string[]) {
        this.mapKey = newMap
    }

    protected static insertMapper(data: unknown): unknown {
        return {
            ...data as object,
            j: 3
        }   
    }
}

describe('server/database/helpers/abstract-helper', () => {

    beforeEach(() => {
        TestHelper.setMapKey(['a', 'b', 'c', 'd', 'e'])
    })

    test('should return empty array if empty mapKey', () => {
        TestHelper.setMapKey([])
        const entity = { a: 1, b: 'a', c: null, d: {}, e: undefined }
        expect(TestHelper.entityToArray(entity)).toEqual([])
    })

    test('should ignore keys without mapKey dictionary', () => {
        const entity = { a: 1, b: 'a', c: null, d: {}, e: 3, j: 5 }
        expect(TestHelper.entityToArray(entity)).toEqual([1,'a', null, {}, 3])
    })

    test('should return all values with any types', () => {
        const entity = { a: 1, b: 'a', c: null, d: {}, e: 3 }
        expect(TestHelper.entityToArray(entity)).toEqual([1,'a', null, {}, 3])
    })

    test('should throw error if miss key in entity', () => {
        const entity = { a: 1 }
        expect(() => TestHelper.entityToArray(entity)).toThrow()
    })

    test('should throw error if entity mapped key is undefined', () => {
        const entity = { a: 1, b: 'a', c: null, d: {}, e: undefined }
        expect(() => TestHelper.entityToArray(entity)).toThrow()
    })

    test('should mapping data before insert', () => {

        TestHelper.setMapKey(['a', 'b', 'c', 'd', 'e', 'j'])
        const entity = { a: 1, b: 'a', c: null, d: {}, e: 3, j: 5 }
        expect(TestHelper.entityToArray(entity)).toEqual([1,'a', null, {}, 3, 3])
    })

})