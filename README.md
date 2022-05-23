![Snyk logo](https://snyk.io/style/asset/logo/snyk-print.svg)

***

[![Known Vulnerabilities](https://snyk.io/test/github/snyk-tech-services/snyk2spdx/badge.svg)](https://snyk.io/test/github/snyk-tech-services/snyk2spdx)

Snyk helps you find, fix, and monitor known vulnerabilities in your dependencies--both on an ad hoc basis and as part of your CI (build) system.

## Snyk snyk2spdx
Convert the Snyk CLI output to SPDX format

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
