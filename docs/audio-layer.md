# 口语课程音频层（Audio-first Layer）

> 原则：口语训练必须先有声音。没有可播放的目标音频，就不把一组句子当成正式跟读材料。

## 每日课必须包含的 3 类声音

### A. 真人主音频（必须）

每天至少提供 1 段 **20–60 秒真人美式英语**，用于听辨与 shadowing。

优先级：

1. Rachel's English（优先 B 站可直接观看版本）
2. VOA Learning English（页面自带音频/视频播放器）
3. All Ears English（真实对话）
4. ELLLO（有 transcript 的真实语料）

要求：

- 必须和当天主题直接相关；
- 尽量给出明确章节 / P 数 / 时间范围；
- 学习者先听 2–3 遍，再看讲义或 transcript；
- 不要求把整集视频看完。

### B. 当天定制句子参考音频（必须）

每日跟读的 3–5 个训练句必须能直接听到参考读法。

优先顺序：

1. 真人语料中有完全相同或高度相似句子：直接使用真人原音；
2. 找不到完全匹配真人音频：为当天训练句生成 **GPT / OpenAI TTS 美式英语参考音频**；
3. 若 GPT/OpenAI TTS 暂不可用：再退回其他高质量 Neural TTS，并明确标注来源。

GPT/TTS 音频的定位：

- 用于当天短句的反复跟读、慢速/正常速度对照和定位重音；
- 可以按照当天教学目标控制读法，例如突出 prominence、弱化 function words、保持自然 linking；
- 必须标注为 **AI-generated reference audio**；
- 不把单条合成音频当作“所有母语者唯一正确的读法”；
- connected speech 最终仍用真人语料 / YouGlish 做二次校准。

建议每个训练句生成两版：

- `slow`：约 0.85–0.9× 的教学速度，仍保持自然重音和弱读；
- `natural`：正常自然美式英语速度。

训练顺序：

`只听 natural → 尝试模仿 → 看文字与标记 → 听 slow 定位细节 → 再听 natural → 录自己 → 对比`

不要：

`先读文字规则 → 自己猜发音 → 最后才偶尔听原音`

### C. Shadowing 连续音频（每日至少一段）

长度：10–30 秒。

用途：把当天规则放回真实连续语流，而不是永远停留在孤立句。

优先真人语流；若当天没有合适的连续真人片段，可以把当天 3–5 个训练句组织成一个自然微对话并生成 GPT/TTS 音频作为辅助，但下一步仍应使用真人材料校准。

建议三遍：

1. 第 1 遍只听节奏和重音；
2. 第 2 遍看 transcript 跟读；
3. 第 3 遍关闭文字 shadowing。

---

# 仓库中的音频组织方式

为了让 Markdown 讲义打开即可播放或下载，课程音频统一按 Day 存放：

```text
assets/
  audio/
    day-01/
      sentence-01-slow.mp3
      sentence-01-natural.mp3
      sentence-02-slow.mp3
      sentence-02-natural.mp3
      shadowing-natural.mp3
      metadata.md
    day-02/
      ...
```

每日讲义中直接引用对应音频，例如：

```md
Sentence 1: I want to take a break.

- Slow reference: [播放/下载](../assets/audio/day-XX/sentence-01-slow.mp3)
- Natural reference: [播放/下载](../assets/audio/day-XX/sentence-01-natural.mp3)
```

`metadata.md` 记录：

- 文本；
- 音频来源（真人 / GPT TTS / 其他 Neural TTS）；
- 生成日期；
- 目标口音：General American；
- 当天重点：prominence / weak forms / linking / flap T 等；
- 是否经过真人语料二次校准。

---

# GPT / OpenAI TTS 生成要求

若使用 OpenAI Speech/TTS：

- 优先使用当前官方可用的 speech generation 模型；
- 指令应明确：General American、自然 conversational delivery、清晰但不过分朗读腔；
- 必须把当天目标写进生成指令，例如：
  - content words prominent;
  - function words reduced naturally;
  - preserve natural connected speech;
  - do not over-enunciate every word;
- slow 版本只降低整体速度，不应把弱读、节奏和 linking 全部拆散；
- natural 版本用于最终模仿。

示意生成指令：

> Read this in natural General American English for a pronunciation learner. Keep the sentence conversational rather than over-enunciated. Make the key content words prominent, reduce unstressed function words naturally, and preserve normal connected speech. For the slow version, speak slightly slower while keeping the same rhythm, reductions, and linking.

---

# 音频来源地图

## 1. B 站 Rachel / Rachel's English

优先满足中国大陆访问便利性。

推荐合集：

- Rachel 单词/句子重音与语调：
  https://www.bilibili.com/video/BV17t411w7jy/
- Rachel 美语连读系列：
  https://www.bilibili.com/video/BV13t411K71f/
- Rachel 真实影视语流分析：
  https://www.bilibili.com/video/BV1mM4y1L7hZ/

使用原则：优先给到具体 P 数，而不是只给合集首页。

## 2. VOA Learning English

优点：页面通常自带真人美式英语播放器，语速清楚，适合 Week 1–4 做听辨。

代表资料：

- Sentence Stress：A Simple Sentence with Seven Meanings
  https://learningenglish.voanews.com/a/a-simple-sentence-with-seven-meanings/4916769.html
- Rhythm：Talking in Rhythm
  https://learningenglish.voanews.com/a/a-23-2008-07-30-voa4-83138612/117460.html
- Reduced Forms：
  https://learningenglish.voanews.com/a/a-23-a-2003-01-14-2-1-83116097/118199.html
- Reduced "to"：Let's Learn English Lesson 51 Pronunciation Practice
  https://learningenglish.voanews.com/a/lets-learn-english-lesson-51-pronunciation-practice/3799541.html

## 3. YouGlish

https://youglish.com/

角色：给“陌生句”找多个真人发音，不作为唯一老师。

每日迁移训练：

1. 先自己预测；
2. 搜完整短语；
3. 选择 US；
4. 听至少 3 个真人；
5. 记录自己预测错得最明显的 1 个位置。

---

# 每日推送的音频最低标准

以后每一节 20 分钟课至少要出现：

- 1 个可播放真人主音频；
- 3–5 个当天定制训练句的可播放参考音频；
- 对定制句子优先提供 `slow + natural` 两档；
- 1 个 10–30 秒 shadowing 片段；
- 明确告诉学习者“先听几遍、什么时候看文本、什么时候录音”。

如果找不到当天规则对应的优质真人短句音频：

1. 保留一段相关真人主音频用于建立真实语感；
2. 用 GPT / OpenAI TTS 为当天定制短句生成参考音频；
3. 再用 YouGlish / 真人材料校准至少一个相同语音现象；
4. 不允许只给文字后让学习者自行猜自然读法。

# 核心目标

音频不是附加资料，而是课程主体。

**真人语流建立目标感 → GPT/TTS 提供当天精准可重复的句子音频 → 嘴巴模仿 → 规则解释 → 陌生句迁移 → 真人语料再次校准。**