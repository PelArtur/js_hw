function debounce(fn, duration = 300)
{
    let timeoutId;

    return (...args) => {
        const afterTimeout = () =>
        {
            clearTimeout(timeoutId);
            fn(...args);
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(afterTimeout, duration)
    }
}

function show(id, text)
{
    const element = document.getElementById(id);

    const textContent = document.createTextNode(text);
    element.replaceChildren(textContent);
}

function showTime(timeString)
{
    show('time-element', timeString)
}

function showTemperature(temperatureString)
{
    show('temperature-element', temperatureString)
}

function onCityChange(fn)
{
    const element = document.getElementById('city-input');
    const debouncedFn = debounce(fn);

    element.addEventListener('input', (event) => debouncedFn(event.target.value));
}

function getCurrentTime()
{
    return new Date().toLocaleTimeString('us-US', { hour12: false });
}

const intervalId = setInterval(() => { showTime(getCurrentTime()); }, 1000);
