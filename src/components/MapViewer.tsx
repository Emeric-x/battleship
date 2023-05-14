import { useState } from "react";
import styles from "@/styles/Preparation.module.css";
import { Widget, Widgets } from "@/interfaces/Widget";
import { DatasTableProps } from "@/interfaces/DatasTableProps";
import { ShipViewer } from "./ShipViewer";
import { GameRoomService } from "@/core/gameroom.service";
import { Userservice } from "@/core/user.service";

export default function Map(datas : DatasTableProps) {
  // Sons
  const audioPop = new Audio('/sounds/pop.mp3'); //son lors du drop
  //const audioPop = new Audio('/sounds/littleSplouch.mp3'); //2eme option son lors du drop
  const audioReady = new Audio('/sounds/readyButtonBell.mp3'); //son lors du clic sur le bouton "prêt"
  const audioNotReady = new Audio('/sounds/denyButton.mp3');
  let isBlocked : boolean = false;

  const [widgets, setWidgets] = useState<Widgets>({});
  const [widgetList, setWidgetList] = useState<Widget[]>([
    { id: "A", name: "A", size: datas.ships[0].longueur, direction: "horizontally", count: 0, placed: false },
    { id: "B", name: "B", size: datas.ships[1].longueur, direction: "horizontally", count: 0, placed: false },
    { id: "C", name: "C", size: datas.ships[2].longueur, direction: "horizontally", count: 0, placed: false },
    { id: "D", name: "D", size: datas.ships[3].longueur, direction: "horizontally", count: 0, placed: false },
    { id: "E", name: "E", size: datas.ships[4].longueur, direction: "horizontally", count: 0, placed: false },
  ])

  // Create drop zones
  const dropZones = [];
  for (let i = 1; i <= 10; i++) {
    const row = [];
    for (let j = 1; j <= 10; j++) {
      const id = `dropZone${i}-${j}`;
      row.push(
        <div
          key={id}
          className={styles.dropZone}
          id={id}
          onDrop={(e) => handleOnDrop(e, id)}
          onDragOver={handleDragOver}
        >
          {widgets[id] && (
            <div
              className={styles["dropped-widget"]}
              onClick={() => handleOnClick(id)}
              draggable
              onDragStart={(e) => handleOnDrag(e, widgets[id]!)}
            >
              {widgets[id]!.name}
            </div>
          )}
        </div>
      );
    }
    dropZones.push(
      <div key={i} className={styles.row}>
        {row}
      </div>
    );
  }

  function handleOnDrag(e: React.DragEvent, widget: Widget) {
    if (isBlocked == false) {
      e.dataTransfer.setData("widget", JSON.stringify(widget));
    }
  }

  function handleDragOver(e: React.DragEvent) {
    if (isBlocked == false) {
      e.preventDefault();
    }
  }

  function handleOnDrop(e: React.DragEvent, dropZone: string) {
    if (isBlocked == false) {
      e.preventDefault();
      const widget = JSON.parse(e.dataTransfer.getData("widget")) as Widget;

      let existingWidget = Object.values(widgets).find(
        (w) => w?.id === widget.id
      );

      if (!existingWidget) {
        const newWidget: Widget = { ...widget, count: 1 };
        let newWidgets = { ...widgets, [dropZone]: newWidget };
        displayWidget(newWidgets, widget, dropZone);
        audioPop.play();
      } else {
        RemoveWidgetOldZones(widgets, existingWidget);

        // Update the count of the existing widget and set it as the dropped widget
        let newWidgets = { ...widgets, [dropZone]: existingWidget };
        displayWidget(newWidgets, widget, dropZone);
        audioPop.play();
      }
    }
  }

  function handleOnClick(dropZone: string) {
    if (isBlocked == false) {
      if (widgets[dropZone]) {
        let newWidgets = { ...widgets };
        RemoveWidgetOldZones(newWidgets, widgets[dropZone]);

        // Update the direction of the clicked widget and add it to the new drop zones
        const widget = { ...widgets[dropZone]! };
        widget.direction =
          widget.direction === "horizontally" ? "vertically" : "horizontally";
        newWidgets = { ...newWidgets, [dropZone]: widget };
        displayWidget(newWidgets, widget, dropZone);
        audioPop.play();
      }
    }
  }

  function displayWidget(newWidgets: any, widget: Widget, dropZone: string) {
    // set placed property to true for the widget
    setWidgetList((widgetList) =>
      Object.values(widgetList).map((w) => {
        if (w.id === widget.id) {
          w.placed = true;
        }
        return w;
      })
    );

    if (widget.size > 1) {
      const [x, y] = dropZone.substring(8).split("-").map(Number);
      let adjacentZones: string[] = [];
      // Determine adjacent zones based on widget size and direction
      if (widget.direction === "vertically") {
        for (let i = 1; i < widget.size; i++) {
          const zone = `dropZone${x}-${y + i}`;
          if (y + i <= 10 && !widgets[zone]) {
            adjacentZones.push(zone);
          } else {
            adjacentZones = [];
            break;
          }
        }
      } else {
        for (let i = 1; i < widget.size; i++) {
          const zone = `dropZone${x + i}-${y}`;
          if (x + i <= 10 && !widgets[zone]) {
            adjacentZones.push(zone);
          } else {
            adjacentZones = [];
            break;
          }
        }
      }
      // Check if all adjacent zones are available, add widget to newWidgets object
      if (adjacentZones.length === widget.size - 1) {
        adjacentZones.forEach((zone) => {
          newWidgets = { ...newWidgets, [zone]: { ...widget, count: 1 } };
        });
        setWidgets(newWidgets);
      }
    } else {
      setWidgets(newWidgets);
    }
  }


  function RemoveWidgetOldZones(array: any, widget: any) {
    Object.keys(array).forEach((key) => {
      if (array[key]?.id === widget?.id) {
        array[key] = null;
      }
    });

    // removing the null values from the array
    Object.keys(array).forEach((key) => {
      if (array[key] === null) {
        delete array[key];
      }
    });
  }

  function GetWidgetSizeClass(size: number) {
    let widgetSizeClass;
    switch (size) {
      case 1:
        widgetSizeClass = styles.widgetSize1;
        break;
      case 2:
        widgetSizeClass = styles.widgetSize2;
        break;
      case 3:
        widgetSizeClass = styles.widgetSize3;
        break;
      case 4:
        widgetSizeClass = styles.widgetSize4;
        break;
      case 5:
        widgetSizeClass = styles.widgetSize5;
        break;
      default:
        widgetSizeClass = styles.widgetSizeDefault;
        break;
    }

    return widgetSizeClass;
  }

  async function Ready()
  {
    if (isBlocked == false) {
      let allShipsPlaced: boolean = AllShipsPlaced(); // check if all ships are placed
      if (allShipsPlaced) { // if all ships are placed...
        let shipCoords: string = GetShipsCoord(); // get ships coords
        let player_id = Userservice.parseJwt().id; // get player id
        let roomId = datas.roomDatas.id; // get room id
        let isCreator: boolean = datas.roomDatas.player1_id == player_id ? true : false; // check if player is creator of the room
        await GameRoomService.SaveCoords(roomId, isCreator, shipCoords) // save ships coords

        audioReady.play();
        isBlocked = true;
      } else {
        audioNotReady.play();
        alert("Placez tous les navires avant de confirmer !");
      }
    }
  }

  function GetShipsCoord() : string {
    let res: string = "";

    Object.entries(widgets).forEach(([dropZone, widget]) => {
      if (widget) {
        const [i, j] = dropZone.substring(8).split("-").map(Number);
        res += `${i}-${j} `;
      }
    });
  
    return res;
  }

  function AllShipsPlaced(): boolean {
    let res: boolean = true

    Object.values(widgetList).forEach((widget) => {
      if (!widget.placed) 
        res = false
    });

    return res
  }

 /* fonction qui permet d'effacer tous les bâteaux de la grille : */
 function Reset() {
  if (isBlocked == false) {
    setWidgets({});
    audioPop.play();
    
    // reset the placed property to false for all widgets
    setWidgetList((widgetList) =>
      Object.values(widgetList).map((w) => {
        w.placed = false;
        return w;
      })
    );
  }
}

  return (
    <>
      <div className={styles.column1}>
        <div className={styles.column1sub1}>
          <div className={styles.l1}>Porte-avions :</div>
          <div className={styles.l2}>Croiseur :</div>
          <div className={styles.l3}>1er contre-torpilleur :</div>
          <div className={styles.l4}>2ème contre-torpilleur :</div>
          <div className={styles.l5}>Torpilleur :</div>
        </div>


        <div className={styles.column1sub2}>
          <div className={styles.widgets}>
            {widgetList.map((widget, i = 0) => (
              <div key={widget.id}>

                <div
                  className={GetWidgetSizeClass(widget.size)}
                  draggable
                  key={widget.id}
                  onDragStart={(e) => handleOnDrag(e, widget)}
                >
                  <ShipViewer
                  key={datas.ships[i].cle}
                  name={datas.ships[i].nom}
                  length={datas.ships[i].longueur}
                />
                </div>

              </div>
            ))}    
          </div>
        </div>
      </div>

      <div className={styles.column2}>
        <div className={styles.grid}>
          {dropZones}
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button onMouseDown={Reset} className={styles.btnReset}>Réinitialiser la grille</button>
        <button onMouseDown={Ready} className={styles.btnReady}>Prêt !</button>
      </div>
  </>     
  );
}

