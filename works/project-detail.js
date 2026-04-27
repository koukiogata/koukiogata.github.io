// プロジェクト詳細ページのロジック
document.addEventListener('DOMContentLoaded', async function () {
    // URLのパラメータからプロジェクトIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        // プロジェクトIDがない場合はポートフォリオにリダイレクト
        window.location.href = '../#design';
        return;
    }

    const API_KEY = 'ZxBt8c9lECXDuzv4C6H07sWO87wCMZT2C7Ua';
    const ENDPOINT = `https://kouki.microcms.io/api/v1/designmockup/${projectId}`;

    try {
        const res = await fetch(ENDPOINT, {
            headers: { 'X-MICROCMS-API-KEY': API_KEY }
        });

        if (!res.ok) {
            throw new Error('Project not found');
        }

        const projectData = await res.json();

        // プロジェクト情報をページに表示
        renderProjectDetails(projectData);
        renderFigmaEmbed(projectData);

        // 関連プロジェクトの取得（全て取得してランダムに3件）
        const allRes = await fetch('https://kouki.microcms.io/api/v1/designmockup', {
            headers: { 'X-MICROCMS-API-KEY': API_KEY }
        });
        if (allRes.ok) {
            const allData = await allRes.json();
            renderRelatedProjects(projectData, allData.contents);
        }

    } catch (error) {
        console.error(error);
        const mainEl = document.querySelector('.project-main');
        if (mainEl) mainEl.innerHTML = '<p style="padding: 100px; text-align: center;">プロジェクトが見つかりません。</p>';
    }

    // 戻るボタンにイベントリスナーを追加
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function (e) {
            e.preventDefault(); // デフォルト動作を一度止める
            // ローディングをスキップするフラグを設定
            sessionStorage.setItem('skipLoading', 'true');
            // 明示的にページ遷移
            window.location.href = '../#design';
        });
    }
});

// プロジェクト詳細情報をレンダリング
function renderProjectDetails(projectData) {
    // タイトル
    document.title = `${projectData.title} - k-criert/portfolio`;
    document.getElementById('projectTitle').textContent = projectData.title;
    document.getElementById('projectDescription').textContent = projectData.text || '';

    if (projectData.image && projectData.image.url) {
        document.getElementById('projectImage').src = projectData.image.url + '?w=1200';
    }
    document.getElementById('projectImage').alt = projectData.title;

    // 概要情報
    document.getElementById('overviewClient').textContent = projectData.client || '';
    document.getElementById('overviewRole').textContent = projectData.charge || '';

    // used は配列の可能性もあるので考慮
    const tools = projectData.used || '';
    document.getElementById('overviewTools').textContent = Array.isArray(tools) ? tools.join(', ') : tools;

    document.getElementById('overviewYear').textContent = projectData.date || '';

    // プロセス情報
    document.getElementById('challengeText').textContent = projectData.Task || '';
    document.getElementById('designText').textContent = projectData.concept || '';
    document.getElementById('wireframeText').textContent = projectData.wireframe || '';
    document.getElementById('uiText').textContent = projectData.uidesgin || '';
}

// Figmaプロトタイプを埋め込み
function renderFigmaEmbed(projectData) {
    const figmaWrapper = document.getElementById('figmaWrapper');

    if (projectData.figmaEmbedUrl) {
        figmaWrapper.innerHTML = `
            <div class="figma-wrap">
                <iframe 
                    src="${projectData.figmaEmbedUrl}"
                    allowfullscreen
                    style="border: 1px solid rgba(0, 0, 0, 0.1); width: 100%; height: 600px;">
                </iframe>
            </div>
        `;
    } else {
        figmaWrapper.innerHTML = '<p>プロトタイプは現在利用できません。</p>';
    }
}

// 関連プロジェクトをレンダリング
function renderRelatedProjects(currentProject, allProjects) {
    const relatedGrid = document.getElementById('relatedGrid');

    // 現在のプロジェクトを除外
    let relatedProjects = allProjects.filter(project => project.id !== currentProject.id);

    // ランダムに並び替え
    relatedProjects.sort(() => 0.5 - Math.random());

    // 最大3件取得
    relatedProjects = relatedProjects.slice(0, 3);

    if (relatedProjects.length === 0) {
        relatedGrid.innerHTML = '<p>関連プロジェクトはありません。</p>';
        return;
    }

    relatedGrid.innerHTML = ''; // 一旦クリア

    relatedProjects.forEach(project => {
        const projectCard = document.createElement('a');
        projectCard.href = `?id=${project.id}`;
        projectCard.className = 'related-card';

        const imageUrl = project.image ? project.image.url + '?w=600' : '';

        projectCard.innerHTML = `
            <div class="related-card-image">
                <img src="${imageUrl}" alt="${project.title}" style="height: 200px; object-fit: cover; width: 100%;">
            </div>
            <div class="related-card-content">
                <h3>${project.title}</h3>
                <p>${project.text || ''}</p>
            </div>
        `;
        relatedGrid.appendChild(projectCard);
    });
}
