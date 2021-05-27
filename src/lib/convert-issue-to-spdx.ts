import * as types from '../types';

function getVulnerabilityRating(
  issue: types.SnykIssue,
): types.VulnerabilityRating[] {
  const vulnerabilityRatingScore: types.VulnerabilityRatingScore = {
    base: issue.cvssScore,
    exploitability: issue.exploit,
    impact: issue.semver.vulnerable[0],
  };

  const vulnerabilityRating: types.VulnerabilityRating = {
    method: issue.CVSSv3 ? 'CVSS_3' : undefined, // must be CVSS_2, CVSS_3, OWASP_RISK or OTHER
    score: [vulnerabilityRatingScore],
    severity: issue.severity, // exploitability score of the vulnerability either None, Low, Medium, High or Critical
    vector: issue.CVSSv3,
  };

  return [vulnerabilityRating];
}

function getExternalReferencesRelationships(
  references: types.SnykIssueReference[],
): types.ExternalReferencesRelationship[] {
  return references.map((reference) => ({
    category: 'ADVISORY', // not mandatory, but should be either ADVISORY, ARTICLE, FIX, REPORT or OTHER.
    locator: reference.url, // url
  }));
}

function getCWES(cwe: string[]): number[] {
  return cwe.map((step) => parseInt(step.replace('CWE-', '')));
}

function getVulnerabilityRelationship(
  issue: types.SnykIssue,
): types.VulnerabilityRelationship[] {
  const vulnerabilityAffect: types.AffectedBy = {
    to: issue.from,
    type: 'AFFECTS',
  };

  const vulnerabilityFoundBy: types.AffectedBy = {
    to: issue.credit,
    type: 'FOUND_BY',
  };

  // not mandatory, unclear what should be in here
  const vulnerabilitySuppliedBy: types.AffectedBy = {
    to: issue.credit,
    type: 'SUPPLIED_BY',
  };

  const ratedBy: types.RatedBy = {
    cwes: issue.identifiers.CWE ? getCWES(issue.identifiers.CWE) : [],
    rating: getVulnerabilityRating(issue),
    to: issue.credit,
    type: 'RATED_BY',
  };

  const relationship: types.VulnerabilityRelationship[] = [
    {
      affect: vulnerabilityAffect,
      foundBy: vulnerabilityFoundBy,
      suppliedBy: vulnerabilitySuppliedBy,
      ratedBy: ratedBy,
    },
  ];

  return relationship;
}

export function convertSnykIssueToSpdx(
  issue: types.SnykIssue,
): types.Vulnerability {
  return {
    id: issue.id,
    name: issue.id,
    summary: issue.title,
    details: issue.description,
    relationships: getVulnerabilityRelationship(issue),
    externalReferences: getExternalReferencesRelationships(issue.references),
    modified: issue.modificationTime, // YYYY-MM-DDThh:mm:ssZ
    published: issue.publicationTime,
  };
}
