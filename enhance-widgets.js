// Script para gerar dados adicionais para os widgets do GitHub
const fs = require("fs");
const path = require("path");

// Dados simulados baseados na atividade real
const additionalData = {
  totalCommits: 850,
  privateRepos: 15,
  totalProjects: 25,
  linesOfCode: 52000,
  yearsExperience: 3,
  technologiesUsed: 12,
  clientProjects: 8,
  openSourceContributions: 5,
};

// Função para gerar badges customizados
function generateCustomBadges() {
  const badges = [
    `![Total Commits](https://img.shields.io/badge/Total%20Commits-${additionalData.totalCommits}+-brightgreen?style=flat-square&logo=git)`,
    `![Private Repos](https://img.shields.io/badge/Private%20Repos-${additionalData.privateRepos}-blue?style=flat-square&logo=github)`,
    `![Projects](https://img.shields.io/badge/Projects-${additionalData.totalProjects}+-orange?style=flat-square&logo=folder)`,
    `![Lines of Code](https://img.shields.io/badge/Lines%20of%20Code-${(
      additionalData.linesOfCode / 1000
    ).toFixed(0)}K+-red?style=flat-square&logo=code)`,
    `![Experience](https://img.shields.io/badge/Experience-${additionalData.yearsExperience}%2B%20years-purple?style=flat-square&logo=calendar)`,
  ];

  return badges.join("\n");
}

// Função para gerar URLs de widgets modificados
function generateEnhancedWidgetUrls(username) {
  const baseUrls = {
    stats: `https://github-readme-stats.vercel.app/api?username=${username}`,
    languages: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}`,
    activity: `https://github-readme-activity-graph.vercel.app/graph?username=${username}`,
  };

  // Parâmetros para melhorar os widgets
  const enhancedParams = {
    stats:
      "&show_icons=true&theme=dark&include_all_commits=true&count_private=true&hide_border=true&bg_color=0d1117&custom_title=Enhanced%20GitHub%20Stats",
    languages:
      "&layout=compact&langs_count=10&theme=dark&hide_border=true&bg_color=0d1117&exclude_repo=repo1,repo2",
    activity:
      "&bg_color=0d1117&color=58a6ff&line=58a6ff&point=f0f6fc&area=true&hide_border=true&custom_title=Activity%20Graph",
  };

  return {
    enhancedStats: baseUrls.stats + enhancedParams.stats,
    enhancedLanguages: baseUrls.languages + enhancedParams.languages,
    enhancedActivity: baseUrls.activity + enhancedParams.activity,
  };
}

// Função para criar um README com widgets aprimorados
function generateEnhancedReadmeSection(username) {
  const widgets = generateEnhancedWidgetUrls(username);
  const customBadges = generateCustomBadges();

  const enhancedSection = `
## 📊 Enhanced GitHub Stats

<table>
<tr>
<td>

![Most Used Languages](${widgets.enhancedLanguages})

</td>
<td>

![GitHub Stats](${widgets.enhancedStats})

</td>
</tr>
</table>

![GitHub Activity Graph](${widgets.enhancedActivity})

### 📈 Additional Metrics

${customBadges}

---
`;

  return enhancedSection;
}

// Função principal
function main() {
  const username = "bhunos";

  console.log("🚀 Generating enhanced widgets...");
  console.log("\n📊 Custom Badges:");
  console.log(generateCustomBadges());

  console.log("\n🔗 Enhanced Widget URLs:");
  const urls = generateEnhancedWidgetUrls(username);
  Object.entries(urls).forEach(([key, url]) => {
    console.log(`${key}: ${url}`);
  });

  console.log("\n📝 Complete Enhanced Section:");
  console.log(generateEnhancedReadmeSection(username));

  // Salvar em arquivo
  const enhancedSection = generateEnhancedReadmeSection(username);
  fs.writeFileSync("enhanced-section.md", enhancedSection);
  console.log("\n✅ Enhanced section saved to enhanced-section.md");
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  generateCustomBadges,
  generateEnhancedWidgetUrls,
  generateEnhancedReadmeSection,
  additionalData,
};
