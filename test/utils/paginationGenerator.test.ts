import { describe, it, expect } from 'vitest'

describe('paginationGenerator', () => {
    it('should generate pagination for the first page', () => {
        const result = paginationGenerator(1, 5, 25)
        expect(result).toEqual([1, 2, 3, 4, 5])
    })

    it('should generate pagination for the middle page', () => {
        const result = paginationGenerator(3, 5, 25)
        expect(result).toEqual([1, 2, 3, 4, 5])
    })

    it('should generate pagination for the last page', () => {
        const result = paginationGenerator(5, 5, 25)
        expect(result).toEqual([1, 2, 3, 4, 5])
    })

    it('should handle a single page', () => {
        const result = paginationGenerator(1, 5, 5)
        expect(result).toEqual([1])
    })

    it('should handle two pages', () => {
        const result = paginationGenerator(1, 5, 10)
        expect(result).toEqual([1, 2])
    })

    it('should handle three pages', () => {
        const result = paginationGenerator(2, 5, 15)
        expect(result).toEqual([1, 2, 3])
    })

    it('should generate smart pagination for more than 7 pages', () => {
        const result = paginationGenerator(4, 5, 50)
        expect(result).toEqual([1, '...', 3, 4, 5, '...', 10])
    })

    it('should generate smart pagination near the start', () => {
        const result = paginationGenerator(2, 5, 50)
        expect(result).toEqual([1, 2, 3, 4, 5, '...', 10])
    })

    it('should generate smart pagination near the end', () => {
        const result = paginationGenerator(9, 5, 50)
        expect(result).toEqual([1, '...', 8, 9, 10])
    })
})