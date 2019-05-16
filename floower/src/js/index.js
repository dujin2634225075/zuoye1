import "../css/index.css";
import "../fonts/iconfont.css";
import "../sass/index.scss";
import "../css/swiper.css";
// import swiper from "./swiper.min.js";
import axios from "./axios";
let flag = false;

function init() {

    getData();
}

function getData() {
    axios.get("/getData").then((res) => {

        renderData(res.data.data.Datas.FlowerList);

    })
}

function renderData(data) {

    let content = document.querySelector(".content");
    content.innerHTML = data.map(item => {
        return ` <dl>
                <dt>
                    <img src="${item.Image}" alt="">
                </dt>
                <dd>
                    <h2>${item.Name}</h2>
                    <p>${item.Introduction}</p>
                    <p>${item.NowPromo==null?"":item.NowPromo}</p>
                    <h1>￥${item.Price}<span>${item.LinePrice}</span></h1>
                    <span>已销售${item.Sales}</span>                 
                </dd>
            </dl>`
    }).join("");
    let price = document.getElementById("price");
    price.onclick = function() {

        sortData(data)
    }

}

function sortData(data) {
    flag = !flag;
    if (flag) {
        data.sort((x, y) => {
            return x.Price - y.Price
        })
    } else {
        data.sort((x, y) => {
            return y.Price - x.Price
        })
    }

    renderData(data)
}
init();