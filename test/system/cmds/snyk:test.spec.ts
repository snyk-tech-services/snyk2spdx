import { exec } from 'child_process';
import * as path from 'path';
import { deleteFiles } from '../../delete-files';

const main = './dist/index.js'.replace(/\//g, path.sep);

describe('`snyk2spdx snyk:test`', () => {
  const filesToDelete: string[] = [];
  afterEach(async () => {
    deleteFiles(filesToDelete);
  });
  it('Shows help text as expected', (done) => {
    exec(`node ${main} help`, (err, stdout) => {
      if (err) {
        throw err;
      }
      expect(err).toBeNull();
      expect(stdout.trim()).toMatchSnapshot();
      done();
    });
  }, 70000);
  it('`snyk:test` output converted to SPDX for a project with no dependencies', (done) => {
    const cliOutput = path.resolve(
      __dirname,
      '../../',
      'fixtures',
      'no-deps.json',
    );
    exec(`cat ${cliOutput} | node ${main}`, (err, stdout, stderr) => {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(JSON.parse(stdout)).toMatchObject({
        id: 'SPDXRef-no-prod-deps',
        name: 'no-prod-deps',
        specVersion: 'SPDX-3.0',
        profile: ['base', 'vulnerabilities'],
        dataLicense: 'CC0-1.0',
        creator: 'Organization: Snyk Ltd',
        vulnerabilities: [],
      });
      done();
    });
  }, 70000);

  it('`snyk:test` output converted to SPDX for a projects with vulnerabilities', (done) => {
    const cliOutput = path.resolve(
      __dirname,
      '../../',
      'fixtures',
      'no-deps.json',
    );
    exec(`cat ${cliOutput} | node ${main}`, (err, stdout, stderr) => {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(JSON.parse(stdout)).toMatchObject({
        id: 'SPDXRef-no-prod-deps',
        name: 'no-prod-deps',
        specVersion: 'SPDX-3.0',
        profile: ['base', 'vulnerabilities'],
        dataLicense: 'CC0-1.0',
        creator: 'Organization: Snyk Ltd',
        vulnerabilities: [],
      });
      done();
    });
  }, 70000);
  it('Shows help text as expected when calling command explicitly', (done) => {
    exec(`node ${main} snyk:jest help`, (err, stdout) => {
      if (err) {
        throw err;
      }
      expect(err).toBeNull();
      expect(stdout.trim()).toMatchSnapshot();
      done();
    });
  }, 70000);
});
