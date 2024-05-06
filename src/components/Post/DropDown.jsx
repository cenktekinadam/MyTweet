import { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";


const DropDown = ({ handleDelete, handleEdit }) => {
    const inputRef = useRef();

    return (
        <div>
            <label className="popup">
                <input ref={inputRef} type="checkbox" />
                <div className="burger" tabIndex="0">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav className="popup-window">
                    <legend>Aksiyonlar</legend>
                    <ul>
                        <li>
                            <button onClick={() => {
                                inputRef.current.checked = false;
                                handleEdit();
                            }}>
                                <MdEdit />
                                <span>Düzenle</span>
                            </button>
                        </li>
                        <hr />
                        <li>
                            <button onClick={handleDelete}>
                                <FaTrashAlt />
                                <span>Sil</span>
                            </button>
                        </li>

                    </ul>
                </nav>
            </label>
        </div>
    )
}

export default DropDown