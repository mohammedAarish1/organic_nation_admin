import { memo, Suspense, useCallback, useEffect, useRef, useState } from "react";
import Loader from "../components/common/Loader";

// Optimized LazyLoadSection using useCallback
const LazyLoadSection = memo(({ children ,height='100px'}) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef();
    const observerCallback = useCallback(([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [observerCallback]);

    return (
        <Suspense fallback={<Loader height={height} />}>
            <div ref={sectionRef}>
                {isVisible && children}
            </div>
        </Suspense>

    );
});

export default LazyLoadSection;