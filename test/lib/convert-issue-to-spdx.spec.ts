import { readFileSync } from 'fs';
import * as pathLib from 'path';

import { convertSnykIssueToSpdx } from '../../src/lib/convert-issue-to-spdx';

function loadJson(filename: string): JSON {
  return JSON.parse(readFileSync(filename, 'utf-8'));
}
describe('convertIs', () => {
  it('Snyk issue is converted to SPDX v3 vulnerability', async () => {
    const snykIssue = loadJson(
      pathLib.resolve(__dirname, '../', 'fixtures/single-vuln.json'),
    );
    const res = convertSnykIssueToSpdx(snykIssue);
    expect(res).toEqual({
      id: 'SNYK-RUBY-JSON-560838',
    });
  });
  it.todo('license issue is not converted to a vulnerability');
});
