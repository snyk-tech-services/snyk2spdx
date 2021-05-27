import * as debugLib from 'debug';
import * as fs from 'fs';
import { convertSnykTestOutputToSPDX, getInputData } from '../lib';
import { SnykTestOutput } from '../types';
const debug = debugLib('snyk:generate-data-script');

export const command = ['snyk:test', '$0'];
export const desc = 'Convert `snyk test --json` output to SPDX SBOM';
export const builder = {
  // input: {
  //   required: false,
  //   default: undefined,
  //   desc:
  //     'Path to `snyk test --json` output JSON file to convert to SPDX. Defaults to stdin',
  // },
  output: {
    required: false,
    default: undefined,
    desc: 'Save the output to the specified file name. Defaults to stdout',
  },
};

export async function handler(argv: {
  // input: string;
  output: string;
}): Promise<void> {
  try {
    const { output } = argv;
    debug('ℹ️  Options: ' + JSON.stringify(argv));
    const snykTestJson = await getInputData<SnykTestOutput>();
    debug('ℹ️  Got input');
    const spdxOutput = convertSnykTestOutputToSPDX(snykTestJson);
    debug('ℹ️  Converted to SPDX');

    const spdxOutputStringified = JSON.stringify(spdxOutput);
    if (output) {
      fs.writeFileSync(output, spdxOutputStringified);
      console.log('SPDX document saved at ' + output);
    } else {
      console.log(spdxOutputStringified);
    }
  } catch (e) {
    debug('Failed to generate data.\n' + e.message);
    console.error(
      `ERROR! Failed to convert to SPDX. Try running with \`DEBUG=snyk* <command> for more info\`.\nERROR: ${e}`,
    );
    process.exit(1);
  }
}
