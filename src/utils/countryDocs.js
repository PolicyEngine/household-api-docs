const US_REQUEST_HOUSEHOLD = {
  people: {
    you: {
      age: { '2025': 30 },
      employment_income: { '2025': 50000 },
    },
  },
  households: {
    'your household': {
      members: ['you'],
      state_name: { '2025': 'CA' },
    },
  },
  families: {
    'your family': {
      members: ['you'],
    },
  },
  tax_units: {
    'your tax unit': {
      members: ['you'],
    },
  },
  marital_units: {
    'your marital unit': {
      members: ['you'],
    },
  },
  spm_units: {
    'your spm unit': {
      members: ['you'],
    },
  },
};

const US_FULL_HOUSEHOLD = {
  people: {
    adult1: {
      age: { '2025': 40 },
      employment_income: { '2025': 30000 },
    },
    adult2: {
      age: { '2025': 38 },
      employment_income: { '2025': 20000 },
    },
    child1: {
      age: { '2025': 10 },
    },
    child2: {
      age: { '2025': 7 },
    },
  },
  households: {
    'my household': {
      members: ['adult1', 'adult2', 'child1', 'child2'],
      state_name: { '2025': 'AZ' },
    },
  },
  families: {
    'my family': {
      members: ['adult1', 'adult2', 'child1', 'child2'],
    },
  },
  tax_units: {
    'my tax unit': {
      members: ['adult1', 'adult2', 'child1', 'child2'],
    },
  },
  marital_units: {
    'my marital unit': {
      members: ['adult1', 'adult2'],
    },
  },
  spm_units: {
    'my spm unit': {
      members: ['adult1', 'adult2', 'child1', 'child2'],
    },
  },
};

const UK_REQUEST_HOUSEHOLD = {
  people: {
    person: {
      age: { '2025': 30 },
      employment_income: { '2025': 30000 },
    },
  },
  benunits: {
    benunit: {
      members: ['person'],
    },
  },
  households: {
    household: {
      members: ['person'],
    },
  },
};

const UK_FULL_HOUSEHOLD = {
  people: {
    parent_1: {
      age: { '2025': 35 },
      employment_income: { '2025': 25000 },
    },
    parent_2: {
      age: { '2025': 33 },
      employment_income: { '2025': 15000 },
    },
    child_1: {
      age: { '2025': 8 },
    },
    child_2: {
      age: { '2025': 5 },
    },
  },
  benunits: {
    family: {
      members: ['parent_1', 'parent_2', 'child_1', 'child_2'],
    },
  },
  households: {
    home: {
      members: ['parent_1', 'parent_2', 'child_1', 'child_2'],
      housing_costs: { '2025': 9600 },
    },
  },
};

const COUNTRY_DOCS = {
  us: {
    id: 'us',
    label: 'United States',
    adjective: 'US',
    siteUrl: 'https://www.policyengine.org/us',
    apiUrl: 'https://www.policyengine.org/us/api',
    modelUrl: 'https://www.policyengine.org/us/model',
    modelParametersUrl: 'https://www.policyengine.org/us/model/rules/parameters',
    researchUrl: 'https://www.policyengine.org/us/research',
    teamUrl: 'https://www.policyengine.org/us/team',
    supportersUrl: 'https://www.policyengine.org/us/supporters',
    donateUrl: 'https://www.policyengine.org/us/donate',
    pythonPackage: 'policyengine-us',
    pythonImport: 'policyengine_us',
    pythonRepoUrl: 'https://github.com/PolicyEngine/policyengine-us',
    hostedCalculateUrl: 'https://household.api.policyengine.org/us/calculate',
    dockerCalculateUrl: 'http://localhost:8080/us/calculate',
    requestSummary:
      'Hosted REST, self-hosted Docker, and direct Python access all evaluate the same US household policies.',
    pythonPackageSummary:
      'Use policyengine-us for direct access to the US model in Python 3.11+. This is the closest Python alternative to the household API for custom household calculations.',
    pythonPackageCardCopy: 'Call the US model directly from Python if you do not need an HTTP layer.',
    entityGroupsIntro:
      'US households require six entity groups. Each group contains named entities that reference people by name:',
    entityGroups: [
      ['people', 'Individual persons in the household'],
      ['households', 'Physical household (state, housing costs)'],
      ['families', 'Family unit for benefit eligibility'],
      ['tax_units', 'Tax filing unit (determines tax liability)'],
      ['marital_units', 'Married couple pair'],
      ['spm_units', 'Supplemental Poverty Measure unit'],
    ],
    variableExamples: ['employment_income', 'eitc'],
    valueExamples: '50000, "CA", null',
    step1Skeleton: {
      people: {},
      households: {},
      families: {},
      tax_units: {},
      marital_units: {},
      spm_units: {},
    },
    step2Title: 'Married couple with 2 children',
    step2Body:
      'Create named people and assign them to each group via the members array. Names are arbitrary strings that link people across groups.',
    step2Household: {
      people: {
        adult1: {},
        adult2: {},
        child1: {},
        child2: {},
      },
      households: {
        'my household': {
          members: ['adult1', 'adult2', 'child1', 'child2'],
        },
      },
      families: {
        'my family': {
          members: ['adult1', 'adult2', 'child1', 'child2'],
        },
      },
      tax_units: {
        'my tax unit': {
          members: ['adult1', 'adult2', 'child1', 'child2'],
        },
      },
      marital_units: {
        'my marital unit': {
          members: ['adult1', 'adult2'],
        },
      },
      spm_units: {
        'my spm unit': {
          members: ['adult1', 'adult2', 'child1', 'child2'],
        },
      },
    },
    step3Title: 'With income, ages, and state',
    step3Household: US_FULL_HOUSEHOLD,
    fullExampleHeading: 'Full example: EITC calculation',
    fullExampleBody:
      'Putting it all together: a married couple in Arizona with two children and $50,000 combined income, calculating their Earned Income Tax Credit.',
    fullExampleResultLabel: 'EITC',
    fullExampleVariable: 'eitc',
    fullExampleResultPath: 'result["tax_units"]["my tax unit"]["eitc"]["2025"]',
    quickstartHousehold: US_REQUEST_HOUSEHOLD,
    quickstartResults: [
      ['EITC', 'eitc'],
      ['Household net income', 'household_net_income'],
    ],
    requestHousehold: US_REQUEST_HOUSEHOLD,
    requestResults: [
      ['eitc', 'eitc'],
      ['household_net_income', 'household_net_income'],
    ],
    fullHousehold: US_FULL_HOUSEHOLD,
  },
  uk: {
    id: 'uk',
    label: 'United Kingdom',
    adjective: 'UK',
    siteUrl: 'https://www.policyengine.org/uk',
    apiUrl: 'https://www.policyengine.org/uk/api',
    modelUrl: 'https://www.policyengine.org/uk/model',
    modelParametersUrl: 'https://www.policyengine.org/uk/model/rules/parameters',
    researchUrl: 'https://www.policyengine.org/uk/research',
    teamUrl: 'https://www.policyengine.org/uk/team',
    supportersUrl: 'https://www.policyengine.org/uk/supporters',
    donateUrl: 'https://www.policyengine.org/uk/donate',
    pythonPackage: 'policyengine-uk',
    pythonImport: 'policyengine_uk',
    pythonRepoUrl: 'https://github.com/PolicyEngine/policyengine-uk',
    hostedCalculateUrl: 'https://household.api.policyengine.org/uk/calculate',
    dockerCalculateUrl: 'http://localhost:8080/uk/calculate',
    requestSummary:
      'Hosted REST, self-hosted Docker, and direct Python access all evaluate the same UK household policies.',
    pythonPackageSummary:
      'Use policyengine-uk for direct access to the UK model in Python workflows. This is the closest Python alternative to the household API for custom household calculations.',
    pythonPackageCardCopy: 'Call the UK model directly from Python if you do not need an HTTP layer.',
    entityGroupsIntro:
      'Most UK household calculations use three entity groups. Each group contains named entities that reference people by name:',
    entityGroups: [
      ['people', 'Individual people in the household'],
      ['benunits', 'Benefit units used for means-tested benefits'],
      ['households', 'Physical household for housing costs and household-level outputs'],
    ],
    variableExamples: ['employment_income', 'income_tax'],
    valueExamples: '30000, 9600, null',
    step1Skeleton: {
      people: {},
      benunits: {},
      households: {},
    },
    step2Title: 'Two parents with 2 children',
    step2Body:
      'Create named people and assign them to each UK entity group via the members array. Benefit units and households both reference people by name.',
    step2Household: {
      people: {
        parent_1: {},
        parent_2: {},
        child_1: {},
        child_2: {},
      },
      benunits: {
        family: {
          members: ['parent_1', 'parent_2', 'child_1', 'child_2'],
        },
      },
      households: {
        home: {
          members: ['parent_1', 'parent_2', 'child_1', 'child_2'],
        },
      },
    },
    step3Title: 'With income, ages, and housing costs',
    step3Household: UK_FULL_HOUSEHOLD,
    fullExampleHeading: 'Full example: Child Benefit calculation',
    fullExampleBody:
      'Putting it all together: a UK family with two children, £40,000 combined employment income, and annual housing costs of £9,600, calculating Child Benefit.',
    fullExampleResultLabel: 'Child Benefit',
    fullExampleVariable: 'child_benefit',
    fullExampleResultPath: 'result["benunits"]["family"]["child_benefit"]["2025"]',
    quickstartHousehold: UK_REQUEST_HOUSEHOLD,
    quickstartResults: [
      ['Income tax', 'income_tax'],
      ['Household net income', 'household_net_income'],
    ],
    requestHousehold: UK_REQUEST_HOUSEHOLD,
    requestResults: [
      ['income_tax', 'income_tax'],
      ['household_net_income', 'household_net_income'],
    ],
    fullHousehold: UK_FULL_HOUSEHOLD,
  },
};

export const SUPPORTED_COUNTRY_IDS = Object.keys(COUNTRY_DOCS);

export const COUNTRY_SELECTOR_OPTIONS = SUPPORTED_COUNTRY_IDS.map((countryId) => ({
  id: countryId,
  label: COUNTRY_DOCS[countryId].label,
}));

export function getCountryDoc(countryId) {
  return COUNTRY_DOCS[countryId] ?? null;
}

function formatJson(value) {
  return JSON.stringify(value, null, 2);
}

function formatPythonObject(value) {
  return JSON.stringify(value, null, 4);
}

function formatPythonCalculations(results) {
  return results
    .map(
      ([label, variable]) =>
        `${variable} = sim.calculate("${variable}", "2025")[0]\nprint(f"${label}: {${variable}:,.2f}")`
    )
    .join('\n\n');
}

export function getPythonInstallExample(country) {
  return `pip install ${country.pythonPackage}`;
}

export function getDockerExample() {
  return `docker pull ghcr.io/policyengine/policyengine-household-api:latest
docker run --rm -p 8080:8080 ghcr.io/policyengine/policyengine-household-api:latest`;
}

export function getDockerSmokeTestExample() {
  return 'curl http://localhost:8080/';
}

export function getHostedTokenCurlExample() {
  return `curl --request POST \\
  --url https://policyengine.uk.auth0.com/oauth/token \\
  --header 'Content-Type: application/json' \\
  --data '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "audience": "https://household.api.policyengine.org",
    "grant_type": "client_credentials"
  }'`;
}

export function getHostedTokenPythonExample() {
  return `import requests

response = requests.post(
    "https://policyengine.uk.auth0.com/oauth/token",
    json={
        "client_id": "YOUR_CLIENT_ID",
        "client_secret": "YOUR_CLIENT_SECRET",
        "audience": "https://household.api.policyengine.org",
        "grant_type": "client_credentials",
    },
)

token = response.json()["access_token"]`;
}

export function getTokenResponseExample() {
  return `{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6...",
  "token_type": "Bearer"
}`;
}

export function getPythonQuickstartExample(country) {
  return `from ${country.pythonImport} import Simulation

household = ${formatPythonObject(country.quickstartHousehold)}

sim = Simulation(situation=household)

${formatPythonCalculations(country.quickstartResults)}`;
}

export function getPythonScenarioExample(country, household, results) {
  const resultLines = results
    .map(
      ([label, variable]) =>
        `    "${label}": sim.calculate("${variable}", "2025")[0],`
    )
    .join('\n');

  return `from ${country.pythonImport} import Simulation

household = ${formatPythonObject(household)}

sim = Simulation(situation=household)

results = {
${resultLines}
}

print(results)`;
}

export function getPythonArrayExample(country) {
  const resultsVariable = country.requestResults[0][1];

  return `from ${country.pythonImport} import Simulation

household = ${formatPythonObject(country.fullHousehold)}

sim = Simulation(situation=household)

person_level = sim.calculate("${country.variableExamples[0]}", 2025)
result_level = sim.calculate("${resultsVariable}", 2025)

print("Person-level array:", person_level)
print("Person-level shape:", person_level.shape)
print("Result-level array:", result_level)
print("Result-level shape:", result_level.shape)
print("Use .sum() when you want the aggregate across the relevant entity.")`;
}

export function getPythonTraceExample(country) {
  const traceVariable = country.id === 'us' ? 'ctc_value' : country.fullExampleVariable;

  return `from ${country.pythonImport} import Simulation

household = ${formatPythonObject(country.fullHousehold)}

sim = Simulation(situation=household)
sim.trace = True

sim.calculate("${traceVariable}", 2025)
sim.tracer.print_computation_log(max_depth=4)`;
}

export function getPythonDataFrameExample(country) {
  const dataframeVariables =
    country.id === 'us'
      ? ['employment_income', 'adjusted_gross_income', 'income_tax', 'ctc_value', 'household_net_income']
      : ['employment_income', 'income_tax', 'child_benefit', 'household_net_income'];

  const variableList = dataframeVariables.map((variable) => `"${variable}"`).join(',\n    ');

  return `from ${country.pythonImport} import Simulation

household = ${formatPythonObject(country.fullHousehold)}

sim = Simulation(situation=household)

df = sim.calculate_dataframe(
    [
    ${variableList}
    ],
    period=2025,
    map_to="household",
)

print(df)`;
}

export function getUSPythonParametricReformExample() {
  return `from policyengine_us import Simulation
from policyengine_core.reforms import Reform

household = ${formatPythonObject(US_FULL_HOUSEHOLD)}

ctc_reform = Reform.from_dict(
    {
        "gov.irs.credits.ctc.amount.base[0].amount": {
            "2025-01-01.2100-12-31": 3000
        },
        "gov.irs.credits.ctc.refundable.fully_refundable": {
            "2025-01-01.2100-12-31": True
        },
    },
    country_id="us",
)

baseline = Simulation(situation=household)
reformed = Simulation(situation=household, reform=ctc_reform)

print("Baseline CTC:", baseline.calculate("ctc_value", 2025).sum())
print("Reformed CTC:", reformed.calculate("ctc_value", 2025).sum())`;
}

export function getUSPythonStructuralReformExample() {
  return `from policyengine_core.reforms import Reform
from policyengine_us.model_api import TaxUnit, USD, Variable, YEAR, max_

class ctc_value(Variable):
    value_type = float
    entity = TaxUnit
    label = "CTC value"
    unit = USD
    definition_period = YEAR

    def formula(tax_unit, period, parameters):
        ctc = tax_unit("ctc", period)
        phase_out = tax_unit("ctc_phase_out", period)
        return max_(0, ctc - phase_out)

class reform(Reform):
    def apply(self):
        self.update_variable(ctc_value)

# Apply with:
# Simulation(situation=household, reform=reform())`;
}

export function getGenericPythonReformPattern(country) {
  return `from ${country.pythonImport} import Simulation
from policyengine_core.reforms import Reform

household = ${formatPythonObject(country.fullHousehold)}

my_reform = Reform.from_dict(
    {
        "your.parameter.path": {
            "2025-01-01.2100-12-31": "NEW_VALUE"
        }
    },
    country_id="${country.id}",
)

baseline = Simulation(situation=household)
reformed = Simulation(situation=household, reform=my_reform)

print("Baseline:", baseline.calculate("${country.fullExampleVariable}", 2025).sum())
print("Reformed:", reformed.calculate("${country.fullExampleVariable}", 2025).sum())`;
}

export function getUSMicrosimulationOverviewExample() {
  return `from policyengine_us import Microsimulation

ENHANCED_CPS = "hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"

baseline = Microsimulation(dataset=ENHANCED_CPS)

ctc = baseline.calculate("ctc_value", period=2025)
weights = baseline.calculate("household_weight", period=2025)

print("Records:", len(weights))
print("Weighted CTC total:", ctc.sum())`;
}

export function getUSMicrosimulationWeightingExample() {
  return `from policyengine_us import Microsimulation

ENHANCED_CPS = "hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"
CORE_VARIABLES = [
    "household_id",
    "household_weight",
    "ctc_value",
    "snap",
    "household_net_income",
    "state_code",
]

baseline = Microsimulation(dataset=ENHANCED_CPS)

auto_total = baseline.calculate("ctc_value", period=2025).sum()

df = baseline.calculate_dataframe(CORE_VARIABLES, map_to="household", period=2025)
unweighted_total = df["ctc_value"].sum()
manual_total = (df["ctc_value"] * df["household_weight"]).sum()

print("calculate() total:", auto_total)
print("DataFrame total:", unweighted_total)
print("Manually weighted DataFrame total:", manual_total)`;
}

export function getUSMicrosimulationReformExample() {
  return `from policyengine_us import Microsimulation
from policyengine_core.reforms import Reform

ENHANCED_CPS = "hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"

ctc_expansion = Reform.from_dict(
    {
        "gov.irs.credits.ctc.amount.base[0].amount": {
            "2025-01-01.2100-12-31": 3600
        }
    },
    country_id="us",
)

baseline = Microsimulation(dataset=ENHANCED_CPS)
reformed = Microsimulation(dataset=ENHANCED_CPS, reform=ctc_expansion)

baseline_total = baseline.calculate("ctc_value", period=2025).sum()
reformed_total = reformed.calculate("ctc_value", period=2025).sum()

print("Annual increase:", reformed_total - baseline_total)`;
}

export function getUSMicrosimulationGeographyExample() {
  return `from policyengine_us import Microsimulation

ENHANCED_CPS = "hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"
CORE_VARIABLES = ["state_code", "household_weight", "ctc_value"]

baseline = Microsimulation(dataset=ENHANCED_CPS)
df = baseline.calculate_dataframe(CORE_VARIABLES, map_to="household", period=2025)

state_totals = (
    df.assign(weighted_ctc=df["ctc_value"] * df["household_weight"])
      .groupby("state_code", as_index=False)["weighted_ctc"]
      .sum()
      .sort_values("weighted_ctc", ascending=False)
)

print(state_totals.head(10))

annual_impacts = []
for year in range(2025, 2035):
    annual_impacts.append(
        {
            "year": year,
            "ctc_total": baseline.calculate("ctc_value", period=year).sum(),
        }
    )

print(annual_impacts[:3])`;
}

export function getUSMicrosimulationProgramExample() {
  return `from policyengine_us import Microsimulation

ENHANCED_CPS = "hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"
PERSON_VARIABLES = ["person_weight", "snap", "is_child"]

baseline = Microsimulation(dataset=ENHANCED_CPS)
people = baseline.calculate_dataframe(PERSON_VARIABLES, map_to="person", period=2025)

snap_enrolled = people[people["snap"] > 0]["person_weight"].sum()
children = people[people["is_child"]]["person_weight"].sum()

print("People enrolled in SNAP:", snap_enrolled)
print("Children in dataset:", children)`;
}

export function getHostedCurlRequest(country) {
  return `curl --request POST \\
  --url ${country.hostedCalculateUrl} \\
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \\
  --header 'Content-Type: application/json' \\
  --data '${formatJson({ household: country.requestHousehold })}'`;
}

export function getDockerCurlRequest(country) {
  return `curl --request POST \\
  --url ${country.dockerCalculateUrl} \\
  --header 'Content-Type: application/json' \\
  --data '${formatJson({ household: country.requestHousehold })}'`;
}

export function getPythonRequestExample(country) {
  const resultLines = country.requestResults
    .map(
      ([label, variable]) =>
        `    "${label}": sim.calculate("${variable}", "2025")[0],`
    )
    .join('\n');

  return `from ${country.pythonImport} import Simulation

household = ${formatPythonObject(country.requestHousehold)}

sim = Simulation(situation=household)

results = {
${resultLines}
}

print(results)`;
}

export function getFullRestExample(country) {
  return `import requests

token = "YOUR_ACCESS_TOKEN"

household = ${formatPythonObject(country.fullHousehold)}

response = requests.post(
    "${country.hostedCalculateUrl}",
    json={"household": household},
    headers={"Authorization": f"Bearer {token}"},
)

result = response.json()["result"]
${country.fullExampleVariable} = ${country.fullExampleResultPath}
print(f"${country.fullExampleResultLabel}: {${country.fullExampleVariable}:,.2f}")`;
}

export function getFullDockerExample(country) {
  return `import requests

household = ${formatPythonObject(country.fullHousehold)}

response = requests.post(
    "${country.dockerCalculateUrl}",
    json={"household": household},
)

result = response.json()["result"]
${country.fullExampleVariable} = ${country.fullExampleResultPath}
print(f"${country.fullExampleResultLabel}: {${country.fullExampleVariable}:,.2f}")`;
}

export function getFullPythonExample(country) {
  return `from ${country.pythonImport} import Simulation

household = ${formatPythonObject(country.fullHousehold)}

sim = Simulation(situation=household)

${country.fullExampleVariable} = sim.calculate("${country.fullExampleVariable}", "2025")[0]
print(f"${country.fullExampleResultLabel}: {${country.fullExampleVariable}:,.2f}")`;
}

export function getFullExampleTitle(country, accessMode) {
  if (accessMode === 'rest') {
    return `${country.fullExampleHeading.replace('Full example: ', 'Complete ')} via hosted REST API`;
  }

  if (accessMode === 'docker') {
    return `${country.fullExampleHeading.replace('Full example: ', 'Complete ')} via self-hosted Docker`;
  }

  return `${country.fullExampleHeading.replace('Full example: ', 'Complete ')} via ${country.pythonPackage}`;
}

export function formatHouseholdJson(value) {
  return formatJson(value);
}

export function formatPythonLiteral(value) {
  return formatPythonObject(value);
}
