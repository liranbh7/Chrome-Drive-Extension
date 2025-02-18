	
function focusOrOpenTab(targetUrl) 
{
	chrome.tabs.query({}, function(tabs) 
	{
        for (let tab of tabs) // search for existing open tab
		{
            if (tab.url && tab.url.includes(targetUrl)) 
			{
                // Move to the existing tab
                chrome.tabs.update(tab.id, { active: true });
                chrome.windows.update(tab.windowId, { focused: true });
                return;
            }
        }
		
		let activeTab = tabs[0];
		for (let i = 0; i < tabs.length; i++) 
		{
			if (tabs[i].active && tabs[i].highlighted) 
			{
				activeTab = tabs[i];
				break;
			}
		}
		
		if (activeTab && activeTab.url.includes('chrome://newtab')) // open targetUrl in current tab.
		{ 
			chrome.tabs.update(activeTab.id, { url: targetUrl });
		}
		else // If not found and current tab is not empty, open a new tab
		{        
			chrome.tabs.create({ url: targetUrl });
		}
    });
}

// Example usage
focusOrOpenTab("https://drive.google.com");
