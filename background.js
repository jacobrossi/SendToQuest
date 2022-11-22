// Create the context menu option
chrome.runtime.onInstalled.addListener(async () => {
   chrome.contextMenus.create({
        id: "sendtoquest",
        title: "Send to Meta Quest",
        type: 'normal',
        contexts: ['link'],
   });
});

// Handle Action button invocation
chrome.action.onClicked.addListener(async (tab) => {
    openSendToQuestPopup(tab.url);
});

// Open web flow to send selected link to headset
chrome.contextMenus.onClicked.addListener((info, tab) => {
    openSendToQuestPopup(info.linkUrl);
});

function openSendToQuestPopup(linkUrl) {
    // Confirm it's an http/https link and not something else like chrome://
    if (!linkUrl.startsWith("https://") && !linkUrl.startsWith("http://")) {
        return;
    }

    let sendToQuestUrl = new URL("https://oculus.com/open_url/")
    sendToQuestUrl.searchParams.set('url', linkUrl)
    // Open flow in a new tab
    //chrome.tabs.create({ url: url.href, index: tab.index + 1 });
    // Open flow in a popup
    chrome.windows.create({
        focused: true,
        height: 600,
        width: 400,
        left: 300,
        top: 100,
        type: "popup",
        url: sendToQuestUrl.href
    });
}