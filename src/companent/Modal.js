import React from "react";
import "./modal.css";
import { useState } from "react";

function Modal({ onClose, onDelete, content }) {
  const [updateInput, setUpdateInput] = useState(content);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTodoList = JSON.parse(sessionStorage.getItem("todoList")).map(
      (item) => (item === content ? updateInput : item)
    );

    sessionStorage.setItem("todoList", JSON.stringify(updatedTodoList)); // sessionStorage'deki todoList'i güncelleyin
    onClose(); // modal'ı kapat
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            <i className="fa-solid fa-rectangle-xmark"></i>
          </button>
          <p>Lütfen Güncellemek istediğiniz alanı giriniz.</p>
          <form className="modal-form" onSubmit={handleUpdate}>
            <input
              className="todo-input"
              name="updateInput"
              type="text"
              maxLength="48"
              placeholder="Add Your Task"
              value={updateInput}
              onChange={(e) => setUpdateInput(e.target.value)}
            />
            <button>Güncelle</button>
          </form>

          <button className="delete-button" onClick={onDelete}>
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
