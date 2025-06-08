import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { backendUrl } from './config';

function Route({ onDataReceived }) {
    const [ startField, setStartField ] = useState("");
    const [ destField, setDestField ] = useState("");
    const handleStartChange = (event) => { setStartField(event.target.value); }
    const handleDestChange = (event) => { setDestField(event.target.value); }

    async function handleClick() {
        const response = await fetch(`${ backendUrl }/maps/route`, {
            method: "POST",
            body: JSON.stringify({
                "place1" : startField,
                "place2" : destField,
                "bidirectional": "True"
            }),
            headers: {
                "Content-type": "application/json"
            }
        });
        const data = await response.json();
        console.log(data);
        onDataReceived(data[0]);
        return data;
    }

    return (
        <>
        <div style={{ position: 'absolute', top: 20, left: 50, zIndex: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField id="start" label="Start" variant="filled" size="small" onChange={handleStartChange} />
                <TextField id="dest" label="Destination" variant="filled" size="small" onChange={handleDestChange} />
            </div>
            <Button variant="contained" size="small" onClick={handleClick} style={{ height: 'auto' }} > Go </Button>
            </div>
        </div>
        </>
    );
}

export default Route;