// Components
import { Typography } from '~shared/ui/typography';
// Assets
import AgesActivities1 from '~app/assets/AgesActivities1.png';
import AgesActivities2 from '~app/assets/AgesActivities2.png';
import AgesActivities3 from '~app/assets/AgesActivities3.png';
import classNames from 'classnames';
import { CollapsibleRow } from '../CollapsibleRow';
// Styles
import styles from './AgesActivities.module.css';

function ImagesBlock() {
  return (
    <>
      <img src={AgesActivities1} className={styles.Image} />
      <img src={AgesActivities2} className={styles.Image} />
      <img src={AgesActivities3} className={styles.Image} />
    </>
  );
}

export function AgesActivities() {
  return (
    <>
      <article className={styles.Content}>
        <Typography component="h3" weight="demiBold" className={styles.Title}>
          Занятия для всех возрастов
        </Typography>
        <div className={styles.Article}>
          <Typography>
            На наших занятиях вы всесторонне развиваете силу, ловкость и
            гибкость: от основного джинга до зрелищных акробатических трюков, а
            также осваиваете эффективные приёмы самообороны в контролируемых
            спаррингах в «роде», что формирует уверенность, быстроту реакции и
            правильную технику движений капоэйры.
          </Typography>

          <Typography>
            Погрузитесь в афро-бразильскую культуру через музыку: научитесь
            играя на беримбау, пандейру и атabaque, разовьёте музыкальность и
            чувство ритма. Работа в паре и совместные «роды» укрепляют
            взаимопонимание, синхронность и командный дух. Присоединяйтесь,
            чтобы в дружеской атмосфере обрести новые навыки и стать частью
            живого сообщества капоэйры!
          </Typography>

          <div className={styles.ImagesBlockMobile}>
            <ImagesBlock />
          </div>
        </div>
      </article>
      <div className={styles.ImagesBlockWeb}>
        <ImagesBlock />
      </div>
      <article className={styles.Content}>
        <div className={styles.HiddenPlug} />
        <div className={classNames(styles.Article, styles.NoGap)}>
          <CollapsibleRow title="Дошкольники 3–6 лет">
            <div className={styles.CollapsibleContent}>
              <Typography>
                <b>Разминка.</b> Включает бег на месте, прыжки и махи руками,
                чтобы разогреть мышцы перед началом занятий. Упражнения на
                растяжку помогут развить гибкость, улучшить кровообращение и
                подготовить тело к выполнению более сложных элементов.
              </Typography>
              <Typography>
                <b>Акробатика.</b> Дети учатся выполнять различные
                акробатические элементы, такие как кувырки, мостики, стойки на
                руках и другие.
              </Typography>
              <Typography>
                <b>Практика капоэйры.</b> Обучение основам самообороны и технике
                борьбы, развитие скорости и ловкости.
              </Typography>
              <Typography>
                <b>Музыка.</b> Изучение музыкальных инструментов и исполнение
                музыкальных композиций в рамках занятий капоэйрой.
              </Typography>
              <Typography>
                <b>Танец.</b> Изучение базовых танцевальных движений и их
                соединение с элементами капоэйры для создания уникальных
                танцевальных композиций.
              </Typography>
              <Typography>
                Занятия проводятся в небольших группах, что позволяет уделить
                внимание каждому ребенку и обеспечить индивидуальный подход.
                Программа занятий разработана с учетом возрастных особенностей
                детей и направлена на развитие их физических и интеллектуальных
                способностей.
              </Typography>
            </div>
          </CollapsibleRow>
          <CollapsibleRow title="Начальная школа 1–4 класс">
            <div className={styles.CollapsibleContent}>
              <Typography>Заглушка</Typography>
            </div>
          </CollapsibleRow>
          <CollapsibleRow title="Средняя школа 5–11 класс">
            <div className={styles.CollapsibleContent}>
              <Typography>Заглушка</Typography>
            </div>
          </CollapsibleRow>
          <CollapsibleRow title="Взрослые от 18 лет и старше">
            <div className={styles.CollapsibleContent}>
              <Typography>Заглушка</Typography>
            </div>
          </CollapsibleRow>
        </div>
      </article>
    </>
  );
}
