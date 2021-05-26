import { readFileSync } from 'fs';
import * as pathLib from 'path';

import { convertSnykTestOutputToSPDX } from '../../src';
import { SnykTestOutput } from '../../src/types';

function loadJson<JsonFormat>(filename: string): JsonFormat {
  return JSON.parse(readFileSync(filename, 'utf-8'));
}
describe('convertSnykTestOutputToSPDX', () => {
  it('No Snyk vulnerabilities converted to SPDX v3 correctly', async () => {
    const snykTestData = loadJson<SnykTestOutput>(
      pathLib.resolve(__dirname, '../', 'fixtures/no-deps.json'),
    );
    const res = convertSnykTestOutputToSPDX(snykTestData);
    expect(res).toMatchObject({
      id: 'SPDXRef-no-prod-deps',
      name: 'no-prod-deps',
      specVersion: 'SPDX-3.0',
      profile: ['base', 'vulnerabilities'],
      created: expect.any(String),
      documentNamespace: 'TODO',
      dataLicense: 'CC0-1.0',
      creator: 'Organization: Snyk Ltd',
      description:
        'Snyk test result for project no-prod-deps in SPDX SBOM format',
      vulnerabilities: [],
    });
  });
  it('Snyk issue is converted to SPDX v3 vulnerability', () => {
    const snykTestData = loadJson<SnykTestOutput>(
      pathLib.resolve(__dirname, '../', 'fixtures/ruby-vulnerabilities.json'),
    );
    // const projectName = 'ruby-app';
    const res = convertSnykTestOutputToSPDX(snykTestData);
    expect((res.vulnerabilities as any).sort()).toMatchSnapshot();
  });
  it('license issues are not converted to vulnerabilities', () => {
    // const projectName = 'app-with-already-fixed';
    const snykTestData = loadJson<SnykTestOutput>(
      pathLib.resolve(__dirname, '../', 'fixtures/with-license-issues.json'),
    );
    const res = convertSnykTestOutputToSPDX(snykTestData);
    expect((res.vulnerabilities as any).sort()).toMatchSnapshot();
    // TODO: comment out once functionality in place
    // expect(
    //   (res.vulnerabilities as any).find(
    //     (i: any) => i.id === 'snyk:lic:pip:pytz:MIT',
    //   ),
    // ).toEqual([]);
  });
});
