import React, { useState } from "react";
import UserExercise from "./UserExercise";
import Modal from "../../shared/components/UIElements/Modal";
import { v4 as uuidv4 } from "uuid";

const UserWorkout = (props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const { userWorkout, deleteHandler } = props;
  return (
    <React.Fragment>
      {isDeleteModalOpen && (
        <Modal
          show
          header={"WARNING!"}
          footer={
            <div>
              <button onClick={() => deleteHandler(userWorkout._id)}>
                Yes
              </button>
              <button onClick={closeDeleteModal}>No</button>
            </div>
          }
        >
          <p>
            Are you sure you want to delete this workout? If you delete this
            workout all associated progress will also be deleted.
          </p>
        </Modal>
      )}
      {userWorkout.exercises.map((exercise) => {
        return (
          <div>
            <UserExercise key={uuidv4()} exercise={exercise} />
          </div>
        );
      })}
      <button onClick={openDeleteModal}>DELETE WORKOUT</button>
    </React.Fragment>
  );
};

export default UserWorkout;
