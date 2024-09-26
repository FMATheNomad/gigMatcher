// Initialize default settings when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
      userSkills: [],
      notificationsEnabled: true,
      autoMatchInterval: 30 // in minutes
    }, () => {
      console.log('Default settings initialized');
    });
  });
  
  // Function to check for matching projects
  function checkForMatchingProjects() {
    chrome.storage.sync.get(['userSkills', 'notificationsEnabled'], (data) => {
      // This is where you'd typically make an API call to fetch new projects
      // For this example, we'll use dummy data
      const newProjects = [
        { title: 'Web App Development', skills: ['JavaScript', 'React', 'Node.js'] },
        { title: 'Data Analysis Project', skills: ['Python', 'Pandas', 'SQL'] }
      ];
  
      const matchingProjects = newProjects.filter(project => 
        project.skills.some(skill => data.userSkills.includes(skill))
      );
  
      if (matchingProjects.length > 0 && data.notificationsEnabled) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon48.png',
          title: 'New Matching Projects!',
          message: `Found ${matchingProjects.length} new projects matching your skills.`
        });
      }
    });
  }
  
  // Set up periodic checking for new projects
  chrome.alarms.create('checkProjects', { periodInMinutes: 30 });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkProjects') {
      checkForMatchingProjects();
    }
  });
  
  // Listen for messages from content scripts or popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateSkills') {
      chrome.storage.sync.set({ userSkills: request.skills }, () => {
        console.log('User skills updated');
        sendResponse({ status: 'success' });
      });
      return true; // Indicates we will send a response asynchronously
    }
  });
  
  // Optional: Add badge to show number of matching projects
  function updateBadge(count) {
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
  }
  
  // Example usage of updateBadge
  chrome.storage.sync.get('matchingProjectsCount', (data) => {
    if (data.matchingProjectsCount) {
      updateBadge(data.matchingProjectsCount);
    }
  });