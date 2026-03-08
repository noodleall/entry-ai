export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { prompt } = req.body;
    // 나중에 Vercel 설정에서 넣을 이름입니다.
    const API_KEY = process.env.GEMINI_API_KEY; 

    const SYSTEM_PROMPT = `당신은 엔트리 파이썬 전문가입니다. 
    1. 반드시 'import Entry' 포함. 
    2. 'def when_start():' 함수 안에 코드 작성. 
    3. 코드만 출력. 
    요청: `;

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: SYSTEM_PROMPT + prompt }] }]
            })
        });

        const data = await response.json();
        const code = data.candidates[0].content.parts[0].text.trim();
        res.status(200).json({ code: code.replace(/^```python\n?/i, '').replace(/\n?```$/i, '') });
    } catch (error) {
        res.status(500).json({ error: "코드 생성에 실패했습니다." });
    }
}