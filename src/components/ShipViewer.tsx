import styles from "@/styles/Preparation.module.css";
import { ShipViewerProps } from "@/interfaces/ShipViewerProps";

export function ShipViewer(props: ShipViewerProps) {
  return (
    <div>
      <img 
        className={styles.shipsImages}
        src={'/ships/'+props.name.toLowerCase()+'-min.png'}
        alt={props.name}
        width={184.5}
        height={55.5}
      />
    </div>
  );
}
