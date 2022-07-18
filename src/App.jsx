//External libraries
import { useEffect, useState } from "react";
import cx from "classnames";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//Constants
import { dragableParts } from "./constants";
//Components
import { StartModal } from "./components/StartModal/StartModal";
import { MovablePart } from "./components/MovablePart/MovablePart";
import { DropablePart } from "./components/DropablePart/DropablePart.jsx";
//Images
import descriptionImage from "./assets/images/instruction_box.svg";
import hangerImage from "./assets/images/hanger_background.svg";
import leftLegImage from "./assets/images/simplemech-leg1.svg";
import rightLegImage from "./assets/images/simplemech-leg2.svg";
import headImage from "./assets/images/simplemech-head.svg";
import leftArmImage from "./assets/images/simplemech-arm_1.svg";
import rightArmImage from "./assets/images/simplemech-arm_2.svg";
import chestImage from "./assets/images/simplemech-chest.svg";
import torsoImage from "./assets/images/simplemech-torso.svg";
//Styles
import styles from "./App.module.scss";

const bodyParts = {
    leftLeg: leftLegImage,
    rightLeg: rightLegImage,
    head: headImage,
    leftArm: leftArmImage,
    rightArm: rightArmImage,
    chest: chestImage,
    torso: torsoImage,
};

const initialState = {
    leftLeg: { isPlaced: false },
    rightLeg: { isPlaced: false },
    head: { isPlaced: false },
    leftArm: { isPlaced: false },
    rightArm: { isPlaced: false },
    chest: { isPlaced: false },
    torso: { isPlaced: false },
    counter: 1,
    total: 7,
};

function App() {
    const [isReloadModal, setIsReloadModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [dndItems, setDndItems] = useState(initialState);

    useEffect(() => {
        if (dndItems.counter === dndItems.total) {
            setIsModalOpen(true);
        }
    }, [dndItems]);

    const handleDnd = (bodyPart) => {
        setDndItems((items) => ({
            ...items,
            [bodyPart]: { isPlaced: true },
            counter: items.counter + 1,
        }));
    };

    const handleRefresh = () => {
        setDndItems(initialState);
        setIsReloadModal(true);
    };

    return (
        <>
            <section className={styles.root}>
                <div className={styles.description}>
                    <img
                        src={descriptionImage}
                        alt="Please drag and drop its parts to complete its build."
                    />
                </div>
                <DndProvider backend={HTML5Backend}>
                    <div className={styles.hanger}>
                        <img
                            src={hangerImage}
                            alt="This is the hanger where you should place the parts."
                        />
                        {dragableParts.map((part, index) => {
                            const bodyPart = part.bodyPart;
                            return (
                                <div key={`body-part-${index}`}>
                                    <DropablePart
                                        bodyPart={bodyPart}
                                        className={cx(
                                            styles.dropSection,
                                            styles[bodyPart],
                                            {
                                                [styles.isModalOpen]:
                                                    isModalOpen,
                                            }
                                        )}
                                    />
                                    <MovablePart
                                        bodyPart={bodyPart}
                                        image={bodyParts[bodyPart]}
                                        alt={part.alt}
                                        setIsPlaced={handleDnd}
                                        className={cx(
                                            {
                                                [styles.bodyPart]:
                                                    !dndItems[bodyPart]
                                                        .isPlaced,
                                                [styles.dropSection]:
                                                    dndItems[bodyPart].isPlaced,
                                                [styles.isModalOpen]:
                                                    isModalOpen,
                                            },
                                            styles[bodyPart]
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </DndProvider>
            </section>
            <StartModal
                showReloadVariant={isReloadModal}
                handleOnClose={handleRefresh}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
        </>
    );
}

export default App;
