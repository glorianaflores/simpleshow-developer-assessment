//External libraries
import React from "react";
import { useDrag } from "react-dnd";
//Constants
import { ItemTypes } from "../../constants";

export const MovablePart = ({
    alt,
    className,
    image,
    bodyPart,
    isPlaced,
    setIsPlaced,
}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BODY_PART,
        end(item, monitor) {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                const isDropAllowed = dropResult.bodyPart === bodyPart;
                if (isDropAllowed) {
                    setIsPlaced(bodyPart);
                }
            }
        },
    }));

    return (
        <span className={className}>
            <img
                ref={bodyPart !== "torso" && !isPlaced ? drag : null}
                src={image}
                alt={alt}
                style={{
                    opacity: isDragging ? 0 : 1,
                    cursor: "move",
                }}
            />
        </span>
    );
};
