let first = true;
window.addEventListener('load', () => {
    getDatas()
    .then(() => {
        console.log('here');
        console.log(navs)
        createNavList();
        createRelatedList();
        createNavSelection();
        createRelatedSelection();
        eventOfList();
        eventOfSelection();
        if (first) {
            renewPage('introduce');
            first = false;        
        }    
    });
    
});