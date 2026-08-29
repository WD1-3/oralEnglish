const START = new Date('2026-08-26T00:00:00+08:00');
const TOTAL = 42;

const lessons = {
  1:{title:'Prominence：重要信息要站出来',remember:'重要信息凸出来，不重要的语法词退下去。',sentences:['I bought a new phone yesterday.','I need some help.','She bought a new car.','We met at the station.'],output:'What did you do today?',source:'https://www.bilibili.com/video/BV17t411w7jy/'},
  2:{title:'Content Words vs Function Words',remember:'内容词通常更突出，功能词通常更轻，但语境可以改变重音。',sentences:['I can call you later.','She is waiting for the bus.','They have finished the project.','We will meet after class.'],output:'What are you going to do today?',source:'https://www.bilibili.com/video/BV17t411w7jy/?p=8'},
  3:{title:'Schwa /ə/：弱读的核心',remember:'先判断这个词有没有重音，再判断它会不会弱化。',sentences:['I want to go.','I need a minute.','We can do it.','She went to work.'],output:'What do you need to do today?',source:'https://www.bilibili.com/video/BV1LW411w7xU/?p=8'},
  4:{title:'Rhythm：自然不等于说得快',remember:'英语节奏的关键是重的更突出，轻的更短。',sentences:['The birds will eat the worms.','I really need some help.','I want to buy a book.','We can meet after class.'],output:'What are you going to do tomorrow?',source:'https://www.bilibili.com/video/BV1tV411W7Nj/?p=5'},
  5:{title:'Thought Groups：该连的地方连，该停的地方停',remember:'一句话要按意义分组，组内连续，组间轻停。',sentences:['When I got home, I realized I had left my phone at work.','After class, I am going to the library.','If you have time, give me a call.','I wanted to go, but I was too tired.'],output:'Describe your plan for the rest of the day.',source:'https://www.bilibili.com/video/BV13t411K71f/'},
  6:{title:'真实语料实验：为什么认识词却听不见',remember:'听不见不一定是不认识，可能是弱读、连读或分组判断错了。',sentences:['I wanted to call you after class.','I had to finish a project first.','Can you give me a minute?'],output:'Summarize what you heard in 20–30 seconds.',source:'https://www.allearsenglish.com/aee-1233-how-to-hang-on-when-natives-speak-fast/'},
  7:{title:'Week 1 诊断与录音基线',remember:'今天不学新规则，只检查你能不能主动找重点、弱读和分组。',sentences:['I wanted to call you after class, but I had to finish a project first.'],output:'What was the most important thing you did this week?',source:'https://youglish.com/'}
};

function dayFromDate(){
  const now = new Date();
  const sh = new Date(now.toLocaleString('en-US',{timeZone:'Asia/Shanghai'}));
  const start = new Date(START.toLocaleString('en-US',{timeZone:'Asia/Shanghai'}));
  const diff = Math.floor((sh-start)/86400000)+1;
  return Math.min(TOTAL,Math.max(1,diff));
}
function fallbackLesson(day){
  const week=Math.ceil(day/7);
  const themes=['Foundation','C→V Linking','Other Linking','Weak Forms & Reduction','T & Sound Modification','Transfer & Real Speech'];
  return {title:`Week ${week} · ${themes[week-1]}`,remember:'先听目标声音，再模仿，再看规则，最后用真人语料校准。',sentences:['Listen first, then imitate the rhythm.','Keep the important words prominent.','Reduce unstressed function words naturally.'],output:'Speak for 20–30 seconds using today’s target pattern.',source:'https://youglish.com/'};
}
function lessonFor(day){return lessons[day]||fallbackLesson(day)}
function audioPath(day,index,speed){return `assets/audio/day-${String(day).padStart(2,'0')}/sentence-${String(index+1).padStart(2,'0')}-${speed}.mp3`}

async function playReference(day,index,text,rate){
  stopAll();
  const speed = rate < 1 ? 'slow' : 'natural';
  const src = audioPath(day,index,speed);
  try{
    const r=await fetch(src,{method:'HEAD',cache:'no-store'});
    if(r.ok){const a=new Audio(src);window.__audio=a;a.play();return;}
  }catch(e){}
  if('speechSynthesis' in window){
    const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=rate;u.pitch=1;
    const voices=speechSynthesis.getVoices();
    const preferred=voices.find(v=>/^en-US$/i.test(v.lang))||voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith('en-us'));
    if(preferred)u.voice=preferred;
    speechSynthesis.speak(u);
  } else alert('当前浏览器不支持语音播放。');
}
function stopAll(){if(window.__audio){window.__audio.pause();window.__audio.currentTime=0;}if('speechSynthesis'in window)speechSynthesis.cancel();}
function esc(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

let current=dayFromDate();
function render(day){
  current=day; const l=lessonFor(day);
  dayPill.textContent=`Day ${day} / ${TOTAL}`;dayTitle.textContent=l.title;
  daySelect.value=String(day);prevBtn.disabled=day<=1;nextBtn.disabled=day>=TOTAL;
  lesson.innerHTML=`
    <article class="card"><h3>今天只记一句话</h3><p class="accent">${esc(l.remember)}</p></article>
    <article class="card"><h3>先听，再看文字</h3><p class="muted">每句先点 ▶ Natural 听 2 遍，不看标记；再看句子；最后点 🐢 Slow 定位细节。若仓库里已有 MP3 会自动播放 MP3，否则使用设备 en-US 语音。</p>${l.sentences.map((s,i)=>`<div class="sentence"><div class="sentence-text">${esc(s)}</div><div class="speak-wrap"><button class="speak" data-i="${i}" data-rate="1">▶ Natural</button><button class="speak" data-i="${i}" data-rate="0.86">🐢 Slow</button></div></div>`).join('')}</article>
    <article class="card"><h3>4 分钟听辨</h3><p>第一遍只找 <strong>prominence / rhythm / pauses</strong>；第二遍再判断 weak forms、linking 或今天的新现象。不要先读文字解释。</p></article>
    <article class="card"><h3>5 分钟跟读</h3><p>每句：Natural ×2 → 自己跟读 ×2 → Slow ×1 定位 → Natural ×1。只改最明显的 1–2 个差异。</p></article>
    <article class="card"><h3>5 分钟陌生句迁移</h3><p>自己造 2–3 句相同结构的新句，先预测轻重与连接，再去 YouGlish US 听至少 3 个真人例子。</p></article>
    <article class="card"><h3>3 分钟自由输出</h3><p class="accent">${esc(l.output)}</p><p class="muted">说 20–30 秒。今天优先检查可理解度和节奏，不追求“像母语者”。</p></article>
    <article class="card check"><h3>完成标准</h3><p>不看答案时，能主动预测当天目标现象，并在听完参考音频后只修正最明显的差异。</p></article>
    <article class="card"><h3>真人主素材</h3><p><a class="repo-link" href="${l.source}" target="_blank" rel="noreferrer">打开今天的真人音频 / 视频</a></p><p class="muted">真人素材负责真实语流校准；句子按钮负责高频反复跟读。</p></article>`;
  document.querySelectorAll('.speak').forEach(b=>b.onclick=()=>playReference(day,Number(b.dataset.i),l.sentences[Number(b.dataset.i)],Number(b.dataset.rate)));
  history.replaceState(null,'',`#day-${day}`);
}
for(let i=1;i<=TOTAL;i++){const o=document.createElement('option');o.value=i;o.textContent=`Day ${i}`;daySelect.appendChild(o)}
daySelect.onchange=()=>render(Number(daySelect.value));prevBtn.onclick=()=>render(Math.max(1,current-1));nextBtn.onclick=()=>render(Math.min(TOTAL,current+1));todayBtn.onclick=()=>render(dayFromDate());stopBtn.onclick=stopAll;
const hash=location.hash.match(/day-(\d+)/);render(hash?Math.min(TOTAL,Math.max(1,Number(hash[1]))):current);