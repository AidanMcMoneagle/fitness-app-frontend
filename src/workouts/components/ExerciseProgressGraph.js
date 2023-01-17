import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExerciseProgressGraph = (props) => {
  const { workoutData, exerciseId, name } = props;
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const arrayOfProgressforExercise = (exerciseId) => {
      const arrayofObjects = workoutData.map((workout) => {
        const workoutDate = workout.date;
        let averageWeightLifted = undefined;
        for (let [key, value] of Object.entries(workout)) {
          if (key !== "exerciseWeights") {
            continue;
          } else {
            value.map((exercise) => {
              if (exercise.exerciseId !== exerciseId) {
                return;
              } else {
                averageWeightLifted = exercise.exerciseSets.reduce(
                  (total, weight, index, array) => {
                    total += parseInt(weight);
                    if (index === array.length - 1) {
                      return total / array.length;
                    } else {
                      return total;
                    }
                  },
                  0
                );
                return averageWeightLifted;
              }
            });
          }
        }
        return {
          date: new Date(workoutDate).toLocaleDateString(),
          averageLoadKg: averageWeightLifted,
        };
      });
      return arrayofObjects;
    };
    const data = arrayOfProgressforExercise(exerciseId);
    setGraphData(data);
  }, [workoutData, exerciseId]);

  return (
    <div className="section-center">
      <h3>{name}</h3>
      {graphData && graphData.length > 0 && (
        <ResponsiveContainer width="100%" aspect="2">
          <LineChart
            width={500}
            height={300}
            data={graphData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="averageLoadKg"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExerciseProgressGraph;
