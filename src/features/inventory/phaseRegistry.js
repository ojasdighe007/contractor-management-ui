import BuildingPhaseView from './BuildingPhaseView.jsx';
import FinishingPhaseView from './FinishingPhaseView.jsx';

export const phaseViews = {
  building: BuildingPhaseView,
  finishing: FinishingPhaseView,
};

export function getPhaseView(phaseId) {
  return phaseViews[phaseId] ?? null;
}
