//delete the cases information in the database
export const deletecases = () => {
  const url = "/cases/delete";

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

//post the cases information in the database
export const postcases = (Comp) => {
  const url = "/cases";

  const news = Comp.state.new_cases;
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(news),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
  });

  fetch(request).catch((e) => {
    console.log(e);
  });
};
