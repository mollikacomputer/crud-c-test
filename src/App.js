
import { useEffect, useState } from 'react';
import './App.css';
import AddService from './Components/AddService';
import { HiTrash, HiOutlinePencilAlt } from "react-icons/hi";
function App() {
   const [services, setServices] = useState([]);
   useEffect(()=>{
    fetch('http://localhost:5000/service')
    .then(res => res.json())
    .then(data => setServices(data))
   },[]);
   // delete a service
  const handleDeleteService = id =>{
    const proceed = window.confirm('Are you sure you want to delete?');
    if(proceed){
      console.log('deleting users with id', id);
      const url = `http://localhost:5000/service/${id}`;
      fetch(url, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount >0){
          console.log('deleted');
          const remaining = services.filter(service => service._id !== id);
          setServices(remaining);
        }
      })
    }
  }
  return (
    <div className="App">
     <h2> Available Service {services.length} </h2>
      <AddService/>
    
      <ul>
        {
          services.map( service => <li key={service._id} > Name : {service.name} description : {service.desc}
          {/* <button onClick={()=> handleDeleteService(service._id)} > <HiTrash /> </button> */}
          <HiOutlinePencilAlt />
          <HiTrash onClick={()=> handleDeleteService(service._id)} />
           </li>)
        }
      </ul>
    </div>
  );
}

export default App;
