let API = "http://localhost:3000/data";
import getUser from "./dom.js";
async function get() {
  try {
    let { data } = await axios.get(API);
    getUser(data);
  } catch (error) {
    console.error(error);
  }
}
// const FileToBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

export default get;
export { FileToBase64 };
