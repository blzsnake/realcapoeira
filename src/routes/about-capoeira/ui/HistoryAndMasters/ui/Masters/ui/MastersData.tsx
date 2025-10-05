import { Typography } from '~shared/ui/typography';
import Pic1 from '~app/assets/masters/MasterPic1.png';
import Pic2 from '~app/assets/masters/MasterPic2.png';
import Pic3 from '~app/assets/masters/MasterPic3.png';
import Pic4 from '~app/assets/masters/MasterPic4.png';
import Pic5 from '~app/assets/masters/MasterPic5.png';
import Pic6 from '~app/assets/masters/MasterPic6.png';
import Pic7 from '~app/assets/masters/MasterPic7.png';
import Pic8 from '~app/assets/masters/MasterPic8.png';
import styles from './MastersData.module.css';

export function MasterData1() {
  return (
    <div className={styles.MasterData}>
      <img src={Pic1} className={styles.Image} />
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Биография
        </Typography>
        <Typography className={styles.Text}>
          Мануэль дос Рейш Машаду, больше известный как Местре Бимба, родился в
          начале XIX века в Сальвадоре, Бразилия. Его отец был батукейро —
          мастером афробразильского боевого танца батуке. С 12 лет Бимба начал
          учиться капоэйре и вскоре продемонстрировал свой талант и силу.
        </Typography>
        <Typography className={styles.Text}>
          В 1930-х он создал новый стиль — Капоэйра Режионал (Capoeira Regional)
          с четкой системой обучения. В Режионал много динамичных элементов и
          акробатики, а упор делается на борьбу и технику ударов.
        </Typography>
        <Typography className={styles.Text}>
          Чтобы доказать эффективность стиля, Бимба вызвал на поединки бойцов
          разных стилей. Он выиграл все бои и получил прозвище «Три удара»: ни
          один соперник не выдерживал больше трех его атак.
        </Typography>
        <Typography className={styles.Text}>
          Бимба сделал капоэйру доступной для среднего класса и превратил ее из
          уличной практики в уважаемое искусство. Его школа стала первой
          официальной академией капоэйры в&nbsp;Бразилии.
        </Typography>
      </div>
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Заповеди Местре Бимба
        </Typography>
        <div>
          <Typography className={styles.Text}>
            1. Не кури на тренировках.
          </Typography>
          <Typography className={styles.Text}>
            2. Не пей: алкоголь вредит телу и духу.
          </Typography>
          <Typography className={styles.Text}>
            3. Не хвастайся своими умениями вне роды — пусть они будут сюрпризом
            в бою.
          </Typography>
          <Typography className={styles.Text}>
            4. На тренировках меньше говори и больше наблюдай.
          </Typography>
          <Typography className={styles.Text}>
            5. Постоянно практикуй джингу.
          </Typography>
          <Typography className={styles.Text}>
            6. Отрабатывай базовые движения каждый день.
          </Typography>
          <Typography className={styles.Text}>
            7. Не бойся приближаться к противнику.
          </Typography>
          <Typography className={styles.Text}>
            8. Держи тело спокойным и расслабленным.
          </Typography>
          <Typography className={styles.Text}>
            9. Лучше быть побитым в роде, чем на улице.
          </Typography>
        </div>
        <div className={styles.Fact}>
          <Typography weight="demiBold">Интересный факт</Typography>
          <Typography>
            Батизада и Форматура, придуманные местре Бимба, сегодня являются
            неотъемлемой частью капоэйры
          </Typography>
        </div>
      </div>
    </div>
  );
}

export function MasterData2() {
  return (
    <div className={styles.MasterData}>
      <img src={Pic2} className={styles.Image} />
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Биография
        </Typography>
        <Typography className={styles.Text}>
          Висенти Феррейра Паштинья — мастер, который считается главным
          популяризатором капоэйры Ангола (Capoeira Angola). Он родился в
          Сальвадоре, в семье испанца и афробразильянки.
        </Typography>
        <Typography className={styles.Text}>
          С юных лет он увлекался боевыми искусствами, а в 10 лет начал
          заниматься капоэйрой. Паштинья не стремился сделать из нее систему
          подготовки бойцов, как это делал Местре Бимба, а хотел сохранить
          капоэйру как искусство свободы, философию и игру.
        </Typography>
        <Typography className={styles.Text}>
          В 1941 году Паштинья открыл Центр капоэйры Ангола, где обучал по
          традициям старых мастеров. В Ангола упор делается на игре и ритуалах,
          а бой второстепенен. Движения в этом стиле более плавные и медленные.
        </Typography>
      </div>
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Заповеди Местре Паштинья
        </Typography>
        <div>
          <Typography className={styles.Text}>
            1. Капоэйра — это прежде всего игра и диалог тел, а не драка.
          </Typography>
          <Typography className={styles.Text}>
            2. Всегда уважай партнера, даже в поединке.
          </Typography>
          <Typography className={styles.Text}>
            3. Музыка и ритм — сердце капоэйры.
          </Typography>
          <Typography className={styles.Text}>
            4. Играй с хитростью, а не с грубой силой.
          </Typography>
          <Typography className={styles.Text}>
            5. Учись у каждого, даже у младшего.
          </Typography>
        </div>
      </div>
      <div className={styles.Fact}>
        <Typography weight="demiBold">Интересный факт</Typography>
        <Typography>
          Местре Паштинья почти полностью ослеп в старости, но продолжал
          преподавать и вдохновлять учеников
        </Typography>
      </div>
    </div>
  );
}

export function MasterData3() {
  return (
    <div className={styles.MasterData}>
      <img src={Pic3} className={styles.Image} />
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Биография
        </Typography>
        <Typography className={styles.Text}>
          Рейнальду Рамус Суассуна родился в Итабуне, Бразилия. С&nbsp;детства у
          него были проблемы с ногами, и доктор посоветовал заниматься спортом.
          Так Рейнальду познакомился с капоэйрой.
        </Typography>
        <Typography className={styles.Text}>
          Будущий мастер стал тренироваться на улицах города, наблюдая за играми
          профессионалов. Повзрослев, он стал посвящать тренировкам больше
          времени. Суассуна отправился в Сальвадор, где учился у великих
          мастеров: Местре Бимба, Канжикинья, Паштинья, Вальдемара и других.
        </Typography>
        <Typography className={styles.Text}>
          В 1970-х Местре Суассуна разработал стиль Миудинью (Capoeira
          Miudinho). Это стиль игры с более быстрыми движениями, а&nbsp;также
          большим вниманием к ритму и музыкальности. При этом соперники
          находятся очень близко друг к другу, так что места для маневра
          немного.
        </Typography>
        <Typography className={styles.Text}>
          Суассуна учил необходимости постоянно практиковаться, владеть
          пространством, слушать и чувствовать музыку.
        </Typography>
      </div>
      <div className={styles.Fact}>
        <Typography weight="demiBold">Интересный факт</Typography>
        <Typography>
          У игры в стиле Миудинью свой особый ритм, который выбивают на
          инструменте беримбау
        </Typography>
      </div>
    </div>
  );
}

export function MasterData4() {
  return (
    <div className={styles.MasterData}>
      <img src={Pic4} className={styles.Image} />
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Биография
        </Typography>
        <Typography className={styles.Text}>
          Убиражара (Бира) Алмейда родился в Сальвадоре, Бразилия. Будучи
          юношей, он стал учиться капоэйре у&nbsp;Местре Бимба. А в 1960-х стал
          преподавать сам и не раз побеждал в национальных бразильских
          соревнованиях.
        </Typography>
        <Typography className={styles.Text}>
          В 1970-е Местре Акордеон переехал в США, где познакомил местных
          спортсменов с капоэйрой. Благодаря ему появилось настоящее комьюнити
          из десятка школ. Так капоэйра стала заметной и популярной за пределами
          Бразилии.
        </Typography>
        <Typography className={styles.Text}>
          В возрасте около 70 лет Бира вместе с женой и несколькими учениками
          проехал более 20 тысяч километров на велосипеде из Калифорнии в
          Сальвадор. Все, чтобы собрать пожертвования для социального проекта и
          снять документальный фильм о капоэйре. Кстати, именно благодаря делу
          всей жизни Бира познакомился с женой — Местре Суэлли.
        </Typography>
      </div>
      <div className={styles.Fact}>
        <Typography weight="demiBold">Интересный факт</Typography>
        <Typography>
          Алмейда также является композитором и автором книг о капоэйре
        </Typography>
      </div>
    </div>
  );
}

export function MasterData5() {
  return (
    <div className={styles.MasterData}>
      <img src={Pic5} className={styles.Image} />
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Биография
        </Typography>
        <Typography className={styles.Text}>
          Жоау Оливейра дос Сантуш вырос в деревне Итажи, Бразилия. Уже с
          детства он работал на полях, чтобы помогать семье. В 10 лет Жоау
          впервые увидел капоэйру, еще не зная, что станет великим мастером.
        </Typography>
        <Typography className={styles.Text}>
          Годы спустя Жоау стал учеником Местре Паштинья и перенял традиции
          стиля Ангола. Переехав в США, Жоау Гранде открыл свою школу в
          Нью-Йорке и стал одним из главных учителей Capoeira Angola в мире.
        </Typography>
        <Typography className={styles.Text}>
          Мастер много путешествовал по Америке, Европе и Африке. Он участвовал
          в фестивалях и продвигал капоэйру не просто как боевое искусство, но и
          как культурное явление.
        </Typography>
      </div>
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Заповеди Местре Жоау Гранде
        </Typography>
        <div>
          <Typography className={styles.Text}>
            1. Capoeira — это прежде всего игра, даже если в ней есть борьба.
          </Typography>
          <Typography className={styles.Text}>
            2. Нужно акцентироваться не на победе, а на синхронности и умении
            слушать партнера.
          </Typography>
          <Typography className={styles.Text}>
            3. Музыка важна — каждый ученик должен освоить инструменты и пение,
            чувствовать ритм.
          </Typography>
        </div>
      </div>
      <div className={styles.Fact}>
        <Typography weight="demiBold">Интересный факт</Typography>
        <Typography>
          В 2001 году Местре Жоау Гранде получил Стипендию национального
          наследия за вклад в сохранение традиций Capoeira Angola. Это высшая
          награда правительства США в области народного и традиционного
          искусства
        </Typography>
      </div>
    </div>
  );
}

export function MasterData6() {
  return (
    <div className={styles.MasterData}>
      <img src={Pic6} className={styles.Image} />
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Биография
        </Typography>
        <Typography className={styles.Text}>
          Жозе Тадеу Карнейру Кардозу, больше известный как Местре Камиза,
          родился в Бразилии. Он увлекался капоэйрой с детства и учился боевому
          искусству у старшего брата.
        </Typography>
        <Typography className={styles.Text}>
          Жозе жил некоторое время в Сальвадоре, где учился капоэйре у Местре
          Бимба. В 1972 году он переехал в Рио-де-Жанейро, где начал преподавать
          и развиваться как мастер.
        </Typography>
        <Typography className={styles.Text}>
          В 1988 году Местре Камиза стал основоположником нового стиля: Абада
          (ABADÁ-Capoeira). Капоэйра Абада сочетает в себе традиции стиля
          Режионал и более игровой подход Ангола.
        </Typography>
      </div>
      <div className={styles.Fact}>
        <Typography weight="demiBold">Интересный факт</Typography>
        <Typography>
          Современный стиль Абада покорил тысячи учеников в 50+ странах по всему
          миру
        </Typography>
      </div>
    </div>
  );
}

export function MasterData7() {
  return (
    <div className={styles.MasterData}>
      <img src={Pic7} className={styles.Image} />
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Биография
        </Typography>
        <Typography className={styles.Text}>
          Синезио Фелисиану Песанья, он же Кобринья, родился в&nbsp;пригороде
          Рио-де-Жайнейро, Бразилия. Будущий мастер начал заниматься капоэйрой в
          1973 году. Он стал учеником Местре Мораес — известного капоэйриста из
          Сальвадора.
        </Typography>
        <Typography className={styles.Text}>
          Спустя годы усердных тренировок и преподавания Синезио получил
          прозвище Местре Кобра Манса. Он практикует капоэйру Ангола — в ней
          упор делается на традиционные игровые элементы игры.
        </Typography>
        <Typography className={styles.Text}>
          Чтобы глубже разобраться в истории капоэйры, Песанья ездил в Африку —
          Анголу и Мозамбик. Там он изучал местные традиции и нголо («танец
          зебр»), из которого в том числе родилась капоэйра.
        </Typography>
        <Typography className={styles.Text}>
          Местре Кобринья — сооснователь и один из руководителей фонда ICAF
          (International Capoeira Angola Foundation), организа- ции,
          объединяющей школы в Бразилии, США и&nbsp;Европе.
        </Typography>
      </div>
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Заповеди Местре Кобра Манса
        </Typography>
        <div>
          <Typography className={styles.Text}>
            1. Следует сохранять связь с корнями капоэйры: историей, музыкой,
            культурой.
          </Typography>
          <Typography className={styles.Text}>
            2. Образ жизни должен соответствовать внутреннему состоянию.
          </Typography>
          <Typography className={styles.Text}>
            3. Следует заботиться об экологии и окружающей среде.
          </Typography>
          <Typography className={styles.Text}>
            4. Мастер капоэйры не просто показывает движения, а объясняет их
            значение. Он делится с учениками знаниями о традиционной музыке и
            песнях.
          </Typography>
        </div>
      </div>
      <div className={styles.Fact}>
        <Typography weight="demiBold">Интересный факт</Typography>
        <Typography>
          В переводе Cobra Mansa означает «ручная змея». Движения Местре Кобры
          завораживающие и коварные, как танец змеи
        </Typography>
      </div>
    </div>
  );
}

export function MasterData8() {
  return (
    <div className={styles.MasterData}>
      <img src={Pic8} className={styles.Image} />
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Биография
        </Typography>
        <Typography className={styles.Text}>
          Жоау Перейра дос Сантуш родился в бразильском Араси. Он практиковал
          капоэйру вместе с друзьями, а спустя время переехал в Сальвадор.
        </Typography>
        <Typography className={styles.Text}>
          Жоау стал учеником Местре Паштинья, который научил его стилю Ангола —
          в нем движения более плавные, и фокус держится не на на борьбе, а на
          ритуальности танца.
        </Typography>
        <Typography className={styles.Text}>
          Когда Паштинья уже не мог преподавать, он сделал Жоау главой своей
          академии. Кстати, мы писали и о другом известном ученике Паштинья —
          Местре Жоау Гранде.
        </Typography>
        <Typography className={styles.Text}>
          Местре Жоау Пекено много путешествовал по миру и&nbsp;участвовал в
          международных соревнованиях. В 1982 году он открыл школу капоэйры
          Centro Esportivo de Capoeira Angola в Сальвадоре. Это место считается
          одним из знаковых в истории капоэйры Ангола. Каждый год 27 декабря там
          проводится большая рода в честь дня рождения Местре Пекено.
        </Typography>
      </div>
      <div className={styles.Fact}>
        <Typography weight="demiBold">Интересный факт</Typography>
        <Typography>
          Прозвище João Pequeno означает «Маленький Жоау». Но Местре Пекено
          назвали так не из-за его роста, а из-за того, что тот играл ближе к
          земле, в отличие от мастеров, которые делали высокие прыжки и трюки
        </Typography>
      </div>
    </div>
  );
}
