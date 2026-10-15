const map = {
  ae: {
    symbol: 'æ',
    tag: 'Front vowel',
    title: '/æ/ 的發音教室',
    desc: '嘴巴張得比較開，舌頭放低且偏前，聲音短促清楚，接近 cat、apple 裡的母音。',
    points: ['嘴型：張開', '舌位：前低', '聲帶：震動'],
    examples: ['cat', 'apple', 'bag'],
    mouthWidth: 90,
    mouthHeight: 44,
    tongueTop: 63
  },
  i: {
    symbol: 'i',
    tag: 'Front vowel',
    title: '/i/ 的發音教室',
    desc: '嘴角稍微展開，口腔較窄，舌位高且靠前，像 see、eat 的長母音。',
    points: ['嘴型：微展唇', '舌位：前高', '聲帶：震動'],
    examples: ['see', 'eat', 'bean'],
    mouthWidth: 80,
    mouthHeight: 20,
    tongueTop: 59
  },
  u: {
    symbol: 'u',
    tag: 'Back vowel',
    title: '/u/ 的發音教室',
    desc: '嘴唇明顯圓起，舌位高且靠後，接近 blue、food 的長母音。',
    points: ['嘴型：圓唇', '舌位：後高', '聲帶：震動'],
    examples: ['blue', 'food', 'moon'],
    mouthWidth: 56,
    mouthHeight: 34,
    tongueTop: 66
  },
  p: {
    symbol: 'p',
    tag: 'Bilabial stop',
    title: '/p/ 的發音教室',
    desc: '雙唇先閉合，再快速打開並送氣，是無聲雙唇塞音。',
    points: ['嘴型：雙唇閉合', '氣流：明顯送氣', '聲帶：不震動'],
    examples: ['pen', 'pie', 'cap'],
    mouthWidth: 78,
    mouthHeight: 12,
    tongueTop: 68
  },
  sh: {
    symbol: 'ʃ',
    tag: 'Postalveolar fricative',
    title: '/ʃ/ 的發音教室',
    desc: '嘴唇微微突出，舌頭靠近上顎後方，讓氣流摩擦發出像 ship 的 sh 音。',
    points: ['嘴型：微圓', '舌位：前中偏後', '聲帶：不震動'],
    examples: ['ship', 'she', 'wash'],
    mouthWidth: 64,
    mouthHeight: 26,
    tongueTop: 61
  }
};

const bigSymbol = document.getElementById('bigSymbol');
const lessonCopy = document.getElementById('lessonCopy');
const mouthShape = document.getElementById('mouthShape');
const tongue = document.getElementById('tongue');

function render(id) {
  const item = map[id] || map.ae;
  bigSymbol.textContent = item.symbol;
  mouthShape.style.width = item.mouthWidth + 'px';
  mouthShape.style.height = item.mouthHeight + 'px';
  tongue.style.top = item.tongueTop + '%';
  lessonCopy.innerHTML = `
    <span class="detail-tag">${item.tag}</span>
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
    <ul>${item.points.map(p => `<li>${p}</li>`).join('')}</ul>
    <div class="examples">${item.examples.map(e => `<button>${e}</button>`).join('')}</div>
  `;
}

document.querySelectorAll('.symbol').forEach(btn => {
  btn.addEventListener('click', () => render(btn.dataset.symbol));
});

render('ae');
