import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addEvent, fetchEvents, logout } from '../redux/action';
import Select from 'react-select';
import Modal from './Modal';

const options: any = [
  { value: true, label: "True" },
  { value: false, label: "False" },
];

function Events() {
  const [openModal, setOpenModal] = useState(false)
  const [singleEvent, setSingleEvent] = useState(null)
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    category: "",
    isVirtual: false,
    date: "",
    address: "",
  })
  const updateFormState = (key: string, value: string | boolean) => {
    setFormState({
        ...formState,
        [key]: value
    })
}
    const navigate = useNavigate();
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  const { events, token }: any = useSelector((state) => state);

  const handleAddEvent = (e) => {
    e.preventDefault();
    dispatch(addEvent(formState));
  } 
  const showSingleEvent = (id: string) => {
    const currentEvent = events.find((event: { id: any; }) => event._id === id);
    setSingleEvent(currentEvent);
    setOpenModal(true);
  }
  const handleLogout = () => {
    dispatch(logout())
  }
  console.log("Result", token)
  return (<>
    <div>Events</div>
    {token && 
      <form>
        <input onChange={(e) => updateFormState("title", e.target.value)} value={formState.title} type="text" placeholder="Title" />
        <input onChange={(e) => updateFormState("description", e.target.value)} value={formState.description} type="text" placeholder="Description" />
        <input onChange={(e) => updateFormState("category", e.target.value)} value={formState.category} type="text" placeholder="Category" />
        <Select
          defaultValue={formState.isVirtual}
          onChange={(e: any) => updateFormState("isVirtual", e.value)}
          options={options}
        />
        <input onChange={(e) => updateFormState("date", e.target.value.split("-").join("/"))} value={formState.date.split("/").join("-")} type="date" placeholder="Date" />
        <input onChange={(e) => updateFormState("address", e.target.value)} value={formState.address} type="text" placeholder="Address" />
        <button onClick={(e) => handleAddEvent(e)}>Add Event</button>
      </form>
    }
    <div>
      {events.map((result: any) => (
        <div onClick={() => showSingleEvent(result._id)} key={result._id}>{result.title}</div>
      ))}
    </div>
    {!token &&
    <Link to="login">
      <button>Admin Login</button>
    </Link>}
    {token && 
      <button onClick={handleLogout}>Logout</button>
    }
      {openModal && 
        <Modal
          singleEvent={singleEvent}
          setOpenModal={setOpenModal}
        />
      }
    </>)
}

export default Events