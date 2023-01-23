// Task 1

// const parser = new DOMParser();

// const xmlString = `
// <list>
//   <student>
//     <name lang="en">
//       <first>Ivan</first>
//       <second>Ivanov</second>
//     </name>
//     <age>35</age>
//     <prof>teacher</prof>
//   </student>
//   <student>
//     <name lang="ru">
//       <first>Петр</first>
//       <second>Петров</second>
//     </name>
//     <age>58</age>
//     <prof>driver</prof>
//   </student>
// </list>`

// const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// const listNode = xmlDOM.querySelector("list");
// const studentNode = listNode.querySelectorAll("student");
// const nameNode = studentNode.querySelectorAll("name");
// const firstNameNode = nameNode.querySelectorAll("first");
// const secondNameNode = nameNode.querySelectorAll("second");
// const ageNode = studentNode.querySelectorAll("age");
// const profNode = studentNode.querySelectorAll("prof");

// const langAttr = studentNode.getAttribute('lang');

// const result = {
//   list: [
//     {student: [firstNameNode.textContent, secondNameNode.textContent], lang: langAttr, age: Number(ageNode.textContent), prof: profNode.textContent,}, 
//     {student: [firstNameNode.textContent, secondNameNode.textContent], lang: langAttr, age: Number(ageNode.textContent), prof: profNode.textContent,}]
// }

// console.log('result', result);

// Task 2
// const jsonString = `
// {
//   "list": [
//    {
//     "name": "Petr",
//     "age": "20",
//     "prof": "mechanic"
//    },
//    {
//     "name": "Vova",
//     "age": "60",
//     "prof": "pilot"
//    }
//   ]
// }`

// const data = JSON.parse(jsonString);
// const list = data.list;

// const result = {
//   list: list,
//   name: list.name,
//   age: list.age,
//   prof: list.prof,
// }

// console.log("result", result)

// Task 3

// function useRequest(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
  
//   xhr.onload = function() {
//     if (xhr.status != 200) {
//       console.log('Статус ответа: ', xhr.status);
//     } else {
//       const result = JSON.parse(xhr.response);
//       if (callback) {
//         callback(result);
//       }
//     }
//   };
  
//   xhr.onerror = function() {
//     console.log('Ошибка! Статус ответа: ', xhr.status);
//   };
  
//   xhr.send();
// };

// const resultNode = document.querySelector('.result');

// const btnNode = document.querySelector('.button');



// function displayResult(apiData) {
//   let cards = '';
  
//   apiData.forEach((item) => {
//     const cardBlock = `
//       <div class="card">
//         <img
//           src="${item.download_url}"
//           class="card-image"
//         />
//         <p>${item.author}</p>
//       </div>
//     `;
//     cards = cardBlock;
//   });
    
//   resultNode.innerHTML = cards;
// }

// btnNode.addEventListener('click', () => {
//   let value = document.querySelector('input').value;
//   value = Number(value);
//   let url = `https://picsum.photos/v2/list/?limit=${value}`;
//   if(value >= 1 && value <= 10){   
//     useRequest(url, displayResult);}
//     else{
//     resultNode.innerHTML = '<h1>Число вне диапазона от 1 до 10</h1>'
//   }
// });

// Task 4

// const resultNode = document.querySelector('.result');

// const btnNode = document.querySelector('.button');

// function displayResult(imgscr) {
//     let cards = '';
  
//     const cardBlock = `
//         <div class="card1">
//           <img
//             src="${imgscr}"
//             class="card-image1"
//           />
//         </div>
//       `;
//       cards = cardBlock;
    
      
//     resultNode.innerHTML = cards;
// }
  

// btnNode.addEventListener('click', () => {
//     let value1 = document.querySelector('.input1').value;
//     let value2 = document.querySelector('.input2').value;
//     value1 = Number(value1);
//     value2 = Number(value2);
//     if(value1 >= 100 && value1 <= 300 && value2 >= 100 && value2 <= 300){
//       fetch(`https://picsum.photos/${value1}/${value2}`)
//         .then((response) => {
//             let url = response.url;
//             displayResult(url);
//         })
//         .then(data => console.log(data.url)) 
//         .catch(() => { console.log('error') });
//     } else{
//       resultNode.innerHTML = '<h1>Число вне диапазона от 100 до 300</h1>'
//     }
//   });

// Task 5

const resultNode = document.querySelector('.result');

const btnNode = document.querySelector('.button');

const saveJson = localStorage.getItem("json");

document.addEventListener("DOMContentLoaded", () => {
  if (saveJson){
    displayResult(JSON.parse(saveJson));
  }
});

function displayResult(apiData) {
  let cards = '';
  
  apiData.forEach((item) => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
    
  resultNode.innerHTML = cards;
}

btnNode.addEventListener('click', () => {
    let value1 = document.querySelector('.pgNum').value;
    let value2 = document.querySelector('.limit').value;
    value1 = Number(value1);
    value2 = Number(value2);
    
    if(value1 >= 1 && value1 <= 10 && value2 >= 1 && value2 <= 10){
      fetch(`https://picsum.photos/v2/list?page=${value1}&limit=${value2}`)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    displayResult(json);
                    localStorage.setItem('json', JSON.stringify(json));
                })
                .catch(() => { console.log('error') });;

                localStorage.setItem('json', JSON.stringify(json))
    };
    if((value1 < 1 || value1 > 10 || isNaN(value1)) && value2 >= 1 && value2 <= 10){
      resultNode.innerHTML = '<h1>Номер страницы вне диапазона от 1 до 10</h1>'
    };
    if((value1 >= 1 && value1 <= 10) && (value2 < 1 || value2 > 10 || isNaN(value2))){
      resultNode.innerHTML = '<h1>Лимит вне диапазона от 1 до 10</h1>'
    };
    if((value1 < 1 || value1 > 10 || isNaN(value1)) && (value2 < 1 || value2 > 10 || isNaN(value2))){
      resultNode.innerHTML = '<h1>Номер страницы и лимит вне диапазона от 1 до 10</h1>'
    };
  });