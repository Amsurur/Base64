// import { FileToBase64 } from "./FileToBase64.js";
let API = "http://localhost:3000/data";
let box = document.querySelector(".box");
// let form = document.querySelector(".form");
// let Image = null;

// const handleNewImage = async (event) => {
//   event.preventDefault();
//   let file = await FileToBase64(event.target.files[0]);
//   console.log(file);
//   Image = file;
//   console.log(Image);
// };
// console.log(Image);
// async function PostUser(e) {
//   try {
//     const { data } = await axios.post(API, {
//       name: e.name,
//       img: e.img,
//     });
//     get();
//   } catch (error) {}
// }

// form.onsubmit = (event) => {
//   event.preventDefault();
//   handleNewImage(event);
//   let newUser = {
//     name: form["textInp"].value,
//     img: Image,
//   };
//   PostUser(newUser);
// };
let Image = null;
let reader = "";
let addbtn = document.querySelector(".addbtn");
let boximg = document.querySelector(".images");
console.log("s");

function download(input) {
  let file = input.files[0];
  // reader = new FileReader();
  // reader.readAsDataURL(file);
}

addbtn.onclick = async () => {
  try {
    const { data } = await axios.post(API, {
      name: "dada",
      img: reader.result,
    });
    get();
  } catch (error) {}
};

async function get() {
  try {
    const { data } = await axios.get(API);
    getUser(data);
  } catch (error) {
    console.error(error);
  }
}

function getUser(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let img = document.createElement("img");
    img.src = e.img;
    p.innerHTML = e.name;
    div.append(p, img);

    box.append(div);
  });
}
get();
