/* global window: window */
const leftButton = window.document.querySelector( ".left-button" );
const rightButton = window.document.querySelector( ".right-button" );

const slider = window.document.querySelector( ".slider" );
const imageWidth = 600;
const images = window.document.querySelectorAll( ".slider img" );
const sliderWidth = images.length * 600;
const delay = 800;
let currentImage;
let currentImagePosition;
const firstPosition = 0;
const lastPosition = images.length - 1;
const circlesContainer = window.document.querySelector( ".circles" );
let circleList = window.document.querySelectorAll( ".circle" );
let activeCircle;
let activeCirclePosition;
let count = 0;
const transition = `left ${ delay }ms ease-in-out`;
const noTransition = "none";
slider.style.width = `${ sliderWidth }px`; // set slider width based on # of images
const initialIndex = 3;
getCurrentImageForPosition( initialIndex );
moveToImageWithTransition( initialIndex, noTransition );

renderCircles();
// make the one at the given index active
const initialActiveCircle = circleList[ initialIndex ];
initialActiveCircle.classList.add( "active" );

function changeNextImage() {
    removeClassFromFormerImage( currentImagePosition );
    currentImagePosition = Math.min( currentImagePosition + 1, lastPosition );
    if ( currentImagePosition === lastPosition ) {
        moveToImageWithTransition( currentImagePosition, transition );
        changeActiveCircleRight();

        setTimeout( function() {
            removeClassFromFormerImage( currentImagePosition );
            moveToImageWithTransition( firstPosition, noTransition );
        }, delay );
        return;
    }
    moveToImageWithTransition( currentImagePosition, transition );
    changeActiveCircleRight();
}

function changePreviousImage() {
    if ( moveFromFirstToPrevious() ) {
        return;
    }
    removeClassFromFormerImage( currentImagePosition );
    currentImagePosition = Math.max( currentImagePosition - 1, firstPosition );
    moveToImageWithTransition( currentImagePosition, transition );
    changeActiveCircleLeft();
}

function getCurrentImageForPosition( position ) {
    currentImage = images[ position ];
    currentImage.classList.add( "current" );
    currentImagePosition = position;
}

function removeClassFromFormerImage( position ) {
    const image = images[ position ];
    image.classList.remove( "current" );
}

function moveToImageWithTransition( position, transitionValue ) {
    getCurrentImageForPosition( position );
    const distance = imageWidth * ( -position );
    slider.style.left = `${ distance }px`;
    slider.style.transition = transitionValue;
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
    }
    circleList = window.document.querySelectorAll( ".circle" );
}

function changeActiveCircleRight() {
    getActiveCircleAndPosition();
    let nextCircle;
    if ( activeCirclePosition === lastPosition - 1 ) {
        [ nextCircle ] = circleList; // first
    } else {
        nextCircle = circleList[ activeCirclePosition + 1 ];
    }
    activeCircle.classList.remove( "active" );
    nextCircle.classList.add( "active" );
}

function changeActiveCircleLeft() {
    getActiveCircleAndPosition();
    let previousCircle;
    if ( activeCirclePosition === firstPosition ) {
        previousCircle = circleList[ lastPosition - 1 ]; // last
    } else {
        previousCircle = circleList[ activeCirclePosition - 1 ];
    }
    activeCircle.classList.remove( "active" );
    previousCircle.classList.add( "active" );
}

function getActiveCircleAndPosition() {
    activeCircle = window.document.querySelector( "a.circle.active" );
    activeCirclePosition = Array.from( circleList ).indexOf( activeCircle );
}

function moveFromFirstToPrevious() {
    if ( currentImagePosition === firstPosition ) {
        removeClassFromFormerImage( currentImagePosition );
        moveToImageWithTransition( lastPosition, noTransition ); // first image duplicate

        setTimeout( function() {
            removeClassFromFormerImage( currentImagePosition );
            moveToImageWithTransition( lastPosition - 1, transition );
            changeActiveCircleLeft();
        }, 0 );
        return true;
    }
    return false;
}

function moveAfterOneClick( func ) {
    count += 1;
    if ( count === 1 ) {
        func();
        setTimeout( function() {
            count = 0;
        }, delay + 200 );
    }
}

function handleChangeToLeft() {
    moveAfterOneClick( changeNextImage );
}

function handleChangeToRight() {
    moveAfterOneClick( changePreviousImage );
}

leftButton.addEventListener( "click", handleChangeToRight );
rightButton.addEventListener( "click", handleChangeToLeft );
