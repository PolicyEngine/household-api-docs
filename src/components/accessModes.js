export const ACCESS_MODE_OPTIONS = [
  {
    id: 'rest',
    label: 'REST API',
    description: 'Use the hosted PolicyEngine endpoint with OAuth credentials issued by PolicyEngine.',
  },
  {
    id: 'docker',
    label: 'Docker',
    description: 'Run the published household API image on your own machine or infrastructure.',
  },
  {
    id: 'python',
    label: 'Python',
    description: 'Call the US model directly with policyengine-us when you do not need an HTTP layer.',
  },
];

export function getAccessModeOption(accessMode) {
  return ACCESS_MODE_OPTIONS.find((option) => option.id === accessMode) ?? ACCESS_MODE_OPTIONS[0];
}
