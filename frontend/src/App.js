import './index.css';
import { useEffect, useRef, useState } from "react";
import { Routes,Route } from 'react-router-dom';

import Home from './routes/Home';
import PendingTasks from './routes/PendingTasks';
import CompletedTasks from './routes/CompletedTasks';

import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Missing from './components/Missing';

import apiForItems from './api/items'

function App() { 

    const [items,setItems] = useState([]);
    const [search,setSearch]= useState('');
    const [newItem,setNewItem] = useState('');
    const [mode,setMode] = useState('dark');

    const inputRef = useRef();

    const handleCheck = async(id) => {
        const listItems = items.map((item)=>(item._id===id) ? {...item,checked:!item.checked} : item)
        setItems(listItems);
        try {
            const selectedItem = items.find(item=>item._id===id)
            console.log(selectedItem)
            await apiForItems.patch(`/${id}`,{...selectedItem,checked:!selectedItem.checked})
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDelete = async(id) => {
        const listItems = items.filter((item)=>(item._id!==id))
        setItems(listItems);

        try {
            await apiForItems.delete(`/${id}`)
        } catch (error) {
            console.log(error.message)
        } 
    }

    const handleAdd=async(todo)=>{
        const addNewItem={checked:false, todo};
        const listItems=[...items,addNewItem]
        setItems(listItems);

        try {
            await apiForItems.post('/',addNewItem)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await handleAdd(newItem)
        setNewItem('')
    }

    useEffect(()=>{
        const fetchApi = async()=>{
            try {
                const response = await apiForItems.get('/');
                await setItems(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        (async()=>fetchApi())()

    },[items,setItems])

    return (
        <div className="App">
            <div className={`body ${mode}`}>                       
                <Header mode={mode}/>

                <Nav 
                    setMode={setMode}
                />

                <Routes>
                    <Route path='/' element={
                        <Home 
                            items = {items}
                            setItems = {setItems}
                            newItem = {newItem}
                            setNewItem = {setNewItem}
                            handleSubmit={handleSubmit}
                            inputRef={inputRef}
                            search={search}
                            setSearch={setSearch}
                            handleCheck={handleCheck}
                            handleDelete={handleDelete}
                            mode={mode}
                        />
                    }/>               
                
                    <Route path='/completed' element={
                        <CompletedTasks
                            items = {items}
                            search={search}
                            setSearch={setSearch}
                            handleCheck={handleCheck}
                            handleDelete={handleDelete}
                            mode={mode}
                        />
                    }/>

                    <Route path='/pending' element={
                        <PendingTasks 
                            items = {items}
                            search={search}
                            setSearch={setSearch}
                            handleCheck={handleCheck}
                            handleDelete={handleDelete}
                            mode={mode}
                        />
                    }/>

                    <Route path='*' element={<Missing />} />
                </Routes>
            </div>

            <Footer />
        </div>
    ); 
}

export default App;

