import { useMemo } from 'react';
import { useRoute } from '@tramvai/module-router';
import { useSelector } from '@tramvai/state';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { CoachAvatar } from 'src/routes/coaches/ui/CoachAvatar';
import { CoachesStore } from '~shared/stores/coaches';
import Telegram from '~app/assets/socialIcons/Telegram.svg?react';
import Whatsapp from '~app/assets/socialIcons/Whatsapp.svg?react';
import Vk from '~app/assets/socialIcons/Vk.svg?react';
import styles from './HeaderPart.module.css';

export function HeaderPart() {
  const route = useRoute();
  const { id } = route.params;
  const coaches = useSelector(CoachesStore, (state) => state.coaches);

  const coach = useMemo(
    () => coaches?.find((c) => c.slug === id),
    [coaches, id]
  );

  if (!coach) return null;

  const { level, photo, nick, name, slug } = coach;

  const handleScrollToForm = () => {
    const formElement = document.getElementById('signup');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className={styles.MobileHeader} id="#headerScrollMarker">
        <CoachAvatar
          photo={photo?.url || ''}
          name={name}
          level={level}
          variant="medium"
        />
        <div className={styles.MasterInfo}>
          <Typography
            color="white"
            weight="demiBold"
            className={styles.Title}
          >{`${level} ${nick}`}</Typography>
          <Typography
            color="yellow"
            component="h1"
            weight="demiBold"
            className={styles.Name}
          >
            {name}
          </Typography>
        </div>
        <div className={styles.Buttons}>
          <Button
            className={styles.Button}
            color="yellow"
            onClick={handleScrollToForm}
          >
            Записаться
          </Button>

          <Button
            className={styles.Button}
            color="white"
            url={`/filials?coach=${slug}`}
            target="_self"
          >
            Филиалы
          </Button>
        </div>
      </section>
      <section className={styles.DesktopHeader}>
        <div className={styles.CoachInfo}>
          <div className={styles.CoachInfoTitle}>
            <Typography
              color="white"
              weight="demiBold"
              className={styles.Title}
            >{`${level} ${nick}`}</Typography>
            <Typography
              color="yellow"
              component="h1"
              weight="demiBold"
              className={styles.Name}
            >
              {name}
            </Typography>
          </div>
          <div className={styles.DesktopButtons}>
            <div className={styles.DesktopMainButtons}>
              <Button
                className={styles.DesktopButton}
                color="yellow"
                onClick={handleScrollToForm}
              >
                Записаться
              </Button>
              <Button
                className={styles.DesktopButton}
                color="white"
                url={`/filials?coach=${slug}`}
                target="_self"
              >
                Филиалы
              </Button>
            </div>
            <div className={styles.DesktopSocials}>
              {coach.linkTg && (
                <a
                  className={styles.SocialLink}
                  href={`https://t.me/${coach.linkTg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Telegram />
                </a>
              )}
              {coach.linkWa && (
                <a
                  className={styles.SocialLink}
                  href={`https://wa.me/${coach.linkWa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Whatsapp />
                </a>
              )}
              {coach.linkVk && (
                <a
                  className={styles.SocialLink}
                  href={`https://vk.com/${coach.linkVk}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Vk />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className={styles.CoachAvatarWrapper}>
          <CoachAvatar
            photo={photo?.url || ''}
            name={name}
            level={level}
            variant="large"
          />
        </div>
      </section>
    </>
  );
}
