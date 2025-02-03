	
function focusOrOpenTab(targetUrl) 
{
	chrome.tabs.query({}, function(tabs) 
	{
        for (let tab of tabs) 
		{
            if (tab.url && tab.url.includes(targetUrl)) 
			{
                // Move to the existing tab
                chrome.tabs.update(tab.id, { active: true });
                chrome.windows.update(tab.windowId, { focused: true });
                return;
            }
        }
        // If not found, open a new tab
        chrome.tabs.create({ url: targetUrl });
    });
}

// Example usage
focusOrOpenTab("https://drive.google.com");
