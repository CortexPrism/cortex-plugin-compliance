// deno-lint-ignore-file require-await, no-unused-vars
import { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { tools } from '../../mod.ts';
import type { PluginContext, ToolContext } from '../../types.ts';

// Mock PluginContext
const mockContext: PluginContext & ToolContext = {
  pluginId: 'cortex-plugin-compliance',
  pluginDir: '/tmp/plugins/cortex-plugin-compliance',
  state: {
    get: async () => null,
    set: async () => {},
    delete: async () => {},
    list: async () => ({}),
  },
  config: {
    get: async () => null,
    set: async () => {},
    getAll: async () => ({}),
  },
  logger: {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  },
  host: {
    registerTool: () => {},
    unregisterTool: () => {},
  },
  sessionId: 'test-session',
  workingDir: '/tmp',
  agentId: 'test-agent',
  workspaceDir: '/tmp',
};

function findTool(name: string) {
  const tool = tools.find((t) => t.definition.name === name);
  if (!tool) throw new Error(`Tool "${name}" not found`);
  return tool;
}

Deno.test('tools array — exports all tools', () => {
  assertEquals(tools.length, 5);
  assertEquals(tools[0].definition.name, 'compliance_audit');
  assertEquals(tools[1].definition.name, 'compliance_generate_report');
  assertEquals(tools[2].definition.name, 'compliance_list_rules');
  assertEquals(tools[3].definition.name, 'compliance_check_policy');
  assertEquals(tools[4].definition.name, 'compliance_evidence');
});

Deno.test('compliance_audit — rejects empty framework', async () => {
  const tool = findTool('compliance_audit');
  const result = await tool.execute({ 'framework': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('compliance_generate_report — rejects empty findings', async () => {
  const tool = findTool('compliance_generate_report');
  const result = await tool.execute({ 'findings': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('compliance_list_rules — rejects empty framework', async () => {
  const tool = findTool('compliance_list_rules');
  const result = await tool.execute({ 'framework': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('compliance_check_policy — rejects empty framework', async () => {
  const tool = findTool('compliance_check_policy');
  const result = await tool.execute({ 'framework': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('compliance_evidence — rejects empty framework', async () => {
  const tool = findTool('compliance_evidence');
  const result = await tool.execute({ 'framework': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('all tools return durationMs', async () => {
  for (const tool of tools) {
    const args: Record<string, unknown> = {};
    const result = await tool.execute(args, mockContext);
    assertEquals(typeof result.durationMs, 'number');
    assertEquals(result.durationMs >= 0, true);
  }
});
