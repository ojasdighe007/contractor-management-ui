import { useMemo } from 'react';
import { getSiteById, getSites } from '../services/inventoryService.js';

export function useSites() {
  const data = useMemo(() => getSites(), []);
  return { sites: data, isLoading: false, error: null };
}

export function useSite(siteId) {
  const site = useMemo(() => (siteId ? getSiteById(siteId) : null), [siteId]);
  return { site, isLoading: false, error: null };
}
