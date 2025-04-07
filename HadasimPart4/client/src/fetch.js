
export function getData(type) {
    return fetch(`http://localhost:8000/${type}`, {
      //  headers: {
      //     'Content-Type': 'application/json',
      //     'authorization': localStorage.getItem("token"),
      //  },
    })
       .then((res) => {
          if (!res.ok) {
             throw new Error('Network response was not ok');
          }
          return res.json();
       })
       .then((data) => {
         console.log(data)
         return data;
         
       })
       .catch((error) => console.error(`Error fetching ${type}:`, error));
 }

 export function getDataById(type, code) {
   return fetch(`http://localhost:8000/${type}/${code}`, {
      // headers: {
      //    'Content-Type': 'application/json',
      //    'authorization': localStorage.getItem("token"),
      // }
   })
      .then((res) => res.json())
      .then((data) => {
         return data;
      })
      .catch((error) => console.error(`Error fetching ${type}:`, error));
}

 export function postNewObject(type, object) {
   console.log(object)
   return fetch(`http://localhost:8000/${type}`, {
      method: 'POST',
      // headers: {
      //    'Content-Type': 'application/json',
      //    'authorization':localStorage.getItem("token"),
      // },
      body: JSON.stringify(object),
   })
      .then(res => res.json())
      .then(data => {
         return data;
      })
      .catch(err => {
         throw err;
      })
}