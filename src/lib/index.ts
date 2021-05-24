import 'source-map-support/register';
import { SPDXv3 } from '../types';

export function convertSnykTestOutputToSPDX(data: any): SPDXv3 {
  return ({
    vulnerabilities: [],
  }) as SPDXv3;
}
