import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '29796536-5ed99ce8effe96d6d69c656a8',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&${searchParams}`
  );

  return data;
};
