
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
   console.log(` שולחת ל: http://localhost:8000/${type}`);
   console.log(' עם גוף:', JSON.stringify(object));
   return fetch(`http://localhost:8000/${type}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
      // body: "{company_name: 'אסם', company_code: '23232', phone_number: '203940392',supplier_name: 'יוסי לוי'}",
   })
      .then(res => res.json())
      .then(data => {
         console.log("data:"+data)
         return data;
      })
      .catch(err => {
         console.error('שגיאה בפנייה לשרת:', err);
         throw err;
      })
}