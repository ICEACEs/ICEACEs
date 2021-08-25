import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const UserForm = () => {
  const [employee, setEmployee] = useState([]);

  const [employeeData, setEmployeeData] = useState({
    name:"",
    age:0,
    country:"",
    position:"",
    salary:0,
  })

  const getEmployees = () => {
    axios.get("http://localhost:3001/employees").then((res) => {
      setEmployee(res.data);
    });
  };

  const addEmployees = () => {
    axios.post('http://localhost:3001/create', {
      name: employeeData.name,
      age: employeeData.age,
      country: employeeData.country,
      position: employeeData.position,
      salary: employeeData.salary
    }).then(() => {
      setEmployee([
        ...employee,{
          name: employeeData.name,
          age: employeeData.age,
          country: employeeData.country,
          position: employeeData.position,
          salary: employeeData.salary
        }
      ])
    })
  }

  const ListUser = () => {
    const DataCompo = () => {
      return (
        <div className="dataList">
          {employee.map((val, key) => {
            return (
              <div className="employee card">
                <div className="card-body">
                <div className="card-text employeeID">Employee ID: {val.id}</div>
                  <div className="card-text">Name: {val.name}</div>
                  <div className="card-text">Age: {val.age}</div>
                  <div className="card-text">Country: {val.country}</div>
                  <div className="card-text">Position: {val.position}</div>
                  <div className="card-text">Salary: {val.salary}</div>
                </div>
              </div>
            );
          })}
        </div>
      );
    };
    return (
      <div className="tableList">
        <div className="tableTitle">
          <h1 style={{ margin: "0 auto" }}>Employee Table Infomation</h1>
        </div>
        <DataCompo />
      </div>
    );
  };

  return (
    <div className="formContainer">
      <h1 style={{ marginLeft: "130px", float: "left" }}>Employees Form</h1>
      <form align="center" className="formStyles">
        <label>Name</label>
        <input type="text" className="inputStyles" placeholder="Name" 
        onChange = {(event) => {
          setEmployeeData.name(event.target.value)
        }}
        />
        <label>Age</label>
        <input type="text" className="inputStyles" placeholder="Age" 
        onChange = {(event) => {
          setEmployeeData.age(event.target.value)
        }}
        />
        <label>Country</label>
        <input type="text" className="inputStyles" placeholder="Country" 
        onChange = {(event) => {
          setEmployeeData.country(event.target.value)
        }}
        />
        <label>Position</label>
        <input type="text" className="inputStyles" placeholder="Position" 
        onChange = {(event) => {
          setEmployeeData.position(event.target.value)
        }}
        />
        <label>Salary</label>
        <input type="text" className="inputStyles" placeholder="Salary" 
        onChange = {(event) => {
          setEmployeeData.salary(event.target.value)
        }}
        />
        <div className="btn-area">
          <button type="submit" onClick={addEmployees()}>Add Data</button>
          <button type="submit" onClick={getEmployees()}>Show Data</button>
        </div>
      </form>
      <ListUser />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <UserForm />
    </div>
  );
};

export default App;
