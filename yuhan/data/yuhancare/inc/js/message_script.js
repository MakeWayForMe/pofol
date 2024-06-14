const btn = document.getElementById("button");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "메세지를 전송중입니다.";

  const serviceID = "yhcare";
  const templateID = "template_zjkhvaf";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "문의하기";
      alert("감사합니다. 문의가 정상적으로 접수 되었습니다.");
      document.querySelector("#to_name").value = "";
      document.querySelector("#from_name").value = "";
      document.querySelector("#message").value = "";
      document.querySelector("#reply_to").value = "";
    },
    (err) => {
      btn.value = "문의하기";
      alert(JSON.stringify(err));
    }
  );
});