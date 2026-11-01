// Apps built on PolicyEngine, listed at /{country}/api/apps.
//
// List an app only when its maker has a public page saying the app uses
// PolicyEngine (the first `evidence` entry links to it) and has agreed to be
// listed or announced the integration itself. The live app must use PolicyEngine
// today: leave an app off while its own code or copy says PolicyEngine comes in a
// later release. Never add an organization whose use of PolicyEngine is known only
// from private correspondence or other non-public sources.
//
// Set `integration` from the app's code or its maker's own statement. Use null
// when neither settles how the app reaches PolicyEngine; the card then shows no
// integration tag.
//
// Use each app's own logo, as its maker's site shows it. An app with no logo of
// its own uses its maker's, never a host's or a partner's. SVG logos may hold only
// plain shapes; src/data/apiApps.test.js checks every file in public/api-apps.
export const API_APPS = [
  {
    id: 'benefit-navigator',
    name: 'Benefit Navigator',
    organization: 'Amplifi',
    url: 'https://www.amplifi.org/benefit-navigator',
    description:
      'Helps caseworkers at California nonprofits and agencies screen clients for public benefits and tax credits such as SNAP, Medicaid and the EITC.',
    countries: ['us'],
    integration: null,
    logo: '/api-apps/benefit-navigator.svg',
    evidence: [
      {
        label: "Amplifi's about page",
        url: 'https://www.amplifi.org/about-benefit-navigator',
      },
    ],
  },
  {
    id: 'cindy-career-copilot',
    name: 'Cindy Career Copilot',
    organization: 'Independent project',
    url: 'https://cindy-career-copilot.pages.dev',
    description:
      'Helps job seekers search for work and estimates the SNAP, Medicaid, tax credits and other benefits they might qualify for.',
    countries: ['us'],
    integration: 'web-api',
    logo: '/api-apps/cindy-career-copilot.png',
    evidence: [
      {
        label: "Cindy's privacy policy",
        url: 'https://cindy-career-copilot.pages.dev/privacy',
      },
    ],
  },
  {
    id: 'cobijo-health',
    name: 'Cobijo Health',
    organization: 'Cobijo Health',
    url: 'https://cobijohealth.org',
    description:
      'Matches California patients to hospital charity-care programs, screens them for Medi-Cal and Covered California subsidies, and drafts an assistance letter.',
    countries: ['us'],
    integration: 'web-api',
    logo: '/api-apps/cobijo-health.svg',
    evidence: [
      {
        label: "Cobijo Health's about page",
        url: 'https://cobijohealth.org/about',
      },
    ],
  },
  {
    id: 'hotgap',
    name: 'HotGap',
    organization: 'Independent project',
    url: 'https://hotgap.mdeeb.workers.dev',
    description:
      'Shows whether a raise could leave a household with less money after taxes, benefits and premiums, and maps benefit cliffs by state.',
    countries: ['us'],
    integration: 'open-source-model',
    logo: '/api-apps/hotgap.svg',
    evidence: [
      {
        label: 'HotGap on GitHub',
        url: 'https://github.com/mikewolfd/hotgap',
      },
    ],
  },
  {
    id: 'ledgergov-uk',
    name: 'LedgerGov.UK',
    organization: 'Empatiq Limited',
    url: 'https://ledgergov.uk',
    description:
      'Presents UK public finances as a ledger and lets readers model tax and spending changes, with household gains and losses.',
    countries: ['uk'],
    integration: 'web-api',
    logo: '/api-apps/ledgergov-uk.svg',
    evidence: [
      {
        label: "LedgerGov.UK's method page",
        url: 'https://ledgergov.uk/method',
      },
    ],
  },
  {
    id: 'living-wage-calculator',
    name: 'Living Wage Calculator',
    organization: 'Living Wage Institute and MIT',
    url: 'https://livingwage.mit.edu',
    description:
      'Estimates the hourly wage that covers basic living costs and taxes for 12 family types in every US county, metro area and state.',
    countries: ['us'],
    integration: 'open-source-model',
    logo: '/api-apps/living-wage-institute.png',
    evidence: [
      {
        label: "Living Wage Institute's post",
        url: 'https://www.livingwage.institute/post/how-we-re-improving-tax-calculations-in-partnership-with-policyengine',
      },
    ],
  },
  {
    id: 'myfriendben',
    name: 'MyFriendBen',
    organization: 'MyFriendBen',
    url: 'https://www.myfriendben.org',
    description:
      "Estimates which public benefits and tax credits a household qualifies for and what they're worth, in states including Colorado, Illinois and North Carolina.",
    countries: ['us'],
    integration: 'hosted-api',
    logo: '/api-apps/myfriendben.png',
    evidence: [
      {
        label: "MyFriendBen's about page",
        url: 'https://www.myfriendben.org/about',
      },
    ],
  },
  {
    id: 'policy-impact-calculator',
    name: 'Policy Impact Calculator',
    organization: 'Prenatal-to-3 Policy Impact Center',
    url: 'https://pn3policy.org/policy-impact-calculator',
    description:
      'Compares the resources available to a family across states, counting wages, child care, nutrition benefits, taxes and credits.',
    countries: ['us'],
    integration: null,
    logo: '/api-apps/pn3policy.png',
    evidence: [
      {
        label: 'Methods and sources (PDF)',
        url: 'https://pn3policy.org/wp-content/uploads/2026/08/PN3PIC_MethodsSources_PolicyImpactCalculator_2026.pdf',
      },
    ],
  },
  {
    id: 'taxvant',
    name: 'TaxVant',
    organization: 'Niti Labs',
    url: 'https://taxvant.com',
    description:
      'Models federal and state income taxes in all 50 states, including Roth conversions, capital gains and year-end moves.',
    countries: ['us'],
    integration: 'open-source-model',
    logo: '/api-apps/taxvant.png',
    evidence: [
      {
        label: "TaxVant's about page",
        url: 'https://taxvant.com/about',
      },
    ],
  },
  {
    id: 'whats-it-to-me',
    name: "What's It To Me?",
    organization: 'Independent project',
    url: 'https://whatsittome.org',
    description:
      "Shows UK voters the candidates on their ballot and what each party's pledges would change in tax and benefits for a household like theirs.",
    countries: ['uk'],
    integration: 'open-source-model',
    logo: '/api-apps/whats-it-to-me.png',
    evidence: [
      {
        label: "What's It To Me?'s about page",
        url: 'https://whatsittome.org/about',
      },
    ],
  },
];
