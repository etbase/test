const vowels=[
['i','eat','高前舌位，嘴角向兩側展開，下顎開口小。','保持穩定；不要咬緊牙齒。','front',0],
['ɪ','it','次高前舌位，比 /i/ 稍低、稍放鬆。','與 /i/ 的差別包含舌位與口型，不只是時間長短。','front',1],
['e','eight','中高前舌位，嘴唇略展開，接著滑向 /ɪ/。','KK 常標 /e/；美式實際多呈 /eɪ/ 的滑動。','back',4],
['ɛ','set','中低前舌位，下顎比 /ɪ/ 更打開。','雙唇自然展開，不收圓。','front',2],
['æ','at','低前舌位，下顎明顯張開。','比 /ɛ/ 更開口，不要用提高音量取代張口。','front',3],
['ə','ago','舌身居中、放鬆，下顎與嘴唇自然。','非重讀的 schwa；在 ago 中輕而短。','front',4],
['ʌ','cut','中央偏低舌位，嘴唇不收圓。','通常位於重讀音節；比 /ə/ 更清楚。','front',5],
['u','boot','高後舌位，雙唇收圓並稍向前。','開口小，但不用過度嘟嘴。','back',0],
['ʊ','book','次高後舌位，比 /u/ 更放鬆。','與 boot 的 /u/ 比較：口型稍開、圓唇略弱。','back',1],
['o','boat','中高後舌位，圓唇起始，接著更收圓。','KK 常標 /o/；美式實際多呈 /oʊ/ 的滑動。','back',5],
['ɔ','dog','中低後舌位，下顎較開，可略圓唇。','dog 在部分美式口音會與 /ɑ/ 合併。','back',2],
['ɑ','car','低後舌位，開口大且不圓唇。','美式 car 的母音後還接 /r/。','back',3],
['ɚ','water','非重讀的 r 色彩母音；舌身可隆起，嘴唇放鬆。','字尾輕快帶過，保留 r 色彩，不另外加音節。','rhotic_front_water.png',0],
['ɝ','bird','重讀的 r 色彩母音；舌身可隆起，舌尖不碰上顎。','清楚維持 r 色彩；與 /ɚ/ 的主要差別在重音。','rhotic_front_bird.png',0],
['aɪ','eye','低而開的起點，舌前部逐漸抬高，嘴巴收小。','兩個姿勢連續滑動，不要拆成兩個音節。','diph',0],
['aʊ','out','低而開的起點，舌後部抬高，嘴唇逐漸收圓。','終點接近 /ʊ/，不必誇張嘟成 /u/。','diph',1],
['ɔɪ','boy','較後、略圓唇的起點，滑向較前且不圓唇。','注意圓唇逐漸放鬆。','diph',2]
];
const consonants=[
['p','pay','雙唇閉合擋住氣流，再張開釋放；清音。','重讀音節開頭通常有明顯送氣。','lips',0],['b','but','雙唇閉合再釋放；濁音。','與 /p/ 接觸點相同，發聲時接上聲帶振動。','lips',1],['t','to','舌尖貼齒齦，封住氣流後放開；清音。','重讀音節開頭通常送氣。','tongue',2],['d','do','舌尖貼齒齦再放開；濁音。','接觸點與 /t/ 相同。','tongue',3],['k','key','舌後部貼軟顎再釋放；清音。','接觸點在口腔後方，正面看不見。','rear',2],['g','get','舌後部貼軟顎再釋放；濁音。','與 /k/ 比較聲帶振動。','rear',3],
['f','for','上排牙齒輕觸下唇，氣流摩擦通過；清音。','下唇只需輕觸，不要用力咬。','lips',4],['v','vote','上牙輕觸下唇，帶聲帶振動；濁音。','與 /f/ 比較喉部振動。','lips',5],['θ','thin','舌尖靠近上門牙，氣流從窄縫通過；清音。','不要咬緊舌頭，也不要發成 /s/。','tongue',0],['ð','that','舌位接近 /θ/，加上聲帶振動；濁音。','常見於 the、this、that。','tongue',1],['s','sit','舌尖靠近齒齦，中央窄槽產生摩擦；清音。','不要在尾端加一個「ㄜ」。','fric',0],['z','zip','舌位接近 /s/，加上聲帶振動；濁音。','延長 /s/ 與 /z/ 比較喉部振動。','fric',1],
['ʃ','sure','舌前部靠近齒齦後方，氣流摩擦；清音。','可略微圓唇，聲音連續如 sh。','fric',3],['ʒ','Asia','舌位接近 /ʃ/，加上聲帶振動；濁音。','不要誤讀成字母 z 的 /z/。','fric',4],['tʃ','chat','先封住齒齦後方氣流，再釋放成摩擦；清音。','一個連續的塞擦音，不是有聲子音。','rear',0],['dʒ','jet','先封住再釋放成摩擦；濁音。','與 /tʃ/ 對比聲帶振動。','rear',1],
['h','hot','聲門附近氣流摩擦；清音。','舌頭與嘴唇預先移向後面的母音，沒有固定口型。','rear',5],['m','meat','雙唇閉合，軟顎下降，氣流走鼻腔；濁鼻音。','閉唇時仍可持續發聲。','lips',2],['n','net','舌尖貼齒齦，氣流走鼻腔；濁鼻音。','與 /m/ 比較接觸位置。','tongue',4],['ŋ','song','舌後部貼軟顎，氣流走鼻腔；濁鼻音。','song 結尾不必另加明顯 /g/。','rear',4],['l','let','舌尖碰齒齦，氣流從舌頭兩側通過；濁音。','字尾 l 常伴隨舌後部抬高。','tongue',5],['r','bar','舌身隆起或舌尖略後翹，舌頭不碰上顎；濁音。','美式 bar 字尾仍保留 r 色彩。','fric',2],['w','we','舌後部抬高，雙唇收圓並滑向母音；濁音。','不要另加完整的 /u/ 音節。','lips',3],['j','yes','舌前部接近硬顎，迅速滑向母音；濁音。','這是 yes 的開頭，不是 jet 的 /dʒ/。','fric',5]
];
const practiceWords={
'i':['eat','see','green','team','sleep'],'ɪ':['it','sit','ship','milk','busy'],'e':['eight','day','rain','name','make'],'ɛ':['set','bed','head','ten','friend'],'æ':['at','cat','map','apple','black'],'ə':['ago','about','banana','sofa','support'],'ʌ':['cut','cup','sun','love','mother'],'u':['boot','food','blue','moon','school'],'ʊ':['book','good','foot','put','could'],'o':['boat','go','home','road','slow'],'ɔ':['dog','talk','saw','law','ball'],'ɑ':['car','hot','father','box','palm'],'ɚ':['water','teacher','better','color','mother'],'ɝ':['bird','word','turn','nurse','learn'],'aɪ':['eye','my','time','light','find'],'aʊ':['out','now','house','town','brown'],'ɔɪ':['boy','toy','coin','voice','join'],
'p':['pay','pen','paper','happy','cup'],'b':['but','bag','baby','rubber','cab'],'t':['to','top','tea','attack','hat'],'d':['do','day','dog','adore','bed'],'k':['key','cat','cookie','soccer','back'],'g':['get','go','game','again','dog'],'f':['for','fish','fine','coffee','laugh'],'v':['vote','van','very','seven','save'],'θ':['thin','think','thumb','author','bath'],'ð':['that','this','they','mother','breathe'],'s':['sit','see','sun','lesson','bus'],'z':['zip','zoo','zero','easy','buzz'],'ʃ':['sure','she','shop','ocean','wish'],'ʒ':['Asia','vision','measure','genre','beige'],'tʃ':['chat','chair','choose','teacher','watch'],'dʒ':['jet','job','jump','magic','edge'],'h':['hot','hat','home','ahead','behind'],'m':['meat','man','moon','summer','ham'],'n':['net','no','name','dinner','sun'],'ŋ':['song','sing','ring','singer','long'],'l':['let','light','love','yellow','fill'],'r':['bar','red','run','around','car'],'w':['we','win','water','away','wait'],'j':['yes','you','young','beyond','yesterday']
};
const positionWords={
'p':['pen','happy','cup'],'b':['bag','rubber','cab'],'t':['top','attack','hat'],'d':['day','adore','bed'],'k':['cat','soccer','back'],'g':['go','again','dog'],'f':['fish','coffee','laugh'],'v':['van','seven','save'],'θ':['think','author','bath'],'ð':['this','mother','breathe'],'s':['sun','lesson','bus'],'z':['zoo','easy','buzz'],'ʃ':['she','ocean','wish'],'ʒ':['genre','vision','beige'],'tʃ':['chair','teacher','watch'],'dʒ':['jet','magic','edge'],'h':['hat','ahead',null],'m':['man','summer','ham'],'n':['no','dinner','sun'],'ŋ':[null,'singer','song'],'l':['light','yellow','fill'],'r':['red','around','car'],'w':['win','away',null],'j':['yes','beyond',null]
};
// Browser TTS prompts approximate the standalone sound. They are not phonetic recordings.
const cueText={
'i':'ee','ɪ':'ih','e':'ay','ɛ':'eh','æ':'aah','ə':'uh','ʌ':'uh','u':'oo','ʊ':'uuh','o':'oh','ɔ':'aw','ɑ':'ah','ɚ':'er','ɝ':'err','aɪ':'eye','aʊ':'ow','ɔɪ':'oy',
'p':'puh','b':'buh','t':'tuh','d':'duh','k':'kuh','g':'guh','f':'fff','v':'vvv','θ':'thh','ð':'thuh','s':'sss','z':'zzz','ʃ':'shh','ʒ':'zhh','tʃ':'chh','dʒ':'juh','h':'hhh','m':'mmm','n':'nnn','ŋ':'ngh','l':'lll','r':'rrr','w':'wuh','j':'yuh'
};

const phonemeManifest={"i": "assets/phonemes/0069.mp3", "ɪ": "assets/phonemes/026a.mp3", "e": "assets/phonemes/0065.mp3", "ɛ": "assets/phonemes/025b.mp3", "æ": "assets/phonemes/00e6.mp3", "ə": "assets/phonemes/0259.mp3", "ʌ": "assets/phonemes/028c.mp3", "u": "assets/phonemes/0075.mp3", "ʊ": "assets/phonemes/028a.mp3", "o": "assets/phonemes/006f.mp3", "ɔ": "assets/phonemes/0254.mp3", "ɑ": "assets/phonemes/0251.mp3", "ɚ": "assets/phonemes/025a.mp3", "ɝ": "assets/phonemes/025d.mp3", "aɪ": "assets/phonemes/0061026a.mp3", "aʊ": "assets/phonemes/0061028a.mp3", "ɔɪ": "assets/phonemes/0254026a.mp3", "p": "assets/phonemes/0070.mp3", "b": "assets/phonemes/0062.mp3", "t": "assets/phonemes/0074.mp3", "d": "assets/phonemes/0064.mp3", "k": "assets/phonemes/006b.mp3", "g": "assets/phonemes/0067.mp3", "f": "assets/phonemes/0066.mp3", "v": "assets/phonemes/0076.mp3", "θ": "assets/phonemes/03b8.mp3", "ð": "assets/phonemes/00f0.mp3", "s": "assets/phonemes/0073.mp3", "z": "assets/phonemes/007a.mp3", "ʃ": "assets/phonemes/0283.mp3", "ʒ": "assets/phonemes/0292.mp3", "tʃ": "assets/phonemes/00740283.mp3", "dʒ": "assets/phonemes/00640292.mp3", "h": "assets/phonemes/0068.mp3", "m": "assets/phonemes/006d.mp3", "n": "assets/phonemes/006e.mp3", "ŋ": "assets/phonemes/014b.mp3", "l": "assets/phonemes/006c.mp3", "r": "assets/phonemes/0072.mp3", "w": "assets/phonemes/0077.mp3", "j": "assets/phonemes/006a.mp3"};
