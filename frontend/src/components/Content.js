import "../index.css";
import { FaTrashAlt } from "react-icons/fa";

function Content(props) {

    const{
        items,
        handleCheck,
        handleDelete,
        mode,
        printIfEmpty
    }=props

    return (
        <section className="Content">
        <div className="hookuse">
            {items.length ? (
            <section>
                <ul>
                    {items.map((item)=>(
                        <li className="item" key={item._id}>
                        <input 
                            onChange={()=>handleCheck(item._id)}
                            type="checkbox" 
                            checked={item.checked} 
                        />
                        <label>{item.todo}</label>
                        <FaTrashAlt 
                            className="deleteButton"
                            role="button"
                            onClick={()=>handleDelete(item._id)}
                        />
                        </li>        
                    ))}            
                </ul>
            </section>
            ) : (
            <p style={{color: mode==='dark' ? 'white' : 'black',fontWeight:'bold'}}>{`${printIfEmpty}`}</p>
            )}
        </div>
        </section>
    );
}
export default Content;
