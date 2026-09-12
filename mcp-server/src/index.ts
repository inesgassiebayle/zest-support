#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { getFile, listDir, createIssue } from './github.js';
import { parseDesignTokens } from './design-tokens.js';

const server = new McpServer({
  name: 'zest-docs',
  version: '0.1.0',
});

server.registerTool(
  'list_skills',
  {
    title: 'List Zest skill docs',
    description:
      "List the per-layer convention docs in zest-support's skills/ folder (backend, frontend, database, auth, infra, git-workflow). Call this before get_skill if you're not sure of the exact name.",
  },
  async () => {
    const entries = await listDir('skills');
    const files = entries.filter((e) => e.type === 'file' && e.name.endsWith('.md'));
    return {
      content: [{ type: 'text', text: files.map((f) => `- ${f.name}`).join('\n') }],
    };
  },
);

server.registerTool(
  'get_skill',
  {
    title: 'Get a Zest skill doc',
    description:
      "Fetch the full current content of a skills/*.md convention file, always live from zest-support's main branch — never rely on a cached or remembered copy.",
    inputSchema: {
      name: z
        .string()
        .describe("Skill file name without .md, e.g. 'backend', 'frontend', 'database', 'auth', 'infra', 'git-workflow'. Use 'AGENTS' for the root AGENTS.md."),
    },
  },
  async ({ name }) => {
    const path = name === 'AGENTS' ? 'AGENTS.md' : `skills/${name}.md`;
    const text = await getFile(path);
    return { content: [{ type: 'text', text }] };
  },
);

server.registerTool(
  'get_schema',
  {
    title: 'Get the Zest database schema',
    description:
      'Fetch docs/db.md, the source-of-truth database schema for Zest — the entity list, fields, and design decisions. This is authoritative over docs/tech-stack.md, which is known to be stale on entity names.',
  },
  async () => {
    const text = await getFile('docs/db.md');
    return { content: [{ type: 'text', text }] };
  },
);

server.registerTool(
  'get_tech_stack',
  {
    title: 'Get the Zest tech stack doc',
    description:
      'Fetch docs/tech-stack.md — the chosen stack, architecture (Docker on EC2), and deployment decisions, with the reasoning behind each choice.',
  },
  async () => {
    const text = await getFile('docs/tech-stack.md');
    return { content: [{ type: 'text', text }] };
  },
);

server.registerTool(
  'get_design_tokens',
  {
    title: 'Get Zest design tokens',
    description:
      'Fetch and parse the live design tokens (colors, fonts, radius, light and dark) straight from the coded design reference. Use this instead of hardcoding hex values or guessing at the palette.',
  },
  async () => {
    const css = await getFile('design/uploads/zest-wireframe-design/app/globals.css');
    const tokens = parseDesignTokens(css);
    return { content: [{ type: 'text', text: JSON.stringify(tokens, null, 2) }] };
  },
);

server.registerTool(
  'get_design_prototype',
  {
    title: 'Get the Zest interactive prototype',
    description:
      'Fetch the raw HTML of the interactive prototype covering every screen (auth, feed, recipe detail, create recipe, collections, planner, and modals). Large file — call this when you need the actual layout/copy for a specific screen, not just the color/font tokens.',
  },
  async () => {
    const text = await getFile('design/zest/Zest.dc.html');
    return { content: [{ type: 'text', text }] };
  },
);

server.registerTool(
  'report_skill_miss',
  {
    title: 'Report a skill/convention miss',
    description:
      "File a 'Skill / convention miss' issue on zest-support when a convention doc is wrong, missing, or you did something it should have prevented. Use this instead of silently working around a gap — it's exactly what the process is for.",
    inputSchema: {
      layer: z
        .enum([
          'AGENTS.md (general/project-wide)',
          'skills/frontend.md',
          'skills/backend.md',
          'skills/database.md',
          'skills/auth.md',
          'skills/infra.md',
          'skills/git-workflow.md',
          'Not covered by any existing file',
        ])
        .describe('Which file this is about'),
      agent: z.string().optional().describe("Which agent/tool you are, e.g. 'Codex' or 'Claude Code'"),
      task: z.string().describe('What you were asked to do'),
      miss: z.string().describe('What actually happened — the miss'),
      expected: z.string().describe("What should have happened per the docs, or what's missing from them"),
      fix: z.string().optional().describe('Suggested fix to the doc, if you have one in mind'),
    },
  },
  async ({ layer, agent, task, miss, expected, fix }) => {
    const body = [
      `**Which file is this about?**\n${layer}`,
      agent ? `**Which agent/tool were you using?**\n${agent}` : null,
      `**What were you asking the agent to do?**\n${task}`,
      `**What did the agent actually do (the miss)?**\n${miss}`,
      `**What should have happened, per the docs (or what's missing from them)?**\n${expected}`,
      fix ? `**Suggested fix to the doc**\n${fix}` : null,
      '\n_Filed automatically via the zest-docs MCP server._',
    ]
      .filter(Boolean)
      .join('\n\n');

    const issue = await createIssue({
      title: `[skill-miss] ${task.slice(0, 60)}`,
      body,
      labels: ['skill-miss'],
    });
    return { content: [{ type: 'text', text: `Filed: ${issue.url}` }] };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
