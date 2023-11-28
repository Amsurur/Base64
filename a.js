let API = "http://localhost:3000/data";
let box = document.querySelector(".box");
const fileInp = document.getElementById("fileInp");
const btn = document.getElementById("btn");
const textInp = document.getElementById("textInp");
let editModal = document.querySelector(".editModal");
let editClose = document.querySelector(".editClose");
let editForm = document.querySelector(".editForm");
let editimg = document.querySelector(".editimg");
editClose.onclick = () => {
  editModal.close();
};

fileInp.onchange = (event) => {
  const file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  btn.onclick = () => {
    postData(reader.result);
  };
};

async function postData(result) {
  try {
    const { data } = await axios.post(API, {
      name: textInp.value,
      img: result,
    });
    get();
  } catch (error) {
    console.error(error);
  }
}

async function get() {
  try {
    const { data } = await axios.get(API);
    getUser(data);
  } catch (error) {
    console.error(error);
  }
}

function edit(e, id) {
  editModal.showModal();
  editForm["nameEdit"].value = e.name;
  editimg.src = e.img;
  editForm["imgEdit"].file = e.img;
  editForm["imgEdit"].onchange = (event) => {
    let editFile = event.target.files[0];
    const reader2 = new FileReader();
    reader2.readAsDataURL(editFile);
    editForm.onsubmit = (event) => {
      event.preventDefault();
      editData(id, reader2.result);
    };
  };
}

async function editData(id, result2) {
  try {
    const { data } = await axios.put(`${API}/${id}`, {
      img: result2,
      name: editForm["nameEdit"].value,
    });
    get();
  } catch (error) {
    console.error(error);
  }
}
// function editUser(e, id) {
//   editModal.showModal();
//   editForm["nameEdit"].value = e.name;
//   editForm["imgEdit"].file = btoa(e.img);
//   editForm["imgEdit"].addEventListener("change", (e) => {
//     let editFile = e.target.files[0];
//     const reader2 = new FileReader();
//     reader2.readAsDataURL(editFile);
//     editForm.onsubmit = async (event) => {
//       event.preventDefault();
//       console.log(reader2.result);

//       try {
//         let { data } = await axios.put(`http://localhost:3000/data/${id}`, {
//           img: reader2.result,
//           name: event.target["nameEdit"].value,
//         });
//         get();
//       } catch (error) {
//         console.error(error);
//       }

//       editModal.close();
//     };
//   });
// }

function getUser(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");
    div.className = "cont";
    let p = document.createElement("span");
    let img = document.createElement("img");
    let div2 = document.createElement("div");
    let btn = document.createElement("button");
    btn.innerHTML = "edit";
    btn.onclick = () => {
      editModal.showModal();
      edit(e, e.id);
    };
    img.src = e.img;
    p.innerHTML = e.name;
    div2.append(p, btn);
    div.append(img, div2);

    box.append(div);
  });
}
get();
