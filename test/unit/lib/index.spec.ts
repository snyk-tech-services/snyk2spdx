import * as pathLib from 'path';

import { convertSnykTestOutputToSPDX } from '../../../src';
import { SnykTestOutput } from '../../../src/types';
import { loadJson } from '../../load-json';
describe('convertSnykTestOutputToSPDX', () => {
  it('No Snyk vulnerabilities converted to SPDX v3 correctly', async () => {
    const snykTestData = loadJson<SnykTestOutput>(
      pathLib.resolve(__dirname, '../../', 'fixtures/no-deps.json'),
    );
    const projectName = 'no-prod-deps';
    const res = convertSnykTestOutputToSPDX(snykTestData);
    expect(res).toMatchObject({
      id: `SPDXRef-${projectName}`,
      name: projectName,
      specVersion: 'SPDX-3.0',
      profile: ['base', 'vulnerabilities'],
      created: expect.any(String),
      documentNamespace: expect.stringMatching(
        `spdx.org/spdxdocs/${projectName}`,
      ),
      dataLicense: 'CC0-1.0',
      creator: 'Organization: Snyk Ltd',
      description: `Snyk test result for project ${projectName} in SPDX SBOM format`,
      vulnerabilities: [],
    });
  });
  it('Snyk issue is converted to SPDX v3 vulnerability', () => {
    const snykTestData = loadJson<SnykTestOutput>(
      pathLib.resolve(
        __dirname,
        '../../',
        'fixtures/ruby-vulnerabilities.json',
      ),
    );
    const projectName = 'ruby-app';
    const res = convertSnykTestOutputToSPDX(snykTestData);
    expect(res).toMatchObject({
      id: `SPDXRef-${projectName}`,
      name: projectName,
      specVersion: 'SPDX-3.0',
      profile: ['base', 'vulnerabilities'],
      created: expect.any(String),
      documentNamespace: expect.stringMatching(
        `spdx.org/spdxdocs/${projectName}`,
      ),
      dataLicense: 'CC0-1.0',
      creator: 'Organization: Snyk Ltd',
      description: `Snyk test result for project ${projectName} in SPDX SBOM format`,
    });
    expect(res.vulnerabilities.sort()).toMatchSnapshot();
  });
  it('license issues are not converted to vulnerabilities', () => {
    const snykTestData = loadJson<SnykTestOutput>(
      pathLib.resolve(__dirname, '../../', 'fixtures/with-license-issues.json'),
    );
    const projectName = 'app-with-already-fixed';
    const res = convertSnykTestOutputToSPDX(snykTestData);
    expect(res).toMatchObject({
      id: `SPDXRef-${projectName}`,
      name: projectName,
      specVersion: 'SPDX-3.0',
      profile: ['base', 'vulnerabilities'],
      created: expect.any(String),
      documentNamespace: expect.stringMatching(
        `spdx.org/spdxdocs/${projectName}`,
      ),
      dataLicense: 'CC0-1.0',
      creator: 'Organization: Snyk Ltd',
      description: `Snyk test result for project ${projectName} in SPDX SBOM format`,
    });
    expect(res.vulnerabilities.sort()).toMatchSnapshot();
    // TODO: comment out once functionality in place
    expect(
      res.vulnerabilities.find((i) => i.id === 'snyk:lic:pip:pytz:MIT'),
    ).toEqual(undefined);
  });
});
