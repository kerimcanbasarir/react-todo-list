import { useState, useEffect } from "react";
import Modal from "./Modal";

function TodoItem({ content, onDelete, setTodoList }) {
  const [isDone, setIsDone] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedTodoList = sessionStorage.getItem("todoList");

    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, [showModal]);

  const handleDelete = () => {
    onDelete(content);
    setShowModal(false); // Delete işleminden sonra modalı kapat

    // Silme işlemi yapıldığında sessionStorage'e güncellenmiş todoList'i kaydet
    const updatedTodoList = JSON.parse(
      sessionStorage.getItem("todoList")
    ).filter((item) => item !== content);
    sessionStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  return (
    <div>
      <li>
        <div className="isDone">
          <i
            className={`fa-solid ${
              isDone ? "fa-circle-check" : "fa-circle"
            } icon`}
            onClick={() => {
              setIsDone(!isDone);
            }}
          ></i>
          <span
            className="ItemContent"
            style={{
              textDecoration: isDone ? "line-through" : "none",
              opacity: isDone ? "20%" : "100%",
            }}
          >
            {content}
          </span>
        </div>

        <span className="iconGroup">
          <i
            className="fa-solid fa-ellipsis-vertical icon setting"
            onClick={() => setShowModal(true)}
          ></i>
        </span>
      </li>
      <div>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            onDelete={handleDelete}
            content={content}
          />
        )}
      </div>
    </div>
  );
}

export default TodoItem;
