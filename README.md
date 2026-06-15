# cortex-plugin-compliance

Policy rule packs for SOC 2, HIPAA, GDPR, PCI-DSS compliance auditing.

## Installation

```bash
cortex plugin install marketplace:cortex-plugin-compliance
cortex plugin install github:CortexPrism/cortex-plugin-compliance
cortex plugin install ./manifest.json
```

## Tools

### compliance_audit
Run a compliance audit against a target path using a specified framework.

**Parameters:**
- `framework` (string, required) — One of: soc2, hipaa, gdpr, pci_dss
- `target_path` (string, required) — Path to audit
- `output_format` (string, default: "markdown") — One of: json, markdown, html

### compliance_generate_report
Generate a compliance report from audit findings.

**Parameters:**
- `findings` (string, required) — JSON array of findings
- `framework` (string, required) — Framework name
- `include_remediation` (boolean, default: true) — Include remediation guidance

### compliance_list_rules
List rules for a specific compliance framework.

**Parameters:**
- `framework` (string, required) — Framework name
- `category` (string, optional) — Filter by category

### compliance_check_policy
Check a target path against a specific compliance rule.

**Parameters:**
- `framework` (string, required) — Framework name
- `rule_id` (string, required) — Rule identifier
- `target_path` (string, required) — Path to check

### compliance_evidence
Collect evidence for a specific compliance control.

**Parameters:**
- `framework` (string, required) — Framework name
- `control_id` (string, required) — Control identifier
- `evidence_paths` (string, optional) — Comma-separated paths

## Built-in Rules

| Framework | Rules | Categories |
|-----------|-------|------------|
| SOC 2 | 11 | access_control, encryption, monitoring, backup, change_management |
| HIPAA | 11 | phi_handling, access_logs, encryption, audit_controls |
| GDPR | 11 | data_minimization, consent, right_to_access, breach_notification, dpo |
| PCI-DSS | 11 | firewall, encryption, access_control, monitoring, testing |

## Configuration

UI setting: **Default Framework** — select from SOC 2, HIPAA, GDPR, PCI-DSS (default: SOC 2).

## Capabilities

- `tools` — Provides compliance auditing tools
- `fs:read` — Reads target files and evidence paths

## Development

```bash
deno task test
deno task validate
```

## License

MIT
