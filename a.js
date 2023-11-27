let API = "http://localhost:3000/data";
let box = document.querySelector(".box");
const fileInp = document.getElementById("fileInp");
const btn = document.getElementById("btn");
const textInp = document.getElementById("textInp");
let editModal = document.querySelector(".editModal");
let editClose = document.querySelector(".editClose");
let editForm = document.querySelector(".editForm");
editClose.onclick = () => {
  editModal.close();
};
fileInp.addEventListener("change", (e) => {
  let file = e.target.files[0];
  console.log(file);
  let reader = new FileReader();
  reader.readAsDataURL(file);

  console.log(reader.result);

  btn.onclick = async (e) => {
    try {
      let { data } = await axios.post("http://localhost:3000/data", {
        img: reader.result,
        name: textInp.value,
      });
    } catch (error) {
      console.log(error);
    }
  };
});

async function get() {
  try {
    const { data } = await axios.get(API);
    getUser(data);
  } catch (error) {
    console.error(error);
  }
}

function editUser(e, id) {
  editModal.showModal();
  editForm["nameEdit"].value = e.name;
  editForm["imgEdit"].value = "";
  editForm["imgEdit"].addEventListener("change", (e) => {
    let editFile = e.target.files[0];
    const reader2 = new FileReader();
    reader2.readAsDataURL(editFile);
    editForm.onsubmit = async (event) => {
      event.preventDefault();
      console.log(reader2.result);

      try {
        let { data } = await axios.put(`http://localhost:3000/data/${id}`, {
          img: reader2.result,
          name: event.target["nameEdit"].value,
        });
        get();
      } catch (error) {
        console.error(error);
      }

      editModal.close();
    };
  });
}

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
      editUser(e, e.id);
    };
    img.src = e.img;
    p.innerHTML = e.name;
    div2.append(p, btn);
    div.append(img, div2);

    box.append(div);
  });
}
get();
