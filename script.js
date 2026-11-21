//  追加：スマホで最初に表示した画面の高さを固定
if (window.matchMedia("(max-width: 670px)").matches) {
    const heroHeight = window.innerHeight;

    document.documentElement.style.setProperty(
        "--hero-height",
        `${heroHeight}px`
    );
}

//メイン4分割・スマホスワイプ

const visuals = document.querySelectorAll(
    ".main-1_image"
);

const items = document.querySelectorAll(
    ".main-1_list li"
);

const main = document.querySelector(".main-1");

const photos = [
    "sliderpict-A.jpg",
    "sliderpict-B.jpg",
    "sliderpict-C.jpg",
    "sliderpict-D.jpg"
];

let active = visuals[0];
let next = visuals[1];

// 最初の写真を表示
active.style.backgroundImage =
`url("${photos[0]}")`;

active.dataset.photo = "0";
active.classList.add("is-active");

// 【追加】共通の写真切り替え処理
function showPhoto(index) {

    if (active.dataset.photo === String(index)) {
        return;
    }

    next.style.backgroundImage =
    `url("${photos[index]}")`;

    next.dataset.photo = String(index);

    next.classList.add("is-active");
    active.classList.remove("is-active");

    [active, next] = [next, active];
}

// PC版：マウスオーバー
items.forEach((item) => {

    item.addEventListener("mouseenter", () => {

        const index = Number(item.dataset.photo);

        showPhoto(index);

    });

});

// 【追加】スマホ版：左右スワイプ
let touchStartX = 0;
let touchStartY = 0;

main.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;

}, { passive: true });

main.addEventListener("touchend", (event) => {

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const distanceX = touchEndX - touchStartX;
    const distanceY = touchEndY - touchStartY;

    // 【追加】横方向に50px以上動いた場合だけ反応
    if (Math.abs(distanceX) < 50) return;

    // 【追加】縦方向の動きが大きい場合は無視
    if (Math.abs(distanceY) > Math.abs(distanceX)) return;

    // 【追加】スマホ以外では動かさない
    if (!window.matchMedia("(max-width: 670px)").matches) return;

    const current = Number(active.dataset.photo);

    if (distanceX < 0) {

        // 左スワイプ：次の写真
        showPhoto((current + 1) % photos.length);

    } else {

        // 右スワイプ：前の写真
        showPhoto((current - 1 + photos.length) % photos.length);

    }

}, { passive: true });

//ヘッダー
const header = document.querySelector("#site-header");

function toggleHeader() {
    if(!header)return;

    if(window.scrollY >= window.innerHeight){
        header.classList.add("header-hidden");
    } else {
        header.classList.remove("header-hidden");
    }
}

window.addEventListener("scroll",toggleHeader);
window.addEventListener("resize",toggleHeader);

toggleHeader();

//メニューアイコン
document.addEventListener('DOMContentLoaded', function() {

    const menuIcon = document.querySelector('.menu-icon');
    const headerRight = document.querySelector('.header-right');

    menuIcon.addEventListener('click', function() {
        headerRight.classList.toggle('active');
    });

    const menuLinks = document.querySelectorAll('.header-right a');

    menuLinks.forEach((link) => {
        link.addEventListener('click', function() {
            headerRight.classList.remove('active');
        });
    });

});