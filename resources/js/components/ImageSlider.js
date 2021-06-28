
import React, { useState, useEffect } from 'react';
import {Image, Container} from "semantic-ui-react";
import "../../css/ItemSlider.css";

const ImageSlider = ({ images, setPercent, setPageOffset, pageOffset }) => {

    const [current, setCurrent] = useState(0);
    const length = images.length;
    const percentageIncrease = 100 / length;

    const changeSlide = () => {

        if((current === 0 && pageOffset === -1) || (current === (length - 1) && pageOffset === 1)) {
            setPageOffset(0);
        }
        else {
            setCurrent(current + pageOffset);
            setPageOffset(0);
            setPercent((current + 1) * percentageIncrease);
        }   
    };
 
    useEffect(() => {changeSlide();}, [pageOffset]);
        return(
            <Container>
                {images.map((slide, index) => {
                    return (
                        <div className={`ss-imageslider-slide ${index === current ? 'slide active' : 'slide'}`} key={index} >
                            {index === current && (<Image centered src={slide.url} size='large' />)}
                        </div>
                    ); 
                })}
            </Container>
        );
};

export default ImageSlider;