const container = document.querySelector('.box-container');
let boxID = 1;
let offsetX, offsetY;
let currentBox = null;


function mouseDown(event)
{
    const box = event.target.closest('.box');
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

        currentBox = box;
        currentBox.zIndex = -100;
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
    if( !currentBox ) return;
    currentBox.style.left = event.clientX - offsetX + 'px';
    currentBox.style.top = event.clientY - offsetY + 'px';
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


function dblclick(event)
{
    const box = event.target.closest('.box');
    if( !box ) return;

    if( event.altKey )
    {
        if( container.children.length === 1 ) return;
        box.remove();
    }
    else
    {
        boxID++;
        const child = document.createElement('div');
        child.classList.add('box');
        child.textContent = boxID.toString();
        const boxRect = box.getBoundingClientRect();
        child.style.left = boxRect.width + boxRect.left + 'px';
        child.style.top = boxRect.height + boxRect.top + 'px';
        container.appendChild(child);
    }
}


container.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
container.addEventListener(`contextmenu`, (event) => event.preventDefault());
container.addEventListener('dblclick', dblclick);