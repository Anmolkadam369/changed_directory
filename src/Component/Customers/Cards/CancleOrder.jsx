
export default CancleOrder = ({currentItem, onUpdate}) => {
    const [reasonsForDrop, setReasonsForDrop] = useState(false);
    
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [otherReason, setOtherReason] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const reasons = [
        "Too much time taking",
        "Got Other Services",
        "Not Needed Now",
    ];

    const handleSelectReason = (reason) => {
        if (selectedReasons.includes(reason)) {
            // Remove from selected if already in array
            setSelectedReasons(selectedReasons.filter((item) => item !== reason));
        } else {
            // Add to selected array
            setSelectedReasons([...selectedReasons, reason]);
        }
    };

    return (
        <div>
            <div className="image-container" style={{
                        backgroundColor: "#ffffff",
                        padding: "20px",
                        borderRadius: "15px 15px 0px 0px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        maxWidth: "600px",
                        width: "97%"
                    }}>

                        <div className="background-image"></div>

                        <div className="text-overlay">
                            <p style={{
                                fontSize: '14px',
                                padding: "5px",
                                border: '3px solid red',
                                borderImage: 'linear-gradient(to top, white 10% , lightblue 90%) 1',
                                textAlign: 'center',
                                borderRadius: '30px',
                                fontWeight: "bold",
                                color: 'red'
                            }}>
                                Drop Case Procedure!
                            </p>
                            {reasonsForDrop === false && (
                                <div>
                                    <p style={{ fontSize: "17px", marginTop: "20px", fontWeight: "bold", textAlign: "center", color: "black" }}>We are almost there to get you perfect crane service!!! </p>
                                    <p style={{ fontSize: "17px", marginTop: "20px", fontWeight: "bold", textAlign: "center", color: "red" }}>Still want to opt-out❓ 🤔 </p>
                                    <div className="text-overlay text-overlay2" style={{ height: "40%" }}>
                                        <p style={{
                                            fontSize: '11px',
                                            marginTop: "5px",
                                            background: "green",
                                            padding: "10px",
                                            border: '1px solid blue',
                                            textAlign: 'center',
                                            borderRadius: '30px',
                                            fontWeight: "bold",
                                            color: "white",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            position: "relative",
                                            cursor: "pointer"
                                        }} onClick={()=>{
                                            onUpdate()
                                        }}>
                                            Don't Drop
                                            <KeyboardDoubleArrowLeftIcon style={{
                                                position: 'absolute',
                                                right: "10px"
                                            }} />
                                            <KeyboardDoubleArrowRightIcon style={{
                                                position: 'absolute',
                                                left: "10px"
                                            }} />
                                        </p>
                                        <p style={{
                                            fontSize: '11px',
                                            marginTop: "5px",
                                            background: "#8f4325",
                                            padding: "10px",
                                            border: '1px solid blue',
                                            textAlign: 'center',
                                            borderRadius: '30px',
                                            fontWeight: "bold",
                                            color: "white",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            position: "relative",
                                            cursor: "pointer"
                                        }} onClick={() => setReasonsForDrop(true)}>
                                            Drop Case
                                            <KeyboardDoubleArrowLeftIcon style={{
                                                position: 'absolute',
                                                right: "10px"
                                            }} />
                                            <KeyboardDoubleArrowRightIcon style={{
                                                position: 'absolute',
                                                left: "10px"
                                            }} />
                                        </p>
                                    </div>
                                </div>)}

                            {reasonsForDrop === true && (
                                <div>
                                    <div>
                                        <div style={{ background: "rgb(209 209 209 / 29%)" }}>

                                            <div style={{ margin: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                                {reasons.map((reason) => (
                                                    <button
                                                        key={reason}
                                                        onClick={() => handleSelectReason(reason)}
                                                        style={{
                                                            fontSize: '14px',
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            padding: "10px",
                                                            borderRadius: "20px",
                                                            backgroundColor: selectedReasons.includes(reason) ? "yellow" : "white",
                                                            border: "1px solid black",
                                                            cursor: "pointer",
                                                            boxShadow: selectedReasons.includes(reason) ? "0 4px 8px rgba(0,0,0,1.2)" : "0 3px 6px rgba(0, 0, 0, 0.5)"
                                                        }}
                                                    >
                                                        {reason}
                                                    </button>
                                                ))}
                                            </div>


                                            <label className="form-field" style={{ color: '#3f3c00', marginTop: '20px', fontSize: "14px" }}>
                                                <p style={{ textAlign: "left" }}> Other Reason  : </p>
                                                <textarea
                                                    style={{ margin: "10px 10px 5px 0px", width: "280px" }} className="form-control" name="otherReason" value={otherReason} onChange={(e) => setOtherReason(e.target.value)} />
                                            </label>

                                            {errorMessage && <div style={{ color: "red", margin: "10px 10px 20px 10px", marginBottom: "10px" }}>{errorMessage}</div>}


                                            <div>
                                                {isLoading && (
                                                    <div style={{ marginTop: '10px', display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                                        <ClipLoader color="black" loading={isLoading} />
                                                        <div style={{ marginTop: '10px', color: 'black' }}> Please Wait...</div>
                                                    </div>
                                                )}
                                                <p type="submit"
                                                    style={{
                                                        fontSize: '11px',
                                                        marginTop: "5px",
                                                        background: "#8f4325",
                                                        padding: "10px",
                                                        border: '1px solid blue',
                                                        textAlign: 'center',
                                                        borderRadius: '30px',
                                                        fontWeight: "bold",
                                                        color: "white",
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: "center",
                                                        position: "relative",
                                                    }}
                                                    disabled={isLoading}
                                                    
                                                >
                                                    < NotInterestedIcon style={{
                                                        position: 'absolute',
                                                        left: "70px"
                                                    }} />Confirm Drop Case
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
        </div>
    )
}