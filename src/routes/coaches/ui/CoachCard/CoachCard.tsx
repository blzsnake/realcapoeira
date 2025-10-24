import cn from 'classnames';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import ARogozin from '~app/assets/coaches/s.rogozin.png';
import TRogozin from '~app/assets/coaches/t.rogozin.png';
import DBarhatov from '~app/assets/coaches/d.barhatov.png';
import AMagdych from '~app/assets/coaches/a.magdych.png';
import MRozhkov from '~app/assets/coaches/m.rozhkov.png';
import OTahaviev from '~app/assets/coaches/o.tahaviev.png';
import DMakarevich from '~app/assets/coaches/d.makarevich.png';
import MMiheev from '~app/assets/coaches/m.miheev.png';
import MFrolova from '~app/assets/coaches/m.frolova.png';
import AChmyhov from '~app/assets/coaches/a.chmyhov.png';
import AKedrova from '~app/assets/coaches/a.kedrova.png';
import EStaynow from '~app/assets/coaches/e.staynow.png';
import SAfonina from '~app/assets/coaches/s.afonina.png';
import AAragon from '~app/assets/coaches/a.aragon.png';
import AZuykin from '~app/assets/coaches/a.zuykin.png';
import IMolodozhnikov from '~app/assets/coaches/i.molodozhnikov.png';
import SGromova from '~app/assets/coaches/s.gromova.png';
import RGladkova from '~app/assets/coaches/r.gladkova.png';
import ERenne from '~app/assets/coaches/e.renne.png';
import DPopov from '~app/assets/coaches/d.popov.png';
import KMalyh from '~app/assets/coaches/k.malyh.png';
import RMinnullin from '~app/assets/coaches/r.minullin.png';
import SPolyakova from '~app/assets/coaches/s.polyakova.png';
import KSofiyskaya from '~app/assets/coaches/k.sofiyskaya.png';
import IKuznecov from '~app/assets/coaches/i.kuznecov.png';
import APolitov from '~app/assets/coaches/a.politov.png';
import styles from './CoachCard.module.css';
import type { TCoachCardProps } from './types';

const FALLBACK_PHOTO_MAP: Record<string, string> = {
  'a.rogozin': ARogozin,
  't.rogozin': TRogozin,
  'd.barhatov': DBarhatov,
  'a.magdych': AMagdych,
  'o.tahaviev': OTahaviev,
  'm.rozhkov': MRozhkov,
  'd.makarevich': DMakarevich,
  'm.miheev': MMiheev,
  'm.frolova': MFrolova,
  'a.chmyhov': AChmyhov,
  'a.kedrova': AKedrova,
  'e.staynow': EStaynow,
  'i.molodozhnikov': IMolodozhnikov,
  's.afonina': SAfonina,
  'a.aragon': AAragon,
  'a.zuykin': AZuykin,
  's.gromova': SGromova,
  'r.gladkova': RGladkova,
  'd.popov': DPopov,
  'e.renne': ERenne,
  'k.malyh': KMalyh,
  'r.minnulin': RMinnullin,
  's.polyakova': SPolyakova,
  'k.sofiyskaya': KSofiyskaya,
  'i.kuznetsov': IKuznecov,
  'a.politov': APolitov,
};

export function CoachCard({ name, level, photo, id, nick }: TCoachCardProps) {
  console.log(id, FALLBACK_PHOTO_MAP[id], 'xxx');
  return (
    <div className={styles.CoachCard}>
      <div className={cn({ [styles[level]]: level })}>
        <img
          src={
            photo || FALLBACK_PHOTO_MAP[id] || FALLBACK_PHOTO_MAP['t.rogozin']
          }
          alt={name}
          className={styles.Photo}
        />
      </div>
      <Typography weight="demiBold" className={styles.Name}>
        {name}
      </Typography>
      <Typography className={styles.Level}>{`${level} ${nick}`}</Typography>
      <div className={styles.Buttons}>
        <Button target="_self" color="white" url="">
          О тренере
        </Button>
        <Button target="_self" color="white" url={`/filials/?coach=${id}`}>
          Филиалы
        </Button>
      </div>
    </div>
  );
}
