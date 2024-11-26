/**
 * Function to generate pagination
 *
 * @returns {[]} list page
 * @param currentPage
 * @param itemsPerPage
 * @param totalItems
 */
export default function(currentPage: number, itemsPerPage: number, totalItems: number) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) {
        return [1];
    }

    if (totalPages <= 6) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (totalPages > 6) {
        if (currentPage <= 3) {
            return [1, 2, 3, 4, 5, '...', totalPages];
        }
        if (currentPage >= totalPages - 2) {
            return [1, '...',  totalPages - 2, totalPages - 1, totalPages];
        }
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }

    return [];


}