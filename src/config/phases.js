export const phases = [
  {
    id: 'building',
    label: 'Building Phase',
    short: 'Building',
    description: 'Bulk structural materials used during the construction phase.',
    tagline: 'Cement, steel, bricks and other high-volume stock.',
    accent: 'amber',
    icon: 'hard-hat',
  },
  {
    id: 'finishing',
    label: 'Finishing Phase',
    short: 'Finishing',
    description: 'Site-specific finishing items tracked at the unit level.',
    tagline: 'Doors, hardware, paint, fixtures and fittings.',
    accent: 'emerald',
    icon: 'sparkles',
  },
];

export function getPhase(id) {
  return phases.find((phase) => phase.id === id) ?? null;
}
