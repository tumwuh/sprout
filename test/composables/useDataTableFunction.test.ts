import { describe, it, expect } from 'vitest';
import useDataTableFunction from '../../composables/useDataTableFunction';

describe('useDataTableFunction', () => {
  it('should initialize with default values', () => {
    const { currentPage, itemPerPage } = useDataTableFunction();
    expect(currentPage.value).toBe(1);
    expect(itemPerPage.value).toBe(10);
  });

  it('should initialize with provided values', () => {
    const { currentPage, itemPerPage } = useDataTableFunction(2, 20);
    expect(currentPage.value).toBe(2);
    expect(itemPerPage.value).toBe(20);
  });

  it('should update the current page', () => {
    const { currentPage, updatePage } = useDataTableFunction();
    updatePage(3);
    expect(currentPage.value).toBe(3);
  });

  it('should update the items per page', () => {
    const { itemPerPage, updateItemPerPage } = useDataTableFunction();
    updateItemPerPage(15);
    expect(itemPerPage.value).toBe(15);
  });
});