export const fetchData = async (url) => {
  const headers = {
    "X-Auth-Token": "f1be5eabebf04cfd9c9d98649232364f",
  };
  try {
    const response = await fetch(`https://api.football-data.org/v2/${url}`, {
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
