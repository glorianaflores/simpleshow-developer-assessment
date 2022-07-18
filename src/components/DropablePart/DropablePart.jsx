//External libraries
import { useDrop } from "react-dnd";
//Constants
import { ItemTypes } from "../../constants";

export const DropablePart = ({ className, bodyPart }) => {
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BODY_PART,
            drop: () => ({ bodyPart }),
        }),
        []
    );
    return bodyPart !== "torso" && <span ref={drop} className={className} />;
};
