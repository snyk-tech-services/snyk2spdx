interface SPDXv3 {
    id: string; //  e.g SPDXRef-doument-name
    name: string;
    specVersion: string; // SPDX-2.2 | SPDX-3.0
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
    comment: string;
    description: string;
    packages: ProfilePackage[];
    identities: Identity[];
    relationships: Relationship[];
    vulnerabilities: Vulnerability[];
    defectResponses?: DefectResponse[];
}


enum Profile {
'BASE' = "base",
'VULNERABILITIES'= "vulnerabilities",
}

interface Vulnerability {
    id: string; //string, unique SPDX id for this element within SPDX doc
    name: string; //string, id given by org of person(s) who identified it.
    summary: string; // string, one-liner summary of max 120 chars.
    details: string; //string, multi line may include steps to reproduce, detail impact analysis or remediation guidance
    relationships: VulnerabilityRelationship[]; //field provides information about the relationships between the vulnerability and other SPDX elements.
    externalReferences?: externalReference[];
}

interface VulnerabilityRelationship {
    affect : X_by; //pointing to the SPDX Package or SPDX File affected by the vulnerability
    found_by?: X_by; //pointing to an SPDX Identity e.g. the organization, tool or person(s) who identified the vulnerability
    supplied_by?: X_by; //pointing to an SPDX Identity e.g. the organization, tool or person(s) who supplied information about the vulnerability
    rated_by: Rated_by; //an instance of SPDX Vulnerability Rating_ relationship
}

// supplied_by, affects, found_by
interface X_by {
    to: string[]; // org, person or tool
    type: string; // either "RATED_BY", "AFFECTS", "FOUND_BY", "SUPPLIED_BY" 
}

interface Rated_by {
    CWES: number[]; // array of Common Weaknesses Enumerations (CWE) integers
    rating: VulnerabilityRating[];
    to: string[];
    type: string; // must be "RATED_BY"
}

interface VulnerabilityRating {
    method: string; // must be CVSS_2, CVSS_3, OWASP_RISK or OTHER
    score: VulnerabilityRatingScore[];
    severity: string; // exploitability score of the vulnerability either None, Low, Medium, High or Critical
    vector: string; // textual representation of the metric values used
}

interface VulnerabilityRatingScore {
    base: string;
    exploitability: string;
    impact: string;
}

interface externalReferencesRelationship {
    category: string // must be either ADVISORY, ARTICLE, FIX, REPORT or OTHER.
    locator: string // url
}

interface externalReference {
    externalReferencesRelationships : externalReferencesRelationship[]
    modified?: string; // YYYY-MM-DDThh:mm:ssZ
    published?: string; // YYYY-MM-DDThh:mm:ssZ
    withdrawn?: string; // YYYY-MM-DDThh:mm:ssZ 
}

interface DefectResponse {
    id: string;
    type: string; // CANT_FIX_VULNERABILITY, INEFFECTIVE_VULNERABILITY, INVALID_MATCH_VULNERABILITY, MITIGATED_VULNERABILITY, ROLLBACK, UPDATE, WILL_NOT_FIX_VULNERABILITY, WORKAROUND_FOR_VULNERABILITY
    created: string; //// YYYY-MM-DDThh:mm:ssZ
    comment?: string;
    DefectResponserelationship : X_by[];
}

interface DefectResponseRelationship {
    from: string;
    to : string;
    type: string; // RESPOND or CREATED_BY (a vul must have at least one RESPON relationship)
}

interface Identity {
    id: string;
    name: string;
    version?: string;
    organization?: string;
    type: string; // ORGANIZATION, PERSON, TOOL
}

interface ProfilePackage {
    id: string;
    name: string;
    artifactUrl: string;
    type: string; // LIBRARY, SOURCE
}

interface ProfileVulnerability {
    id: string;
    name: string;
    specVersion: string;
    profile: string [];
    //// YYYY-MM-DDThh:mm:ssZ
    created: string;
    dataLicense: string;
    comment?: string;
    description: string;
    packages: ProfilePackage[];
    identities: Identity[];
    relationships: DefectResponseRelationship[]; // same format as DefectResponseRelationship but type must be 
    vulnerabilities: Vulnerability[];
    defectResponses?: DefectResponse[]
}