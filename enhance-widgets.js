// Script para gerar dados adicionais para os widgets do GitHub
const fs = require("fs");
const path = require("path");

// Dados baseados no print do GitHub (569 contribuições no último ano)
const realData = {
  contributionsLastYear: 569,
  totalCommits: 850, // estimativa baseada na atividade
  privateRepos: 15,
  totalProjects: 25,
  linesOfCode: 52000,
  yearsExperience: 3,
  technologiesUsed: 12,
  clientProjects: 8,
  openSourceContributions: 5,
};

// Função para gerar URLs de widgets que mostram dados combinados
function generateCombinedWidgetUrls(username) {
  const baseUrls = {
    stats: `https://github-readme-stats.vercel.app/api?username=${username}`,
    languages: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}`,
    streak: `https://streak-stats.demolab.com/?user=${username}`,
    activity: `https://github-readme-activity-graph.vercel.app/graph?username=${username}`,
  };

  // Parâmetros otimizados para mostrar mais dados
  const enhancedParams = {
    stats:
      "&show_icons=true&theme=dark&include_all_commits=true&count_private=true&hide_border=true&bg_color=0d1117&title_color=58a6ff&icon_color=58a6ff&text_color=c9d1d9&cache_seconds=86400",
    languages:
      "&layout=compact&langs_count=10&theme=dark&hide_border=true&bg_color=0d1117&title_color=58a6ff&text_color=c9d1d9&cache_seconds=86400",
    streak:
      "&theme=dark&hide_border=true&background=0d1117&stroke=58a6ff&ring=58a6ff&fire=58a6ff&currStreakLabel=c9d1d9&sideNums=c9d1d9&currStreakNum=58a6ff&sideLabels=c9d1d9&dates=c9d1d9",
    activity:
      "&bg_color=0d1117&color=58a6ff&line=58a6ff&point=f0f6fc&area=true&hide_border=true&custom_title=Contribution%20Activity",
  };

  return {
    enhancedStats: baseUrls.stats + enhancedParams.stats,
    enhancedLanguages: baseUrls.languages + enhancedParams.languages,
    enhancedStreak: baseUrls.streak + enhancedParams.streak,
    enhancedActivity: baseUrls.activity + enhancedParams.activity,
  };
}

// Função para gerar badges que complementam os widgets públicos
function generateComplementaryBadges() {
  const badges = [
    `![Contributions This Year](https://img.shields.io/badge/Contributions%20This%20Year-${realData.contributionsLastYear}-brightgreen?style=for-the-badge&logo=github&logoColor=white)`,
    `![Total Commits](https://img.shields.io/badge/Total%20Commits-${realData.totalCommits}+-blue?style=for-the-badge&logo=git&logoColor=white)`,
    `![Private Projects](https://img.shields.io/badge/Private%20Projects-${realData.privateRepos}-orange?style=for-the-badge&logo=lock&logoColor=white)`,
    `![Years Coding](https://img.shields.io/badge/Years%20Coding-${realData.yearsExperience}+-purple?style=for-the-badge&logo=calendar&logoColor=white)`,
    `![Lines of Code](https://img.shields.io/badge/Lines%20of%20Code-${(
      realData.linesOfCode / 1000
    ).toFixed(0)}K+-red?style=for-the-badge&logo=code&logoColor=white)`,
  ];

  return badges.join("\n");
}

// Função para criar README section completa
function generateCompleteReadmeSection(username) {
  const widgets = generateCombinedWidgetUrls(username);
  const complementaryBadges = generateComplementaryBadges();

  const completeSection = `
## 📊 GitHub Stats

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

![GitHub Streak](${widgets.enhancedStreak})

![GitHub Activity Graph](${widgets.enhancedActivity})

### 📈 Complete Activity Overview

<div align="center">

${complementaryBadges}

</div>

---
`;

  return completeSection;
}

// Função principal
function main() {
  const username = "bhunos";

  console.log("🚀 Generating combined widgets (public + hardcoded data)...");
  console.log(
    `📊 Based on your GitHub showing ${realData.contributionsLastYear} contributions this year`
  );

  console.log("\n🏷️ Complementary Badges:");
  console.log(generateComplementaryBadges());

  console.log("\n🔗 Enhanced Widget URLs:");
  const urls = generateCombinedWidgetUrls(username);
  Object.entries(urls).forEach(([key, url]) => {
    console.log(`${key}: ${url}`);
  });

  console.log("\n📝 Complete README Section:");
  const completeSection = generateCompleteReadmeSection(username);
  console.log(completeSection);

  // Salvar em arquivo
  fs.writeFileSync("complete-section.md", completeSection);
  console.log("\n✅ Complete section saved to complete-section.md");
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  generateComplementaryBadges,
  generateCombinedWidgetUrls,
  generateCompleteReadmeSection,
  realData,
};
