import type { ReactNode } from 'react';
import { Typography } from '~shared/ui/typography';
import type { HomeNewsItem } from '~shared/content/news';
import styles from './LatestNews.module.css';

type CmsNewsBlock =
  | {
      key: string;
      type: 'heading';
      text: string;
      level: 'main' | 'sub';
    }
  | {
      key: string;
      type: 'paragraph';
      lines: string[];
    }
  | {
      key: string;
      type: 'list';
      items: string[];
      ordered?: boolean;
    }
  | {
      key: string;
      type: 'image';
      src: string;
    };

const IMAGE_PATTERN = /^!\[[^\]]*]\((.+?)\)$/;
const BOLD_HEADING_PATTERN = /^\*\*(.+?)\*\*$/;
const HASH_HEADING_PATTERN = /^#\s+(.+)$/;
const BULLET_PATTERN = /^\*\s+(.+)$/;
const ORDERED_LIST_PATTERN = /^\d+\.\s+(.+)$/;
const INLINE_LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

const createUniqueKeyFactory = () => {
  const counts = new Map<string, number>();

  return (prefix: string, value: string) => {
    const normalizedValue = value.trim().toLowerCase() || 'empty';
    const baseKey = `${prefix}-${normalizedValue}`;
    const nextCount = counts.get(baseKey) ?? 0;

    counts.set(baseKey, nextCount + 1);

    return nextCount === 0 ? baseKey : `${baseKey}-${nextCount}`;
  };
};

const renderInlineText = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  const getNodeKey = createUniqueKeyFactory();
  let lastIndex = 0;
  let match = INLINE_LINK_PATTERN.exec(text);

  while (match) {
    const [fullMatch, label, href] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      const plainText = text.slice(lastIndex, matchIndex);

      nodes.push(
        <span key={getNodeKey('text', `${plainText}-${lastIndex}`)}>
          {plainText}
        </span>
      );
    }

    nodes.push(
      <a
        key={getNodeKey('link', `${label}-${href}-${matchIndex}`)}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Link}
      >
        {label}
      </a>
    );

    lastIndex = matchIndex + fullMatch.length;
    match = INLINE_LINK_PATTERN.exec(text);
  }

  if (lastIndex < text.length) {
    const plainText = text.slice(lastIndex);

    nodes.push(
      <span key={getNodeKey('text', `${plainText}-${lastIndex}`)}>
        {plainText}
      </span>
    );
  }

  if (!nodes.length) {
    nodes.push(<span key={getNodeKey('text', text)}>{text}</span>);
  }

  return nodes;
};

const renderTextWithBreaks = (text: string) => {
  const lines = text.split('\n');
  const getLineKey = createUniqueKeyFactory();

  return lines.map((line) => (
    <span key={getLineKey('line', line)}>
      {renderInlineText(line)}
      {line !== lines[lines.length - 1] ? <br /> : null}
    </span>
  ));
};

const isRichMarkdownNews = (description: string) =>
  description.split('\n').some((line) => {
    const trimmedLine = line.trim();

    return (
      HASH_HEADING_PATTERN.test(trimmedLine) ||
      BULLET_PATTERN.test(trimmedLine) ||
      ORDERED_LIST_PATTERN.test(trimmedLine)
    );
  });

const parseSimpleNewsBlocks = (description: string): CmsNewsBlock[] => {
  const blocks: CmsNewsBlock[] = [];
  const getBlockKey = createUniqueKeyFactory();
  const paragraphs = description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  paragraphs.forEach((paragraph) => {
    const imageMatch = paragraph.match(IMAGE_PATTERN);

    if (imageMatch) {
      blocks.push({
        key: getBlockKey('image', imageMatch[1]),
        type: 'image',
        src: imageMatch[1],
      });

      return;
    }

    blocks.push({
      key: getBlockKey('paragraph', paragraph),
      type: 'paragraph',
      lines: paragraph.split('\n').map((line) => line.trim()),
    });
  });

  return blocks;
};

const parseRichNewsBlocks = (description: string): CmsNewsBlock[] => {
  const blocks: CmsNewsBlock[] = [];
  const getBlockKey = createUniqueKeyFactory();
  const lines = description.split('\n');
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let listType: 'unordered' | 'ordered' | null = null;

  const flushParagraph = () => {
    if (!paragraphBuffer.length) {
      return;
    }

    blocks.push({
      key: getBlockKey('paragraph', paragraphBuffer.join(' ')),
      type: 'paragraph',
      lines: paragraphBuffer,
    });
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length) {
      return;
    }

    blocks.push({
      key: getBlockKey('list', listBuffer.join(' ')),
      type: 'list',
      items: listBuffer,
      ordered: listType === 'ordered',
    });
    listBuffer = [];
    listType = null;
  };

  const pushHeading = (text: string) => {
    blocks.push({
      key: getBlockKey('heading', text),
      type: 'heading',
      text,
      level: 'main',
    });
  };

  const setListMode = (nextListType: 'unordered' | 'ordered') => {
    if (listType && listType !== nextListType) {
      flushList();
    }

    listType = nextListType;
  };

  const pushImage = (src: string) => {
    flushParagraph();
    flushList();
    blocks.push({
      key: getBlockKey('image', src),
      type: 'image',
      src,
    });
  };

  const tryPushHeading = (line: string) => {
    const boldHeadingMatch = line.match(BOLD_HEADING_PATTERN);

    if (boldHeadingMatch) {
      flushParagraph();
      flushList();
      pushHeading(boldHeadingMatch[1].trim());

      return true;
    }

    const hashHeadingMatch = line.match(HASH_HEADING_PATTERN);

    if (!hashHeadingMatch) {
      return false;
    }

    flushParagraph();
    flushList();
    pushHeading(hashHeadingMatch[1].trim());

    return true;
  };

  const tryPushListItem = (line: string) => {
    const bulletMatch = line.match(BULLET_PATTERN);

    if (bulletMatch) {
      flushParagraph();
      setListMode('unordered');
      listBuffer.push(bulletMatch[1].trim());

      return true;
    }

    const orderedListMatch = line.match(ORDERED_LIST_PATTERN);

    if (!orderedListMatch) {
      return false;
    }

    flushParagraph();
    setListMode('ordered');
    listBuffer.push(orderedListMatch[1].trim());

    return true;
  };

  const processRichLine = (rawLine: string) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();

      return;
    }

    const imageMatch = line.match(IMAGE_PATTERN);

    if (imageMatch) {
      pushImage(imageMatch[1]);

      return;
    }

    if (tryPushHeading(line) || tryPushListItem(line)) {
      return;
    }

    paragraphBuffer.push(line);
  };

  lines.forEach(processRichLine);

  flushParagraph();
  flushList();

  if (
    blocks[0]?.type === 'paragraph' &&
    blocks.some((block) => block.type === 'image' || block.type === 'heading')
  ) {
    return blocks.slice(1);
  }

  return blocks;
};

export function CmsNewsContent({ item }: { item: HomeNewsItem }) {
  const blocks = isRichMarkdownNews(item.description)
    ? parseRichNewsBlocks(item.description)
    : parseSimpleNewsBlocks(item.description);

  return (
    <div className={styles.NewsItem}>
      {blocks.map((block) => {
        if (block.type === 'heading') {
          return (
            <div key={`${item.id}-${block.key}`} className={styles.Block}>
              <Typography
                weight="demiBold"
                component="h3"
                className={
                  block.level === 'main' ? styles.Title : styles.Subtitle
                }
              >
                {block.text}
              </Typography>
            </div>
          );
        }

        if (block.type === 'image') {
          return (
            <img
              key={`${item.id}-${block.key}`}
              src={block.src}
              className={styles.CmsImage}
              alt={item.title}
            />
          );
        }

        if (block.type === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul';

          return (
            <div key={`${item.id}-${block.key}`} className={styles.Block}>
              <ListTag
                className={block.ordered ? styles.OrderedList : styles.List}
              >
                {block.items.map((listItem) => (
                  <li key={`${item.id}-${block.key}-${listItem}`}>
                    {renderInlineText(listItem)}
                  </li>
                ))}
              </ListTag>
            </div>
          );
        }

        return (
          <div key={`${item.id}-${block.key}`} className={styles.Block}>
            <Typography className={styles.Description}>
              {renderTextWithBreaks(block.lines.join('\n'))}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
