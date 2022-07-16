import { expect } from 'chai'
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

        it('should return empty array if empty mapKey', () => {
            TestHelper.setMapKey([])
            const entity = { a: 1, b: 'a', c: null, d: {}, e: undefined }
            expect(TestHelper.entityToArray(entity)).to.be.empty
        })

        it('should ignore keys without mapKey dictionary', () => {
            const entity = { a: 1, b: 'a', c: null, d: {}, e: 3, j: 5 }
            expect(TestHelper.entityToArray(entity)).to.deep.equal([1, 'a', null, {}, 3])
        })

        it('should return all values with any types', () => {
            const entity = { a: 1, b: 'a', c: null, d: {}, e: 3 }
            expect(TestHelper.entityToArray(entity)).to.deep.equal([1, 'a', null, {}, 3])
        })

        it('should throw error if miss required key in entity', () => {
            const entity = { a: 1 }
            expect(() => TestHelper.entityToArray(entity)).to.throw()
        })

        it('should throw error if entity mapped required key is undefined', () => {
            const entity = { a: 1, b: undefined, c: null, d: {}, e: undefined }
            expect(() => TestHelper.entityToArray(entity)).to.throw()
        })

        it('should mapping data before insert', () => {

            TestHelper.setMapKey(['a', 'b', 'c', 'd', 'e', 'j'])
            const entity = { a: 1, b: 'a', c: null, d: {}, e: 3, j: 5 }
            expect(TestHelper.entityToArray(entity)).to.deep.equal([1, 'a', null, {}, 3, 3])
        })

        it('should ignore field in ignoreByInsert property', () => {

            const entity = { a: 1, b: 'a', c: null, d: {}, e: 3, r: 5 }
            expect(TestHelper.entityToArray(entity)).to.deep.equal([1, 'a', null, {}, 3])
        })

        it('should change undefined fields to null', () => {
            TestHelper.setMapKey(['a', 'b', 'c', 'd', 'e'])
            const entity = { a: 1, b: 1, c: null, d: {}, e: undefined }
            expect(TestHelper.entityToArray(entity)[4]).to.be.null
        })
    })
})