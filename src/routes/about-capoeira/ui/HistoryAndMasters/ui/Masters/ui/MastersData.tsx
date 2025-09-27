import { Typography } from '~shared/ui/typography';
import Pic1 from '~app/assets/masters/MasterPic1.png';
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
          Без сомнения, человеком, который оказал сильнейшее влияние на развитие
          капоэйры, был Мануэль душ Рейш Машаду (Manuel dos Reis Machado), более
          изветный как Местре Бимба. Местре Бимба родился 23 ноября 1899 года
          (или 1900 г., по разным документам встречаются противоречия) в
          Сальвадоре, столице штата Баия. Его отец, Луис Кандиду Машаду (Luis
          Candido Machado), был известный батукейру (Батуке практикуется в
          кругу, сопровождается музыкой, 2 человека пытаются повалить
          друг-друга, бьют по ногам, проводят броски и другие сражающие удары).
        </Typography>
        <Typography className={styles.Text}>
          В возрасте 12 лет Мануэль начал учиться капоэйре у Бентиньу, командира
          корабля судоходной компании. В то время не было академий или просто
          классов. Ученики учились у мастеров в доках или на улицах. Редко у
          кого было больше одного-двух учеников. А термин «местре» не
          использовался вовсе. Мануэль занимался у Бентиньо на протяжении 4-х
          лет и вырос большим сильным мужчиной. Он был настоящим лидером,
          хорошим бойцом и жесткой личностью.
        </Typography>
      </div>
      <div className={styles.Column}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          Девять заповедей Местре Бимбы:
        </Typography>
        <div>
          <Typography className={styles.Text}>
            1. Не курить. Запрещено курить в течение тренировок.
          </Typography>
          <Typography className={styles.Text}>
            2. Не пить. Употребление алкоголя нарушает мышечный метаболизм.
          </Typography>
          <Typography className={styles.Text}>
            3. Избегай показывать своим друзьям вне роды свои достижения. Помни,
            что неожиданность – лучшее оружие в бою.
          </Typography>
          <Typography className={styles.Text}>
            4. Избегай разговаривать на протяжении тренировки. Ты оплачиваешь
            время, которое проводишь в академии. Наблюдая других бойцов, больше
            научишься.
          </Typography>
          <Typography className={styles.Text}>
            5. Всегда делай джингу.
          </Typography>
          <Typography className={styles.Text}>
            6. Отрабатывай базовые движения каждый день.
          </Typography>
          <Typography className={styles.Text}>
            7. Не бойся приближаться к противнику. Чем ближе к нему, тем
            большему научишься.
          </Typography>
          <Typography className={styles.Text}>
            8. Всегда держи тело расслабленным.
          </Typography>
          <Typography className={styles.Text}>
            9. Лучше быть битым в роде, чем на улице.
          </Typography>
        </div>
        <Typography className={styles.Text}>
          В 1936 году, чтобы доказать эффективность своего стиля, местре Бимба
          вызывает бойцов любых боевых искусств на поединок. В результате этого
          он проводит четыре поединка с наиболее известными бойцами различных
          стилей Бразилии и побеждает во всех четырех. Самый долгий бой длялся
          одну минуту и десять секунд. Местре Бимба получил прозвище “Три удара”
          (“Tres Pancadas”), потому что никто из его соперников не мог выдержать
          больше трех ударов. Местре Бимба выиграл эти и другие поединки,
          поддерживая звание непобедимого бойца. Благодаря этому он смог заявить
          о капоэйре и поднять ее престиж.
        </Typography>
        <Typography className={styles.Text}>
          Благодаря нововведениям местре Бимбы, его Академия привлекла многих
          учеников среднего и высшего класса к искусству, которое ранее
          воспринималось как деятельность для низшего социального класса.
        </Typography>
      </div>
    </div>
  );
}
