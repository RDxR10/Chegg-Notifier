(function() {
    let lastTitle = document.title.trim();
    let changeCount = 0;
    let isInitialized = false;
	console.log(lastTitle)

    function handleTitleChange(newTitle) {
        if (newTitle !== lastTitle) {
            changeCount++;
            console.log(`Chegg Notifier: Title change detected (${changeCount}): "${lastTitle}" -> "${newTitle}"`);

            chrome.runtime.sendMessage({
                type: "CHEGG_UPDATE",
                newTitle: newTitle,
                previousTitle: lastTitle,
                changeNumber: changeCount,
                timestamp: Date.now()
            });

            lastTitle = newTitle;
        }
    }


    handleTitleChange(document.title.trim());
    isInitialized = true;

/*
    const target = document.querySelector('head > title');
    if (target) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                const newTitle = document.title.trim();
                handleTitleChange(newTitle);
            });
        });
        
        observer.observe(target, {
            subtree: true,
            characterData: true,
            childList: true
        });
    }
*/

    let pollingTitle = document.title.trim();
    setInterval(() => {
        const currentTitle = document.title.trim();
        if (currentTitle !== pollingTitle) {
            handleTitleChange(currentTitle);
            pollingTitle = currentTitle;
        }
    }, 1); 

/*
    const originalDocumentTitle = Object.getOwnPropertyDescriptor(Document.prototype, 'title');
    if (originalDocumentTitle) {
        Object.defineProperty(Document.prototype, 'title', {
            set: function(value) {
                originalDocumentTitle.set.call(this, value);
                const newTitle = document.title.trim();
                if (isInitialized) {
                    handleTitleChange(newTitle);
                }
            },
            get: originalDocumentTitle.get
        });
    }
*/
    console.log('Chegg Notifier: Content script loaded and initialized');
})();
