export interface DesignTokens {
  light: Record<string, string>;
  dark: Record<string, string>;
}

function parseVars(block: string | undefined): Record<string, string> {
  if (!block) return {};
  const vars: Record<string, string> = {};
  for (const line of block.split(';')) {
    const match = line.match(/--([a-zA-Z0-9-]+)\s*:\s*(.+)/);
    if (match) vars[match[1].trim()] = match[2].trim();
  }
  return vars;
}

export function parseDesignTokens(css: string): DesignTokens {
  const rootBlock = css.match(/:root\s*\{([^}]*)\}/)?.[1];
  const darkBlock = css.match(/\.dark\s*\{([^}]*)\}/)?.[1];
  return {
    light: parseVars(rootBlock),
    dark: parseVars(darkBlock),
  };
}
