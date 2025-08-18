// 🚀 Rachid's Enhanced GitHub Profile Auto-Update Script
// Senior DevOps Engineer - Available for new opportunities!

import fetch from 'node-fetch';
import fs from 'fs';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'your_github_token_here';
const USERNAME = 'rachid-jl';

// Enhanced tech stack from CV with categories
const techStack = {
  devops: {
    title: '🚀 DevOps & Infrastructure',
    skills: ['Docker', 'Kubernetes', 'OpenShift', 'Terraform', 'Ansible', 'Jenkins', 'GitLab-CI'],
    colors: ['2496ED', '326CE5', 'EE0000', '623CE4', 'EE0000', 'D24939', 'FC6D26']
  },
  cloud: {
    title: '☁️ Cloud Platforms',
    skills: ['AWS', 'Azure', 'GCP'],
    colors: ['FF9900', '0078D4', '4285F4']
  },
  monitoring: {
    title: '📊 Monitoring & Observability',
    skills: ['Prometheus', 'Grafana', 'Kibana', 'Dynatrace'],
    colors: ['E6522C', 'F46800', '005571', '1496FF']
  },
  programming: {
    title: '💻 Programming & Scripting',
    skills: ['Python', 'Shell', 'JavaScript', 'PHP', 'Rust', 'SQL'],
    colors: ['3776AB', '4EAA25', 'F7DF1E', '777BB4', '000000', '336791']
  },
  databases: {
    title: '🗄️ Databases & Storage',
    skills: ['PostgreSQL', 'MySQL', 'MariaDB', 'MongoDB'],
    colors: ['336791', '4479A1', '003545', '47A248']
  },
  systems: {
    title: '🖥️ Operating Systems',
    skills: ['RedHat', 'CentOS', 'Ubuntu', 'Debian'],
    colors: ['EE0000', '262577', 'E95420', 'A81D33']
  }
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
    
    if (!response.ok) {
      console.log('⚠️  Using public API (limited data)');
      const publicResponse = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`);
      return await publicResponse.json();
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    return [];
  }
};

// Fetch detailed repository information
const fetchRepoLanguages = async (repoName) => {
  try {
    const url = `https://api.github.com/repos/${USERNAME}/${repoName}/languages`;
    const headers = GITHUB_TOKEN !== 'your_github_token_here' ? {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    } : {};
    
    const response = await fetch(url, { headers });
    return await response.json();
  } catch (error) {
    return {};
  }
};

// Fetch GitHub user stats
const fetchGitHubStats = async () => {
  try {
    const url = `https://api.github.com/users/${USERNAME}`;
    const headers = GITHUB_TOKEN !== 'your_github_token_here' ? {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    } : {};
    
    const response = await fetch(url, { headers });
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub stats:', error.message);
    return {};
  }
};

// Generate enhanced tech stack badges with custom styling
const generateTechBadges = () => {
  const badges = {};
  
  Object.entries(techStack).forEach(([category, data]) => {
    badges[category] = data.skills.map((skill, index) => {
      const color = data.colors[index] || '000000';
      const logo = skill.toLowerCase().replace(/[^a-z0-9]/g, '');
      return `![${skill}](https://img.shields.io/badge/-${skill}-${color}?style=for-the-badge&logo=${logo}&logoColor=white)`;
    });
  });
  
  return badges;
};

// Get current time in Paris
const getParisTime = () => {
  return new Date().toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Generate enhanced README content with beautiful design
const generateReadmeContent = async () => {
  console.log('🎨 Generating enhanced README for Rachid...');
  
  const repos = await fetchRepositories();
  const stats = await fetchGitHubStats();
  const badges = generateTechBadges();
  
  // Smart repository categorization
  const categorizeRepos = (repositories) => {
    const categories = {
      devops: [],
      web: [],
      automation: [],
      other: []
    };
    
    repositories.filter(repo => !repo.fork && !repo.archived).forEach(repo => {
      const name = repo.name.toLowerCase();
      const desc = (repo.description || '').toLowerCase();
      const lang = (repo.language || '').toLowerCase();
      
      if (name.includes('docker') || name.includes('k8s') || name.includes('kubernetes') || 
          name.includes('terraform') || name.includes('ansible') || name.includes('devops') ||
          desc.includes('infrastructure') || desc.includes('deployment')) {
        categories.devops.push(repo);
      } else if (name.includes('ansible') || name.includes('script') || name.includes('automation') ||
                 desc.includes('automation') || lang === 'shell' || lang === 'python') {
        categories.automation.push(repo);
      } else if (lang === 'javascript' || lang === 'php' || lang === 'html' || 
                 name.includes('web') || desc.includes('website')) {
        categories.web.push(repo);
      } else {
        categories.other.push(repo);
      }
    });
    
    // Sort by stars and recent activity
    Object.keys(categories).forEach(key => {
      categories[key] = categories[key]
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        .slice(0, 3); // Top 3 per category
    });
    
    return categories;
  };
  
  const repoCategories = categorizeRepos(repos);
  
  const readmeContent = `<div align="center">

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png" alt="👋" width="50" /> Salut! I'm Rachid Jl

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=34&duration=2000&pause=800&color=FF6B6B,4ECDC4,FFD93D,A8E6CF,FF7675,74B9FF&background=0D111700&center=true&vCenter=true&multiline=true&repeat=true&width=1200&height=170&lines=🚀+Senior+DevOps+Engineer;⚙️+SysOps+Expert;🛡️+DevSecOps+Practitioner;🎯+9%2B+Years+of+Experience;🏆+RHCE+%2F+RHCSA+Certified;✨+Available+for+New+Opportunities!" alt="Typing SVG" />

<img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="120">

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&weight=800&size=26&duration=1500&pause=600&color=4ECDC4,FFD93D,FF6B6B&background=0D111700&center=true&vCenter=true&width=900&height=70&lines=🐳+Docker+%26+Kubernetes+Expert;☁️+AWS+%26+Azure+Specialist;🔧+Terraform+%26+Ansible+Master" alt="Skills Typing" />

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Rocket.png" alt="🚀" width="35" /> Infrastructure Automation Specialist | Paris, France

<img src="https://readme-typing-svg.herokuapp.com?font=Roboto&weight=600&size=22&duration=1800&pause=500&color=A8E6CF,FF7675,74B9FF&background=0D111700&center=true&vCenter=true&width=800&height=60&lines=💼+Ready+to+Transform+Your+Infrastructure;🚀+Let's+Build+Something+Amazing+Together!;📧+Open+for+DevOps+Opportunities" alt="Call to Action" />

<div align="center">
  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0077B5&color=0A66C2&animation=pulse)](https://linkedin.com/in/rachid-jl)
[![Email](https://img.shields.io/badge/-Available_for_Opportunities-FF6B6B?style=for-the-badge&logo=gmail&logoColor=white&labelColor=FF6B6B&color=FF4757)](mailto:rachid@example.com)
[![Phone](https://img.shields.io/badge/-+33749620214-4ECDC4?style=for-the-badge&logo=whatsapp&logoColor=white&labelColor=4ECDC4&color=26de81)](tel:+33749620214)
[![Location](https://img.shields.io/badge/-Paris,_France-A8E6CF?style=for-the-badge&logo=googlemaps&logoColor=white&labelColor=A8E6CF&color=00b894)](https://maps.google.com/?q=Paris,France)

</div>

<img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="100%">

</div>

---

<div align="center">

## 💼 🌟 **OPEN TO NEW OPPORTUNITIES** 🌟

### 🎯 Senior DevOps Engineer | Platform Engineer | SRE | Cloud Architect

<img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="100">

</div>

### ✨ **Recently Completed Mission:**
**Tech Lead SysOps at PMU** *(Aug 2023 - Jul 2024)*
- 🎯 **Led infrastructure for 500+ production betting terminals**
- ⚡ **Achieved 70% reduction in manual interventions** through smart automation
- 🔧 **Optimized AWS costs by 30%** through resource right-sizing
- 👥 **Mentored 3 junior DevOps engineers** + Scrum Master for 8-person team

### 🎯 **What I'm Looking For:**
<div align="center">

| 🎯 **Role Types** | 🌍 **Work Style** | 🛠️ **Focus Areas** |
|:---:|:---:|:---:|
| DevOps Engineer | Remote-First | Infrastructure Automation |
| Platform Engineer | Hybrid (Paris) | Kubernetes & Cloud |
| Site Reliability Engineer | Full Remote EU | CI/CD & Monitoring |
| Cloud Architect | On-site Paris | Team Leadership |

</div>

---

## 📊 GitHub Analytics

<div align="center">
  
<img src="https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=tokyonight&count_private=true&hide_border=true&bg_color=0D1117&title_color=58A6FF&text_color=C9D1D9&icon_color=58A6FF" alt="GitHub Stats" width="48%" />
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=58A6FF&text_color=C9D1D9&langs_count=8" alt="Top Languages" width="48%" />

<img src="https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&theme=tokyonight&hide_border=true&background=0D1117&stroke=58A6FF&ring=58A6FF&fire=FF6B6B&currStreakLabel=58A6FF" alt="GitHub Streak" width="48%" />
<img src="https://github-readme-stats.vercel.app/api/wakatime?username=${USERNAME}&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=58A6FF&text_color=C9D1D9" alt="Coding Activity" width="48%" />

</div>

<div align="center">
<img src="https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&theme=tokyo-night&bg_color=0D1117&color=58A6FF&line=58A6FF&point=FF6B6B&area=true&hide_border=true" width="100%"/>
</div>

---

## 🛠️ Technical Arsenal

<div align="center">

### ${techStack.devops.title}
${badges.devops.join(' ')}

### ${techStack.cloud.title}
${badges.cloud.join(' ')}

### ${techStack.monitoring.title}
${badges.monitoring.join(' ')}

### ${techStack.programming.title}
${badges.programming.join(' ')}

### ${techStack.databases.title}
${badges.databases.join(' ')}

### ${techStack.systems.title}
${badges.systems.join(' ')}

</div>

---

## 🔥 Featured Projects

<div align="center">

### 🐳 **DevOps & Infrastructure Projects**

</div>

${repoCategories.devops.map(repo => `
<div align="left">

#### 🚀 [${repo.name}](${repo.html_url})
\`\`\`yaml
Description: ${repo.description || 'Infrastructure automation and DevOps solutions'}
Language: ${repo.language || 'Multi-language'}
Stars: ⭐ ${repo.stargazers_count || 0}
Forks: 🍴 ${repo.forks_count || 0}
Updated: ${new Date(repo.updated_at).toLocaleDateString('fr-FR')}
\`\`\`

</div>
`).join('')}

<div align="center">

### 🤖 **Automation & Scripts**

</div>

${repoCategories.automation.map(repo => `
<div align="left">

#### ⚡ [${repo.name}](${repo.html_url})
\`\`\`bash
# ${repo.description || 'Automation scripts and tools'}
Language: ${repo.language || 'Shell/Python'}
Stars: ⭐ ${repo.stargazers_count || 0} | Forks: 🍴 ${repo.forks_count || 0}
\`\`\`

</div>
`).join('')}

<div align="center">

### 💻 **Web Development**

</div>

${repoCategories.web.map(repo => `
<div align="left">

#### 🌐 [${repo.name}](${repo.html_url})
\`\`\`javascript
// ${repo.description || 'Full-stack web development project'}
Tech: ${repo.language || 'Web Technologies'} | ⭐ ${repo.stargazers_count || 0} | 🍴 ${repo.forks_count || 0}
\`\`\`

</div>
`).join('')}

---

## 🏆 Professional Journey

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="100">

</div>

### 🏢 **PMU** | Tech Lead SysOps *(Aug 2023 - Jul 2024)*
<div align="center">

| Achievement | Impact | Technology |
|:---:|:---:|:---:|
| 🚀 Automated terminal updates | 70% reduction in manual work | Ansible, GitLab CI/CD |
| ☁️ AWS cost optimization | 30% cost reduction | Terraform, CloudWatch |
| 📊 Real-time monitoring | 99.9% uptime SLA | Grafana, Prometheus |
| 👥 Team mentorship | 3 junior engineers trained | Scrum, Agile |

</div>

### 🏢 **MAIF** | Lead DevOps *(Dec 2021 - Jul 2023)*
- 🐳 **Managed 4 Kubernetes clusters** hosting 130 microservices
- 🔄 **Optimized Jenkins CI/CD pipelines** for faster deployments
- ☁️ **Led Azure migration strategy** from on-premise infrastructure
- 📈 **Implemented Prometheus monitoring** for critical business applications

### 🏢 **Ministry of Defense** | DevOps Consultant *(Sep 2018 - Nov 2021)*
- 🛡️ **Designed secure infrastructure** for sensitive government systems
- 🔧 **Automated provisioning** with Ansible for defense applications
- 📦 **Deployed OpenShift clusters** for containerized applications
- 🔐 **Managed ANSSI compliance** for critical security requirements

---

## 🏆 Certifications & Achievements

<div align="center">

![RHCE](https://img.shields.io/badge/-RHCE_Certified-EE0000?style=for-the-badge&logo=redhat&logoColor=white)
![RHCSA](https://img.shields.io/badge/-RHCSA_Certified-EE0000?style=for-the-badge&logo=redhat&logoColor=white)
![Kubernetes](https://img.shields.io/badge/-Kubernetes_Specialist-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![OpenShift](https://img.shields.io/badge/-OpenShift_Expert-EE0000?style=for-the-badge&logo=redhatopenshift&logoColor=white)

</div>

<div align="center">

| 🎓 **Certification** | 📅 **Year** | 🏢 **Organization** |
|:---:|:---:|:---:|
| Red Hat Certified Engineer (RHCE) | 2020 | Red Hat |
| Red Hat Certified System Administrator (RHCSA) | 2019 | Red Hat |
| Kubernetes & OpenShift Specialist | 2021 | Red Hat |
| Ansible Automation Specialist | 2020 | Red Hat |

</div>

---

## 📈 Current Availability

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="100">

### 🚀 **Ready for Your Next Challenge!**

</div>

<div align="center">

![Available](https://img.shields.io/badge/-AVAILABLE_NOW-00C851?style=for-the-badge&logo=checkmarx&logoColor=white)
![Remote](https://img.shields.io/badge/-REMOTE_FRIENDLY-2196F3?style=for-the-badge&logo=googlemeet&logoColor=white)
![Paris](https://img.shields.io/badge/-PARIS_BASED-FF5722?style=for-the-badge&logo=googlemaps&logoColor=white)

</div>

### 💡 **My Value Proposition:**

> *"8+ years of transforming complex infrastructure challenges into automated, scalable solutions. Expert in Kubernetes, AWS, and team leadership. Ready to architect your next-generation infrastructure and mentor your teams to DevOps excellence."*

<div align="center">

### 📧 **Let's Build Something Amazing Together!**

**Open to discussing DevOps, Platform Engineering, SRE, and Cloud Architecture opportunities**

[![Email Me](https://img.shields.io/badge/-Email_Me_About_Opportunities-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rachid@example.com)
[![Schedule Call](https://img.shields.io/badge/-Schedule_a_Call-00C851?style=for-the-badge&logo=calendly&logoColor=white)](https://calendly.com/rachid-jl)

</div>

---

<div align="center">

## 📊 Profile Statistics

![Profile Views](https://komarev.com/ghpvc/?username=${USERNAME}&color=blueviolet&style=for-the-badge&label=Profile+Views)
![Followers](https://img.shields.io/github/followers/${USERNAME}?color=blue&style=for-the-badge&logo=github)
![Stars](https://img.shields.io/github/stars/${USERNAME}?color=yellow&style=for-the-badge&logo=github)

**Last updated:** ${getParisTime()} (Paris Time)

*This profile is automatically updated daily to showcase my latest work and contributions*

---

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

</div>`;

  return readmeContent;
};

// Enhanced update function with better error handling
const updateProfile = async () => {
  try {
    console.log('🎨 Starting enhanced profile update...');
    const content = await generateReadmeContent();
    
    // Write to README.md
    fs.writeFileSync('README.md', content, 'utf8');
    console.log('✅ Enhanced README.md updated successfully!');
    
    // Create backup with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    fs.writeFileSync(`README-backup-${timestamp}.md`, content, 'utf8');
    console.log(`📄 Backup created: README-backup-${timestamp}.md`);
    
  } catch (error) {
    console.error('❌ Error updating profile:', error.message);
  }
};

// Create enhanced GitHub Actions workflow
const createGitHubAction = () => {
  const workflow = `name: 🚀 Update Rachid's Enhanced Profile

on:
  schedule:
    - cron: '0 6 * * *' # Daily at 6 AM Paris time
  workflow_dispatch: # Manual trigger
  push:
    branches: [ main ]
    paths: [ 'update-profile.js' ]

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
        
    - name: 🎨 Update Enhanced README
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      run: node update-profile.js
      
    - name: 💾 Commit and push changes
      run: |
        git config --local user.email "rachid.devops@gmail.com"
        git config --local user.name "Rachid Jl - DevOps Engineer"
        git add README.md
        if git diff --staged --quiet; then
          echo "✅ No changes to commit"
        else
          git commit -m "🤖 Auto-update enhanced profile README - \$(date +'%Y-%m-%d %H:%M')"
          git push
          echo "🚀 Profile updated successfully!"
        fi
`;

  // Ensure .github/workflows directory exists
  if (!fs.existsSync('.github')) {
    fs.mkdirSync('.github');
  }
  if (!fs.existsSync('.github/workflows')) {
    fs.mkdirSync('.github/workflows');
  }
  
  fs.writeFileSync('.github/workflows/update-profile.yml', workflow);
  console.log('⚙️ Enhanced GitHub Actions workflow created!');
};

// Project suggestions based on experience
const createProjectSuggestions = () => {
  const suggestions = {
    'devops-automation-suite': {
      description: 'Complete DevOps automation toolkit with Ansible, Terraform, and monitoring',
      priority: 'High - Showcases full DevOps expertise'
    },
    'kubernetes-production-setup': {
      description: 'Production-ready Kubernetes cluster with monitoring, logging, and security',
      priority: 'High - Demonstrates K8s leadership skills'
    },
    'infrastructure-as-code-examples': {
      description: 'Real-world IaC examples for AWS/Azure with best practices',
      priority: 'Medium - Shows cloud expertise'
    },
    'monitoring-dashboard-templates': {
      description: 'Grafana dashboards and Prometheus configs for common scenarios',
      priority: 'Medium - Highlights monitoring skills'
    }
  };
  
  console.log('💡 Project suggestions to boost your profile:');
  Object.entries(suggestions).forEach(([name, config]) => {
    console.log(`  📁 ${name}`);
    console.log(`     ${config.description}`);
    console.log(`     Priority: ${config.priority}\n`);
  });
};

// Main execution
console.log('🎯 Rachid\'s Enhanced GitHub Profile Automation');
console.log('=============================================');

updateProfile();
createGitHubAction();
createProjectSuggestions();

console.log('\n✨ Enhanced setup complete! Your profile now features:');
console.log('🎨 Beautiful modern design with animations');
console.log('💼 Clear "Available for opportunities" messaging');
console.log('📊 Enhanced GitHub statistics and graphs');
console.log('🛠️ Comprehensive tech stack showcase');
console.log('🏆 Professional experience timeline');
console.log('📱 Mobile-friendly responsive design');
console.log('\n🚀 Ready to attract top employers and recruiters!');

export { updateProfile, createGitHubAction };
