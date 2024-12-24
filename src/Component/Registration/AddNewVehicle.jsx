import { useState } from "react"











export default function AddNewVehicle() {
    const [nowReadOnly, setNowReadOnly] = useState(false)
    return (
        <div>
            <div className="Registrationdetails-elem-15">
                <div className="Registrationdetails-elem-14">
                    <span className="cd-paragraph-clean Registrationdetails-elem-7">
                    </span>
                    <div className="Registrationdetails-elem-13">
                        <div className="Registrationdetails-elem-11">
                            <div className="Registrationdetails-elem-10">
                                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}><em> Accident Vehicle Details</em></p>
                                    {/* {fromPageHere == "allvehicles" && (<button style={{ padding: "5px 10px", background: nowReadOnly ? "lightblue" : 'green', color: nowReadOnly ? "black" : "white", width: "60px", fontSize: "15px", fontWeight: "bold", marginBottom: "20px", borderRadius: "10px" }} onClick={() => setNowReadOnly(!nowReadOnly)}>Edit</button>)} */}
                                </div>

                                <p style={{ fontSize: "12px", fontWeight: "bold" }}>Vehicle No</p>
                                <div style={{ display: "flex" }}>

                                    <input
                                        type="text"
                                        className="Registrationdetails-elem-9"
                                        style={{ textAlign: 'left', margin: '10px 10px 10px 0px', width: '80%' }}
                                        // value={regNo}
                                        placeholder='RJ 03 ED 2343'
                                        // onChange={!item?.reg ? handleChange : ""}
                                        // disabled={getData.isActive === "false"}
                                    />
                                    <button type="button" style={{ fontSize: "10px", height: "30px", marginTop: "10px", marginRight: "10px", fontWeight: "bold" }} class="btn btn-success">Check</button>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}