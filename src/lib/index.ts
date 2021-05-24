import 'source-map-support/register';
import { SPDXv3 } from '../types';
import { convertSnykIssueToSpdx } from './convert-issue-to-spdx';

export function convertSnykTestOutputToSPDX(data: any): SPDXv3 {
  return {
    vulnerabilities: data.vulnerabilities.map((i: any) =>
      convertSnykIssueToSpdx(i),
    ),
  } as SPDXv3;
}
