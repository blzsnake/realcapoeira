import { Typography } from '~shared/ui/typography';
import Pic1 from '~app/assets/NewsPic1.png';
import Pic2 from '~app/assets/NewsPic2.png';
import Pic3 from '~app/assets/NewsPic3.png';
import styles from './LatestNews.module.css';

export function News1() {
  return (
    <div className={styles.NewsItem}>
      <img src={Pic1} className={styles.Image} />
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
      <img src={Pic2} className={styles.Image} />
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
      <img src={Pic3} className={styles.Image} />
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
          onClick={() => {
            window.open(`https://t.me/real_capoeira`, '_blank');
          }}
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
          onClick={() => {
            window.open(`https://t.me/+79255550077`, '_blank');
          }}
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
          onClick={() => {
            window.open(`https://youtube.com/@realcapoeira1`, '_blank');
          }}
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
          onClick={() => {
            window.open(`https://vk.com/realcapoeira`, '_blank');
          }}
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
