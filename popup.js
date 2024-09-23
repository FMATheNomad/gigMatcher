// Fungsi untuk memperbarui UI dengan profil pengguna
function loadProfile() {
    const profileInfo = document.getElementById('profile-info');
    profileInfo.innerHTML = `
      <p>Name: John Doe</p>
      <p>Skills: JavaScript, Python, React</p>
      <p>Experience: 5 years</p>
    `;
  }
  
  // Fungsi untuk memperbarui UI dengan detail proyek
  function updateProjectDetails(project) {
    const projectInfo = document.getElementById('project-info');
    projectInfo.innerHTML = `
      <p><strong>Title:</strong> ${project.title}</p>
      <p><strong>Description:</strong> ${project.description}</p>
      <p><strong>Skills Required:</strong> ${project.skills.join(', ')}</p>
    `;
  }
  
  // Fungsi untuk menghitung skor kecocokan
  function calculateMatchScore(projectSkills, freelancerSkills) {
    const matchedSkills = projectSkills.filter(skill => freelancerSkills.includes(skill));
    return Math.round((matchedSkills.length / projectSkills.length) * 100);
  }
  
  // Fungsi untuk menampilkan skor kecocokan di UI
  function updateMatchScore(score) {
    const matchScoreElement = document.getElementById('match-score');
    matchScoreElement.textContent = `${score}% match`;
  
    if (score < 50) {
      matchScoreElement.classList.add('low');
    }
  }
  
  // Mendapatkan data dari content script dan memperbarui popup
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getProjectData' }, (response) => {
      if (response && response.project) {
        updateProjectDetails(response.project);
  
        // Ambil keterampilan freelancer dari profil (ini hanya contoh, bisa disesuaikan)
        const freelancerSkills = ['JavaScript', 'React', 'Node.js'];
  
        // Hitung dan tampilkan skor kecocokan
        const score = calculateMatchScore(response.project.skills, freelancerSkills);
        updateMatchScore(score);
      }
    });
  });
  
  // Load profile pada popup load
  document.addEventListener('DOMContentLoaded', loadProfile);
  