function onClickModal() {
    const popUp = document.querySelector('#pop-up');
    const bgPop = document.querySelector('#bg-pop');

    bgPop.style.background = "#236086"
    bgPop.style.opacity = "0.2"
    popUp.style.display = "block";
    popUp.style.zIndex = "8";
}

document.addEventListener("DOMContentLoaded", function() {
    const { search: paramsText } = window.location
    const params = paramsText
      .replace('?', '')
      .split('&')
      .map((param) => {
        const [key, value] = param.split('=')
        return { key, value }
      })
    const { value: vacineIdWithInc } = params.find((param) => param.key === 'id')
    const vacineId = vacineIdWithInc - 1
    fetch('../js/vacine.json')
      .then((response) => response.json())
      .then((data) => {
        const { vacines } = data
        if (vacines.length < vacineId && vacineId < 1) {
          return
        }
        const vacine = vacines[vacineId]
        document.getElementById('vacine').setAttribute('value', vacine.name)
        document.getElementById('date').setAttribute('value', vacine.date)
        document.getElementById('dateNext').setAttribute('value', vacine.dateNext)
        document.getElementById('image-select').setAttribute('src', vacine.image)

        switch(vacine.dose) {
          case '1a. dose':
            document.getElementById('1-dose').setAttribute('checked', vacine.dose);
            break;
          case '2a. dose':
            document.getElementById('2-dose').setAttribute('checked', vacine.dose);
            break;
          case '3a. dose':
            document.getElementById('3-dose').setAttribute('checked', vacine.dose);
            break;
          case 'reinforcement':
            document.getElementById('Reforço').setAttribute('checked', vacine.dose);
            break;
          case 'Dose única':
            document.getElementById('single-dose').setAttribute('checked', vacine.dose);
            break;
        }
      })
  })