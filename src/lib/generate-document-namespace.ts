import * as uuid from 'uuid';

export function generateDocumentNameSpace(outputFileName: string): string {
  const randomUuid = uuid.v4();
  return `spdx.org/spdxdocs/${outputFileName}-${randomUuid}`;
}
