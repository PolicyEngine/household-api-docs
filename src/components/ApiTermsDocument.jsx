import Link from 'next/link';

function isDivider(line) {
  return line.trim() === '---';
}

function isTopLevelHeading(line) {
  return line.startsWith('# ');
}

function isSectionHeading(line) {
  return line.startsWith('## ');
}

function isOrderedListItem(line) {
  return /^\d+\.\s/.test(line.trim());
}

function renderLink(href, children, key) {
  if (href.startsWith('/')) {
    return (
      <Link
        key={key}
        href={href}
        className="font-medium text-primary-700 underline decoration-primary-300 underline-offset-4 transition-colors hover:text-primary-800 hover:decoration-primary-500"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary-700 underline decoration-primary-300 underline-offset-4 transition-colors hover:text-primary-800 hover:decoration-primary-500"
    >
      {children}
    </a>
  );
}

function renderInlineMarkdown(text, keyPrefix) {
  const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const nodes = [];
  let cursor = 0;
  let tokenIndex = 0;

  for (const match of text.matchAll(tokenPattern)) {
    const [token] = match;
    const index = match.index ?? 0;

    if (index > cursor) {
      nodes.push(text.slice(cursor, index));
    }

    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}-strong-${tokenIndex}`} className="font-semibold text-text-primary">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      const [, label, href] = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/) ?? [];

      if (label && href) {
        nodes.push(renderLink(href, label, `${keyPrefix}-link-${tokenIndex}`));
      } else {
        nodes.push(token);
      }
    }

    cursor = index + token.length;
    tokenIndex += 1;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function renderParagraphLines(lines, keyPrefix) {
  const children = [];

  lines.forEach((line, lineIndex) => {
    const hasHardBreak = /\s{2,}$/.test(line);
    const content = hasHardBreak ? line.replace(/\s+$/, '') : line.trim();

    children.push(...renderInlineMarkdown(content, `${keyPrefix}-${lineIndex}`));

    if (lineIndex < lines.length - 1) {
      children.push(hasHardBreak ? <br key={`${keyPrefix}-br-${lineIndex}`} /> : ' ');
    }
  });

  return children;
}

export default function ApiTermsDocument({ markdown }) {
  const lines = markdown.trim().split('\n');
  const blocks = [];
  let lineIndex = 0;
  let blockIndex = 0;

  while (lineIndex < lines.length) {
    const line = lines[lineIndex];

    if (!line.trim()) {
      lineIndex += 1;
      continue;
    }

    if (isDivider(line)) {
      blocks.push(<hr key={`divider-${blockIndex}`} className="my-8 border-0 border-t border-border-light" />);
      lineIndex += 1;
      blockIndex += 1;
      continue;
    }

    if (isTopLevelHeading(line)) {
      blocks.push(
        <h1
          key={`h1-${blockIndex}`}
          className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
        >
          {renderInlineMarkdown(line.slice(2), `h1-${blockIndex}`)}
        </h1>
      );
      lineIndex += 1;
      blockIndex += 1;
      continue;
    }

    if (isSectionHeading(line)) {
      blocks.push(
        <h2
          key={`h2-${blockIndex}`}
          className="mt-10 text-2xl font-semibold tracking-tight text-text-primary sm:text-[2rem]"
        >
          {renderInlineMarkdown(line.slice(3), `h2-${blockIndex}`)}
        </h2>
      );
      lineIndex += 1;
      blockIndex += 1;
      continue;
    }

    if (isOrderedListItem(line)) {
      const items = [];

      while (lineIndex < lines.length) {
        if (isOrderedListItem(lines[lineIndex])) {
          items.push(lines[lineIndex].trim().replace(/^\d+\.\s/, ''));
          lineIndex += 1;
          continue;
        }

        if (!lines[lineIndex].trim() && isOrderedListItem(lines[lineIndex + 1] ?? '')) {
          lineIndex += 1;
          continue;
        }

        break;
      }

      blocks.push(
        <ol
          key={`ol-${blockIndex}`}
          className="mt-4 ml-5 list-decimal space-y-3 text-[1.02rem] leading-7 text-secondary-700"
        >
          {items.map((item, itemIndex) => (
            <li key={`ol-${blockIndex}-${itemIndex}`} className="pl-1">
              {renderInlineMarkdown(item, `ol-${blockIndex}-${itemIndex}`)}
            </li>
          ))}
        </ol>
      );
      blockIndex += 1;
      continue;
    }

    const paragraphLines = [line];
    lineIndex += 1;

    while (
      lineIndex < lines.length &&
      lines[lineIndex].trim() &&
      !isDivider(lines[lineIndex]) &&
      !isTopLevelHeading(lines[lineIndex]) &&
      !isSectionHeading(lines[lineIndex]) &&
      !isOrderedListItem(lines[lineIndex])
    ) {
      paragraphLines.push(lines[lineIndex]);
      lineIndex += 1;
    }

    blocks.push(
      <p key={`p-${blockIndex}`} className="mt-4 text-[1.02rem] leading-7 text-secondary-700">
        {renderParagraphLines(paragraphLines, `p-${blockIndex}`)}
      </p>
    );
    blockIndex += 1;
  }

  return (
    <article className="rounded-[2rem] border border-border-light bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:px-10 sm:py-12 lg:px-14">
      {blocks}
    </article>
  );
}
