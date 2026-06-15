# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangel.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup

## [1.0.0] — 2026-06-15

### Added
- Initial release of cortex-plugin-compliance
- `compliance_audit` — Run audits against SOC 2, HIPAA, GDPR, PCI-DSS
- `compliance_generate_report` — Generate compliance reports from findings
- `compliance_list_rules` — List rules per framework with category filtering
- `compliance_check_policy` — Check specific rules against target paths
- `compliance_evidence` — Collect evidence for controls
- 11 built-in rules per framework (44 total)
