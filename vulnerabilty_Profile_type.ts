interface Vulnerability {
    id: string;
    name: string;
    summary: string;
    details: string;
    relationships: VulnerabilityRelationship[];
}

interface VulnerabilityRelationship {
    affect : X_by;
    found_by?: X_by;
    supplied_by?: X_by;
    rated_by: Rated_by;
}

// supplied_by, affects, found_by
interface X_by {
    to: string[];
    type: string;
}

interface Rated_by {
    CWES: number[];
    rating: VulnerabilityRating[];
    to: string[];
    type: string;
}

interface VulnerabilityRating {
    method: string;
    score: VulnerabilityRatingScore[];
    severity: string;
    vector: string;
}

interface VulnerabilityRatingScore {
    base: string;
    exploitability: string;
    impact: string;
}

interface DefectResponse {
    id: string;
    type: string;
    created: Date;
    comment: string;
    relationship : X_by[];
}

interface Relationship {
    from: string;
    to : string;
    type: string;
}

interface Identity {
    id: string;
    name: string;
    version?: string;
    type: string;
}

interface ProfilePackage {
    id: string;
    name: string;
    artifactUrl: string;
    type: string;
}

interface ProfileVulnerability {
    id: string;
    name: string;
    specVersion: string;
    profile: string [];
    created: Date;
    dataLicense: string;
    comment: string;
    description: string;
    packages: ProfilePackage[];
    identities: Identity[];
    relationship: Relationship[];
    vulnerabilities: Vulnerability[];
    defectResponses: DefectResponse[]
}