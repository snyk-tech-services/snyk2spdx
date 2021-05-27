#!/usr/bin/env node
import * as yargs from 'yargs';
import 'source-map-support/register';

export { convertSnykTestOutputToSPDX } from './lib';

yargs
  .commandDir('cmds')
  .help()
  .demandCommand().argv;
