let addButtons = document.querySelector('.addBtn');

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("basket") !== null) {
      calcCount();
    }
  });

  let basket = [];

  addButtons.foreach((btn)=> {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (localStorage.getItem("basket") !== null) {
        basket = JSON.parse(localStorage.getItem("basket"));
      }
  
      let model = this.parentNode.querySelector("h5").innerText;
      let image = this.parentNode.previousElementSibling.src;
      let price = this.parentNode.querySelector(".price").innerText;
      let id = this.getAttribute("data-id");
      let existedProduct = basket.find((x) => x.id == id);
  
      if (existedProduct === undefined) {
        let product = {
          id,
          model,
          image,
          price,
          count: 1,
        };
        basket.push(product);
      } else {
        existedProduct.count++;
      }
      localStorage.setItem("basket", JSON.stringify(basket));
      calcCount();
      
    });
  });

function calcCount() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let count = basket.reduce((t, val) => {
      return (t += val.count);
    }, 0);
    let countValue = document.querySelector("sup");
    countValue.innerText = count;
  }