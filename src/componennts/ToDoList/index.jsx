import React, { useState } from "react";
import { ListGroup, Modal, Form, Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDoneOutline } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi2";
import styles from "./ToDoList.module.css";

function ToDoList({ list, removeItem, updateItem }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");

  const handleEditClick = (item) => {
    setEditedTodo(item);
    setEditedTitle(item.title);
    setEditedDesc(item.desc);
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    // Update the ToDo item with the edited values
    const updatedTodo = {
      id: editedTodo.id,
      title: editedTitle,
      desc: editedDesc,
    };
    updateItem(editedTodo.id, updatedTodo);
    // Close the edit modal
    setShowEditModal(false);
  };

  const handleModalClose = () => {
    // Reset the state variables when the modal is closed
    setEditedTodo("");
    setEditedTitle("");
    setEditedDesc("");
    setShowEditModal(false);
  };

  return (
    <div className="todo-list" style={{ height: "300px", overflowY: "auto" }}>
      {list.map((item) => (
        <ListGroup
          key={item.id}
          className={`${styles.list_group} w-50 mx-auto shadow-lg`}
        >
          <ListGroup.Item style={{ overflowX: "auto" }}>
            {item.title}
            <br />
            {item.desc}{" "}
            <div className={styles.edit_delete_div}>
              <div className={styles.edit_icon_div}>
                <CiEdit
                  role="button"
                  onClick={() => handleEditClick(item)}
                  className={styles.edit_icon}
                />
              </div>
              <div className={styles.delete_icon_div}>
                <MdDelete onClick={() => removeItem(item.id)} role="button" />
              </div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      ))}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>Edit </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEditedTitle(e.target.value)}
                value={editedTitle}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEditedDesc(e.target.value)}
                value={editedDesc}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}>
            <HiOutlineLockClosed />
          </Button>
          <Button variant="success" onClick={handleEditSubmit}>
            <MdDoneOutline />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ToDoList;
