import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AddService = () => {
  const handleAddService = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const desc = event.target.desc.value;
    const newService = { name, desc };
    // sent data from client site to server
    fetch("http://localhost:5000/service", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success", data);
        toast("successfully adding new Service", data);
        event.target.reset();
      });
  };
  return (
    <div>
      <h2> Test Crud</h2>
      <form onSubmit={handleAddService}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="desc" placeholder="description" />
        <input type="submit" value="submit" />
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddService;
