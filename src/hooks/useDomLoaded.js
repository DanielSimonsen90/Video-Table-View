import { useState, useEffect } from "react";
export default function useDomLoaded() {
    const [isDomLoaded, setIsDomLoaded] = useState(false);
    useEffect(() => {
        const handleLoad = () => setIsDomLoaded(true);
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);
    return isDomLoaded;
}
