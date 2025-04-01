import { useState } from "react";
import PhotoAndDetailUploader from "./PhotoAndDetailUploader";

function ModalButton({state}) {
    const [isOpen, setIsOpen] = useState(false);
    console.log('tate.vendorType}', state.vendorType)

    return (
        <>
            <button onClick={() => setIsOpen(true)} >
                {state.title}
            </button>

            {isOpen && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <PhotoAndDetailUploader 
                        accidentVehicleCode={state.accidentVehicleCode} 
                        vendorType={state.vendorType} 
                        currentService={state.currentService}
                        onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    modal: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        // minWidth: "50vw",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
};

export default ModalButton;
