import { useMemo } from 'react';
import { getInventory } from '../services/inventoryService.js';

export function useInventory(siteId, phaseId) {
  const items = useMemo(() => {
    if (!siteId || !phaseId) return [];
    return getInventory(siteId, phaseId);
  }, [siteId, phaseId]);

  return {
    items,
    isLoading: false,
    isEmpty: items.length === 0,
    error: null,
  };
}
