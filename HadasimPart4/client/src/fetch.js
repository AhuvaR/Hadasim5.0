
export function getData(type) {
   return fetch(`http://localhost:8000/${type}`, {
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
   })
      .then((res) => res.json())
      .then((data) => {
         return data;
      })
      .catch((error) => console.error(`Error fetching ${type}:`, error));
}

export function postNewObject(type, object) {
   return fetch(`http://localhost:8000/${type}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
   })
      .then(res => res.json())
      .then(data => {
         return data;
      })
      .catch(err => {
         console.error('שגיאה בפנייה לשרת:', err);
         throw err;
      })
}