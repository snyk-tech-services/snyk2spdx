import * as allType from '../types';

function getVulnerabilityRating(
  issue: allType.SnykIssue,
): allType.VulnerabilityRating[] {
  const vulnerabilityRatingScore: allType.VulnerabilityRatingScore = {
    base: issue.cvssScore ? issue.cvssScore.toString() : '',
    exploitability: issue.exploit,
    impact: issue.semver.vulnerable[0],
  };

  const vulnerabilityRating: allType.VulnerabilityRating = {
    method: issue.CVSSv3 ? 'CVSS_3' : 'undefined', // must be CVSS_2, CVSS_3, OWASP_RISK or OTHER
    score: [vulnerabilityRatingScore],
    severity: issue.severity, // exploitability score of the vulnerability either None, Low, Medium, High or Critical
    vector: issue.CVSSv3,
  };

  return [vulnerabilityRating];
}

function getExternalReferencesRelationships(
  references: allType.SnykIssueReference[],
): allType.ExternalReferencesRelationship[] {
  let externalReferencesRelationship: allType.ExternalReferencesRelationship[] = [];

  externalReferencesRelationship = references
    ? references.map((step) => {
        return {
          category: '', // must be either ADVISORY, ARTICLE, FIX, REPORT or OTHER.
          locator: step.url, // url
        };
      })
    : [];

  return externalReferencesRelationship;
}

function getVulnerabilityExternalReferences(
  issue: allType.SnykIssue,
): allType.ExternalReference[] {
  const externalReference: allType.ExternalReference = {
    externalReferencesRelationships: getExternalReferencesRelationships(
      issue.references,
    ),
    modified: issue.modificationTime, // YYYY-MM-DDThh:mm:ssZ
    published: issue.publicationTime,
    withdrawn: '', // TODO I don't know where to find this one
  };

  const externalReferences: allType.ExternalReference[] = [externalReference];

  return externalReferences;
}

function getCwes(cwe: string[]): number[] {
  let cwes: number[] = [];

  cwes = cwe
    ? cwe.map((step) => {
        return parseInt(step.slice(4, step.length));
      })
    : [];

  return cwes;
}

function getVulnerabilityRelationship(
  issue: allType.SnykIssue,
): allType.VulnerabilityRelationship[] {
  const vulnerabilityAffect: allType.AffectedBy = {
    to: issue.from,
    type: 'AFFECTS',
  };

  const vulnerabilityfoundBy: allType.AffectedBy = {
    to: issue.credit,
    type: 'FOUND_BY',
  };

  // not mandatory, unclear what should be in here
  const vulnerabilitySuppliedBy: allType.AffectedBy = {
    to: issue.credit,
    type: 'SUPPLIED_BY',
  };

  const ratedBy: allType.RatedBy = {
    cwes: getCwes(issue.cwe),
    rating: getVulnerabilityRating(issue),
    to: issue.credit, // TODO: we might need to get that one reviewed, doc is unclear
    type: 'RATED_BY',
  };

  const relationship: allType.VulnerabilityRelationship[] = [
    {
      affect: vulnerabilityAffect,
      foundBy: vulnerabilityfoundBy,
      suppliedBy: vulnerabilitySuppliedBy,
      ratedBy: ratedBy,
    },
  ];

  return relationship;
}

export function convertSnykIssueToSpdx(issue: any): allType.Vulnerability {
  return {
    id: issue.id,
    name: issue.id,
    summary: issue.title,
    details: issue.description,
    relationships: getVulnerabilityRelationship(issue),
    externalReferences: getVulnerabilityExternalReferences(issue),
  };
}
