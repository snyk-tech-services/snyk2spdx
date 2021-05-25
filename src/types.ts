export interface SPDXv3 {
  vulnerabilities: unknown;
}


// TODO: add more as needed
// add only fields needed for conversion
export interface SnykIssue {
  id: string;
  title: string;
  description: string;
  from: string[];
  credit: string[];
  identifiers: SnykIssueIdentifiers[];
}

interface SnykIssueIdentifiers {
  ALTERNATIVE?: string[];
  CWE: string[];
  CVE: string[];
  NSP?: number;
}

export interface SnykTestOutput {
  vulnerabilities: SnykIssue[];
}
