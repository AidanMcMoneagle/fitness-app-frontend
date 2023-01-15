import React, { useState, useCallback } from "react";
import UserExercise from "./UserExercise";
import Modal from "../../shared/components/UIElements/Modal";
import { v4 as uuidv4 } from "uuid";

import "./UserWorkout.css";


// we want to have a reducer here. This reducer will hold all info for workout. Will be an array of objects. Each obj

/*[{
    exerciseId: 
    exerciseSets: [
            weightforSet1, weightforSet2, weightforSet3
        ]
    }
}, 
{}]
*/



const UserWorkout = (props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [inTrackingMode, setIsTrackingMode] = useState(false);
  const [numberOfSetHeaders, setNumberOfSetHeaders] = useState([]);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openTrackingMode = () => {
    setIsTrackingMode(!inTrackingMode);
  };

  // write some commnets about what this function is. What is it meant to do?
  const passNumberOfSetInputs = useCallback(
    (inputArray) => {
      if (inputArray.length > numberOfSetHeaders.length) {
        setNumberOfSetHeaders(inputArray);
      } else {
        return;
      }
    },
    [numberOfSetHeaders.length]
  );

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
              {inTrackingMode &&
                numberOfSetHeaders.length > 0 &&
                numberOfSetHeaders.map((input, index) => {
                  return (
                    <th className="track-input" key={index}>{`Set ${
                      index + 1
                    }`}</th>
                  );
                })}
              {inTrackingMode && numberOfSetHeaders.length > 0 && <th></th>}
            </tr>
          </thead>
          <tbody>
            {userWorkout.exercises.map((exercise) => {
              return (
                <tr>
                  <UserExercise
                    key={exercise._id}
                    exercise={exercise}
                    inTrackingMode={inTrackingMode}
                    passNumberOfSetInputs={passNumberOfSetInputs}
                    numberOfSetHeaders={numberOfSetHeaders}
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
