import { useEffect } from 'react';

const useSmoothScroll = () => {
    useEffect(() => {
        let isScrolling = false;
        let currentScrollY = window.scrollY;
        let velocity = 0;

        const handleScroll = () => {
            if (!isScrolling) {
                isScrolling = true;

                requestAnimationFrame(() => {
                    const deltaY = window.scrollY - currentScrollY;
                    currentScrollY = window.scrollY;

                    velocity += deltaY;
                    velocity *= 1.9; // Adjust this damping factor for smoother deceleration
                    window.scrollBy(0, velocity);

                    if (Math.abs(velocity) > 0.1) {
                        handleScroll();
                    } else {
                        isScrolling = false;
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
};

export default useSmoothScroll;