export function getAccessModeOptions(country) {
  return [
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
      description: `Call the ${country.adjective} model directly with ${country.pythonPackage} when you do not need an HTTP layer.`,
    },
  ];
}

export function getAccessModeOption(accessMode, country) {
  const options = getAccessModeOptions(country);
  return options.find((option) => option.id === accessMode) ?? options[0];
}
