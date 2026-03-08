<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>엔트리 파이썬 AI 코딩 도우미</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;700&display=swap');
        body { background-color: #0a0a0a; color: #e5e5e5; font-family: 'Pretendard', sans-serif; }
        .bg-panel { background-color: #141414; border: 1px solid #262626; }
        .input-bg { background-color: #0f0f0f; border: 1px solid #333; }
        .text-mint { color: #00d2b6; }
        .bg-mint { background-color: #00d2b6; }
        .hover-bg-mint:hover { background-color: #00f0d0; box-shadow: 0 0 15px rgba(0, 210, 182, 0.4); }
        .loading { display: none; }
        .loading.active { display: flex; }
    </style>
</head>
<body class="p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
        <header class="flex items-center justify-between pb-6 mb-8 border-b border-[#262626]">
            <div class="flex items-center gap-4">
                <img src="https://api-ogq.naver.com/artworks/sticker/image/5dfbc489e3d0e_0.png" alt="엔트리봇" class="h-12 w-12 object-contain">
                <h1 class="text-2xl font-bold text-white tracking-wide">ENTRY <span class="text-mint">PYTHON</span> AI</h1>
            </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-panel p-6 rounded-2xl shadow-2xl">
                    <label class="block mb-3 text-lg font-bold text-white">원하는 기능을 적어주세요</label>
                    <textarea id="userInput" class="w-full h-56 p-4 input-bg text-gray-100 rounded-xl outline-none transition resize-none" placeholder="예: 스페이스바를 누르면 점프하게 해줘."></textarea>
                    
                    <div class="mt-4 flex flex-wrap gap-2">
                        <button class="quick-btn text-xs bg-[#262626] p-2 rounded-lg border border-[#333]">마우스 따라다니기</button>
                        <button class="quick-btn text-xs bg-[#262626] p-2 rounded-lg border border-[#333]">벽에 닿으면 튕기기</button>
                    </div>

                    <button id="generateBtn" class="w-full mt-6 bg-mint text-black font-bold py-4 rounded-xl hover-bg-mint transition-all">코드 생성 시작 🚀</button>
                </div>
            </div>

            <div class="lg:col-span-3">
                <div class="bg-panel p-6 rounded-2xl h-full relative overflow-hidden">
                    <div id="loadingOverlay" class="loading absolute inset-0 bg-black/80 flex-col items-center justify-center z-20 rounded-2xl">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-mint border-t-transparent mb-4"></div>
                        <p class="text-mint font-bold">AI 코딩 중...</p>
                    </div>
                    <pre class="h-[450px] m-0 p-5 bg-black rounded-xl border border-[#262626] overflow-auto"><code id="codeOutput" class="language-python"># 코드가 여기에 나타납니다.</code></pre>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
    <script>
        const generateBtn = document.getElementById('generateBtn');
        const codeOutput = document.getElementById('codeOutput');
        const loadingOverlay = document.getElementById('loadingOverlay');

        generateBtn.onclick = async () => {
            const prompt = document.getElementById('userInput').value.trim();
            if (!prompt) return alert("기능을 입력하세요!");

            loadingOverlay.classList.add('active');
            try {
                // 구글 API 대신 우리 서버(/api/generate)에 물어봅니다.
                const res = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });
                const data = await res.json();
                codeOutput.textContent = data.code || "# 에러가 발생했습니다.";
                Prism.highlightElement(codeOutput);
            } catch (e) {
                codeOutput.textContent = "# 서버 연결 실패";
            } finally {
                loadingOverlay.classList.remove('active');
            }
        };

        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.onclick = (e) => {
                document.getElementById('userInput').value = e.target.innerText + " 코드 짜줘";
                generateBtn.click();
            };
        });
    </script>
</body>
</html>