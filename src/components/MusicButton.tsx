import styles from "@/styles/MusicButton.module.css";
import { useState, useRef, useEffect } from 'react';

interface MusicButtonProps {
  themeLink: string;
}

/* Boutton qui coupe la musique */
export function MusicButton(props: MusicButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const theme = useRef(null);
  const defaultVolume = 0.35; // ajuste le volume de base

  useEffect(() => {
    theme.current.volume = defaultVolume;
  }, []);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsMuted(!isMuted);
    theme.current.volume = isMuted ? defaultVolume : 0;
  };

  return (
    <div className={styles.all}>
      <audio controls loop autoPlay className={styles.audioTheme} ref={theme} src={props.themeLink} />
      <p className={styles.pLegend}>Musique : </p>
      <button onClick={handleClick}>
        <p className={styles.pButton}>
          {isClicked ? 'OFF' : 'ON'}
        </p>
      </button>
    </div>
  );
}
