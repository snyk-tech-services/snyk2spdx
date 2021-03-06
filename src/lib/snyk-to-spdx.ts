import { SnykIssue, SnykTestOutput, SPDXv3, Profile } from '../types';
import { convertSnykIssueToSpdx } from './convert-issue-to-spdx';
import { generateDocumentNameSpace } from './generate-document-namespace';
import { getDate } from './generate-date';

export function convertSnykTestOutputToSPDX(data: SnykTestOutput): SPDXv3 {
  const outputFileName = data.projectName;
  return {
    id: `SPDXRef-${data.projectName}`,
    name: data.projectName,
    specVersion: 'SPDX-3.0',
    profile: [Profile.BASE, Profile.VULNERABILITIES],
    dataLicense: 'CC0-1.0',
    creator: 'Organization: Snyk Ltd',
    documentNamespace: generateDocumentNameSpace(outputFileName),
    description: `Snyk test result for project ${data.projectName} in SPDX SBOM format`,
    created: getDate(), // YYYY-MM-DDThh:mm:ssZ
    vulnerabilities: data.vulnerabilities.map((i: SnykIssue) =>
      convertSnykIssueToSpdx(i),
    ),
  };
}
