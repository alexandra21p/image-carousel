/* global window: window */
const leftButton = window.document.querySelector( ".left-button" );
const rightButton = window.document.querySelector( "right-button" );

const slider = window.document.querySelector( ".slider" );
const imageWidth = 600;
const images = window.document.querySelectorAll( ".slider img" );
const sliderWidth = images.length * 600;
const sliderRightLimit = ( sliderWidth - imageWidth ) * -1;
const sliderLeftLimit = imageWidth * -1;
const delay = 800;
const circlesContainer = window.document.querySelector( ".circles" );
const leftOffsetList = [];
let circleList = window.document.querySelectorAll( ".circle" );

const transition = `left ${ delay }ms ease-in-out`;
slider.style.width = `${ sliderWidth }px`;

function moveImagesToRight() {
    let distance = parseInt( slider.style.left || 0, 10 );

    if ( distance === sliderRightLimit + 600 ) {
        slider.style.left = `${ sliderRightLimit }px`;
        slider.style.transition = transition;
        setTimeout( moveImagesToRight, delay );
    }

    if ( distance > sliderRightLimit + 600 ) {
        distance -= imageWidth;
        slider.style.left = `${ distance }px`;
        slider.style.transition = transition;
    }
    if ( distance === sliderRightLimit ) {
        slider.style.transition = "none";
        slider.style.left = "0";
        distance = 0;
    }
}

function moveImagesToLeft( ) {
    let distance = parseInt( slider.style.left || 0, 10 );

    if ( distance === sliderLeftLimit ) {
        slider.style.left = "0";
        slider.style.transition = transition;
        setTimeout( moveImagesToLeft, delay );
    }

    if ( distance === 0 ) {
        slider.style.transition = "none";
        slider.style.left = `${ sliderRightLimit }px`;
    }

    if ( distance < sliderLeftLimit ) {
        distance += imageWidth;
        slider.style.left = `${ distance }px`;
        slider.style.transition = transition;
    }
}

function handleRight() {
    changeActiveCircleRight();
    moveImagesToRight();
}

function handleLeft() {
    changeActiveCircleLeft();
    moveImagesToLeft();
}

function renderCircles() {
    const numberOfCircles = images.length - 1;
    for ( let i = 0; i < numberOfCircles; i += 1 ) {
        const circleContainer = window.document.createElement( "li" );
        const circleElement = window.document.createElement( "a" );
        circleElement.className = "circle";
        circleContainer.className = "circle-container";
        circleContainer.appendChild( circleElement );

        circlesContainer.appendChild( circleContainer );

        // add the left value corresponding to each circle
        leftOffsetList.push( imageWidth * ( -i ) );
    }

    leftOffsetList[ 0 ] = 0; // can't have -0
    circleList = window.document.querySelectorAll( ".circle" );
}

function changeActiveCircleRight() {
    const activeCircle = window.document.querySelector( "a.circle.active" );
    const activeCirclePosition = Array.from( circleList ).indexOf( activeCircle );
    let nextCircle;
    if ( activeCirclePosition === circleList.length - 1 ) {
        [ nextCircle ] = circleList; // first
    } else {
        nextCircle = circleList[ activeCirclePosition + 1 ];
    }

    activeCircle.classList.remove( "active" );
    nextCircle.classList.add( "active" );
}

function changeActiveCircleLeft() {
    const activeCircle = window.document.querySelector( "a.circle.active" );
    const activeCirclePosition = Array.from( circleList ).indexOf( activeCircle );
    let previousCircle;
    if ( activeCirclePosition === 0 ) {
        previousCircle = circleList[ circleList.length - 1 ]; // last
    } else {
        previousCircle = circleList[ activeCirclePosition - 1 ];
    }

    activeCircle.classList.remove( "active" );
    previousCircle.classList.add( "active" );
}

renderCircles();
// make the first one active
const active = window.document.querySelector( "a.circle" );
active.classList.add( "active" );

leftButton.addEventListener( "click", handleRight );
rightButton.addEventListener( "click", handleLeft );
