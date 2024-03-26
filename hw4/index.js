const box = document.querySelector('.box');
let offsetX, offsetY;


function mouseDown(event)
{
    //1 - left click, 2 - middle click, 3 - right click
    if( event.shiftKey && event.which === 1 )
    {
        box.classList.toggle('box-large');
    }
    else if( event.which === 1 )
    {
        const boxRect = box.getBoundingClientRect();
        offsetX = event.clientX - boxRect.left;
        offsetY = event.clientY - boxRect.top;

        document.addEventListener('mousemove', mouseMove);
    }
    else if( event.which === 3 )
    {
        box.style.backgroundColor = randColor();
        event.preventDefault();
    }
}


function mouseMove(event)
{
    box.style.left = event.clientX - offsetX + 'px';
    box.style.top = event.clientY - offsetY + 'px';
}


function mouseUp()
{
    document.removeEventListener('mousemove', mouseMove);
}


function randColor()
{
    const hex = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; ++i)
        color += hex[Math.floor(Math.random() * 100) % 16];

    return color;
}


box.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
box.addEventListener(`contextmenu`, (event) => event.preventDefault());