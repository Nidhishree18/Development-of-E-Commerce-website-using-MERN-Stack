import React from 'react';
import "../About.css"

export const About = () => {
    return (
        <div className="about-container">
            <h1>About Blinkit</h1>
            <p>
                Welcome to <strong>Blinkit</strong>, your go-to platform for instant grocery and essentials delivery! 
                We are committed to revolutionizing how you shop by delivering groceries, fresh produce, and household essentials 
                <strong> within minutes</strong>.
            </p>

            <h2>Our Mission</h2>
            <p>
                Our mission is to make everyday shopping effortless and convenient by providing fast, reliable, and quality-assured 
                grocery delivery at your doorstep.
            </p>

            <h2>Why Choose Us?</h2>
            <ul>
                <li>*Instant Delivery - Get your essentials in minutes.</li>
                <li>*Wide Selection - Groceries, fresh produce, dairy, and more!</li>
                <li>*Trusted Quality - Sourced from the best brands and stores.</li>
                <li>*Seamless Experience - Easy ordering and real-time tracking.</li>
            </ul>
        </div>
    );
};
