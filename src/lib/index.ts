import 'source-map-support/register';
import { SnykIssue, SnykTestOutput, SPDXv3, Profile } from '../types';
import { convertSnykIssueToSpdx } from './convert-issue-to-spdx';

export function convertSnykTestOutputToSPDX(data: SnykTestOutput): SPDXv3 {
  return {
    id: `SPDXRef-${data.projectName}`,
    name: data.projectName,
    specVersion: 'SPDX-3.0',
    profile: [Profile.BASE, Profile.VULNERABILITIES],
    dataLicense: 'CC0-1.0',
    creator: 'Organization: Snyk Ltd',
    documentNamespace: 'TODO', // TODO: maybe file path?
    description: `Snyk test result for project ${data.projectName} in SPDX SBOM format`,
    created: Date.now().toString(),
    vulnerabilities: data.vulnerabilities.map((i: SnykIssue) =>
      convertSnykIssueToSpdx(i),
    ),
  };
}
