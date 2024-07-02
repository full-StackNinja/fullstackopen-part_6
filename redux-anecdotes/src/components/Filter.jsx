import { useDispatch } from 'react-redux';
import { filterAnecdotes } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(filterAnecdotes(e.target.value));
  };

  const style = {
    margin: '10px',
  };
  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
