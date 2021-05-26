export interface SPDXv3 {
  id: string; //  e.g SPDXRef-document-name
  name: string;
  specVersion: SPDXSpecVersion; // SPDX-2.2 | SPDX-3.0
  profile: Profile[]; // TODO: ?? where is this from
  // YYYY-MM-DDThh:mm:ssZ
  created: string;
  documentNamespace: string; // Url to the doc http://[CreatorWebsite]/[pathToSpdx]/[DocumentName]-[UUID]
  // License expression for dataLicense.  Compliance with the SPDX specification includes populating the SPDX fields therein with data related to such fields (\"SPDX-Metadata\"). The SPDX specification contains numerous fields where an SPDX document creator may provide relevant explanatory text in SPDX-Metadata. Without opining on the lawfulness of \"database rights\" (in jurisdictions where applicable), such explanatory text is copyrightable subject matter in most Berne Convention countries. By using the SPDX specification, or any portion hereof, you hereby agree that any copyright rights (as determined by your jurisdiction) in any SPDX-Metadata, including without limitation explanatory text, shall be subject to the terms of the Creative Commons CC0 1.0 Universal license. For SPDX-Metadata not containing any copyright rights, you hereby agree and acknowledge that the SPDX-Metadata is provided to you \"as-is\" and without any representations or warranties of any kind concerning the SPDX-Metadata, express, implied, statutory or otherwise, including without limitation warranties of title, merchantability, fitness for a particular purpose, non-infringement, or the absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not discoverable, all to the greatest extent permissible under applicable law.
  dataLicense: string;
  // Single line of text with the following keywords:
  // "Person: person name" and optional "(email)"
  // "Organization: organization" and optional "(email)"
  // "Tool: toolidentifier-version"
  creator: string;
  description: string;
  vulnerabilities: unknown;
}

type SPDXSpecVersions = '3.0' | '2.2';
type SPDXSpecVersion = `SPDX-${SPDXSpecVersions}`;


export enum Profile {
  'BASE' = 'base',
  'VULNERABILITIES' = 'vulnerabilities',
}

export interface SnykTestOutput {
  projectName: string;
  vulnerabilities: SnykIssue[];
  displayTargetFile?: string;
  path: string;
  remediation?: RemediationChanges;
}

export interface RemediationChanges {
  unresolved: SnykIssue[];
  upgrade: DependencyUpdates;
  patch: {
    [name: string]: PatchRemediation;
  };
  ignore: unknown;
  pin: DependencyPins;
}

export interface Upgrade {
  upgradeTo: string; // name@version
}

export interface UpgradeVulns extends Upgrade {
  vulns: string[];
}

export interface UpgradeRemediation extends UpgradeVulns {
  upgrades: string[];
}

export interface PatchRemediation {
  paths: PatchObject[];
}

export interface PatchObject {
  [name: string]: {
    patched: string;
  };
}

export interface DependencyUpdates {
  [from: string]: UpgradeRemediation;
}

export interface DependencyPins {
  [name: string]: PinRemediation;
}

export interface PinRemediation extends UpgradeVulns {
  isTransitive: boolean;
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
