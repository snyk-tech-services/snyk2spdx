import 'source-map-support/register';
import { SnykIssue, SnykTestOutput, SPDXv3, Profile } from '../types';
import { convertSnykIssueToSpdx } from './convert-issue-to-spdx';

export function convertSnykTestOutputToSPDX(data: SnykTestOutput): SPDXv3 {
  return {
    id: `SPDXRef-${data.projectName}`,
    name: data.projectName,
    specVersion: '3.0-alpha',
    profile: [Profile.BASE, Profile.VULNERABILITIES],
    dataLicense: 'TODO',
    creator: 'Organization: Snyk Ltd',
    documentNamespace: 'TODO',
    comment: 'TODO',
    description: `Snyk test result for project ${data.projectName} in SPDX SBOM format`,
    created: Date.now().toString(),
    vulnerabilities: data.vulnerabilities.map((i: SnykIssue) =>
      convertSnykIssueToSpdx(i),
    ),
  };
}
