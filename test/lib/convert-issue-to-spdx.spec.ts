import { readFileSync } from 'fs';
import * as pathLib from 'path';

import { convertSnykIssueToSpdx } from '../../src/lib/convert-issue-to-spdx';

function loadJson(filename: string): JSON {
  return JSON.parse(readFileSync(filename, 'utf-8'));
}
describe('convertSnykIssueToSpdx', () => {
  it('Snyk issue is converted to SPDX v3 vulnerability', async () => {
    const snykIssue = loadJson(
      pathLib.resolve(__dirname, '../', 'fixtures/single-vuln.json'),
    );
    const res = convertSnykIssueToSpdx(snykIssue);
    expect(res).toMatchSnapshot();
  });
  it.skip('license issue is not converted to a vulnerability', () => {
    const licenseIssue = loadJson(
      pathLib.resolve(__dirname, '../', 'fixtures/single-license-issue.json'),
    );
    const res = convertSnykIssueToSpdx(licenseIssue);
    expect(res).toMatchSnapshot();
  });
});
