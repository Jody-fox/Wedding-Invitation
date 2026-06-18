import { useEffect, useState } from "react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdLVGtj8dhZrYNHShQUCs2m5jdl7M9MlCcTb1A1t5qN6UKOXQ/viewform?usp=publish-editor";

const WEDDING = {
  couple: "Jenny & Cederic",
  dateLabel: "28.05.2027",
  dateTime: "2027-05-28T16:00:00+02:00",
  venue: "Castello di Ribano",
  address: "Via Sogliano, 104/B, 47039 Savignano sul Rubicone (FC)",
};

const story = [
  {
    title: "Un giorno da vivere insieme",
    text: "Abbiamo immaginato questa festa come un incontro pieno di luce, musica e persone del cuore. Ci farebbe davvero felici averti con noi.",
  },
  {
    title: "Tra colline, calici e tramonto",
    text: "Il Castello di Ribano ci ha conquistati subito: il paesaggio, l'atmosfera e quell'eleganza semplice che ci somiglia.",
  },
  {
    title: "Un invito che parla di noi",
    text: "Abbiamo preso ispirazione dal save the date preparato con amore, dai toni avorio e rame e da un gusto romantico ma essenziale.",
  },
];

const schedule = [
  ["Accoglienza", "Arrivo degli ospiti e primi brindisi tra i vigneti."],
  ["Cerimonia", "Il momento del si, circondati dalle persone che amiamo."],
  ["Cena", "Una tavola lunga, buona cucina e il tempo di stare insieme."],
  ["Festa", "Musica, balli e la vostra canzone del cuore in playlist."],
];

const info = [
  "Conferma la presenza attraverso il pulsante dedicato alla partecipazione.",
  "Potrai indicare accompagnatori, allergie o esigenze alimentari.",
  "Ci sara anche uno spazio per suggerire una canzone per la festa.",
  "Le indicazioni complete per la giornata possono essere aggiornate piu avanti senza cambiare sito.",
];

function getTimeLeft(targetDate) {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return { giorni: 0, ore: 0, minuti: 0, secondi: 0 };
  }

  return {
    giorni: Math.floor(difference / (1000 * 60 * 60 * 24)),
    ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minuti: Math.floor((difference / (1000 * 60)) % 60),
    secondi: Math.floor((difference / 1000) % 60),
  };
}

function openRsvp() {
  window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function App() {
  const weddingDate = new Date(WEDDING.dateTime);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(weddingDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(weddingDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [weddingDate]);

  return (
    <main>
      <section className="hero" aria-label="Invito di nozze">
        <div className="hero-shell">
          <div className="hero-copy reveal">
            <p className="kicker">Save the date</p>
            <h1>{WEDDING.couple}</h1>
            <p className="hero-date">{WEDDING.dateLabel}</p>
            <p className="hero-place">{WEDDING.venue}</p>
            <p className="hero-description">
              Un giorno pensato per celebrare l'amore tra colline, vigneti e una
              festa da vivere fino a sera.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={openRsvp}>
                Partecipa
              </button>
              <a className="secondary-link" href="#rsvp">
                Scopri come esserci
              </a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="photo-frame">
              <img
                src="/assets/jenny-cederic-photo.png"
                alt="Jenny e Cederic insieme in montagna"
              />
            </div>
            <div className="invite-card">
              <img
                src="/assets/jenny-cederic-invite.jpeg"
                alt="Save the date di Jenny e Cederic"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="countdown section-band" aria-label="Countdown matrimonio">
        <div className="countdown-inner reveal">
          <SectionHeader
            eyebrow="Countdown"
            title="Manca sempre meno"
            text="Il conto alla rovescia giusto per il 28 maggio 2027."
          />
          <div className="countdown-grid">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div className="time-box" key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="story section-wrap" id="storia">
        <SectionHeader
          eyebrow="La nostra atmosfera"
          title="Un invito che racconta il giorno che sogniamo"
          text="Romantico, luminoso, delicato. Abbiamo voluto portare online lo stesso sentimento del vostro invito cartaceo."
        />
        <div className="story-grid">
          {story.map((item) => (
            <article className="story-card reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="details section-band" id="dove-quando">
        <div className="details-layout">
          <div className="details-copy reveal">
            <p className="eyebrow">Dove e quando</p>
            <h2>{WEDDING.venue}</h2>
            <p>
              Vi aspettiamo il <strong>{WEDDING.dateLabel}</strong> in una cornice
              tra natura e vigneti, per condividere una giornata piena di emozione.
            </p>
          </div>

          <div className="venue-panel reveal">
            <span>{WEDDING.dateLabel}</span>
            <h3>{WEDDING.address}</h3>
            <p>
              Un luogo dal sapore elegante e autentico, perfetto per celebrare
              Jenny e Cederic in un'atmosfera calda e raffinata.
            </p>
          </div>
        </div>
      </section>

      <section className="timeline section-wrap" id="programma">
        <SectionHeader
          eyebrow="Programma"
          title="La giornata in quattro momenti"
          text="Una traccia semplice del ritmo della festa, dall'arrivo fino alla musica."
        />
        <div className="timeline-list">
          {schedule.map(([time, label]) => (
            <article className="timeline-item reveal" key={`${time}-${label}`}>
              <time>{time}</time>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="rsvp section-band" id="rsvp">
        <div className="rsvp-card reveal">
          <p className="eyebrow">Con noi</p>
          <h2>Ci farebbe felici averti con noi</h2>
          <p>
            Per partecipare ti basta aprire il link dedicato. Li potrai
            confermare la presenza, lasciare eventuali indicazioni utili e
            accompagnarci anche con una canzone della serata.
          </p>
          <button className="primary-button" type="button" onClick={openRsvp}>
            Partecipa
          </button>
        </div>
      </section>

      <section className="playlist section-wrap">
        <div className="split-layout">
          <div className="reveal">
            <p className="eyebrow">Playlist</p>
            <h2>Una canzone che ci accompagni fino a tardi</h2>
          </div>
          <p className="large-copy reveal">
            Quando ci farai sapere che sarai dei nostri, potrai anche suggerire
            il brano che vorresti sentire, ballare o dedicare agli sposi.
          </p>
        </div>
      </section>

      <section className="info section-band">
        <SectionHeader
          eyebrow="Info utili"
          title="Le cose importanti, tutte qui"
          text="Abbiamo raccolto in modo semplice quello che serve per partecipare senza dubbi."
        />
        <div className="info-grid">
          {info.map((item) => (
            <article className="info-card reveal" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery section-wrap">
        <SectionHeader
          eyebrow="Gallery"
          title="La nostra immagine del giorno"
          text="La foto che vi racconta e il save the date da cui nasce tutta l'estetica della pagina."
        />
        <div className="gallery-grid gallery-grid-real">
          <figure className="gallery-item reveal">
            <img
              src="/assets/jenny-cederic-photo.png"
              alt="Jenny e Cederic insieme in un paesaggio di montagna"
            />
            <figcaption>Jenny e Cederic</figcaption>
          </figure>
          <figure className="gallery-item reveal invite-figure">
            <img
              src="/assets/jenny-cederic-invite.jpeg"
              alt="Invito save the date di Jenny e Cederic"
            />
            <figcaption>Il save the date che ispira tutto il sito</figcaption>
          </figure>
        </div>
      </section>

      <footer className="footer">
        <p>{WEDDING.couple}</p>
        <span>
          {WEDDING.dateLabel} · {WEDDING.venue}
        </span>
      </footer>
    </main>
  );
}
