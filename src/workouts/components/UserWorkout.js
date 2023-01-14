import React, { useState } from "react";
import UserExercise from "./UserExercise";
import Modal from "../../shared/components/UIElements/Modal";
import { v4 as uuidv4 } from "uuid";

import "./UserWorkout.css";

const UserWorkout = (props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [inTrackingMode, setIsTrackingMode] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openTrackingMode = () => {
    setIsTrackingMode(!inTrackingMode);
    // call a function that has been passed up by the UserExercise.
    // const setNumberOfInputs = (numSets) => {

    // }
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
      <h5>{`Workout Number ${props.index + 1}`}</h5>
      <form>
        <table class="workout-table">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Repetitions</th>
              <th>Sets</th>
              {inTrackingMode && <th>Weight</th>} {/* Need to pass up data  */}
              {inTrackingMode && <th>Weight</th>} {/* Need to pass up data  */}
              {inTrackingMode && <th>Weight</th>} {/* Need to pass up data  */}
            </tr>
          </thead>
          <tbody>
            {userWorkout.exercises.map((exercise) => {
              return (
                <tr>
                  <UserExercise
                    key={uuidv4()}
                    exercise={exercise}
                    inTrackingMode={inTrackingMode}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>

      <button onClick={openDeleteModal}>DELETE WORKOUT</button>
      <button onClick={openTrackingMode}>TRACK WORKOUT</button>
    </React.Fragment>
  );
};

export default UserWorkout;
