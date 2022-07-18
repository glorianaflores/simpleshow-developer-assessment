//External libraries
import React, { useEffect } from "react";
import Modal from "react-modal";
//Images
import startImage from "../../assets/images/start_overlay-box-large.svg";
import startAgainImage from "../../assets/images/start-again.svg";
import startButtonImage from "../../assets/images/start_button.svg";
//Styles
import styles from "./StartModal.module.scss";

Modal.setAppElement("#root");

export const StartModal = ({
    isOpen,
    setIsOpen,
    showReloadVariant,
    handleOnClose,
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [isOpen]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        handleOnClose && handleOnClose();
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            className={styles.modal}
        >
            <div className={styles.modalContainer}>
                {showReloadVariant ? (
                    <img
                        src={startAgainImage}
                        alt="Build the mech suit for launch again."
                    />
                ) : (
                    <img
                        src={startImage}
                        alt="Build the mech suit for launch."
                    />
                )}
                <button onClick={toggleModal} className={styles.button}>
                    <img
                        src={startButtonImage}
                        alt="Start building your robot."
                    />
                </button>
            </div>
        </Modal>
    );
};
