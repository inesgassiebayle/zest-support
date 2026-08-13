# zest-docs MCP server

Exposes live Zest project context to any MCP-capable coding agent — currently used by both Codex and Claude Code — instead of everyone working from a stale copy-paste of `AGENTS.md`/`skills/`. Since `zest-support` is a private repo, it reads content through the authenticated GitHub API, so it always reflects whatever's actually on `main`, not whatever happened to be checked out locally.

## Tools

| Tool | What it does |
|---|---|
| `list_skills` | Lists the files in `skills/` |
| `get_skill(name)` | Fetches a `skills/*.md` file (or `AGENTS` for the root `AGENTS.md`) |
| `get_schema` | Fetches `docs/db.md`, the source-of-truth DB schema |
| `get_tech_stack` | Fetches `docs/tech-stack.md` |
| `get_design_tokens` | Fetches and parses the live color/font/radius tokens from the coded design reference into JSON |
| `get_design_prototype` | Fetches the raw interactive prototype HTML (every screen) |
| `report_skill_miss` | Files a real "Skill / convention miss" GitHub issue — the agent can report a gap itself instead of you doing it by hand |

## Prerequisite

Each dev needs **collaborator access to this (private) repo** — the server authenticates as them via their own GitHub token. If a dev's `get_skill`/etc. calls fail with a 404 or 401, that's almost always this.

## Setup

```bash
cd mcp-server
npm install
npm run build
```

You need a `GITHUB_TOKEN` with read access to this repo (and, for `report_skill_miss`, permission to open issues — a normal collaborator token already has this). If you're logged into the `gh` CLI as a collaborator, `gh auth token` gives you one.

### Claude Code

```bash
claude mcp add zest-docs -e GITHUB_TOKEN="$(gh auth token)" -- node /absolute/path/to/zest-support/mcp-server/dist/index.js
```

(Replace the path with wherever you actually cloned `zest-support`.) Or add it to a project's `.mcp.json`:

```json
{
  "mcpServers": {
    "zest-docs": {
      "command": "node",
      "args": ["/absolute/path/to/zest-support/mcp-server/dist/index.js"],
      "env": { "GITHUB_TOKEN": "your-token-here" }
    }
  }
}
```

### Codex

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.zest-docs]
command = "node"
args = ["/absolute/path/to/zest-support/mcp-server/dist/index.js"]
env = { GITHUB_TOKEN = "your-token-here" }
```

## Config (env vars)

- `GITHUB_TOKEN` — required.
- `ZEST_GITHUB_REPO` — defaults to `inesgassiebayle/zest-support`.
- `ZEST_GITHUB_REF` — defaults to `main`.

## Local development

`npm run dev` runs the server directly from TypeScript (via `tsx`) instead of the built `dist/`, useful while iterating on a tool.
