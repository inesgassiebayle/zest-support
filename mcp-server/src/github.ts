const API = 'https://api.github.com';

function repoSlug(): string {
  return process.env.ZEST_GITHUB_REPO ?? 'inesgassiebayle/zest-support';
}

function ref(): string {
  return process.env.ZEST_GITHUB_REF ?? 'main';
}

function token(): string {
  const t = process.env.GITHUB_TOKEN;
  if (!t) {
    throw new Error(
      `GITHUB_TOKEN is not set. Generate a token with read access to ${repoSlug()} ` +
        "(e.g. run `gh auth token` if you're logged into the gh CLI) and set it as GITHUB_TOKEN " +
        'in this MCP server\'s env config.',
    );
  }
  return t;
}

function headers(extra: Record<string, string> = {}): Record<string, string> {
  return {
    Authorization: `Bearer ${token()}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...extra,
  };
}

interface ContentsFile {
  content: string;
  encoding: BufferEncoding;
}

interface ContentsEntry {
  name: string;
  path: string;
  type: string;
}

export async function getFile(path: string): Promise<string> {
  const url = `${API}/repos/${repoSlug()}/contents/${path}?ref=${ref()}`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    throw new Error(`GitHub API error fetching ${path}: ${res.status} ${res.statusText} — ${await res.text()}`);
  }
  const data = (await res.json()) as ContentsFile;
  return Buffer.from(data.content, data.encoding).toString('utf-8');
}

export async function listDir(path: string): Promise<ContentsEntry[]> {
  const url = `${API}/repos/${repoSlug()}/contents/${path}?ref=${ref()}`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    throw new Error(`GitHub API error listing ${path}: ${res.status} ${res.statusText} — ${await res.text()}`);
  }
  const data = (await res.json()) as ContentsEntry[];
  return data.map((e) => ({ name: e.name, path: e.path, type: e.type }));
}

export async function createIssue(input: {
  title: string;
  body: string;
  labels?: string[];
}): Promise<{ url: string; number: number }> {
  const url = `${API}/repos/${repoSlug()}/issues`;
  const res = await fetch(url, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`GitHub API error creating issue: ${res.status} ${res.statusText} — ${await res.text()}`);
  }
  const data = (await res.json()) as { html_url: string; number: number };
  return { url: data.html_url, number: data.number };
}
