import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button, Table, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

//listener count
//total play count

 function ListenerFact() {

const [listeners, setListeners] = useState({});
const[searchTerm, setSearchTerm]= useState('');

//Delete user
    // useEffect(() => {
    //     fetch(`http://localhost:4000/api/find/find/${id}`).then(res => {
    //       res.json().then(result => {
    //         let listen = result;
    //         setListeners(listen)
    //         console.log(listen)
    //       })
    //     })
    //       .catch(err => {
    //         console.error("Weather fetch failed: ", err);
    //       })
    //   }, [])



//Get all Listers
useEffect(() => {
    fetch(`http://localhost:4000/api/users/getAll`).then(res => {
      res.json().then(result => {
        let listen = result;
        setListeners(listen)
        console.log(listen)
      })
    })
      .catch(err => {
        console.error("Weather fetch failed: ", err);
      })
  }, [])

  const artistList = [
    { album: "Weeknd", releasedin: "2020",albumDuration: "120" },
    { album: "Kishore kumar", releasedin: "2019",albumDuration: "150"},
    {album: "Metallica", releasedin: "2005",albumDuration: "10"},
    {album: "Nirvana", releasedin: "1997",albumDuration: "90"}
  ];

    return (
        <div>

<Container fluid>
<InputGroup className="mb-3" onChange={(event) => { setSearchTerm(event.target.value) }}>
                <FormControl placeholder="Search your favourite artist" />
                <Button variant="outline-secondary" id="button-addon2"> Find </Button>
            </InputGroup>

           <Table striped bordered hover variant="dark">
               <thead>
                   <tr>
                       
                       <th><i>ID</i></th>
                       <th><i>Name</i></th>
                       <th><i>Remove</i></th>
                   </tr>
               </thead>
               <tbody>
               {artistList.filter((val) => {
                       if (searchTerm == '') {
                           return val
                       }
                       else if (val.album.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                           return val
                       }
                   }).map((t, i) => {
                       i = i + 1;
                       return (
                           <Link to={`/artist/${t._id}`} className="nav-link" key={t.id}>
                           <tr className='table_row'>
                            <td >123123</td>
                               <td >{listeners.name}</td>
                               <td><Button  variant="light" onClick={() => ListenerFact(t.album)}>Delete</Button> </td>
                              
                           </tr>
                           </Link>
                       )
                   }
                   )}
               </tbody>
           </Table>
          
           </Container>
    
        </div>
    )
}

export default ListenerFact;

