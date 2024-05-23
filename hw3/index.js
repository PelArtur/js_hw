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


async function getCityCoordinates(city)
{
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    url.searchParams.append('name', city);

    const response = await fetch(url);
    if( !response.ok )
        return null;

    const data = await response.json();
    if( !data.hasOwnProperty('results') || data.results.length === 0 )
        return null;

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

    return { longitude, latitude };
}


async function getCurrentTemperature(longitude, latitude)
{
    const temperatureJSON = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`);
    const temperatureData = await temperatureJSON.json();

    return temperatureData.hasOwnProperty('current') && temperatureData.current.hasOwnProperty('temperature_2m') ?
        temperatureData.current.temperature_2m : 'Temperature data not available';
}

async function updateWeather(city) {
    const coordinates = await getCityCoordinates(city);
    if( !coordinates )
    {
        showTemperature(`The city does not exist: ${city}`);
        return null;
    }
    return coordinates;
}

let currentCoordinates = null;

async function updateTemperature()
{
    if( currentCoordinates )
    {
        const temperature = await getCurrentTemperature(currentCoordinates.longitude, currentCoordinates.latitude);
        showTemperature(temperature);
    }
}

setInterval(() => { showTime(getCurrentTime()); }, 1000);

onCityChange(async (city) => {
    const coordinates = await updateWeather(city);
    if( coordinates )
    {
        currentCoordinates = coordinates;
        await updateTemperature();
    }
});

setInterval(updateTemperature, 60000);