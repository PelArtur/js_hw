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


async function getCurrentTemperature(city)
{
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    url.searchParams.append('name', city);

    const response = await fetch(url);
    if( !response.ok )
        return `The city does not exist: ${city}`;

    const data = await response.json();
    if( !data.hasOwnProperty('results') || data.results.length === 0 )
        return `The city does not exist: ${city}`;

    let currMaxPopulation = 0;
    let longitude;
    let latitude;

    for(let cty of data.results)
    {
        if( cty.hasOwnProperty('population') && cty.population > currMaxPopulation )
        {
            currMaxPopulation = cty.population;
            longitude = cty.longitude;
            latitude = cty.latitude;
        }
    }

    if( longitude === undefined || latitude === undefined )
    {
        longitude = data.results[0].longitude;
        latitude = data.results[0].latitude;
    }

    const temperatureJSON = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`);
    const temperatureData = await temperatureJSON.json();

    return temperatureData.hasOwnProperty('current') && temperatureData.current.hasOwnProperty('temperature_2m') ?
            temperatureData.current.temperature_2m : `The city does not exist: ${city}`;
}


async function getCurrentWeather(city)
{
    const weather = await getCurrentTemperature(city);
    showTemperature(weather);
}

setInterval(() => { showTime(getCurrentTime()); }, 1000);
onCityChange(getCurrentWeather);
setInterval(() => { getCurrentWeather(document.getElementById('city-input')); }, 60000);
