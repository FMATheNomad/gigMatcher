// Fungsi untuk mengambil informasi proyek dari halaman Upwork/Freelancer
function getProjectDetails() {
    const title = document.querySelector('.job-title').innerText;
    const description = document.querySelector('.description').innerText;
    const skills = Array.from(document.querySelectorAll('.skill-item')).map(skill => skill.innerText);
  
    return {
      title,
      description,
      skills
    };
  }
  
  // Listener untuk pesan dari popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getProjectData') {
      const projectDetails = getProjectDetails();
      sendResponse({ project: projectDetails });
    }
  });
  