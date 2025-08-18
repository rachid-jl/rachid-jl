// Rachid's GitHub Profile Auto-Update Script
// Based on your CV: Senior DevOps Engineer with 8+ years experience

import fetch from 'node-fetch';
import fs from 'fs';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'your_github_token_here';
const USERNAME = 'rachid-jl';

// Your actual tech stack from CV
const techStack = {
  devops: ['Docker', 'Kubernetes', 'OpenShift', 'Terraform', 'Ansible'],
  cloud: ['AWS', 'Azure'],
  monitoring: ['Prometheus', 'Grafana', 'Kibana'],
  cicd: ['Jenkins', 'GitLab CI/CD'],
  programming: ['Python', 'Shell', 'JavaScript', 'PHP', 'Rust'],
  databases: ['PostgreSQL', 'MySQL', 'MariaDB', 'MongoDB'],
  os: ['RedHat', 'CentOS', 'Ubuntu', 'Debian'],
  virtualization: ['VMware', 'KVM']
};

// Fetch repositories with enhanced filtering
const fetchRepositories = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};

// Fetch GitHub stats
const fetchGitHubStats = async () => {
  try {
    const userResponse = await fetch(`https://api.github.com/users/${USERNAME}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    return await userResponse.json();
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return {};
  }
};

// Generate tech stack badges
const generateTechBadges = () => {
  const badges = {
    devops: techStack.devops.map(tech => 
      `![${tech}](https://img.shields.io/badge/-${tech}-326CE5?style=for-the-badge&logo=${tech.toLowerCase()}&logoColor=white)`
    ),
    cloud: techStack.cloud.map(tech => 
      `![${tech}](https://img.shields.io/badge/-${tech}-FF9900?style=for-the-badge&logo=${tech.toLowerCase()}&logoColor=white)`
    ),
    programming: techStack.programming.map(tech => 
      `![${tech}](https://img.shields.io/badge/-${tech}-3776AB?style=for-the-badge&logo=${tech.toLowerCase()}&logoColor=white)`
    ),
    monitoring: techStack.monitoring.map(tech => 
      `![${tech}](https://img.shields.io/badge/-${tech}-E6522C?style=for-the-badge&logo=${tech.toLowerCase()}&logoColor=white)`
    )
  };
  
  return badges;
};

// Generate professional README content
const generateReadmeContent = async () => {
  console.log('🚀 Generating personalized README for Rachid...');
  
  const repos = await fetchRepositories();
  const stats = await fetchGitHubStats();
  const badges = generateTechBadges();
  
  // Filter and categorize repositories
  const devopsRepos = repos.filter(repo => 
    !repo.fork && !repo.archived && 
    (repo.language === 'Shell' || repo.language === 'Python' || 
     repo.name.includes('docker') || repo.name.includes('k8s') ||
     repo.name.includes('terraform') || repo.name.includes('ansible'))
  ).slice(0, 4);
  
  const webRepos = repos.filter(repo => 
    !repo.fork && !repo.archived &&
    (repo.language === 'JavaScript' || repo.language === 'PHP' || 
     repo.language === 'HTML' || repo.name.includes('web'))
  ).slice(0, 3);

  const readmeContent = `<div align="center">

# 👋 Salut! I'm Rachid Jl

## 🚀 Senior DevOps Engineer | Infrastructure Automation Specialist
### 8+ Years Experience | RHCE/RHCSA Certified | Paris, France

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/rachid-jl)
[![Email](https://img.shields.io/badge/-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rachid@example.com)
[![Phone](https://img.shields.io/badge/-+33749620214-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:+33749620214)

</div>

---

## 💼 Currently at PMU (Tech Lead SysOps)
**Embedding Systems & Sports Betting Infrastructure**
- 🎯 Managing 500+ production betting terminals
- ⚡ Reduced manual interventions by 70% through automation
- 🔧 AWS cloud cost optimization: 30% reduction
- 👥 Technical mentoring & Scrum Master for 8-person team

---

## 📊 GitHub Analytics

<div align="center">
  
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=radical&count_private=true)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=radical&langs_count=8)

![GitHub Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&theme=react-dark&bg_color=20232a&hide_border=true)

</div>

---

## 🛠️ Tech Arsenal

### ☁️ DevOps & Cloud
${badges.devops.join(' ')}
${badges.cloud.join(' ')}

### 📊 Monitoring & Observability  
${badges.monitoring.join(' ')}

### 💻 Programming Languages
${badges.programming.join(' ')}

### 🗄️ Databases & Storage
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🔥 Featured DevOps Projects

${devopsRepos.map(repo => `
### 🐳 [${repo.name}](${repo.html_url})
${repo.description || 'Infrastructure automation and DevOps tooling'}
\`\`\`
Language: ${repo.language || 'Multi-language'} | ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}
Updated: ${new Date(repo.updated_at).toLocaleDateString('fr-FR')}
\`\`\`
`).join('')}

## 🌐 Web Development Projects

${webRepos.map(repo => `
### 💻 [${repo.name}](${repo.html_url})
${repo.description || 'Full-stack web application'}
\`\`\`
Language: ${repo.language || 'Web Technologies'} | ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}
\`\`\`
`).join('')}

---

## 🎯 Professional Experience Highlights

### 🏢 **PMU** (Tech Lead SysOps) - *Aug 2023 - Present*
- 🚀 **Automated deployment** for 500+ betting terminals
- ☁️ **AWS Infrastructure as Code** with Terraform
- 📊 **Real-time monitoring** with Grafana dashboards
- 🔧 **70% reduction** in manual interventions

### 🏢 **MAIF** (Lead DevOps) - *Dec 2021 - Jul 2023*
- 🐳 **4 Kubernetes clusters** management (130 microservices)
- 🔄 **Jenkins CI/CD pipelines** optimization
- ☁️ **Azure migration** strategy implementation
- 📈 **Prometheus monitoring** for maif.fr infrastructure

### 🏢 **Ministry of Defense** (DevOps Consultant) - *Sep 2018 - Nov 2021*
- 🛡️ **Secure infrastructure** provisioning
- 🔧 **Ansible automation** for defense systems
- 📦 **OpenShift clusters** deployment
- 🔐 **ANSSI homologation** compliance

---

## 🏆 Certifications & Achievements

![RHCE](https://img.shields.io/badge/-RHCE_Certified-EE0000?style=for-the-badge&logo=redhat&logoColor=white)
![RHCSA](https://img.shields.io/badge/-RHCSA_Certified-EE0000?style=for-the-badge&logo=redhat&logoColor=white)

- 🎓 **Red Hat Certified Engineer (RHCE)** - 2020
- 🎓 **Red Hat Certified System Administrator (RHCSA)** - 2019
- 🏗️ **Kubernetes & OpenShift Specialist** - 2021
- 🤖 **Ansible Automation Specialist** - 2020

---

## 📈 Current Stats

<div align="center">

![Profile Views](https://komarev.com/ghpvc/?username=${USERNAME}&color=blueviolet&style=for-the-badge&label=Profile+Views)
![Followers](https://img.shields.io/github/followers/${USERNAME}?color=blue&style=for-the-badge)
![Stars](https://img.shields.io/github/stars/${USERNAME}?color=yellow&style=for-the-badge)

</div>

---

## 💡 Quote of the Day

> *"Infrastructure as Code is not just about automation, it's about creating reliable, repeatable, and scalable systems that empower teams to focus on what matters most: delivering value."*

---

<div align="center">

### 🌟 Let's connect and build amazing infrastructure together!

**Available for DevOps consulting, infrastructure automation, and cloud architecture projects**

*This profile is automatically updated daily to showcase my latest work and contributions*

**Last updated:** ${new Date().toLocaleString('fr-FR', { 
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})} (Paris Time)

</div>`;

  return readmeContent;
};

// Auto-update function
const updateProfile = async () => {
  try {
    console.log('🔄 Starting profile update...');
    const content = await generateReadmeContent();
    
    // Write to README.md
    fs.writeFileSync('README.md', content, 'utf8');
    console.log('✅ README.md updated successfully!');
    
    // Also create a backup
    const timestamp = new Date().toISOString().slice(0, 10);
    fs.writeFileSync(`README-backup-${timestamp}.md`, content, 'utf8');
    console.log(`📄 Backup created: README-backup-${timestamp}.md`);
    
  } catch (error) {
    console.error('❌ Error updating profile:', error);
  }
};

// GitHub Actions workflow for automation
const createGitHubAction = () => {
  const workflow = `name: 🚀 Update Rachid's Profile README

on:
  schedule:
    - cron: '0 6 * * *' # Daily at 6 AM Paris time
  workflow_dispatch: # Manual trigger
  push:
    branches: [ main ]

jobs:
  update-readme:
    runs-on: ubuntu-latest
    
    steps:
    - name: 📥 Checkout repository
      uses: actions/checkout@v4
      
    - name: 🔧 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: 📦 Install dependencies
      run: |
        npm init -y
        npm install node-fetch
        
    - name: 🚀 Update README
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      run: node update-profile.js
      
    - name: 💾 Commit and push changes
      run: |
        git config --local user.email "rachid@example.com"
        git config --local user.name "Rachid Jl"
        git add README.md
        if git diff --staged --quiet; then
          echo "No changes to commit"
        else
          git commit -m "🤖 Auto-update profile README - \$(date +'%Y-%m-%d %H:%M')"
          git push
        fi
`;

  // Create .github/workflows directory if it doesn't exist
  if (!fs.existsSync('.github')) {
    fs.mkdirSync('.github');
  }
  if (!fs.existsSync('.github/workflows')) {
    fs.mkdirSync('.github/workflows');
  }
  
  fs.writeFileSync('.github/workflows/update-profile.yml', workflow);
  console.log('⚙️ GitHub Actions workflow created!');
};

// Project templates based on your experience
const createProjectTemplates = () => {
  const templates = {
    'ansible-playbooks': {
      description: 'Collection of Ansible playbooks for infrastructure automation',
      files: ['playbooks/', 'inventory/', 'roles/', 'README.md']
    },
    'terraform-modules': {
      description: 'Reusable Terraform modules for AWS/Azure infrastructure',
      files: ['modules/', 'examples/', 'variables.tf', 'outputs.tf']
    },
    'k8s-manifests': {
      description: 'Kubernetes manifests and Helm charts for microservices',
      files: ['manifests/', 'charts/', 'scripts/', 'monitoring/']
    },
    'monitoring-stack': {
      description: 'Prometheus, Grafana monitoring setup',
      files: ['prometheus/', 'grafana/', 'alertmanager/', 'docker-compose.yml']
    }
  };
  
  console.log('📋 Available project templates:');
  Object.entries(templates).forEach(([name, config]) => {
    console.log(`  📁 ${name}: ${config.description}`);
  });
};

// Main execution
console.log('🎯 Rachid\'s GitHub Profile Automation');
console.log('=====================================');

updateProfile();
createGitHubAction();
createProjectTemplates();

console.log('\n✨ Setup complete! Next steps:');
console.log('1. Add GitHub token to repository secrets');
console.log('2. Watch your profile auto-update daily! 🚀');
export { updateProfile, createGitHubAction };
