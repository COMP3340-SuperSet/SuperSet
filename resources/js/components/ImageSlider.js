
import React, { useState, useEffect } from 'react';
import { Image, Container } from "semantic-ui-react";
import "../../css/ItemSlider.css";

const ImageSlider = ({ itemImages, setPercent, setPageOffset, pageOffset }) => {
    /*
    * Input: --Array of images/gifs, setPercent, setPageOffset, and pageOffset--
    * Description: The purpose of this functional component is to display a carousel of 
                    images/gifs to give the actor a visual explination of SuperSet and sub-parts
    * Usage: ImageSlider.js --> Instructions.js
    */

    // Setting current state to first image in array
    const [current, setCurrent] = useState(0);
    // Containing length of the image array
    const length = itemImages.length;
    // Contains the max percent increase
    const percentageIncrease = 100 / length;


    const changeSlide = () => {
        /*
        * Input: --No Input--
        * Description: The purpose of this helper function is to determine which slide will be next
        * Usage: changeSlide (ImageSlider.js) --> useEffect (ImageSlider.js)
        */

        // Failsafe to not allow the actor to move past the amount of images 
        if ((current === 0 && pageOffset === -1) || (current === (length - 1) && pageOffset === 1)) {
            setPageOffset(0);
        }
        else {
            setCurrent(current + pageOffset);
            setPageOffset(0);
            setPercent((current + 1) * percentageIncrease);
        }
    };

    useEffect(() => { changeSlide(); }, [pageOffset]);
    /*
    * Input: --changeSlide function and [pageOffset]--
    * Description: The purpose of this hook is once pageOffset is changed
    *              call changeSlide and display new slide
    * Usage: ImageSlider.js
    */
    return (
        <Container>
            {itemImages.map((slide, index) => {
                return (
                    <div className={`ss-imageslider-slide ${index === current ? 'slide active' : 'slide'}`} key={index} >
                        {index === current && (<Image className="ss-imageslider-image" centered src={slide} size='large' />)}
                    </div>
                );
            })}
        </Container>
    );
};

export default ImageSlider;