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
