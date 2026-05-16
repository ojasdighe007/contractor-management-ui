import { sites, findSite } from '../data/sites.js';
import { getBuildingMaterials } from '../data/buildingMaterials.js';
import { getFinishingMaterials } from '../data/finishingMaterials.js';

const PHASE_FETCHERS = {
  building: getBuildingMaterials,
  finishing: getFinishingMaterials,
};

export function getSites() {
  return sites;
}

export function getSiteById(siteId) {
  return findSite(siteId);
}

export function getInventory(siteId, phaseId) {
  const fetcher = PHASE_FETCHERS[phaseId];
  if (!fetcher) return [];
  return fetcher(siteId);
}

export function registerPhaseFetcher(phaseId, fetcher) {
  PHASE_FETCHERS[phaseId] = fetcher;
}
