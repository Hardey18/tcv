import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addEvent, fetchEvents, logout } from '../../redux/action';
import Select from 'react-select';
import Modal from '../../components/Modal/Modal';
import './events.css'
import Card from '../../components/Card/Card';
import InputSearch from '../../components/InputSearch/InputSearch';

const options: any = [
  { value: true, label: "True" },
  { value: false, label: "False" },
];

function Events() {
  const [openModal, setOpenModal] = useState(false)
  const [singleEvent, setSingleEvent] = useState(null)
  const [query, setQuery]: any = useState("")
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
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  const { events, token }: any = useSelector((state) => state);

  const handleAddEvent = (e: any) => {
    e.preventDefault();
    dispatch(addEvent(formState));
  } 
  const showSingleEvent = (id: string) => {
    const currentEvent = events.find((event: any) => event._id === id);
    setSingleEvent(currentEvent);
    setOpenModal(true);
  }
  const handleLogout = () => {
    dispatch(logout())
  }
  return (<>
  <div className="event-container">
    {token && 
      <form className="form">
        <div>
          <input className="title-input" onChange={(e) => updateFormState("title", e.target.value)} value={formState.title} type="text" placeholder="Title" />
        </div>
        <div>
          <input className="description-input" onChange={(e) => updateFormState("description", e.target.value)} value={formState.description} type="text" placeholder="Description" />
        </div>
        <div>
          <input className="category-input" onChange={(e) => updateFormState("category", e.target.value)} value={formState.category} type="text" placeholder="Category" />
        </div>
        <div>
          <Select
            defaultValue={formState.isVirtual}
            onChange={(e: any) => updateFormState("isVirtual", e.value)}
            options={options}
            />
        </div>
        <div>
          <input className="date-input" onChange={(e) => updateFormState("date", e.target.value.split("-").join("/"))} value={formState.date.split("/").join("-")} type="date" placeholder="Date" />
        </div>
        <div>
          <input className="address-input" onChange={(e) => updateFormState("address", e.target.value)} value={formState.address} type="text" placeholder="Address" />
        </div>
        <button className="event-button" onClick={(e) => handleAddEvent(e)}>Add Event</button>
      </form>
    }
    {token && 
      <button className="logout" onClick={handleLogout}>Logout</button>
    }
    {!token &&
    <Link to="login">
      <button className="event-button">Admin Login</button>
    </Link>}
      {openModal && 
        <Modal
        singleEvent={singleEvent}
        setOpenModal={setOpenModal}
        />
      }
      </div>
      <div className="event-title">List of All Events</div>
      <InputSearch
        type="text"
        placeholder="Search by Category"
        handleChange={(event: { target: { value: any; }; }) => setQuery(event.target.value)}
      />
      <div>
        {events.filter((post: { category: string; }) => {
          if(query === '') {
            return post;
          } else if (post.category.toLowerCase().includes(query.toLowerCase())) {
            return post
          }
        }).slice(0).reverse().map((result: any) => (
          <div className="hotlist" onClick={() => showSingleEvent(result._id)} key={result._id}>
            <Card 
              title={result.title}
              category={result.category}
            />
          </div>
          ))}
      </div>
    </>)
}

export default Events