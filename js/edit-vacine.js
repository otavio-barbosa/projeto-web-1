function onClickModal() {
    const popUp = document.querySelector('#pop-up');
    const bgPop = document.querySelector('#bg-pop');

    bgPop.style.background = "#236086"
    bgPop.style.opacity = "0.2"
    popUp.style.display = "block";
    popUp.style.zIndex = "8";
}