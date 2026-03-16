import { Typography } from '~shared/ui/typography';
import type { HomeNewsItem } from '~shared/content/news';
import Pic1 from '~app/assets/NewsPic1.png';
import Pic2 from '~app/assets/NewsPic2.png';
import Pic3 from '~app/assets/NewsPic3.png';
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

const renderTextWithBreaks = (text: string) => {
  const lines = text.split('\n');
  const getLineKey = createUniqueKeyFactory();

  return lines.map((line) => (
    <span key={getLineKey('line', line)}>
      {line}
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
                    {listItem}
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

export function News1() {
  return (
    <div className={styles.NewsItem}>
      <img src={Pic1} className={styles.Image} alt="Дети на тренировке" />
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Что такое капоэйра?
        </Typography>
        <Typography className={styles.Description}>
          Это уникальное боевое искусство из Бразилии, объединяющее элементы
          акробатики, музыки, танца и самообороны. Капоэйра — не просто спорт, а
          целая культура движения и самовыражения.
        </Typography>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Что дают занятия
        </Typography>
        <ul>
          <li>Всестороннее физическое развитие</li>
          <li>Улучшение координации, контроля движений и реакций</li>
          <li>
            Гибкость и хорошая растяжка благодаря упражнениям на подвижность
            суставов
          </li>
          <li>
            Акробатические навыки — от простых элементов до сложных трюков
          </li>
          <li>
            Навыки самообороны — владение ударной техникой и защитными приемами
          </li>
          <li>Навыки коммуникации — взаимодействие с тренером и партнерами</li>
          <li>
            Раскрытие творческого потенциала — через восприятие музыки и ритма
          </li>
        </ul>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Возрастные группы
        </Typography>
        <Typography className={styles.Description}>
          3–6 лет: игровые тренировки для развития координации
          <br />
          7–10 лет: упражнения с элементами акробатики
          <br />
          11–15 лет: постановка ударов, изучение более сложных приемов
          <br />
          16+: интенсивные занятия с углубленным изучением культуры капоэйры
        </Typography>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Что еще
        </Typography>
        <ul>
          <li>Пробное занятие — бесплатно</li>
          <li>Группа состоит из 10-15 человек</li>
          <li>Занятия проводят опытные тренеры</li>
          <li>Используем современный инвентарь</li>
        </ul>
        <Typography className={styles.Description}>
          Для записи на занятие заполните форму на сайте, напишите в мессенджере
          или позвоните по номеру: +7 (925) 555 00 77
        </Typography>
        <Typography className={styles.Description}>
          Начните свой путь в мир капоэйры!
        </Typography>
      </div>
    </div>
  );
}

export function News2() {
  return (
    <div className={styles.NewsItem}>
      <Typography className={styles.Description}>
        Бразильские мастера капоэйры подготовили увлекательные мастер-классы для
        детей. В программе тренировки, танцы и игры на свежем воздухе
      </Typography>
      <img
        src={Pic2}
        className={styles.Image}
        alt="Спортивные сборы для детей"
      />
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Даты
        </Typography>
        <Typography className={styles.Description}>
          24–26 октября 2025
          <br /> 31 октября – 2 ноября 2025
        </Typography>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Программа
        </Typography>
        <ul>
          <li>Утренние тренировки по капоэйре</li>
          <li>Творческие мастер-классы по бразильским танцам и музыке</li>
          <li>Игры на свежем воздухе</li>
          <li>Спортивные соревнования между группами</li>
          <li>Творческие конкурсы и командные игры</li>
          <li>Вечерние развлекательные активности</li>
        </ul>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Условия проживания
        </Typography>
        <ul>
          <li>Комфортные номера</li>
          <li>Полноценное питание по расписанию</li>
          <li>Круглосуточный присмотр опытных вожатых и тренеров</li>
          <li>Безопасная территория под охраной</li>
        </ul>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Что включено в стоимость
        </Typography>
        <ul>
          <li>Трансфер туда-обратно</li>
          <li>Проживание на период сборов</li>
          <li>Трехразовое питание</li>
          <li>Все тренировки и мастер-классы</li>
          <li>Развлекательная программа</li>
          <li>Работа тренеров</li>
        </ul>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Как записаться
        </Typography>
        <Typography className={styles.Description}>
          1. Заполните форму на сайте
          <br />
          2. Внесите предоплату
          <br />
          3. Предоставьте необходимые документы
        </Typography>
        <Typography className={styles.Description}>
          Подарите ребенку незабываемые впечатления, а также возможность стать
          спортивнее и приобрести новых друзей
        </Typography>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Место проведения
        </Typography>
        <Typography className={styles.Description}>
          Дом отдыха в Подмосковье — живописная территория с современной
          инфраструктурой для активного отдыха и тренировок
        </Typography>
      </div>
    </div>
  );
}

export function News3() {
  return (
    <div className={styles.NewsItem}>
      <Typography className={styles.Description}>
        Приглашаем на мастер-классы по капоэйре от лучших тренеров. Это не
        только возможность продвинуться в боевом искусстве, но и завести новые
        знакомства.
      </Typography>
      <img
        src={Pic3}
        className={styles.Image}
        alt="Мастер-классы для взрослых"
      />
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Даты
        </Typography>
        <Typography className={styles.Description}>7–9 ноября 2025</Typography>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Программа
        </Typography>
        <ul>
          <li>Интенсивные тренировки по капоэйре</li>
          <li>Мастер-классы от капоэйристов из Бразилии</li>
          <li>Активности на свежем воздухе</li>
          <li>Настоящая бразильская вечеринка</li>
        </ul>
        <Typography className={styles.Description}>
          Успейте записаться — и станьте частью комьюнити капоэйристов
        </Typography>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          Место проведения
        </Typography>
        <Typography className={styles.Description}>
          Дом отдыха в Подмосковье — живописная территория с современной
          инфраструктурой для активного отдыха и тренировок
        </Typography>
      </div>
    </div>
  );
}

export function News4() {
  return (
    <div className={styles.NewsItem}>
      <Typography className={styles.Description}>
        Мы создали целую экосистему для тех, кто хочет быть в курсе событий
        школы. Присоединяйтесь в соцсетях, чтобы ничего не пропустить.
      </Typography>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          1. Группа в Telegram
        </Typography>
        <ul>
          <li>Новости и анонсы событий</li>
          <li>Обмен опытом и поддержка сообщества</li>
          <li>Фото и видео с тренировок и мероприятий</li>
          <li>Обсуждение спортивных техник и приемов</li>
        </ul>
        <a
          href="https://t.me/real_capoeira"
          target="_blank"
          rel="noopener noreferrer"
        >
          Перейти в группу
        </a>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          2. Чат-бот в Telegram
        </Typography>
        <ul>
          <li>
            Календарь на год — все тренировки, соревнования и мастер-классы в
            одном месте
          </li>
        </ul>
        <a
          href="https://t.me/+79255550077"
          target="_blank"
          rel="noopener noreferrer"
        >
          Перейти к боту
        </a>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          3. YouTube-канал
        </Typography>
        <ul>
          <li>Обучающие видео для новичков</li>
          <li>Мастер-классы от наших тренеров</li>
          <li>Записи выступлений и соревнований</li>
          <li>Интервью с мастерами капоэйры</li>
          <li>Разборы сложных техник и комбинаций</li>
        </ul>
        <a
          href="https://youtube.com/@realcapoeira1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Перейти в канал
        </a>
      </div>
      <div className={styles.Block}>
        <Typography weight="demiBold" component="h3" className={styles.Title}>
          4. Группа в VK
        </Typography>
        <ul>
          <li>Большое комьюнити единомышленников</li>
          <li>Фотоальбомы с мероприятий</li>
          <li>Обсуждения и советы от опытных капоэйристов</li>
          <li>Анонсы предстоящих событий</li>
          <li>Полезные материалы и статьи</li>
        </ul>
        <a
          href="https://vk.com/realcapoeira"
          target="_blank"
          rel="noopener noreferrer"
        >
          Перейти в группу
        </a>
      </div>
      <Typography className={styles.Description}>
        Отмечайте нас в соцсетях — будем рады вашим отзывам и фотографиям
      </Typography>
    </div>
  );
}
