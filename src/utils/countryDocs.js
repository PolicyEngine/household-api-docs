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
      state_code: { '2025': 'CA' },
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
      state_code: { '2025': 'AZ' },
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
    pythonGuidePackage: 'policyengine',
    pythonGuideInstallTarget: 'policyengine[us]',
    pythonGuideRepoUrl: 'https://github.com/PolicyEngine/policyengine.py',
    pythonGuideReleaseBundlesUrl: 'https://github.com/PolicyEngine/policyengine.py/blob/main/docs/release-bundles.md',
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
    pythonGuidePackage: 'policyengine',
    pythonGuideInstallTarget: 'policyengine[uk]',
    pythonGuideRepoUrl: 'https://github.com/PolicyEngine/policyengine.py',
    pythonGuideReleaseBundlesUrl: 'https://github.com/PolicyEngine/policyengine.py/blob/main/docs/release-bundles.md',
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
  return `pip install "${country.pythonGuideInstallTarget}"`;
}

export function getPolicyengineHouseholdImpactExample(country) {
  if (country.id === 'us') {
    return `from policyengine.tax_benefit_models.us import (
    USHouseholdInput,
    calculate_household_impact,
)

household = USHouseholdInput(
    people=[
        {"age": 35, "employment_income": 40000, "is_tax_unit_head": True},
        {"age": 33, "is_tax_unit_spouse": True},
        {"age": 8, "is_tax_unit_dependent": True},
        {"age": 5, "is_tax_unit_dependent": True},
    ],
    tax_unit={"filing_status": "JOINT"},
    household={"state_code_str": "TX"},
    year=2026,
)

result = calculate_household_impact(household)

print(f"Net income: \${result.household['household_net_income']:,.0f}")
print(f"EITC: \${result.tax_unit[0]['eitc']:,.0f}")
print(f"SNAP: \${result.spm_unit[0]['snap']:,.0f}")`;
  }

  return `from policyengine.tax_benefit_models.uk import (
    UKHouseholdInput,
    calculate_household_impact,
)

household = UKHouseholdInput(
    people=[
        {"age": 35, "employment_income": 30000},
        {"age": 33},
        {"age": 8},
        {"age": 5},
    ],
    benunit={
        "would_claim_uc": True,
        "would_claim_child_benefit": True,
    },
    household={
        "rent": 12000,
        "region": "NORTH_WEST",
    },
    year=2026,
)

result = calculate_household_impact(household)

print(f"Net income: \u00a3{result.household['hbai_household_net_income']:,.0f}")
print(f"Child benefit: \u00a3{result.benunit[0]['child_benefit']:,.0f}")
print(f"Universal credit: \u00a3{result.benunit[0]['universal_credit']:,.0f}")`;
}

export function getPolicyengineHouseholdOutputExample(country) {
  if (country.id === 'us') {
    return `from policyengine.tax_benefit_models.us import (
    USHouseholdInput,
    calculate_household_impact,
)

household = USHouseholdInput(
    people=[
        {"age": 35, "employment_income": 50000, "is_tax_unit_head": True},
    ],
    tax_unit={"filing_status": "SINGLE"},
    household={"state_code_str": "CA"},
    year=2026,
)

result = calculate_household_impact(household)

# Entity collections come back as lists of dicts.
person = result.person[0]
tax_unit = result.tax_unit[0]
household_summary = result.household

print(person["employment_income"])
print(tax_unit["income_tax"])
print(household_summary["household_tax"])`;
  }

  return `from policyengine.tax_benefit_models.uk import (
    UKHouseholdInput,
    calculate_household_impact,
)

household = UKHouseholdInput(
    people=[{"age": 35, "employment_income": 30000}],
    benunit={"would_claim_uc": True},
    household={"region": "LONDON", "rent": 15000},
    year=2026,
)

result = calculate_household_impact(household)

# People and benefit units are lists of dicts.
person = result.person[0]
benunit = result.benunit[0]
household_summary = result.household

print(person["income_tax"])
print(benunit["universal_credit"])
print(household_summary["household_net_income"])`;
}

export function getPolicyengineHouseholdReformExample(country) {
  if (country.id === 'us') {
    return `import datetime

from policyengine.core import Parameter, ParameterValue, Policy
from policyengine.tax_benefit_models.us import (
    USHouseholdInput,
    calculate_household_impact,
    us_latest,
)

household = USHouseholdInput(
    people=[{"age": 35, "employment_income": 50000, "is_tax_unit_head": True}],
    tax_unit={"filing_status": "SINGLE"},
    household={"state_code_str": "CA"},
    year=2026,
)

parameter = Parameter(
    name="gov.irs.deductions.standard.amount.SINGLE",
    tax_benefit_model_version=us_latest,
)
reform = Policy(
    name="Double standard deduction",
    parameter_values=[
        ParameterValue(
            parameter=parameter,
            start_date=datetime.date(2026, 1, 1),
            end_date=datetime.date(2026, 12, 31),
            value=30950,
        ),
    ],
)

baseline = calculate_household_impact(household)
reformed = calculate_household_impact(household, policy=reform)

change = (
    reformed.household["household_net_income"]
    - baseline.household["household_net_income"]
)
print(f"Change in net income: \${change:,.0f}")`;
  }

  return `import datetime

from policyengine.core import Parameter, ParameterValue, Policy
from policyengine.tax_benefit_models.uk import (
    UKHouseholdInput,
    calculate_household_impact,
    uk_latest,
)

household = UKHouseholdInput(
    people=[{"age": 35, "employment_income": 30000}],
    household={"region": "LONDON"},
    year=2026,
)

parameter = Parameter(
    name="gov.hmrc.income_tax.allowances.personal_allowance.amount",
    tax_benefit_model_version=uk_latest,
)
reform = Policy(
    name="Increase personal allowance",
    parameter_values=[
        ParameterValue(
            parameter=parameter,
            start_date=datetime.date(2026, 1, 1),
            end_date=datetime.date(2026, 12, 31),
            value=15000,
        ),
    ],
)

baseline = calculate_household_impact(household)
reformed = calculate_household_impact(household, policy=reform)

change = (
    reformed.household["household_net_income"]
    - baseline.household["household_net_income"]
)
print(f"Change in net income: \u00a3{change:,.0f}")`;
}

export function getPolicyengineDatasetExample(country) {
  if (country.id === 'us') {
    return `from policyengine.core import Simulation
from policyengine.tax_benefit_models.us import ensure_datasets, us_latest

year = 2026
datasets = ensure_datasets(
    datasets=["hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"],
    years=[year],
    data_folder="./data",
)
dataset = datasets[f"enhanced_cps_2024_{year}"]

simulation = Simulation(
    dataset=dataset,
    tax_benefit_model_version=us_latest,
)
simulation.run()

output = simulation.output_dataset.data
print(output.household[["household_net_income", "household_tax"]].head())`;
  }

  return `from policyengine.core import Simulation
from policyengine.tax_benefit_models.uk import ensure_datasets, uk_latest

year = 2026
datasets = ensure_datasets(
    datasets=["hf://policyengine/policyengine-uk-data/enhanced_frs_2023_24.h5"],
    years=[year],
    data_folder="./data",
)
dataset = datasets[f"enhanced_frs_2023_24_{year}"]

simulation = Simulation(
    dataset=dataset,
    tax_benefit_model_version=uk_latest,
)
simulation.run()

output = simulation.output_dataset.data
print(output.household[["household_net_income", "household_tax"]].head())`;
}

export function getPolicyengineAggregateExample(country) {
  if (country.id === 'us') {
    return `from policyengine.outputs.aggregate import Aggregate, AggregateType

# simulation comes from the setup step above
agg = Aggregate(
    simulation=simulation,
    variable="eitc",
    aggregate_type=AggregateType.SUM,
    entity="tax_unit",
)
agg.run()

print(f"Total EITC: \${agg.result / 1e9:.1f}B")`;
  }

  return `from policyengine.outputs.aggregate import Aggregate, AggregateType

# simulation comes from the setup step above
agg = Aggregate(
    simulation=simulation,
    variable="universal_credit",
    aggregate_type=AggregateType.SUM,
    entity="benunit",
)
agg.run()

print(f"Total universal credit: \u00a3{agg.result / 1e9:.1f}bn")`;
}

export function getPolicyengineMappingExample(country) {
  if (country.id === 'us') {
    return `# simulation comes from the setup step above
data = simulation.output_dataset.data

# Aggregate SPM-unit SNAP to household level
household_snap = data.map_to_entity(
    source_entity="spm_unit",
    target_entity="household",
    columns=["snap"],
    how="sum",
)

# Project a household variable down to each person
person_household_tax = data.map_to_entity(
    source_entity="household",
    target_entity="person",
    columns=["household_tax"],
    how="project",
)

print(household_snap[["snap"]].head())
print(person_household_tax[["household_tax"]].head())`;
  }

  return `# simulation comes from the setup step above
data = simulation.output_dataset.data

# Aggregate benunit UC to household level
household_uc = data.map_to_entity(
    source_entity="benunit",
    target_entity="household",
    columns=["universal_credit"],
    how="sum",
)

# Project a household variable down to each person
person_household_income = data.map_to_entity(
    source_entity="household",
    target_entity="person",
    columns=["household_net_income"],
    how="project",
)

print(household_uc[["universal_credit"]].head())
print(person_household_income[["household_net_income"]].head())`;
}

export function getPolicyenginePandasExample(country) {
  if (country.id === 'us') {
    return `import pandas as pd

# simulation comes from the setup step above
households = simulation.output_dataset.data.household[
    ["household_net_income", "household_weight"]
]

print(households.head())

# Once you convert to plain pandas, weighting is your responsibility.
plain = pd.DataFrame(households)
weighted_mean = simulation.output_dataset.data.household["household_net_income"].mean()
plain_mean = plain["household_net_income"].mean()
manual_mean = (
    plain["household_net_income"] * plain["household_weight"]
).sum() / plain["household_weight"].sum()

print(f"MicroSeries mean: \${weighted_mean:,.0f}")
print(f"Plain pandas mean (unweighted): \${plain_mean:,.0f}")
print(f"Manual pandas mean: \${manual_mean:,.0f}")`;
  }

  return `import pandas as pd

# simulation comes from the setup step above
households = simulation.output_dataset.data.household[
    ["household_net_income", "household_weight"]
]

print(households.head())

# Once you convert to plain pandas, weighting is your responsibility.
plain = pd.DataFrame(households)
weighted_mean = simulation.output_dataset.data.household["household_net_income"].mean()
plain_mean = plain["household_net_income"].mean()
manual_mean = (
    plain["household_net_income"] * plain["household_weight"]
).sum() / plain["household_weight"].sum()

print(f"MicroSeries mean: \u00a3{weighted_mean:,.0f}")
print(f"Plain pandas mean (unweighted): \u00a3{plain_mean:,.0f}")
print(f"Manual pandas mean: \u00a3{manual_mean:,.0f}")`;
}

export function getPolicyengineAxisExample(country) {
  if (country.id === 'us') {
    return `# simulation comes from the setup step above
output = simulation.output_dataset.data

print(
    {
        "person": len(output.person),
        "tax_unit": len(output.tax_unit),
        "spm_unit": len(output.spm_unit),
        "household": len(output.household),
    }
)

print("person variables:", ["employment_income", "ssi", "medicare_cost"])
print("tax-unit variables:", ["income_tax", "state_income_tax", "eitc"])
print("household variables:", ["household_net_income", "household_tax"])`;
  }

  return `# simulation comes from the setup step above
output = simulation.output_dataset.data

print(
    {
        "person": len(output.person),
        "benunit": len(output.benunit),
        "household": len(output.household),
    }
)

print("person variables:", ["employment_income", "income_tax"])
print("benunit variables:", ["universal_credit", "child_benefit"])
print("household variables:", ["household_net_income", "household_tax"])`;
}

export function getPolicyengineHouseholdAxisExample(country) {
  if (country.id === 'us') {
    return `from policyengine.tax_benefit_models.us import (
    USHouseholdInput,
    calculate_household_impact,
)

household = USHouseholdInput(
    people=[
        {"age": 35, "employment_income": 40000, "is_tax_unit_head": True},
        {"age": 33, "is_tax_unit_spouse": True},
        {"age": 8, "is_tax_unit_dependent": True},
        {"age": 5, "is_tax_unit_dependent": True},
    ],
    tax_unit={"filing_status": "JOINT"},
    household={"state_code_str": "TX"},
    year=2026,
)

result = calculate_household_impact(household)

print("person axis:", len(result.person))
print("tax_unit axis:", len(result.tax_unit))
print("spm_unit axis:", len(result.spm_unit))
print("household axis:", 1)

print(result.person[0]["employment_income"])
print(result.tax_unit[0]["eitc"])
print(result.household["household_net_income"])`;
  }

  return `from policyengine.tax_benefit_models.uk import (
    UKHouseholdInput,
    calculate_household_impact,
)

household = UKHouseholdInput(
    people=[
        {"age": 35, "employment_income": 30000},
        {"age": 33},
        {"age": 8},
        {"age": 5},
    ],
    benunit={
        "would_claim_uc": True,
        "would_claim_child_benefit": True,
    },
    household={"region": "NORTH_WEST", "rent": 12000},
    year=2026,
)

result = calculate_household_impact(household)

print("person axis:", len(result.person))
print("benunit axis:", len(result.benunit))
print("household axis:", 1)

print(result.person[0]["employment_income"])
print(result.benunit[0]["universal_credit"])
print(result.household["household_net_income"])`;
}

export function getPolicyengineHouseholdVariationExample(country) {
  if (country.id === 'us') {
    return `import tempfile
from pathlib import Path

import pandas as pd
from microdf import MicroDataFrame

from policyengine.core import Simulation
from policyengine.tax_benefit_models.us import (
    PolicyEngineUSDataset,
    USYearData,
    us_latest,
)

employment_incomes = [0, 20_000, 40_000, 60_000, 80_000]
n = len(employment_incomes)

person_data = {
    "person_id": list(range(n * 3)),
    "household_id": [i for i in range(n) for _ in range(3)],
    "marital_unit_id": [i for i in range(n) for _ in range(3)],
    "family_id": [i for i in range(n) for _ in range(3)],
    "spm_unit_id": [i for i in range(n) for _ in range(3)],
    "tax_unit_id": [i for i in range(n) for _ in range(3)],
    "age": [35, 8, 5] * n,
    "employment_income": [
        value
        for income in employment_incomes
        for value in [income, 0, 0]
    ],
    "person_weight": [1.0] * (n * 3),
    "is_tax_unit_head": [True, False, False] * n,
    "is_tax_unit_dependent": [False, True, True] * n,
}
household_data = {
    "household_id": list(range(n)),
    "state_code_str": ["CA"] * n,
    "household_weight": [1.0] * n,
}
marital_unit_data = {
    "marital_unit_id": list(range(n)),
    "marital_unit_weight": [1.0] * n,
}
family_data = {
    "family_id": list(range(n)),
    "family_weight": [1.0] * n,
}
spm_unit_data = {
    "spm_unit_id": list(range(n)),
    "spm_unit_weight": [1.0] * n,
}
tax_unit_data = {
    "tax_unit_id": list(range(n)),
    "tax_unit_weight": [1.0] * n,
    "filing_status": ["SINGLE"] * n,
}

dataset = PolicyEngineUSDataset(
    name="variation-us",
    description="variation-us",
    filepath=str(Path(tempfile.mkdtemp()) / "variation_us.h5"),
    year=2026,
    data=USYearData(
        person=MicroDataFrame(pd.DataFrame(person_data), weights="person_weight"),
        household=MicroDataFrame(pd.DataFrame(household_data), weights="household_weight"),
        marital_unit=MicroDataFrame(pd.DataFrame(marital_unit_data), weights="marital_unit_weight"),
        family=MicroDataFrame(pd.DataFrame(family_data), weights="family_weight"),
        spm_unit=MicroDataFrame(pd.DataFrame(spm_unit_data), weights="spm_unit_weight"),
        tax_unit=MicroDataFrame(pd.DataFrame(tax_unit_data), weights="tax_unit_weight"),
    ),
)

simulation = Simulation(dataset=dataset, tax_benefit_model_version=us_latest)
simulation.run()
output = simulation.output_dataset.data

results = pd.DataFrame(
    {
        "employment_income": employment_incomes,
        "household_net_income": output.household["household_net_income"].tolist(),
        "eitc": output.tax_unit["eitc"].tolist(),
        "snap": output.spm_unit["snap"].tolist(),
    }
)
print(results.to_string(index=False))`;
  }

  return `import tempfile
from pathlib import Path

import pandas as pd
from microdf import MicroDataFrame

from policyengine.core import Simulation
from policyengine.tax_benefit_models.uk import (
    PolicyEngineUKDataset,
    UKYearData,
    uk_latest,
)

employment_incomes = [0, 10_000, 20_000, 30_000, 40_000]
n = len(employment_incomes)

person_data = {
    "person_id": list(range(n * 3)),
    "person_benunit_id": [i for i in range(n) for _ in range(3)],
    "person_household_id": [i for i in range(n) for _ in range(3)],
    "age": [35, 8, 5] * n,
    "employment_income": [
        value
        for income in employment_incomes
        for value in [income, 0, 0]
    ],
    "person_weight": [1.0] * (n * 3),
    "is_disabled_for_benefits": [False] * (n * 3),
    "uc_limited_capability_for_WRA": [False] * (n * 3),
}
benunit_data = {
    "benunit_id": list(range(n)),
    "benunit_weight": [1.0] * n,
    "would_claim_uc": [True] * n,
    "would_claim_child_benefit": [True] * n,
}
household_data = {
    "household_id": list(range(n)),
    "household_weight": [1.0] * n,
    "region": ["LONDON"] * n,
    "council_tax": [0.0] * n,
    "rent": [12_000.0] * n,
    "tenure_type": ["RENT_PRIVATELY"] * n,
}

dataset = PolicyEngineUKDataset(
    name="variation-uk",
    description="variation-uk",
    filepath=str(Path(tempfile.mkdtemp()) / "variation_uk.h5"),
    year=2026,
    data=UKYearData(
        person=MicroDataFrame(pd.DataFrame(person_data), weights="person_weight"),
        benunit=MicroDataFrame(pd.DataFrame(benunit_data), weights="benunit_weight"),
        household=MicroDataFrame(pd.DataFrame(household_data), weights="household_weight"),
    ),
)

simulation = Simulation(dataset=dataset, tax_benefit_model_version=uk_latest)
simulation.run()
output = simulation.output_dataset.data

results = pd.DataFrame(
    {
        "employment_income": employment_incomes,
        "hbai_household_net_income": output.household["hbai_household_net_income"].tolist(),
        "universal_credit": output.benunit["universal_credit"].tolist(),
        "child_benefit": output.benunit["child_benefit"].tolist(),
    }
)
print(results.to_string(index=False))`;
}

export function getPolicyengineWeightingExample(country) {
  if (country.id === 'us') {
    return `# simulation comes from the setup step above
eitc = simulation.output_dataset.data.tax_unit["eitc"]

# MicroSeries keeps survey weights attached.
print(type(eitc).__name__)
print(f"Weighted total EITC: \${eitc.sum() / 1e9:.1f}B")
print(f"Weighted mean EITC: \${eitc.mean():,.0f}")`;
  }

  return `# simulation comes from the setup step above
uc = simulation.output_dataset.data.benunit["universal_credit"]

# MicroSeries keeps survey weights attached.
print(type(uc).__name__)
print(f"Weighted total UC: \u00a3{uc.sum() / 1e9:.1f}bn")
print(f"Weighted mean UC: \u00a3{uc.mean():,.0f}")`;
}

export function getPolicyengineEnrollmentExample(country) {
  if (country.id === 'us') {
    return `import pandas as pd

# simulation comes from the setup step above
people = simulation.output_dataset.data.map_to_entity(
    source_entity="spm_unit",
    target_entity="person",
    columns=["snap"],
    how="project",
)

plain = pd.DataFrame(people[["snap"]])
plain["is_child"] = simulation.output_dataset.data.person["is_child"].to_numpy()
plain["person_weight"] = simulation.output_dataset.data.person["person_weight"].to_numpy()

snap_people = plain.loc[plain["snap"] > 0, "person_weight"].sum()
snap_children = plain.loc[
    (plain["snap"] > 0) & (plain["is_child"]),
    "person_weight",
].sum()

print(f"SNAP recipients: {snap_people:,.0f}")
print(f"Children in SNAP units: {snap_children:,.0f}")
print(plain.head())`;
  }

  return `import pandas as pd

# simulation comes from the setup step above
plain = pd.DataFrame(
    simulation.output_dataset.data.person[
        ["universal_credit", "is_child", "person_weight"]
    ]
)

uc_people = plain.loc[
    plain["universal_credit"] > 0,
    "person_weight",
].sum()
uc_children = plain.loc[
    (plain["universal_credit"] > 0) & (plain["is_child"]),
    "person_weight",
].sum()

print(f"People with UC entitlement: {uc_people:,.0f}")
print(f"Children with UC entitlement: {uc_children:,.0f}")
print(plain.head())`;
}

export function getPolicyengineTimeSeriesExample(country) {
  if (country.id === 'us') {
    return `import datetime

from policyengine.core import Parameter, ParameterValue, Policy, Simulation
from policyengine.outputs.aggregate import Aggregate, AggregateType
from policyengine.tax_benefit_models.us import ensure_datasets, us_latest

# Ten-year budget window (the scoring convention used by CBO and JCT).
years = list(range(2026, 2036))
datasets = ensure_datasets(
    datasets=["hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"],
    years=years,
    data_folder="./data",
)

parameter = Parameter(
    name="gov.irs.deductions.standard.amount.SINGLE",
    tax_benefit_model_version=us_latest,
)
reform = Policy(
    name="Double standard deduction (single)",
    parameter_values=[
        ParameterValue(
            parameter=parameter,
            start_date=datetime.date(year, 1, 1),
            end_date=datetime.date(year, 12, 31),
            value=30950,
        )
        for year in years
    ],
)

annual_changes = []
for year in years:
    dataset = datasets[f"enhanced_cps_2024_{year}"]
    baseline = Simulation(dataset=dataset, tax_benefit_model_version=us_latest)
    reformed = Simulation(
        dataset=dataset,
        tax_benefit_model_version=us_latest,
        policy=reform,
    )
    baseline.run()
    reformed.run()

    baseline_total = Aggregate(
        simulation=baseline,
        variable="household_net_income",
        aggregate_type=AggregateType.SUM,
        entity="household",
    )
    reform_total = Aggregate(
        simulation=reformed,
        variable="household_net_income",
        aggregate_type=AggregateType.SUM,
        entity="household",
    )
    baseline_total.run()
    reform_total.run()

    change = (reform_total.result - baseline_total.result) / 1e9
    annual_changes.append((year, change))
    print(f"{year}: \${change:,.1f}B")

budget_total = sum(change for _, change in annual_changes)
first_year_change = annual_changes[0][1]
last_year_change = annual_changes[-1][1]
cagr = (last_year_change / first_year_change) ** (1 / (len(years) - 1)) - 1
print(f"{len(years)}-year total: \${budget_total:,.1f}B")
print(f"CAGR: {cagr:.2%}")`;
  }

  return `import datetime

from policyengine.core import Parameter, ParameterValue, Policy, Simulation
from policyengine.outputs.aggregate import Aggregate, AggregateType
from policyengine.tax_benefit_models.uk import ensure_datasets, uk_latest

# OBR forecasts run on a five-year rolling horizon, and the packaged UK dataset
# is uprated through 2030, so the budget window matches that.
years = list(range(2026, 2031))
datasets = ensure_datasets(
    datasets=["hf://policyengine/policyengine-uk-data/enhanced_frs_2023_24.h5"],
    years=years,
    data_folder="./data",
)

parameter = Parameter(
    name="gov.hmrc.income_tax.allowances.personal_allowance.amount",
    tax_benefit_model_version=uk_latest,
)
reform = Policy(
    name="Increase personal allowance",
    parameter_values=[
        ParameterValue(
            parameter=parameter,
            start_date=datetime.date(year, 1, 1),
            end_date=datetime.date(year, 12, 31),
            value=15000,
        )
        for year in years
    ],
)

annual_changes = []
for year in years:
    dataset = datasets[f"enhanced_frs_2023_24_{year}"]
    baseline = Simulation(dataset=dataset, tax_benefit_model_version=uk_latest)
    reformed = Simulation(
        dataset=dataset,
        tax_benefit_model_version=uk_latest,
        policy=reform,
    )
    baseline.run()
    reformed.run()

    baseline_total = Aggregate(
        simulation=baseline,
        variable="household_net_income",
        aggregate_type=AggregateType.SUM,
        entity="household",
    )
    reform_total = Aggregate(
        simulation=reformed,
        variable="household_net_income",
        aggregate_type=AggregateType.SUM,
        entity="household",
    )
    baseline_total.run()
    reform_total.run()

    change = (reform_total.result - baseline_total.result) / 1e9
    annual_changes.append((year, change))
    print(f"{year}: \u00a3{change:,.1f}bn")

budget_total = sum(change for _, change in annual_changes)
first_year_change = annual_changes[0][1]
last_year_change = annual_changes[-1][1]
cagr = (last_year_change / first_year_change) ** (1 / (len(years) - 1)) - 1
print(f"{len(years)}-year total: \u00a3{budget_total:,.1f}bn")
print(f"CAGR: {cagr:.2%}")`;
}

export function getPolicyengineHouseholdReleaseBundleExample(country) {
  if (country.id === 'us') {
    return `import tempfile
from pathlib import Path

import pandas as pd
from microdf import MicroDataFrame

from policyengine.core import Simulation
from policyengine.tax_benefit_models.us import (
    PolicyEngineUSDataset,
    USYearData,
    us_latest,
)

person = MicroDataFrame(
    pd.DataFrame(
        {
            "person_id": [0],
            "household_id": [0],
            "marital_unit_id": [0],
            "family_id": [0],
            "spm_unit_id": [0],
            "tax_unit_id": [0],
            "age": [35],
            "employment_income": [50_000.0],
            "person_weight": [1.0],
            "is_tax_unit_head": [True],
        }
    ),
    weights="person_weight",
)
household = MicroDataFrame(
    pd.DataFrame(
        {
            "household_id": [0],
            "state_code_str": ["CA"],
            "household_weight": [1.0],
        }
    ),
    weights="household_weight",
)
marital_unit = MicroDataFrame(
    pd.DataFrame({"marital_unit_id": [0], "marital_unit_weight": [1.0]}),
    weights="marital_unit_weight",
)
family = MicroDataFrame(
    pd.DataFrame({"family_id": [0], "family_weight": [1.0]}),
    weights="family_weight",
)
spm_unit = MicroDataFrame(
    pd.DataFrame({"spm_unit_id": [0], "spm_unit_weight": [1.0]}),
    weights="spm_unit_weight",
)
tax_unit = MicroDataFrame(
    pd.DataFrame(
        {
            "tax_unit_id": [0],
            "tax_unit_weight": [1.0],
            "filing_status": ["SINGLE"],
        }
    ),
    weights="tax_unit_weight",
)

dataset = PolicyEngineUSDataset(
    name="household-repro",
    description="household-repro",
    filepath=str(Path(tempfile.mkdtemp()) / "household_repro.h5"),
    year=2026,
    data=USYearData(
        person=person,
        household=household,
        marital_unit=marital_unit,
        family=family,
        spm_unit=spm_unit,
        tax_unit=tax_unit,
    ),
)

simulation = Simulation(dataset=dataset, tax_benefit_model_version=us_latest)
simulation.run()

print(simulation.release_bundle["bundle_id"])
print(simulation.release_bundle["model_version"])
print(round(float(simulation.output_dataset.data.household["household_net_income"].iloc[0]), 2))`;
  }

  return `import tempfile
from pathlib import Path

import pandas as pd
from microdf import MicroDataFrame

from policyengine.core import Simulation
from policyengine.tax_benefit_models.uk import (
    PolicyEngineUKDataset,
    UKYearData,
    uk_latest,
)

person = MicroDataFrame(
    pd.DataFrame(
        {
            "person_id": [0],
            "person_benunit_id": [0],
            "person_household_id": [0],
            "age": [35],
            "employment_income": [30_000.0],
            "person_weight": [1.0],
            "is_disabled_for_benefits": [False],
            "uc_limited_capability_for_WRA": [False],
        }
    ),
    weights="person_weight",
)
benunit = MicroDataFrame(
    pd.DataFrame(
        {
            "benunit_id": [0],
            "benunit_weight": [1.0],
            "would_claim_uc": [True],
        }
    ),
    weights="benunit_weight",
)
household = MicroDataFrame(
    pd.DataFrame(
        {
            "household_id": [0],
            "household_weight": [1.0],
            "region": ["LONDON"],
            "council_tax": [0.0],
            "rent": [12_000.0],
            "tenure_type": ["RENT_PRIVATELY"],
        }
    ),
    weights="household_weight",
)

dataset = PolicyEngineUKDataset(
    name="household-repro",
    description="household-repro",
    filepath=str(Path(tempfile.mkdtemp()) / "household_repro.h5"),
    year=2026,
    data=UKYearData(
        person=person,
        benunit=benunit,
        household=household,
    ),
)

simulation = Simulation(dataset=dataset, tax_benefit_model_version=uk_latest)
simulation.run()

print(simulation.release_bundle["bundle_id"])
print(simulation.release_bundle["model_version"])
print(round(float(simulation.output_dataset.data.household["hbai_household_net_income"].iloc[0]), 2))`;
}

export function getPolicyengineMicrosimAlignmentExample(country) {
  if (country.id === 'us') {
    return `# Old mental model:
#   from policyengine_us import Microsimulation
#   sim = Microsimulation(dataset=...)
#
# New policyengine.py mental model:
#   datasets = ensure_datasets(...)
#   simulation = Simulation(dataset=dataset, tax_benefit_model_version=us_latest)

dataset = datasets[f"enhanced_cps_2024_{year}"]
simulation = Simulation(
    dataset=dataset,
    tax_benefit_model_version=us_latest,
)
simulation.run()

print(simulation.release_bundle["bundle_id"])
print(type(simulation.output_dataset.data.household).__name__)`;
  }

  return `# Old mental model:
#   from policyengine_uk import Microsimulation
#   sim = Microsimulation(dataset=...)
#
# New policyengine.py mental model:
#   datasets = ensure_datasets(...)
#   simulation = Simulation(dataset=dataset, tax_benefit_model_version=uk_latest)

dataset = datasets[f"enhanced_frs_2023_24_{year}"]
simulation = Simulation(
    dataset=dataset,
    tax_benefit_model_version=uk_latest,
)
simulation.run()

print(simulation.release_bundle["bundle_id"])
print(type(simulation.output_dataset.data.household).__name__)`;
}

export function getPolicyengineEconomicImpactExample(country) {
  if (country.id === 'us') {
    return `import datetime

from policyengine.core import Parameter, ParameterValue, Policy, Simulation
from policyengine.tax_benefit_models.us import (
    economic_impact_analysis,
    ensure_datasets,
    us_latest,
)

year = 2026
datasets = ensure_datasets(
    datasets=["hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"],
    years=[year],
    data_folder="./data",
)
dataset = datasets[f"enhanced_cps_2024_{year}"]

parameter = Parameter(
    name="gov.irs.deductions.standard.amount.SINGLE",
    tax_benefit_model_version=us_latest,
)
reform = Policy(
    name="Double standard deduction (single)",
    parameter_values=[
        ParameterValue(
            parameter=parameter,
            start_date=datetime.date(year, 1, 1),
            end_date=datetime.date(year, 12, 31),
            value=30950,
        ),
    ],
)

baseline_sim = Simulation(dataset=dataset, tax_benefit_model_version=us_latest)
reform_sim = Simulation(
    dataset=dataset,
    tax_benefit_model_version=us_latest,
    policy=reform,
)

analysis = economic_impact_analysis(baseline_sim, reform_sim)

deciles = analysis.decile_impacts.dataframe[
    ["decile", "baseline_mean", "reform_mean", "absolute_change"]
]
programs = analysis.program_statistics.dataframe[
    ["program_name", "change", "winners", "losers"]
]
print(deciles.head().to_string(index=False))
print(programs.head().to_string(index=False))
print(
    f"baseline Gini: {analysis.baseline_inequality.gini:.4f}, "
    f"reform Gini: {analysis.reform_inequality.gini:.4f}"
)`;
  }

  return `import datetime

from policyengine.core import Parameter, ParameterValue, Policy, Simulation
from policyengine.tax_benefit_models.uk import (
    economic_impact_analysis,
    ensure_datasets,
    uk_latest,
)

year = 2026
datasets = ensure_datasets(
    datasets=["hf://policyengine/policyengine-uk-data/enhanced_frs_2023_24.h5"],
    years=[year],
    data_folder="./data",
)
dataset = datasets[f"enhanced_frs_2023_24_{year}"]

parameter = Parameter(
    name="gov.hmrc.income_tax.allowances.personal_allowance.amount",
    tax_benefit_model_version=uk_latest,
)
reform = Policy(
    name="Increase personal allowance",
    parameter_values=[
        ParameterValue(
            parameter=parameter,
            start_date=datetime.date(year, 1, 1),
            end_date=datetime.date(year, 12, 31),
            value=15000,
        ),
    ],
)

baseline_sim = Simulation(dataset=dataset, tax_benefit_model_version=uk_latest)
reform_sim = Simulation(
    dataset=dataset,
    tax_benefit_model_version=uk_latest,
    policy=reform,
)

analysis = economic_impact_analysis(baseline_sim, reform_sim)

deciles = analysis.decile_impacts.dataframe[
    ["decile", "baseline_mean", "reform_mean", "absolute_change"]
]
programmes = analysis.programme_statistics.dataframe[
    ["programme_name", "change", "winners", "losers"]
]
print(deciles.head().to_string(index=False))
print(programmes.head().to_string(index=False))
print(
    f"baseline Gini: {analysis.baseline_inequality.gini:.4f}, "
    f"reform Gini: {analysis.reform_inequality.gini:.4f}"
)`;
}

export function getPolicyengineProgramExample(country) {
  if (country.id === 'us') {
    return `# analysis comes from the full reform analysis step above
programs = analysis.program_statistics.dataframe[
    ["program_name", "change", "winners", "losers"]
]

print(programs.head())`;
  }

  return `# analysis comes from the full reform analysis step above
programmes = analysis.programme_statistics.dataframe[
    ["programme_name", "change", "winners", "losers"]
]

print(programmes.head())`;
}

export function getPolicyengineRegionalExample(country) {
  if (country.id === 'us') {
    return `from policyengine.core import Simulation
from policyengine.core.scoping_strategy import RowFilterStrategy
from policyengine.outputs.aggregate import Aggregate, AggregateType
from policyengine.tax_benefit_models.us import ensure_datasets, us_latest

year = 2026
datasets = ensure_datasets(
    datasets=["hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"],
    years=[year],
    data_folder="./data",
)
dataset = datasets[f"enhanced_cps_2024_{year}"]

california_sim = Simulation(
    dataset=dataset,
    tax_benefit_model_version=us_latest,
    scoping_strategy=RowFilterStrategy(
        variable_name="state_fips",
        variable_value=6,
    ),
)
california_sim.run()

eitc_total = Aggregate(
    simulation=california_sim,
    variable="eitc",
    aggregate_type=AggregateType.SUM,
    entity="tax_unit",
)
eitc_total.run()
print(f"California EITC: \${eitc_total.result / 1e9:.1f}B")`;
  }

  return `from policyengine.core import Simulation
from policyengine.core.scoping_strategy import RowFilterStrategy
from policyengine.outputs.aggregate import Aggregate, AggregateType
from policyengine.tax_benefit_models.uk import ensure_datasets, uk_latest

year = 2026
datasets = ensure_datasets(
    datasets=["hf://policyengine/policyengine-uk-data/enhanced_frs_2023_24.h5"],
    years=[year],
    data_folder="./data",
)
dataset = datasets[f"enhanced_frs_2023_24_{year}"]

london_sim = Simulation(
    dataset=dataset,
    tax_benefit_model_version=uk_latest,
    scoping_strategy=RowFilterStrategy(
        variable_name="region",
        variable_value="LONDON",
    ),
)
london_sim.run()

uc_total = Aggregate(
    simulation=london_sim,
    variable="universal_credit",
    aggregate_type=AggregateType.SUM,
    entity="benunit",
)
uc_total.run()
print(f"London universal credit: \u00a3{uc_total.result / 1e9:.1f}bn")`;
}

export function getPolicyengineReleaseBundleExample() {
  return `# After running a simulation, inspect the certified runtime bundle
print(simulation.release_bundle)`;
}

export function getPolicyengineTraceExample(country) {
  if (country.id === 'us') {
    return `# The policyengine.py wrapper does not expose the computation-log tracer.
# When you need step-by-step variable provenance (for debugging or teaching),
# drop to the country model package directly. The household inputs are the
# same shape you already pass into calculate_household_impact().
from policyengine_us import Simulation

situation = {
    "people": {
        "parent_1": {"age": {"2026": 35}, "employment_income": {"2026": 50000}},
    },
    "families": {"family": {"members": ["parent_1"]}},
    "marital_units": {"mu": {"members": ["parent_1"]}},
    "tax_units": {"tu": {"members": ["parent_1"]}},
    "spm_units": {"spm": {"members": ["parent_1"]}},
    "households": {
        "home": {"members": ["parent_1"], "state_code": {"2026": "CA"}},
    },
}

sim = Simulation(situation=situation)
sim.trace = True
sim.calculate("eitc", 2026)
sim.tracer.print_computation_log(max_depth=3)`;
  }

  return `# The policyengine.py wrapper does not expose the computation-log tracer.
# For debugging or teaching a dependency tree, drop to the country package.
from policyengine_uk import Simulation

situation = {
    "people": {
        "adult": {"age": {"2026": 35}, "employment_income": {"2026": 30000}},
    },
    "benunits": {"bu": {"members": ["adult"]}},
    "households": {
        "home": {"members": ["adult"], "region": {"2026": "LONDON"}},
    },
}

sim = Simulation(situation=situation)
sim.trace = True
sim.calculate("universal_credit", 2026)
sim.tracer.print_computation_log(max_depth=3)`;
}

export function getPolicyengineProgrammaticSituationExample(country) {
  if (country.id === 'us') {
    return `from policyengine.tax_benefit_models.us import (
    USHouseholdInput,
    calculate_household_impact,
)

def family_with_children(num_children: int, state: str = "CA", year: int = 2026):
    people = [
        {"age": 35, "employment_income": 50000, "is_tax_unit_head": True},
        {"age": 33, "employment_income": 25000, "is_tax_unit_spouse": True},
    ]
    for i in range(num_children):
        people.append({"age": max(1, 10 - i)})
    return USHouseholdInput(
        people=people,
        tax_unit={"filing_status": "JOINT"},
        household={"state_code_str": state},
        year=year,
    )

for n in (0, 2, 4):
    result = calculate_household_impact(family_with_children(n))
    ctc = result.tax_unit[0]["ctc"]
    print(f"{n} children: CTC = \${ctc:,.0f}")`;
  }

  return `from policyengine.tax_benefit_models.uk import (
    UKHouseholdInput,
    calculate_household_impact,
)

def family_with_children(num_children: int, region: str = "LONDON", year: int = 2026):
    people = [
        {"age": 35, "employment_income": 30000},
        {"age": 33, "employment_income": 18000},
    ]
    for i in range(num_children):
        people.append({"age": max(1, 10 - i)})
    return UKHouseholdInput(
        people=people,
        household={"region": region},
        year=year,
    )

for n in (0, 2, 4):
    result = calculate_household_impact(family_with_children(n))
    cb = result.benunit[0]["child_benefit"]
    print(f"{n} children: child benefit = \u00a3{cb:,.0f}")`;
}

export function getPolicyengineMapToAggregationExample(country) {
  if (country.id === 'us') {
    return `# map_to_entity has two directions:
#   1. Source entity is BELOW the target -> rows are summed up into the target.
#   2. Source entity is ABOVE the target -> values are projected (broadcast) down.
# (Same-level mapping is not supported today; read the column directly instead.)
data = simulation.output_dataset.data

# Rule 1 (sum up): SPM-unit SNAP -> household totals
household_snap = data.map_to_entity(
    source_entity="spm_unit",
    target_entity="household",
    columns=["snap"],
    how="sum",
)

# Rule 2 (project down): a household column repeats for each person in the household
person_decile = data.map_to_entity(
    source_entity="household",
    target_entity="person",
    columns=["household_income_decile"],
    how="project",
)

# Same-level: just read the column off the entity table directly.
household_net_income = data.household["household_net_income"]

print(household_snap[["snap"]].head())
print(person_decile[["household_income_decile"]].head())
print(household_net_income.head())`;
  }

  return `# map_to_entity has two directions:
#   1. Source entity is BELOW the target -> rows are summed up into the target.
#   2. Source entity is ABOVE the target -> values are projected (broadcast) down.
# (Same-level mapping is not supported today; read the column directly instead.)
data = simulation.output_dataset.data

# Rule 1 (sum up): benunit UC -> household totals
household_uc = data.map_to_entity(
    source_entity="benunit",
    target_entity="household",
    columns=["universal_credit"],
    how="sum",
)

# Rule 2 (project down): a household column repeats for each person in the household
person_decile = data.map_to_entity(
    source_entity="household",
    target_entity="person",
    columns=["household_income_decile"],
    how="project",
)

# Same-level: just read the column off the entity table directly.
household_net_income = data.household["household_net_income"]

print(household_uc[["universal_credit"]].head())
print(person_decile[["household_income_decile"]].head())
print(household_net_income.head())`;
}

export function getPolicyengineStructuralReformExample(country) {
  if (country.id === 'us') {
    return `# policyengine.py's Policy handles parameter-level reforms. When a reform needs
# to change how a variable is CALCULATED (not just its inputs), drop to the
# country package's structural reform API, then pass the resulting Reform class
# into a country-package Simulation. This path lives outside the policyengine.py
# reproducibility boundary, so pin policyengine-us explicitly and record it.
from policyengine_core.reforms import Reform
from policyengine_us import Simulation
from policyengine_us.model_api import *

situation = {
    "people": {
        "parent_1": {"age": {"2026": 35}, "employment_income": {"2026": 75000}, "is_tax_unit_head": {"2026": True}},
        "parent_2": {"age": {"2026": 33}, "employment_income": {"2026": 45000}, "is_tax_unit_spouse": {"2026": True}},
        "child_1": {"age": {"2026": 10}, "is_tax_unit_dependent": {"2026": True}},
        "child_2": {"age": {"2026": 7}, "is_tax_unit_dependent": {"2026": True}},
    },
    "families": {"family": {"members": ["parent_1", "parent_2", "child_1", "child_2"]}},
    "marital_units": {
        "mu_parents": {"members": ["parent_1", "parent_2"]},
        "mu_c1": {"members": ["child_1"], "marital_unit_id": {"2026": 1}},
        "mu_c2": {"members": ["child_2"], "marital_unit_id": {"2026": 2}},
    },
    "tax_units": {"tu": {"members": ["parent_1", "parent_2", "child_1", "child_2"]}},
    "spm_units": {"spm": {"members": ["parent_1", "parent_2", "child_1", "child_2"]}},
    "households": {
        "home": {"members": ["parent_1", "parent_2", "child_1", "child_2"], "state_code": {"2026": "CA"}}
    },
}

class ctc_value(Variable):
    value_type = float
    entity = TaxUnit
    label = "CTC value (+$1,000 bonus)"
    unit = USD
    definition_period = YEAR

    def formula(tax_unit, period, parameters):
        base = tax_unit("ctc", period)
        return base + 1_000

class bonus_ctc(Reform):
    def apply(self):
        self.update_variable(ctc_value)

sim = Simulation(situation=situation, reform=bonus_ctc)
print(sim.calculate("ctc_value", 2026))`;
  }

  return `# Policy handles parameter-level reforms. For structural reforms that override
# how a variable is calculated, drop to the country package directly. The current
# policyengine-uk Simulation wraps reforms in a way that requires Reform subclasses
# to override __init__ and apply; the override pattern below is the supported path.
# Record the policyengine-uk version you used - structural reforms live outside
# the policyengine.py reproducibility boundary.
from policyengine_core.reforms import Reform
from policyengine_uk import Simulation
from policyengine_uk.model_api import *

situation = {
    "people": {
        "adult": {"age": {"2026": 35}, "employment_income": {"2026": 30000}},
        "partner": {"age": {"2026": 33}},
        "child_1": {"age": {"2026": 8}},
        "child_2": {"age": {"2026": 5}},
    },
    "benunits": {"bu": {"members": ["adult", "partner", "child_1", "child_2"]}},
    "households": {
        "home": {"members": ["adult", "partner", "child_1", "child_2"], "region": {"2026": "LONDON"}}
    },
}

class child_benefit(Variable):
    value_type = float
    entity = BenUnit
    label = "Child benefit (+10% bonus)"
    unit = GBP
    definition_period = YEAR

    def formula(benunit, period, parameters):
        base = parameters(period).gov.hmrc.child_benefit.amount
        children = benunit("num_children", period)
        return base.eldest * children * 52 * 1.10

class bonus_cb(Reform):
    def __init__(self):
        # Override: UK simulation calls Reform() with no args.
        pass

    def apply(self, tax_benefit_system=None):
        target = tax_benefit_system if tax_benefit_system is not None else self
        target.update_variable(child_benefit)

sim = Simulation(situation=situation, reform=bonus_cb)
print(sim.calculate("child_benefit", 2026))`;
}

export function getPolicyengineVisualizationExample(country) {
  if (country.id === 'us') {
    return `import plotly.graph_objects as go

# earnings_grid comes from the variation step above: it is a plain pandas
# DataFrame with one row per employment-income scenario.
fig = go.Figure()
fig.add_trace(
    go.Scatter(
        x=earnings_grid["employment_income"],
        y=earnings_grid["household_net_income"],
        mode="lines",
        name="Household net income",
        line=dict(color="#2C6496", width=3),
    )
)
fig.add_trace(
    go.Scatter(
        x=earnings_grid["employment_income"],
        y=earnings_grid["eitc"],
        mode="lines",
        name="EITC",
        line=dict(color="#39C6C0", width=3),
    )
)
fig.update_layout(
    title="Net income and EITC by employment income",
    xaxis_title="Employment income",
    yaxis_title="Amount",
    xaxis=dict(tickformat="$,.0f"),
    yaxis=dict(tickformat="$,.0f"),
    template="plotly_white",
    hovermode="x unified",
)
fig.show()`;
  }

  return `import plotly.graph_objects as go

# earnings_grid comes from the variation step above.
fig = go.Figure()
fig.add_trace(
    go.Scatter(
        x=earnings_grid["employment_income"],
        y=earnings_grid["hbai_household_net_income"],
        mode="lines",
        name="Household net income",
        line=dict(color="#2C6496", width=3),
    )
)
fig.add_trace(
    go.Scatter(
        x=earnings_grid["employment_income"],
        y=earnings_grid["universal_credit"],
        mode="lines",
        name="Universal credit",
        line=dict(color="#39C6C0", width=3),
    )
)
fig.update_layout(
    title="Net income and UC by employment income",
    xaxis_title="Employment income",
    yaxis_title="Amount",
    xaxis=dict(tickformat="\u00a3,.0f"),
    yaxis=dict(tickformat="\u00a3,.0f"),
    template="plotly_white",
    hovermode="x unified",
)
fig.show()`;
}

export function getPolicyenginePinBundleExample(country) {
  const pkg = country.id === 'us' ? 'policyengine[us]' : 'policyengine[uk]';
  const country_id = country.id;
  return `# Step 1: pin the exact policyengine.py release in your environment.
# pip install "${pkg}==3.4.4"

# Step 2: capture the certified runtime bundle next to every output you save.
import json
from pathlib import Path

# simulation is any policyengine.py Simulation that has already been run.
bundle = simulation.release_bundle

Path("outputs").mkdir(exist_ok=True)
Path("outputs/release_bundle.json").write_text(json.dumps(bundle, indent=2))

print("bundle_id:", bundle["bundle_id"])
print("country:", "${country_id}")
print("model:", bundle["model_package"], bundle["model_version"])
print("data:", bundle["data_package"], bundle["data_version"])
print("dataset:", bundle["dataset_filepath"])`;
}

export function getPolicyengineManifestExample(country) {
  const dataPkg =
    country.id === 'us' ? 'policyengine-us-data' : 'policyengine-uk-data';
  const countryId = country.id;
  return `# policyengine.py exposes two manifest layers.
#
# 1. Data build manifest (owned by ${dataPkg}):
#      records which raw inputs, calibration targets, and country-model version
#      produced the artifact bytes. This is the provenance record for the data.
#
# 2. Certified runtime bundle (owned by policyengine.py):
#      records which model version and which staged data artifact are supported
#      together at runtime. This is the user-facing reproducibility boundary.
#
# policyengine.py ships a bundled country manifest for each supported release.
# get_release_manifest() returns the certified runtime bundle; the data build
# manifest is fetched separately (from HuggingFace) via get_data_release_manifest.
from policyengine.core.release_manifest import (
    get_release_manifest,
    get_data_release_manifest,
    DataReleaseManifestUnavailable,
)

country_manifest = get_release_manifest("${countryId}")
print("runtime bundle:", country_manifest.bundle_id)
print("certified dataset:", country_manifest.certified_data_artifact.dataset)
print("certified model version:", country_manifest.certification.certified_for_model_version)
print("data build_id:", country_manifest.certified_data_artifact.build_id)
print("compatibility basis:", country_manifest.certification.compatibility_basis)

# The data build manifest lives in the country *-data repo. The fetch can fail
# offline or when the manifest has not yet been published for a build.
try:
    data_manifest = get_data_release_manifest("${countryId}")
    print("data manifest build_id:", data_manifest.build.build_id)
    print("built with model:", data_manifest.build.built_with_model_package.version)
except DataReleaseManifestUnavailable as error:
    print("data manifest unavailable:", error)`;
}

export function getPolicyengineTraceExportExample(country) {
  const cid = country.id;
  return `# TRACE is a standards-based JSON-LD export layer on top of the internal
# manifests. Use it when you need to cite a run in a paper, submit to an audit,
# or share provenance across tools that do not read PolicyEngine manifests
# directly. A full TRO requires BOTH the country runtime bundle and the data
# build manifest; when the data manifest has not been published for a release,
# fall back to emitting the runtime bundle alone so at least the runtime side
# is provenance-tracked.
from pathlib import Path
import json

from policyengine.core.release_manifest import (
    DataReleaseManifestUnavailable,
    get_data_release_manifest,
    get_release_manifest,
)
from policyengine.core.trace_tro import (
    build_trace_tro_from_release_bundle,
    compute_trace_composition_fingerprint,
)

country_manifest = get_release_manifest("${cid}")

Path("outputs").mkdir(exist_ok=True)

try:
    data_manifest = get_data_release_manifest("${cid}")
except DataReleaseManifestUnavailable as error:
    print("data manifest unavailable:", error)
    Path("outputs/release_bundle.json").write_text(
        json.dumps(country_manifest.model_dump(mode="json"), indent=2)
    )
    print("wrote runtime-only bundle to outputs/release_bundle.json")
else:
    tro = build_trace_tro_from_release_bundle(
        country_manifest=country_manifest,
        data_release_manifest=data_manifest,
    )
    fingerprint = compute_trace_composition_fingerprint(
        artifact_hashes=[
            artifact.sha256
            for artifact in data_manifest.artifacts.values()
            if artifact.sha256
        ],
    )
    Path("outputs/trace.tro.jsonld").write_text(json.dumps(tro, indent=2))
    print("TROV version:", tro["@context"][0]["trov"])
    print("composition fingerprint:", fingerprint[:16], "...")

print("country:", "${cid}")`;
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

function formatUSQuickstartHousehold() {
  return `{
    # People: each person is a named key with input variables keyed by period
    "people": {
        "you": {
            "age": {"2025": 30},
            "employment_income": {"2025": 50000}
        }
    },

    # Household: physical household — holds state, housing costs, etc.
    "households": {
        "your household": {
            "members": ["you"],
            "state_code": {"2025": "CA"}
        }
    },

    # Family: family unit used for benefit eligibility
    "families": {
        "your family": {"members": ["you"]}
    },

    # Tax unit: filing unit that determines tax liability
    "tax_units": {
        "your tax unit": {"members": ["you"]}
    },

    # Marital unit: married couple pair
    "marital_units": {
        "your marital unit": {"members": ["you"]}
    },

    # SPM unit: Supplemental Poverty Measure unit
    "spm_units": {
        "your spm unit": {"members": ["you"]}
    }
}`;
}

function formatUKQuickstartHousehold() {
  return `{
    # People: each person is a named key with input variables keyed by period
    "people": {
        "person": {
            "age": {"2025": 30},
            "employment_income": {"2025": 30000}
        }
    },

    # Benefit unit: used for means-tested benefits
    "benunits": {
        "benunit": {"members": ["person"]}
    },

    # Household: physical household for housing costs and household-level outputs
    "households": {
        "household": {"members": ["person"]}
    }
}`;
}

export function getPythonQuickstartExample(country) {
  const householdStr = country.id === 'us'
    ? formatUSQuickstartHousehold()
    : formatUKQuickstartHousehold();

  return `# Import the Simulation class from the country package
# Note: install name (${country.pythonPackage}) and import path (${country.pythonImport}) are different
from ${country.pythonImport} import Simulation

# Create a household situation dictionary
# This is the core data structure — it defines people and assigns them to entity groups
household = ${householdStr}

# Create a simulation object with our household situation
sim = Simulation(situation=household)

# Calculate key variables for a given period
# calculate() returns a NumPy array — use [0] to get the scalar for a single-entity result
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

# IMPORTANT: calculate() returns a NumPy array, not a scalar
# The array length depends on the entity level of the variable:
#   - Person-level variables: one value per person
#   - Tax-unit / benefit-unit variables: one value per unit
#   - Household-level variables: one value per household

# Person-level variable — array length = number of people
person_level = sim.calculate("${country.variableExamples[0]}", 2025)
print("Person-level array:", person_level)
print("Person-level shape:", person_level.shape)
print("Length:", len(person_level), "(one value per person)")

# Higher-level variable — array length = number of that entity
result_level = sim.calculate("${resultsVariable}", 2025)
print("Result-level array:", result_level)
print("Result-level shape:", result_level.shape)

# .sum() works correctly regardless of entity level
print("Person total:", person_level.sum())
print("Result total:", result_level.sum())`;
}

export function getPythonTraceExample(country) {
  const traceVariable = country.id === 'us' ? 'ctc_value' : country.fullExampleVariable;

  return `from ${country.pythonImport} import Simulation

household = ${formatPythonObject(country.fullHousehold)}

# Initialize a new simulation for tracing
sim = Simulation(situation=household)

# Enable trace before calculating — this records the dependency tree
sim.trace = True
sim.calculate("${traceVariable}", 2025)

# Print the computation log
# Indentation = dependency depth (more indented = deeper in calculation tree)
# Variable names show period and year, e.g. ctc_value<2025, (default)>
# Values are arrays — array length indicates the entity level
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

# calculate_dataframe() returns a pandas DataFrame with multiple variables at once
# Without map_to, it uses the "longest" entity needed (e.g. person if any person variable is included)
# Use map_to to control the row structure:
#   map_to="person"    — one row per person, higher-level values repeated
#   map_to="household" — one row per household, person values summed
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

# Parametric reform: modify existing parameter values
# Use Reform.from_dict() with parameter paths and date ranges
# Parameter paths match the tree at policyengine.org/us/model/rules/parameters
ctc_reform = Reform.from_dict(
    {
        # Increase CTC base amount from $2,000 to $3,000
        "gov.irs.credits.ctc.amount.base[0].amount": {
            "2025-01-01.2100-12-31": 3000
        },
        # Make CTC fully refundable
        "gov.irs.credits.ctc.refundable.fully_refundable": {
            "2025-01-01.2100-12-31": True
        },
    },
    country_id="us",
)

# Compare baseline and reformed simulations
baseline = Simulation(situation=household)
reformed = Simulation(situation=household, reform=ctc_reform)

print("Baseline CTC:", baseline.calculate("ctc_value", 2025).sum())
print("Reformed CTC:", reformed.calculate("ctc_value", 2025).sum())`;
}

export function getUSPythonStructuralReformExample() {
  return `from policyengine_core.reforms import Reform
from policyengine_us.model_api import *

# Structural reform: replace how a variable is calculated
# Define a new Variable class with the same name as the variable you want to override
class ctc_value(Variable):
    value_type = float
    entity = TaxUnit
    label = "CTC value"
    unit = USD
    definition_period = YEAR

    # The formula method replaces the original calculation logic
    def formula(tax_unit, period, parameters):
        ctc = tax_unit("ctc", period)
        phase_out = tax_unit("ctc_phase_out", period)
        return max_(0, ctc - phase_out)

# Wrap the variable in a Reform class and use update_variable()
class reform(Reform):
    def apply(self):
        self.update_variable(ctc_value)

# Apply with:
# Simulation(situation=household, reform=reform())`;
}

export function getGenericPythonReformPattern(country) {
  return `from ${country.pythonImport} import Simulation

household = ${formatPythonObject(country.fullHousehold)}

# Parametric reform: pass a dict of parameter path → {date_range: value}
# Parameter paths match the tree at policyengine.org/${country.id}/model/rules/parameters
my_reform = {
    "your.parameter.path": {
        "2025-01-01.2100-12-31": "NEW_VALUE"
    }
}

baseline = Simulation(situation=household)
reformed = Simulation(situation=household, reform=my_reform)

print("Baseline:", baseline.calculate("${country.fullExampleVariable}", 2025).sum())
print("Reformed:", reformed.calculate("${country.fullExampleVariable}", 2025).sum())`;
}

export function getUSMicrosimulationOverviewExample() {
  return `from policyengine_us import Microsimulation

# Microsimulation uses a weighted dataset of real households, not a single situation
# The Enhanced CPS is PolicyEngine's primary US microdata source
ENHANCED_CPS = "hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"

baseline = Microsimulation(dataset=ENHANCED_CPS)

# calculate() on a Microsimulation works the same way as Simulation
# but returns arrays representing the full population sample
ctc = baseline.calculate("ctc_value", period=2025)
weights = baseline.calculate("household_weight", period=2025)

print("Records:", len(weights))
# .sum() on microsimulation results is automatically weighted
print("Weighted CTC total:", ctc.sum())`;
}

export function getUSMicrosimulationWeightingExample() {
  return `from policyengine_us import Microsimulation
import pandas as pd

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

# KEY DISTINCTION: calculate().sum() is automatically weighted
auto_total = baseline.calculate("ctc_value", period=2025).sum()

# calculate_dataframe() is NOT automatically weighted
# You must multiply by household_weight (or person_weight) yourself
df = pd.DataFrame(baseline.calculate_dataframe(CORE_VARIABLES, map_to="household", period=2025))
unweighted_total = df["ctc_value"].sum()
manual_total = (df["ctc_value"] * df["household_weight"]).sum()

# auto_total and manual_total should match; unweighted_total will not
print("calculate() total:", auto_total)
print("DataFrame total (unweighted — wrong):", unweighted_total)
print("DataFrame total (manually weighted — correct):", manual_total)`;
}

export function getUSMicrosimulationReformExample() {
  return `from policyengine_us import Microsimulation
from policyengine_core.reforms import Reform

ENHANCED_CPS = "hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"

# Same Reform.from_dict() pattern as household simulation
ctc_expansion = Reform.from_dict(
    {
        "gov.irs.credits.ctc.amount.base[0].amount": {
            "2025-01-01.2100-12-31": 3600
        }
    },
    country_id="us",
)

# Compare baseline and reform at aggregate scale
# The output is now a weighted national impact, not a single household
baseline = Microsimulation(dataset=ENHANCED_CPS)
reformed = Microsimulation(dataset=ENHANCED_CPS, reform=ctc_expansion)

baseline_total = baseline.calculate("ctc_value", period=2025).sum()
reformed_total = reformed.calculate("ctc_value", period=2025).sum()

print("Annual increase:", reformed_total - baseline_total)`;
}

export function getUSMicrosimulationGeographyExample() {
  return `from policyengine_us import Microsimulation
import pandas as pd

ENHANCED_CPS = "hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"
CORE_VARIABLES = ["state_code", "household_weight", "ctc_value"]

baseline = Microsimulation(dataset=ENHANCED_CPS)
df = pd.DataFrame(baseline.calculate_dataframe(CORE_VARIABLES, map_to="household", period=2025))

# State-level analysis: group weighted DataFrames by geography
# Remember to weight manually since this is a DataFrame
state_totals = (
    df.assign(weighted_ctc=df["ctc_value"] * df["household_weight"])
      .groupby("state_code", as_index=False)["weighted_ctc"]
      .sum()
      .sort_values("weighted_ctc", ascending=False)
)

print(state_totals.head(10))

# Multi-year budget window: loop over years
# calculate().sum() handles weighting automatically
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
import pandas as pd

ENHANCED_CPS = "hf://policyengine/policyengine-us-data/enhanced_cps_2024.h5"

# For enrollment-style analysis, use person-level data
# map_to="person" gives one row per person in the dataset
PERSON_VARIABLES = ["person_weight", "snap", "is_child"]

baseline = Microsimulation(dataset=ENHANCED_CPS)
people = pd.DataFrame(baseline.calculate_dataframe(PERSON_VARIABLES, map_to="person", period=2025))

# Weight with person_weight when the question is about people, not households
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
