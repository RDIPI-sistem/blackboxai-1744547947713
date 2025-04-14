// Test script for InfiniSys functionality
document.addEventListener('DOMContentLoaded', () => {
    // Test system variables
    console.log('Current InfiniSys version:', infiniSys.getVar('version'));
    infiniSys.setVar('theme', 'dark');
    console.log('Theme changed to:', infiniSys.getVar('theme'));

    // Test application launching
    console.log('Available applications:', infiniSys.applications);
    
    // Test browser functionality
    const browserTest = () => {
        const browserWindow = openWindow('infini-browcer');
        setTimeout(() => {
            infiniSys.browseTo('example.com');
            console.log('Browser test complete');
        }, 1000);
    };

    // Test search functionality
    const searchTest = () => {
        const results = infiniSys.performSearch('calc');
        console.log('Search results for "calc":', results);
    };

    // Run tests after slight delay to allow system initialization
    setTimeout(() => {
        browserTest();
        searchTest();
    }, 500);
});
