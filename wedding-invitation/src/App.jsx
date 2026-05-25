import { useEffect, useRef, useState } from "react";
import heroImage from "./assets/hero.jpg";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [timelineStarted, setTimelineStarted] = useState(false);
  const timelineRef = useRef(null);

  const weddingDate = new Date("2026-09-26T15:00:00");

  const calculateTimeLeft = () => {
    const difference = weddingDate - new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimelineStarted(true);
      },
      { threshold: 0.35 }
    );

    if (timelineRef.current) observer.observe(timelineRef.current);

    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <main className="page">
      {!isOpen && (
        <section className="hero">
          <img src={heroImage} alt="Юра та Юля" className="heroImage" />
          <div className="overlay"></div>

          <div className="heroContent">
            <p className="smallText">Wedding invitation</p>

            <h1>
              Юра <span>&</span> Юля
            </h1>

            <button className="openButton" onClick={() => setIsOpen(true)}>
              відкрити запрошення
            </button>

            <p className="date">26.09.2026</p>
          </div>
        </section>
      )}

      {isOpen && (
        <>
          <section className="invitation fadeIn">
            <p className="smallText dark">Дорогі гості</p>

            <h2>Саша & Владік</h2>

            <p className="inviteText">
              Ми з радістю запрошуємо вас розділити з нами день, коли дві
              історії стануть однією.
            </p>

            <div className="dateCard">
              <p>субота</p>
              <strong>26 вересня 2026</strong>
            </div>
          </section>

          <section
            ref={timelineRef}
            className={`timeline ${timelineStarted ? "timelineStart" : ""}`}
          >
            <h2 className="timelineTitle">Таймінг</h2>

  <div className="timelineArrow">
  <svg viewBox="0 0 400 1500" preserveAspectRatio="none">
    <path
      className="timelinePath"
      d="M 200 0 
         C 330 130, 70 250, 200 380 
         C 330 510, 70 630, 200 760 
         C 330 890, 70 1010, 200 1140 
         C 330 1270, 70 1390, 200 1500"
    />
  </svg>
</div>  

            <div className="timelineItem left">
              <div className="timelineContent">
                <h3>13:00</h3>
                <p>Початок свята та фуршет</p>
              </div>
              <div className="timelineIcon">🥂</div>
            </div>

            <div className="timelineItem right">
              <div className="timelineIcon">💍</div>
              <div className="timelineContent">
                <h3>14:00</h3>
                <p>Церемонія кохання</p>
              </div>
            </div>

            <div className="timelineItem left">
              <div className="timelineContent">
                <h3>15:30</h3>
                <p>Святкова вечеря</p>
              </div>
              <div className="timelineIcon">🍽️</div>
            </div>

            <div className="timelineItem right">
              <div className="timelineIcon">🎂</div>
              <div className="timelineContent">
                <h3>20:30</h3>
                <p>Торт і солодкі миті</p>
              </div>
            </div>

            <div className="timelineItem left">
              <div className="timelineContent">
                <h3>22:00</h3>
                <p>Тепле завершення вечора</p>
              </div>
              <div className="timelineIcon">🕯️</div>
            </div>
          </section>

          <section className="rsvp">
            <p className="scriptTitle">Ми скажемо «Так» через ...</p>

            <div className="countdownLine">
              <div>
                <strong>{timeLeft.days}</strong>
                <span>Дні</span>
              </div>
              <b>:</b>
              <div>
                <strong>{timeLeft.hours}</strong>
                <span>Год</span>
              </div>
              <b>:</b>
              <div>
                <strong>{timeLeft.minutes}</strong>
                <span>Хв</span>
              </div>
              <b>:</b>
              <div>
                <strong>{timeLeft.seconds}</strong>
                <span>Сек</span>
              </div>
            </div>

            <p className="rsvpText">
              Будь ласка, підтвердьте свою присутність на нашому весіллі. Ми з
              нетерпінням чекаємо на вас!
            </p>

            <button className="rsvpButton">Підтвердити присутність</button>
          </section>
        </>
      )}
    </main>
  );
}

export default App;