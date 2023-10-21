import { useRef, useState } from "react";
import {QrReader} from "react-qr-scanner";

const QrCodeScannerComponent = (props) => {

 

    return (
        <div>

            <div className="join">
                <input ref={addressRef} className="input input-bordered join-item bg-white" />
                <button onClick={startScan} className="btn join-item ">Scan</button>
            </div>

            <div className={visibility}>
                <QrReader
                    onScan={handleScan}
                />
            </div>


        </div>
    );
}

export default QrCodeScannerComponent;