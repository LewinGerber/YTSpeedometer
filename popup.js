browser.theme.getCurrent().then(theme => {
    document.getElementsByTagName('body')[0].style.backgroundColor = theme.colors.toolbar_field  ? theme.colors.toolbar_field : "white";
    document.getElementById('popup').style.backgroundColor = theme.colors.toolbar_field ? theme.colors.toolbar_field: "white";
    document.getElementById('popup').style.color = theme.colors.toolbar_field_text ? theme.colors.toolbar_field_text : "black";
    document.getElementsByTagName('input')[0].style.borderColor = theme.colors.toolbar_field_text ? theme.colors.toolbar_field_text: "black";
});

const inputField = document.getElementById("speed-input")
inputField.addEventListener('input', debounce(handleInputChange, 500))

function debounce(func, delay) {
    let timerId;

    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            func.apply(this, args);
            timerId = null;
        }, delay);
    }
}

function handleInputChange(event) {
    let newValue = event.target.value
    if (newValue < 0) {
        newValue = 0
    }

    changeSpeedOfVideo(newValue)
}

async function changeSpeedOfVideo(speed) {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    browser.tabs.executeScript(tabs[0].id, {code: `document.getElementsByClassName("video-stream")[0].playbackRate = ${speed}`});
}
