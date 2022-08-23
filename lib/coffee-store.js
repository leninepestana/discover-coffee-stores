import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  // return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhoto = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
    color: "green",
    orientation: "portrait",
  });

  const unsplashResults = photos.response?.results || [];

  return unsplashResults.map((result) => result.urls["small"]);

  console.log({ unsplashResults });
};

export const fetchCoffeeStores = async (
  latLong = "43.87609504110661%2C-79.44328937642116",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhoto();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(
      // "43.87609504110661%2C-79.44328937642116",
      latLong,
      "coffee",
      limit
    ),
    options
  );

  const data = await response.json();
  return data.results.map((result, idx) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighborhood: neighborhood.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });

  // .catch((err) => console.error(err));
};
