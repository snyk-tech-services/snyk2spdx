export interface SPDXv3 {
  vulnerabilities: unknown;
}

export interface SnykIssue {
  id: string;
}

export interface SnykTestOutput {
  vulnerabilities: SnykIssue[];
}
