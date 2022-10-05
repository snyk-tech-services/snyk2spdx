![Snyk logo](https://snyk.io/style/asset/logo/snyk-print.svg)

***

[![Known Vulnerabilities](https://snyk.io/test/github/snyk-tech-services/snyk2spdx/badge.svg)](https://snyk.io/test/github/snyk-tech-services/snyk2spdx)

Snyk helps you find, fix, and monitor known vulnerabilities in your dependencies--both on an ad hoc basis and as part of your CI (build) system.

## Snyk snyk2spdx
[![Inactively Maintained](https://img.shields.io/badge/Maintenance%20Level-Inactively%20Maintained-yellowgreen.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d)


**This repository is in maintenance mode, no new features are being developed. Bug & security fixes will continue to be delivered. Open source contributions are welcome for small features & fixes (no breaking changes)**


Convert the Snyk CLI output to SPDX format. 
Note: **This repository is not in active developemnt and critical bug fixes only will be considered.**

## Notice
**snyk2spdx does not support using the `--all-projects` flag with `snyk test`. Please use only `snyk test`**

## Usage
- Basic
`snyk test --json | snyk2spdx`

- With output file:
`snyk test --json | snyk2spdx --output=spdx.json`

```
Commands:
  snyk2spdx snyk:test  Convert `snyk test --json` output to SPDX SBOM  [default]

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --output   Save the output to the specified file name. Defaults to stdout
```
