const API_TERMS_TEMPLATE = `# PolicyEngine API Terms of Service

These PolicyEngine API Terms of Service ("**Terms**") form a binding agreement between PolicyEngine, Inc. ("**PolicyEngine," "we," "us," or "our"**) and the entity or person agreeing to them ("**Customer," "you," or "your"**) that accesses or uses the PolicyEngine application‑programming interface, endpoints, documentation, and any related services (collectively, the "**API**"). **By requesting API credentials, making an API call, or otherwise using the API, you accept these Terms.**

---

## 1. Definitions

**"AGPL"** means the GNU Affero General Public License v3.0.  
**"Household Scenario"** means data describing a hypothetical or de‑identified household, such as age bands, income ranges, and geographic codes that cannot reasonably be linked to an identified or identifiable person.  
**"Output"** means the JSON or other results returned by the API in response to a request.  
**"Request Data"** means the payload, headers, and metadata you submit to the API.  
**"Service Level Credits"** means the fee credits defined in Section 8.  
**"Usage Logs"** means system logs that include Request Data or Output and related metadata.

---

## 2. API License and Access

1. **Limited License.** Subject to these Terms, PolicyEngine grants you a non‑exclusive, non‑transferable, revocable license to access and use the API solely to build or operate software or services that compute or analyze public‑policy outcomes.

2. **API Keys.** You agree to keep your API credentials confidential and may not share them except with agents acting on your behalf under written confidentiality obligations.

3. **Acceptable Use.** You will not (a) submit malware, unlawful content, or personal data that identifies a natural person; (b) attempt to reverse‑engineer, scrape, or violate rate limits; (c) use the API to provide legal or tax advice without appropriate professional oversight; or (d) misrepresent Output as official government guidance.

---

## 3. Customer Data

1. **No PII Submission.** You shall not submit names, full street addresses, Social Security numbers, or other direct identifiers. If you inadvertently submit personal data, you must notify us promptly and cooperate in deletion.

2. **Representation.** You represent that Request Data consists of (i) Household Scenarios **or** (ii) information you are lawfully authorized to process and share with PolicyEngine.

3. **Ownership.** You retain all rights in Request Data and Output, except that you grant PolicyEngine a worldwide, royalty‑free license to process Request Data and Output to provide the API and improve our microsimulation models.

---

## 4. Data Handling & Anonymisation

PolicyEngine logs request and response data solely for speed of execution (caching), abuse‑detection, debugging, billing, and statistical research to improve its microsimulation models. Logs are never sold, shared with third parties (except subprocessors under equivalent obligations), or used to train public machine‑learning models.

## 5. Open‑Source Components

1. **Open‑Source Software.** The following PolicyEngine software described in our documentation is licensed under the AGPL: policyengine-household-api (including the PolicyEngine code in its Docker image), policyengine-core, policyengine.py, policyengine-us, and policyengine-uk. Third‑party software, such as the operating system and libraries in the Docker image, and the datasets our documentation references keep their own licenses and terms. Using PolicyEngine's hosted API does **not** trigger AGPL source‑code disclosure.

2. **Running Our Software Yourself.** Installing and running the unmodified software yourself does not by itself require you to release any source code: the AGPL affirms your unlimited permission to run it (AGPL section 2). Source‑code obligations arise only if you (a) convey (for example, distribute) copies of the software, or of a work based on it, to others, in which case you must pass them on under the AGPL and meet its notice and Corresponding Source requirements (AGPL sections 4–6); or (b) modify the software and let users interact with your modified version remotely through a computer network, in which case you must prominently offer all those users access to the Corresponding Source of your version from a network server at no charge (AGPL section 13). The AGPL's own text and definitions control over this summary.

3. **Priority of Terms.** In case of conflict, these API Terms govern your API access; the AGPL, or any other open‑source license under which PolicyEngine publishes the relevant code or documentation, governs your use of that code or documentation. These API Terms do not restrict your use of copies of our open‑source software, including the Docker image, that you run yourself.

---

## 6. Intellectual‑Property Rights

1. **PolicyEngine IP.** Aside from the limited license in Section 2 and the open‑source licenses under which PolicyEngine publishes its code and documentation, including the AGPL described in Section 5, PolicyEngine, its contributors, and its licensors retain all rights in the API, documentation, and underlying models. PolicyEngine claims no rights in the laws and regulations that legislatures and governments make, or in the tax rates, brackets, thresholds, benefit amounts, and other values set by or under those laws, which the models encode. This does not change the license that applies to the code, documentation, or parameter files in which PolicyEngine records them.

2. **Feedback.** You grant PolicyEngine a perpetual, irrevocable, royalty‑free license to use any feedback you provide to improve the API.

---

## 7. Rate Limits; Fair Use

We may impose request‑per‑minute or daily volume limits, published in the dashboard or documentation. Excess use may result in temporary throttling or suspension without liability.

---

## 8. Service Levels & Support

1. **Uptime Commitment.** We target **99% monthly API availability**. If availability drops below 99%, you may request Service Level Credits equal to 10% of that month's fees.

2. **Planned Maintenance.** We will give at least 24 hours' notice for planned downtime exceeding 15 minutes.

3. **Support.** Standard e‑mail support (support@policyengine.org) is included. Contact [support@policyengine.org](mailto:support@policyengine.org) for enterprise support.

---

## 9. Security & Privacy

We maintain administrative, technical, and physical safeguards designed to protect Request Data. Details appear in our [Privacy Policy]({{privacyLink}}), which is incorporated by reference.

---

## 10. Confidentiality

Each party will protect the other's non‑public information with the same care it uses for its own, but at least reasonable care, and will use it only to exercise rights and fulfil obligations under these Terms.

---

## 11. Term & Termination

1. **Term.** These Terms start when you first use the API and continue until terminated.

2. **Termination for Convenience.** Either party may terminate at any time on 30 days' written notice.

3. **Termination for Cause.** Either party may terminate immediately if the other materially breaches these Terms and fails to cure within 15 days of notice.

4. **Effect.** Upon termination you must cease API calls. Sections 4 (aggregated logs), 5, 6, 10, 12–17 survive.

---

## 12. Disclaimers

THE API AND OUTPUT ARE PROVIDED **"AS IS"**. POLICYENGINE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON‑INFRINGEMENT. OUTPUT IS **ILLUSTRATIVE ONLY** AND NOT LEGAL, TAX, OR FINANCIAL ADVICE.

---

## 13. Limitation of Liability

1. **Indirect Damages.** POLICYENGINE WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, OR LOSS OF PROFITS OR DATA, EVEN IF ADVISED OF THE POSSIBILITY.

2. **Cap.** POLICYENGINE'S TOTAL LIABILITY WILL NOT EXCEED THE FEES PAID BY CUSTOMER IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.

---

## 14. Indemnification

You will defend, indemnify, and hold harmless PolicyEngine from any third‑party claim arising from your (a) misuse of the API, (b) violation of these Terms, or (c) infringement of intellectual‑property or privacy rights.

---

## 15. Modifications to the API or Terms

We may modify these Terms or the API by posting an updated version or sending notice to your account e‑mail. Changes take effect 30 days after notice. Continued use constitutes acceptance.

---

## 16. Governing Law; Dispute Resolution

These Terms are governed by the laws of {{jurisdiction}}, excluding its conflict of law rules. The parties will resolve disputes exclusively in the federal or state courts located in {{courtLocation}}, and consent to personal jurisdiction there.

---

## 17. Assignment; Entire Agreement

You may not assign these Terms without PolicyEngine's prior written consent. These Terms, any Order Form, and the documents linked herein constitute the entire agreement and supersede all prior agreements regarding their subject.

---

## 18. Contact

Questions may be directed to **legal@policyengine.org**

---

**By using the API you acknowledge that you have read, understood, and agree to be bound by these Terms.**

---

## Changelog

**2026-09-23.** Section 5 now names the open‑source packages it covers and states when AGPL obligations apply: running the unmodified software yourself carries no conditions, while conveying the software or offering a modified version over a network does. The priority clause, now Section 5.3 (formerly 5.2), also covers PolicyEngine's other open‑source licenses and states that these Terms do not restrict copies of our open‑source software that you run yourself. Section 6.1 now recognizes the open‑source licenses that apply to PolicyEngine's code and documentation and the rights of PolicyEngine's contributors and licensors, and states that PolicyEngine claims no rights in the underlying law, rates, and thresholds. Under Section 15, these changes take effect 30 days after the date of this entry. Section 5 summarizes the AGPL, which applies to the software listed in Section 5.1 on its own terms regardless of that date.`;

const DEFAULT_TERMS_CONTEXT = {
  jurisdiction: 'the United States',
  courtLocation: 'Washington, DC',
};

const TERMS_CONTEXT_BY_COUNTRY = {
  uk: {
    jurisdiction: 'the United Kingdom',
    courtLocation: 'London',
  },
  us: DEFAULT_TERMS_CONTEXT,
};

export function getApiTermsMarkdown(countryId) {
  const context = TERMS_CONTEXT_BY_COUNTRY[countryId] ?? DEFAULT_TERMS_CONTEXT;

  return API_TERMS_TEMPLATE.replaceAll('{{jurisdiction}}', context.jurisdiction)
    .replaceAll('{{courtLocation}}', context.courtLocation)
    .replaceAll('{{privacyLink}}', `/${countryId}/privacy`);
}
