import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import ArtistFact from "./ArtistFact";
import ListenerFact from "./ListenerFact";


//Remove users
// onClick={ () => setActive("ArtistFact")}
//onClick={ () => setActive("ListenerFact")}
//  {active === "ArtistFact" && <ArtistFact/>}
//{active === "ListenerFact" && <ListenerFact/>}

 function AdminHome() {
     const [active, setActive]= useState("")
    return (
        <div>
            
    <Button onClick={ () => setActive("ArtistFact")} variant="light">Artist</Button> 
    <Button onClick={ () => setActive("ListenerFact")} variant="light" >Listeners</Button>
    {active === "ArtistFact" && <ArtistFact/>}
    {active === "ListenerFact" && <ListenerFact/>}


        </div>
    )
}

export default AdminHome;