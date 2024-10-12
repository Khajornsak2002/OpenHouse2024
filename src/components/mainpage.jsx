import React, { useState } from 'react';

const MainPage = () => {
    const images = [
        'https://via.placeholder.com/300x200?text=Slide+1',
        'https://via.placeholder.com/300x200?text=Slide+2',
        'https://via.placeholder.com/300x200?text=Slide+3'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="main-page">
            <h1>Welcome to the Main Page</h1>
            <div className="slider">
                <button onClick={prevSlide}>Previous</button>
                <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
                <button onClick={nextSlide}>Next</button>
            </div>
        </div>
    );
};

export default MainPage;