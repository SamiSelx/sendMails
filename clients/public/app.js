const email = document.getElementById("mail");
const password = document.getElementById("pass");
const emailDes = document.getElementById("mailDes");
const subject = document.getElementById("subject");
const text = document.getElementById("text");
const btnPost = document.getElementById("post");
const btnShow = document.getElementById("show")

const allInput = document.querySelectorAll("form div input");
console.log(allInput)

async function postInfo(e) {
  e.preventDefault();
  const body = {
    email: email.value,
    password: password.value,
    emailDest: emailDes.value,
    subject: subject.value,
    text: text.value,
  };
  let res = await fetch("http://localhost:8383/", {
    method: "POST",
    body: JSON.stringify({
      parcel: body,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  let data = await res.json()
  console.log(data);
  if(res.status == 400){
    document.querySelector("body form").classList.add("error")
  }else if(res.status == 200){
    console.log(res.body)
    allInput.forEach(input => input.value = '')
    document.querySelector("body form").classList.remove("error")
  }
}

btnPost.addEventListener("click", postInfo);

btnShow.addEventListener('click',(e)=>{
    e.preventDefault() 
    password.type == "password" ? password.type = "text" : password.type = "password"
})