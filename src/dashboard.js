import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Addincome, Getuserbyid, Addexpense } from "./api";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Leftside from "./leftside";
import Main from "./main";
import { render } from "@testing-library/react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Dashboard() {
  let [iamount, uiamount] = useState(0);
  let [idate, uidate] = useState("");
  let [itime, uitime] = useState("");
  let [itype, uitype] = useState("");
  let [icat, uicat] = useState("");

  let [eamount, ueamount] = useState(0);
  let [edate, uedate] = useState("");
  let [etime, uetime] = useState("");
  let [etype, uetype] = useState("");
  let [ecat, uecat] = useState("");

  let date = new Date();

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [inmodalIsOpen, insetIsOpen] = React.useState(false);
  const [exmodalIsOpen, exsetIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function inopenModal() {
    insetIsOpen(true);
  }
  function exopenModal() {
    exsetIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accesse
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function incloseModal() {
    insetIsOpen(false);
  }
  function excloseModal() {
    exsetIsOpen(false);
  }

  let { id } = useParams();
  let [uname, uuname] = useState("");
  let [income, uincome] = useState([]);
  let [expense, uexpense] = useState([]);
  let [sdate, usdate] = useState("00/00/0000");
  let [ldate, uldate] = useState("00/00/0000");
  let [sa, usa] = useState([]);
  let [la, ula] = useState([]);
  useEffect(async () => {
    let user = (await Getuserbyid(id)).data;
    uuname(user.name);
    uincome([...user.income]);
    uexpense([...user.expense]);
  }, []);

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-12 bg-primary header"></div>

        <Link to="/">
          <button className="btn btn-warning logout" onClick={
            ()=>{
              window.localStorage.removeItem("app_token");
            }
          }>Logout</button>
        </Link>
      </div>
      <button class="btn btn-warning add" onClick={openModal}>
        <i class="fas fa-plus fa-2x"></i>
      </button>
      <Leftside></Leftside>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let tmp = sdate.split("/");
          let tem = ldate.split("/");
          usa([...tmp]);
          ula([...tem]);
        }}
      >
        <div class="container-fluid">
          <div class="row">
            <div class="offset-3 col-4">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="dd/mm/yyyy"
                  value={sdate}
                  onChange={(e) => {
                    usdate(e.target.value);
                  }}
                />
                <label for="floatingInput">
                  Enter starting date-(dd/mm/yyy)
                </label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="dd/mm/yyyy"
                  value={ldate}
                  onChange={(e) => {
                    uldate(e.target.value);
                  }}
                />
                <label for="floatingPassword">Enter end date-(dd/mm/yyy)</label>
              </div>
            </div>
            <div class="col-1">
              <button type="submit" class="btn btn-primary mainbtn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      <div class="container-fluid">
        <div class="row">
          <div class="offset-3 col-9">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Income Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Divison</th>
                </tr>
              </thead>
              {income.map((i) => {
                return (
                  <tr>
                    <td>{i.Amount}</td>
                    <td>{i.date}</td>
                    <td>{i.type}</td>
                    <td>{i.category}</td>
                  </tr>
                );
              })}
              <tbody></tbody>
            </table>{" "}
            <br />
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Expense Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Divison</th>
                </tr>
              </thead>
              {expense.map((i) => {
                return (
                  <tr>
                    <td>{i.Amount}</td>
                    <td>{i.date}</td>
                    <td>{i.type}</td>
                    <td>{i.category}</td>
                  </tr>
                );
              })}
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <div className="mb">
          {" "}
          <button class="btn btn-primary" onClick={inopenModal}>
            Income
          </button>{" "}
        </div>
        <div className="mb">
          {" "}
          <button class="btn btn-primary" onClick={exopenModal}>
            Expense
          </button>{" "}
        </div>
        <button class="btn btn-danger" onClick={closeModal}>
          <i class="fas fa-times"></i>
        </button>
      </Modal>

      <Modal
        isOpen={inmodalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={incloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <div className="mb-3">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              let obj = {
                Amount: iamount,
                date: idate,
                time: itime,
                type: itype,
                category: icat,
                changedate:
                  date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear(),
                changetime: date.getHours() + ":" + date.getMinutes(),
              };
              console.log(obj);
              await Addincome(id, obj);
              let user = (await Getuserbyid(id)).data;
              uincome([...user.income]);
              uexpense([...user.expense]);
              uiamount("");
              uidate("");
              uitime("");
              uitype("-");
              uicat("-");
            }}
          >
            <label for="exampleFormControlInput1" class="form-label">
              Income amount
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Amount"
              value={iamount}
              onChange={(e) => {
                uiamount(e.target.value);
              }}
            />
            <br />
            <label for="exampleFormControlInput1" class="form-label">
              Date
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="dd/mm/yyyy"
              value={idate}
              onChange={(e) => {
                uidate(e.target.value);
              }}
            />{" "}
            <br />
            <label for="exampleFormControlInput1" class="form-label">
              Time
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="hh:mm"
              value={itime}
              onChange={(e) => {
                uitime(e.target.value);
              }}
            />{" "}
            <br />
            <label for="type">Choose a Income type:</label> <br />
            <select
              id="type"
              name="type"
              class="form-control"
              value={itype}
              onChange={(e) => {
                uitype(e.target.value);
              }}
            >
              <option value="-">-</option>
              <option value="salary">Salary</option>
              <option value="stocks">Stocks</option>
              <option value="bones">Bonus</option>
              <option value="othes">othes</option>
            </select>
            <br />
            <label for="type">Choose a category:</label> <br />
            <select
              id="type"
              name="type"
              class="form-control"
              value={icat}
              onChange={(e) => {
                uicat(e.target.value);
              }}
            >
              <option value="-">-</option>
              <option value="office">Office</option>
              <option value="personal">Personal</option>
            </select>
            <br />
            <button type="submit" class="btn btn-primary modalbtn">
              Submit
            </button>
            <button class="btn btn-danger" onClick={incloseModal}>
              <i class="fas fa-times"></i>
            </button>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={exmodalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={excloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>

        <div className="mb-3">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              let obj = {
                Amount: eamount,
                date: edate,
                time: etime,
                type: etype,
                category: ecat,
                changedate:
                  date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear(),
                changetime: date.getHours() + ":" + date.getMinutes(),
              };
              console.log(obj);
              await Addexpense(id, obj);
              let user = (await Getuserbyid(id)).data;
              uincome([...user.income]);
              uexpense([...user.expense]);
              ueamount("");
              uedate("");
              uetime("");
              uetype("-");
              uecat("-");
            }}
          >
            <label for="exampleFormControlInput1" class="form-label">
              Expense amount
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Amount"
              value={eamount}
              onChange={(e) => {
                ueamount(e.target.value);
              }}
            />
            <br />
            <label for="exampleFormControlInput1" class="form-label">
              Date
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="dd/mm/yyyy"
              value={edate}
              onChange={(e) => {
                uedate(e.target.value);
              }}
            />{" "}
            <br />
            <label for="exampleFormControlInput1" class="form-label">
              Time
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="hh:mm"
              value={etime}
              onChange={(e) => {
                uetime(e.target.value);
              }}
            />{" "}
            <br />
            <label for="type">Choose a Expense type:</label> <br />
            <select
              id="type"
              name="type"
              class="form-control"
              value={etype}
              onChange={(e) => {
                uetype(e.target.value);
              }}
            >
              <option value="-">-</option>
              <option value="fuel">Fuel</option>
              <option value="movie">Movie</option>
              <option value="food">Food</option>
              <option value="loan">loan</option>
              <option value="medical">Medical</option>
              <option value="othes">othes</option>
            </select>
            <br />
            <label for="type">Choose a category:</label> <br />
            <select
              id="type"
              name="type"
              class="form-control"
              value={ecat}
              onChange={(e) => {
                uecat(e.target.value);
              }}
            >
              <option value="-">-</option>
              <option value="office">Office</option>
              <option value="personal">Personal</option>
            </select>
            <br />
            <button type="submit" class="btn btn-primary modalbtn">
              Submit
            </button>
            <button class="btn btn-danger" onClick={excloseModal}>
              <i class="fas fa-times"></i>
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
