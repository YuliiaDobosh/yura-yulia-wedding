import { useEffect, useRef, useState } from "react";
import heroImage from "./assets/hero.jpg";
import envelopeImage from "./assets/envelope.png";
import calendarImage from "./assets/calendar.png";
import timelineImage from "./assets/timeline.jpeg";
import restaurantImage from "./assets/restaurant.png";
import musicImage from "./assets/music-photo.png";
import weddingMusic from "./assets/music.mp3";
import dressCodeVideo from "./assets/dresscode.mp4";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const weddingDate = new Date("2026-06-01T13:00:00");
  const audioRef = useRef(null);
  const dressVideoRef = useRef(null);
  const dressSectionRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const calculateTimeLeft = () => {
    const difference = weddingDate - new Date();

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!dressVideoRef.current) return;

          if (entry.isIntersecting) {
            dressVideoRef.current.play();
          } else {
            dressVideoRef.current.pause();
            dressVideoRef.current.currentTime = 0;
          }
        },
        {
          threshold: 0.6,
        }
      );

      if (dressSectionRef.current) {
        observer.observe(dressSectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const openInvitation = () => {
    setIsOpen(true);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    }, 300);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
  };

  return (
    <main className="page">
      {!isOpen && (
        <section className="hero">
          <img src={heroImage} alt="Wedding" className="heroImage" />
          <div className="overlay"></div>

          <div className="heroContent">
            <p className="smallText">Wedding invitation</p>

            <h1>
              Юра <span>&</span> Юля
            </h1>

            <button className="openButton" onClick={openInvitation}>
              Відкрити запрошення
            </button>

            <p className="date">01.06.2026</p>
          </div>
        </section>
      )}

      {isOpen && (
        <>
          <section className="musicSection fadeIn">
            <img
              src={musicImage}
              alt="Wedding music"
              className="musicImage"
            />

            <div className="musicContent">
              <h2>Ми одружуємось!</h2>

              <p>Музика для атмосфери ✨</p>

              <button className="musicButton" onClick={toggleMusic}>
                {isMusicPlaying ? "⏸ Пауза" : "▶ Музика"}
              </button>
            </div>

            <audio ref={audioRef} src={weddingMusic} loop />
          </section>

          <section className="invitation fadeIn">
            <img
              src={envelopeImage}
              alt="Запрошення"
              className="invitePhotoLarge"
            />

            <img
              src={calendarImage}
              alt="Календар"
              className="calendarImage"
            />
          </section>

          <section className="timelineImageSection">
            <img
              src={timelineImage}
              alt="Таймінг"
              className="timelineImage"
            />
          </section>

          <section className="location">
            <p className="smallText dark">Локація</p>

            <h2>Місце святкування</h2>

            <img
              src={restaurantImage}
              alt="Ресторан Наша Куховарня"
              className="restaurantImage"
            />

            <p className="locationText">
              Ресторан “Наша Куховарня”
              <br />
              м. Радехів, вул. Стоянівська, 31
            </p>

            <a
              className="mapButton"
              href="https://nashakuhovarnya.com.ua/about"
              target="_blank"
              rel="noreferrer"
            >
              Відкрити карту
            </a>
          </section>

          <section className="dressCode" ref={dressSectionRef}>
            <video
              ref={dressVideoRef}
              className="dressCodeVideo"
              src={dressCodeVideo}
              muted
              loop
              playsInline
              preload="metadata"
            />
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
              Будь ласка, підтвердьте свою присутність на нашому весіллі.
              Ми з нетерпінням чекаємо на вас!
            </p>

            <button className="rsvpButton">
              Підтвердити присутність
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default App;

