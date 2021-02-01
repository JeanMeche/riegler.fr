import React from 'react'

const ClientOnly = ({ children, ...delegated }: { children: React.ReactNode }) => {
    const [hasMounted, setHasMounted] = React.useState(false);
    React.useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    return (
        <div {...delegated}>
            {children}
        </div>
    );
}

export default ClientOnly;