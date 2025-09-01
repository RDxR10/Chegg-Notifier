let notificationCount = 0;
let lastNotificationTime = 0;
const MIN_NOTIFICATION_INTERVAL = 10; 

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "CHEGG_UPDATE") {
    const currentTime = Date.now();
    

    if (currentTime - lastNotificationTime >= MIN_NOTIFICATION_INTERVAL) {
      notificationCount++;
      
      chrome.notifications.create(`chegg-update-${message.changeNumber}`, {
        type: "basic",
        iconUrl: "icon.png",
        title: "CHEGG: QnA Update Detected",
        message: "[+] Content Changed",
        priority: 2
      });
      
      lastNotificationTime = currentTime;
      console.log(`Background: Notification sent for change #${message.changeNumber}`);
    } else {
      console.log(`Background: Change #${message.changeNumber} detected but notification throttled`);
    }
  }
});

chrome.notifications.onClicked.addListener((notificationId) => {
  chrome.notifications.clear(notificationId);
});

console.log('Chegg Notifier: Background script loaded');