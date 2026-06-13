// Content loader — reads CMS markdown files at build time via webpack require.context
// Every time Netlify rebuilds, this picks up all files in src/content/

function parseFrontmatter(raw) {
  const str = typeof raw === 'string' ? raw : (raw.default || '');
  const match = str.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, content: str };
  const data = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    // Remove surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // Boolean
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    // Number
    else if (!isNaN(val) && val !== '') val = Number(val);
    data[key] = val;
  });
  // Parse list values (tags, scope etc.) — look for array lines
  const arrayMatches = match[1].match(/(\w+):\s*\n((?:\s+-[^\n]+\n?)+)/g);
  if (arrayMatches) {
    arrayMatches.forEach(block => {
      const keyMatch = block.match(/^(\w+):/);
      if (!keyMatch) return;
      const key = keyMatch[1];
      const items = [...block.matchAll(/^\s+-\s+"?([^"\n]+)"?\s*$/gm)].map(m => m[1].trim());
      if (items.length > 0) data[key] = items;
    });
  }
  const content = str.slice(match[0].length).trim();
  return { data, content };
}

export function loadBooks() {
  try {
    const ctx = require.context('../content/books', false, /\.md$/);
    return ctx.keys()
      .map(key => {
        const raw = ctx(key);
        const { data } = parseFrontmatter(raw);
        return { ...data, slug: key.replace('./', '').replace('.md', '') };
      })
      .filter(b => b.title)
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  } catch (e) {
    return [];
  }
}

export function loadProjects() {
  try {
    const ctx = require.context('../content/projects', false, /\.md$/);
    return ctx.keys()
      .map(key => {
        const raw = ctx(key);
        const { data } = parseFrontmatter(raw);
        return { ...data, slug: key.replace('./', '').replace('.md', '') };
      })
      .filter(p => p.title)
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  } catch (e) {
    return [];
  }
}

export function loadServices() {
  try {
    const ctx = require.context('../content/services', false, /\.md$/);
    return ctx.keys()
      .map(key => {
        const raw = ctx(key);
        const { data } = parseFrontmatter(raw);
        return { ...data, slug: key.replace('./', '').replace('.md', '') };
      })
      .filter(s => s.title)
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  } catch (e) {
    return [];
  }
}

export function loadSettings() {
  try {
    const raw = require('../content/settings.md');
    const { data } = parseFrontmatter(raw);
    return data;
  } catch (e) {
    return {};
  }
}
