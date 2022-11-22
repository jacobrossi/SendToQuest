// Create the context menu item
chrome.runtime.onInstalled.addListener(async () => {
   chrome.contextMenus.create({
      id: "sendtoquest",
      title: "Send to Meta Quest",
      type: 'normal',
      contexts: ['link'],
    });
});

// Open web flow to send selected link to headset
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let sendToQuestUrl = new URL("https://oculus.com/open_url/")
  sendToQuestUrl.searchParams.set('url', info.linkUrl)
  //Open flow in a new tab
  //chrome.tabs.create({ url: url.href, index: tab.index + 1 });
  //Open flow in a popup
  chrome.windows.create({
    focused: true,
    height: 500,
    width: 400,
    type: "popup",
    url: sendToQuestUrl.href
  })
});