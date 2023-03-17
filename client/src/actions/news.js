//delete news from databse
export const deletenews = () => {
  const url = "/news/delete";

  const request = new Request(url, {
    method: "delete",
  });

  fetch(request)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      });
};
//post news to database
export const postnews = (Comp) => {
  const url = "/news";

  const cases = Comp.state.new_news;
  const request = new Request(url, {
    method: "post",

    body: JSON.stringify(cases),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
  });

  fetch(request).catch((e) => {
    console.log(e);
  });
};
