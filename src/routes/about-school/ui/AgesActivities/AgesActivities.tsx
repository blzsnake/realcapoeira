// Components
import { Typography } from '~shared/ui/typography';
// Assets
import AgesActivities1 from '~app/assets/AgesActivities1.png';
import AgesActivities2 from '~app/assets/AgesActivities2.png';
import AgesActivities3 from '~app/assets/AgesActivities3.png';
// Styles
import styles from './AgesActivities.module.css';
import { CollapsibleRow } from '../CollapsibleRow';

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
      <CollapsibleRow title="asdsad">
        <p>asdsadasd</p>
      </CollapsibleRow>
    </>
  );
}
