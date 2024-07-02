import axios from 'axios';

const baseUrl = 'http://localhost:3000/anecdotes';

const getId = () => (1000000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const data = { content, id: getId(), votes: 0 };
  const response = await axios.post(baseUrl, data);
  return response.data;
};

const updateAnecdote = async (id, object) => {
  const response = await axios.put(baseUrl + `/${id}`, object);
  return response.data;
};

export default { getAll, createNew, updateAnecdote };
