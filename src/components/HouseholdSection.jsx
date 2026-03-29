'use client';

import CodeBlock from './CodeBlock';
import { getAccessModeOption } from './accessModes';

const step1 = `{
  "people": {},
  "households": {},
  "families": {},
  "tax_units": {},
  "marital_units": {},
  "spm_units": {}
}`;

const step2 = `{
  "people": {
    "adult1": {},
    "adult2": {},
    "child1": {},
    "child2": {}
  },
  "households": {
    "my household": {
      "members": ["adult1", "adult2", "child1", "child2"]
    }
  },
  "families": {
    "my family": {
      "members": ["adult1", "adult2", "child1", "child2"]
    }
  },
  "tax_units": {
    "my tax unit": {
      "members": ["adult1", "adult2", "child1", "child2"]
    }
  },
  "marital_units": {
    "my marital unit": {
      "members": ["adult1", "adult2"]
    }
  },
  "spm_units": {
    "my spm unit": {
      "members": ["adult1", "adult2", "child1", "child2"]
    }
  }
}`;

const step3 = `{
  "people": {
    "adult1": {
      "age": {"2025": 40},
      "employment_income": {"2025": 30000}
    },
    "adult2": {
      "age": {"2025": 38},
      "employment_income": {"2025": 20000}
    },
    "child1": {
      "age": {"2025": 10}
    },
    "child2": {
      "age": {"2025": 7}
    }
  },
  "households": {
    "my household": {
      "members": ["adult1", "adult2", "child1", "child2"],
      "state_name": {"2025": "AZ"}
    }
  },
  "families": {
    "my family": {
      "members": ["adult1", "adult2", "child1", "child2"]
    }
  },
  "tax_units": {
    "my tax unit": {
      "members": ["adult1", "adult2", "child1", "child2"]
    }
  },
  "marital_units": {
    "my marital unit": {
      "members": ["adult1", "adult2"]
    }
  },
  "spm_units": {
    "my spm unit": {
      "members": ["adult1", "adult2", "child1", "child2"]
    }
  }
}`;

const hostedFullExample = `import requests

token = "YOUR_ACCESS_TOKEN"

household = {
    "people": {
        "adult1": {
            "age": {"2025": 40},
            "employment_income": {"2025": 30000},
        },
        "adult2": {
            "age": {"2025": 38},
            "employment_income": {"2025": 20000},
        },
        "child1": {"age": {"2025": 10}},
        "child2": {"age": {"2025": 7}},
    },
    "households": {
        "my household": {
            "members": ["adult1", "adult2", "child1", "child2"],
            "state_name": {"2025": "AZ"},
        },
    },
    "families": {
        "my family": {
            "members": ["adult1", "adult2", "child1", "child2"],
        },
    },
    "tax_units": {
        "my tax unit": {
            "members": ["adult1", "adult2", "child1", "child2"],
        },
    },
    "marital_units": {
        "my marital unit": {
            "members": ["adult1", "adult2"],
        },
    },
    "spm_units": {
        "my spm unit": {
            "members": ["adult1", "adult2", "child1", "child2"],
        },
    },
}

response = requests.post(
    "https://household.api.policyengine.org/us/calculate",
    json={"household": household},
    headers={"Authorization": f"Bearer {token}"},
)

result = response.json()

# Access the EITC value
eitc = result["tax_units"]["my tax unit"]["eitc"]["2025"]
print(f"EITC: \${eitc:,.2f}")`;

const dockerFullExample = `import requests

household = {
    "people": {
        "adult1": {
            "age": {"2025": 40},
            "employment_income": {"2025": 30000},
        },
        "adult2": {
            "age": {"2025": 38},
            "employment_income": {"2025": 20000},
        },
        "child1": {"age": {"2025": 10}},
        "child2": {"age": {"2025": 7}},
    },
    "households": {
        "my household": {
            "members": ["adult1", "adult2", "child1", "child2"],
            "state_name": {"2025": "AZ"},
        },
    },
    "families": {
        "my family": {
            "members": ["adult1", "adult2", "child1", "child2"],
        },
    },
    "tax_units": {
        "my tax unit": {
            "members": ["adult1", "adult2", "child1", "child2"],
        },
    },
    "marital_units": {
        "my marital unit": {
            "members": ["adult1", "adult2"],
        },
    },
    "spm_units": {
        "my spm unit": {
            "members": ["adult1", "adult2", "child1", "child2"],
        },
    },
}

response = requests.post(
    "http://localhost:8080/us/calculate",
    json={"household": household},
)

result = response.json()

eitc = result["tax_units"]["my tax unit"]["eitc"]["2025"]
print(f"EITC: \${eitc:,.2f}")`;

const pythonFullExample = `from policyengine_us import Simulation

household = {
    "people": {
        "adult1": {
            "age": {"2025": 40},
            "employment_income": {"2025": 30000},
        },
        "adult2": {
            "age": {"2025": 38},
            "employment_income": {"2025": 20000},
        },
        "child1": {"age": {"2025": 10}},
        "child2": {"age": {"2025": 7}},
    },
    "households": {
        "my household": {
            "members": ["adult1", "adult2", "child1", "child2"],
            "state_name": {"2025": "AZ"},
        },
    },
    "families": {
        "my family": {
            "members": ["adult1", "adult2", "child1", "child2"],
        },
    },
    "tax_units": {
        "my tax unit": {
            "members": ["adult1", "adult2", "child1", "child2"],
        },
    },
    "marital_units": {
        "my marital unit": {
            "members": ["adult1", "adult2"],
        },
    },
    "spm_units": {
        "my spm unit": {
            "members": ["adult1", "adult2", "child1", "child2"],
        },
    },
}

sim = Simulation(situation=household)

eitc = sim.calculate("eitc", "2025")[0]
print(f"EITC: \${eitc:,.2f}")`;

export default function HouseholdSection({ accessMode }) {
  const selectedMode = getAccessModeOption(accessMode);
  const fullExample =
    accessMode === 'rest'
      ? hostedFullExample
      : accessMode === 'docker'
        ? dockerFullExample
        : pythonFullExample;
  const exampleTitle =
    accessMode === 'rest'
      ? 'Complete EITC example via hosted REST API'
      : accessMode === 'docker'
        ? 'Complete EITC example via self-hosted Docker'
        : 'Complete EITC example via policyengine-us';

  return (
    <section id="household-objects" className="py-16 border-b border-border-light bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-text-primary mb-6">Household objects</h2>
        <p className="text-text-secondary mb-8 text-lg">
          The household object describes the people and their groupings for tax and benefit calculations.
          It has a five-level hierarchy:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border-light rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold">Level</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
                <th className="px-4 py-3 text-left font-semibold">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-mono text-sm">Entity group</td>
                <td className="px-4 py-3 text-text-secondary">Top-level grouping category</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">&quot;people&quot;, &quot;tax_units&quot;</td>
              </tr>
              <tr className="border-t border-border-light bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">Entity</td>
                <td className="px-4 py-3 text-text-secondary">Named instance within a group</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">&quot;adult1&quot;, &quot;my tax unit&quot;</td>
              </tr>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-mono text-sm">Variable</td>
                <td className="px-4 py-3 text-text-secondary">Property of an entity</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">&quot;employment_income&quot;, &quot;eitc&quot;</td>
              </tr>
              <tr className="border-t border-border-light bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">Year</td>
                <td className="px-4 py-3 text-text-secondary">Time period for the value</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">&quot;2025&quot;</td>
              </tr>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-mono text-sm">Value</td>
                <td className="px-4 py-3 text-text-secondary">Number, string, boolean, or null for outputs</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">50000, &quot;CA&quot;, null</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-text-primary mb-4">Entity groups</h3>
        <p className="text-text-secondary mb-4">
          US households require six entity groups. Each group contains named entities that reference people by name:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-border-light rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold">Group</th>
                <th className="px-4 py-3 text-left font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-mono text-sm">people</td>
                <td className="px-4 py-3 text-text-secondary">Individual persons in the household</td>
              </tr>
              <tr className="border-t border-border-light bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">households</td>
                <td className="px-4 py-3 text-text-secondary">Physical household (state, housing costs)</td>
              </tr>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-mono text-sm">families</td>
                <td className="px-4 py-3 text-text-secondary">Family unit for benefit eligibility</td>
              </tr>
              <tr className="border-t border-border-light bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">tax_units</td>
                <td className="px-4 py-3 text-text-secondary">Tax filing unit (determines tax liability)</td>
              </tr>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-mono text-sm">marital_units</td>
                <td className="px-4 py-3 text-text-secondary">Married couple pair</td>
              </tr>
              <tr className="border-t border-border-light bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">spm_units</td>
                <td className="px-4 py-3 text-text-secondary">Supplemental Poverty Measure unit</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-text-primary mb-4">Step 1: Start with empty groups</h3>
        <CodeBlock code={step1} language="json" title="Empty household skeleton" />

        <h3 className="text-2xl font-semibold text-text-primary mt-10 mb-4">Step 2: Add people and assign to groups</h3>
        <p className="text-text-secondary mb-4">
          Create named people and assign them to each group via the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">members</code> array.
          Names are arbitrary strings that link people across groups.
        </p>
        <CodeBlock code={step2} language="json" title="Married couple with 2 children" />

        <h3 className="text-2xl font-semibold text-text-primary mt-10 mb-4">Step 3: Add variables and values</h3>
        <p className="text-text-secondary mb-4">
          Set input variables as <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{`{"year": value}`}</code> pairs.
          For outputs you want calculated, set the value to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">null</code> (or
          simply omit the variable &mdash; all computable variables are returned by default).
        </p>
        <CodeBlock code={step3} language="json" title="With income, ages, and state" />

        <h3 className="text-2xl font-semibold text-text-primary mt-10 mb-4">Full example: EITC calculation</h3>
        <p className="text-text-secondary mb-4">
          Putting it all together &mdash; a married couple in Arizona with two children and $50,000 combined income,
          calculating their Earned Income Tax Credit:
        </p>
        <p className="text-sm text-text-tertiary mb-4">
          Current access path:{' '}
          <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary-700">
            {selectedMode.label}
          </span>
        </p>
        <CodeBlock code={fullExample} language="python" title={exampleTitle} />
      </div>
    </section>
  );
}
