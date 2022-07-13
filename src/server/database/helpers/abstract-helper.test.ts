import EntityHelper from './abstract-helper'

class TestHelper extends EntityHelper {

    protected static ignoreByInsert = ['r']
    protected static requiredKeys = ['a', 'b']

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

    describe('entityToArray', () => {


        beforeEach(() => {
            TestHelper.setMapKey(['a', 'b', 'c', 'd', 'e', 'r'])
        })

        test('should return empty array if empty mapKey', () => {
            TestHelper.setMapKey([])
            const entity = { a: 1, b: 'a', c: null, d: {}, e: undefined }
            expect(TestHelper.entityToArray(entity)).toEqual([])
        })

        test('should ignore keys without mapKey dictionary', () => {
            const entity = { a: 1, b: 'a', c: null, d: {}, e: 3, j: 5 }
            expect(TestHelper.entityToArray(entity)).toEqual([1, 'a', null, {}, 3])
        })

        test('should return all values with any types', () => {
            const entity = { a: 1, b: 'a', c: null, d: {}, e: 3 }
            expect(TestHelper.entityToArray(entity)).toEqual([1, 'a', null, {}, 3])
        })

        test('should throw error if miss required key in entity', () => {
            const entity = { a: 1 }
            expect(() => TestHelper.entityToArray(entity)).toThrow()
        })

        test('should throw error if entity mapped required key is undefined', () => {
            const entity = { a: 1, b: undefined, c: null, d: {}, e: undefined }
            expect(() => TestHelper.entityToArray(entity)).toThrow()
        })

        test('should mapping data before insert', () => {

            TestHelper.setMapKey(['a', 'b', 'c', 'd', 'e', 'j'])
            const entity = { a: 1, b: 'a', c: null, d: {}, e: 3, j: 5 }
            expect(TestHelper.entityToArray(entity)).toEqual([1, 'a', null, {}, 3, 3])
        })

        test('should ignore field in ignoreByInsert property', () => {

            const entity = { a: 1, b: 'a', c: null, d: {}, e: 3, r: 5 }
            expect(TestHelper.entityToArray(entity)).toEqual([1, 'a', null, {}, 3])
        })
    })

    describe('mapper', () => {

        let mapKey 

        beforeEach(() => {
            mapKey = ['a', 'b', 'c']
        })

        test('should return object by mapKey', () => {
            const data = [[1,2,3], [4,5,6]]
            expect(TestHelper.mapper(data, mapKey)).toEqual([{a: 1, b: 2, c: 3}, {a: 4, b: 5, c: 6}])
        })

        test('should return empty array if receive empty data', () => {
            expect(TestHelper.mapper([], mapKey)).toEqual([{a: 1, b: 2, c: 3}, {a: 4, b: 5, c: 6}])
        })

        test('should throw error if length mapKey and data item not equal', () => {
            expect(TestHelper.mapper([[1,2]], mapKey)).toThrow()
            expect(TestHelper.mapper([[1,2,3,4,5]], mapKey)).toThrow()
        })
    })
})