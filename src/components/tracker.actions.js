export const ADD_LAP = 'LAPS/ADD_LAP';
export const DELETE_LAP = 'LAPS/DELETE_LAP';

export const addLap = (lapData) => {
  return {
    type: ADD_LAP,
    payload: {
      lapData
    }
  };
}


export const deleteLap = (lapId) => {
  return {
    type: DELETE_LAP,
    payload: {
      lapId
    }
  };
}
