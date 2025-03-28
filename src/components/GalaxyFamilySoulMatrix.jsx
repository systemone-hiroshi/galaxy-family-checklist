import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

const EnhancedSoulMatrix = () => {
  // State management
  const [currentView, setCurrentView] = useState('intro'); // intro, quiz, results
  const [quizStep, setQuizStep] = useState(1); // 質問セクションの進行ステップ
  const [quizAnswers, setQuizAnswers] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [animation, setAnimation] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // アニメーション効果
  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 500);
  }, []);
  
  // 銀河ファミリー＆一霊四魂データ
  const galaxySouls = [
    {
      id: "rira",
      name: "リラ",
      soulName: "荒魂（あらみたま）",
      function: "勇",
      description: "リラはヒューマノイドの発祥地であり、拡大と発展を重視する文明です。支配的な面もありますが、宇宙文明の発展に大きく貢献しました。",
      soulDescription: "荒魂の機能は「勇」であり、行動力があり、外向的な人は荒魂が強いといえます。前に進む力、耐えながら進む力です。",
      directSoul: "行動力と意志の強さで新しい道を切り開き、困難に立ち向かう力。情熱を持って物事を前進させる力です。",
      curvedSoul: "権力をふるうために争いに明け暮れ、自分の欲するものに我を通す。感情的になり制御を失いやすくなります。",
      traits: ["拡大志向", "開拓精神", "行動力", "情熱", "意志力"],
      element: "火",
      questions: [
        "新しいことに挑戦するのが好きだ",
        "行動力があり、すぐに動き出せる",
        "困難があっても諦めずに前に進む",
        "情熱的で、エネルギッシュな方だ",
        "自分の意志を強く持ち、主張できる"
      ],
      // 直霊状態の詳細診断質問
      directQuestions: [
        "目標に向かって情熱的に行動できる",
        "困難に立ち向かう勇気がある",
        "新しい道を切り開く先駆者的な役割を果たせる",
        "決断力があり、迅速に行動に移せる",
        "自分の信念に基づいて行動できる"
      ],
      // 曲霊状態の詳細診断質問
      curvedQuestions: [
        "感情的になりすぎて暴走することがある",
        "自分の意見を押し通そうとしがちだ",
        "短期的な成果を追い求めすぎる",
        "他者の意見を聞かずに突っ走ることがある",
        "権力や支配に執着することがある"
      ],
      color: "#E74C3C",
      lightColor: "#FADBD8",
      icon: "🔥",
      gradient: "from-red-500 to-orange-400",
      strength: [
        "困難に立ち向かう強さと勇気",
        "行動力と決断力がある",
        "情熱的にプロジェクトを推進できる",
        "目標達成に向けて粘り強く進める",
        "新しい道を切り開く先駆者的資質"
      ],
      weakness: [
        "感情に任せて行動してしまうことがある",
        "支配的になりがち",
        "他者の意見を聞かずに突き進むことも",
        "短期的な成果を求めすぎる",
        "権力闘争に巻き込まれやすい"
      ],
      development: [
        "長期的な視点を持つための瞑想",
        "他者の意見に耳を傾ける練習",
        "感情のコントロール法を身につける",
        "協力することの価値を認識する",
        "自分の情熱を建設的に活かす方法を見つける"
      ]
    },
    {
      id: "sirius",
      name: "シリウス",
      soulName: "奇魂（くしみたま）",
      function: "智",
      description: "シリウスの長老たちは、統合を目指す高度な存在たちです。彼らは地球と深い関わりを持ち、地球人の育成に大きく貢献してきました。",
      soulDescription: "奇魂の機能は「智」であり、観察力・分析力・理解力を備えた知性の力です。真理を求めて探究する人は、奇魂が強いといえます。",
      directSoul: "観察力と分析力で真理を見出し、全体の調和を導く知性の力。智慧をもって物事の本質を理解する力です。",
      curvedSoul: "狂信的な思想と妄想に溺れ、人の考えを批判して優位に立とうとする。知識を武器に他者を見下すことも。",
      traits: ["知恵", "洞察力", "分析力", "統合力", "真理探究"],
      element: "風",
      questions: [
        "物事を論理的に分析するのが得意だ",
        "知識を深めること、学ぶことが好きだ",
        "全体像を俯瞰して見ることができる",
        "真理や本質を追求したいと思う",
        "客観的な視点で物事を捉えられる"
      ],
      directQuestions: [
        "物事の本質を見抜く洞察力がある",
        "論理的思考と分析力に優れている",
        "知識を体系的に整理できる",
        "客観的な視点で全体を把握できる",
        "真理の探究に情熱を持っている"
      ],
      curvedQuestions: [
        "理論に固執しすぎることがある",
        "感情を軽視して論理だけで判断しがち",
        "批判的になりすぎることがある",
        "自分の知識で他者を優越感を持つことがある",
        "理想と現実のギャップに悩むことがある"
      ],
      color: "#3498DB",
      lightColor: "#D4E6F1",
      icon: "💨",
      gradient: "from-blue-500 to-cyan-400",
      strength: [
        "優れた分析力と洞察力",
        "物事の本質を見抜く力",
        "知識を体系化する能力",
        "客観的な視点を持てる",
        "全体の調和を見通せる"
      ],
      weakness: [
        "頭でっかちになりがち",
        "感情を軽視してしまうことも",
        "理論に固執しすぎる",
        "批判的になりすぎる",
        "妄想や思い込みに陥りやすい"
      ],
      development: [
        "感情と身体の声に耳を傾ける",
        "理論だけでなく実践も重視する",
        "多様な視点を受け入れる柔軟性を養う",
        "直感と分析のバランスを取る",
        "知識をシェアし、他者と共有する"
      ]
    },
    {
      id: "pleiades",
      name: "プレアデス",
      soulName: "幸魂（さきみたま）",
      function: "愛",
      description: "プレアデス人は感受性が高く、愛と調和を重視します。彼らは地球人との遺伝子的なつながりが深く、深い愛で見守っています。",
      soulDescription: "幸魂の機能は「愛」であり、思いやりや気持ちを大切にし、人を愛し育てる力です。相互理解を計る人は、幸魂が強い人といえます。",
      directSoul: "深い愛と共感で他者を理解し、育み、癒す豊かな感受性。愛情で他者と繋がる力です。",
      curvedSoul: "嫉妬や執着に狂い、愛情を独占して嫉妬を生む。依存的になりすぎて自他の境界を失うことも。",
      traits: ["感受性", "愛", "調和", "癒し", "芸術性"],
      element: "水",
      questions: [
        "他者の感情に敏感で共感できる",
        "人を癒したり、サポートすることが好きだ",
        "美しいものや芸術に心惹かれる",
        "感情豊かで、直感が鋭い方だ",
        "人との調和や平和を大切にしている"
      ],
      directQuestions: [
        "自分の感情を大切にしながら他者も受け入れられる",
        "人を癒し、サポートする力がある",
        "豊かな感受性と共感力を持っている",
        "直感的に物事の本質が分かる",
        "芸術や美しさに心を動かされる"
      ],
      curvedQuestions: [
        "感情に流されやすい傾向がある",
        "他者に依存しがちになる",
        "自分と他者の境界線が曖昧になることがある",
        "他者の感情を抱え込みすぎてしまう",
        "理想と現実のギャップに傷つきやすい"
      ],
      color: "#9B59B6",
      lightColor: "#E8DAEF",
      icon: "💧",
      gradient: "from-purple-500 to-indigo-400",
      strength: [
        "豊かな感受性と共感力",
        "癒しと安らぎを与える力",
        "直感的な理解力",
        "芸術的感性と創造性",
        "深い人間関係を築く力"
      ],
      weakness: [
        "感情に振り回されやすい",
        "他者に依存しがち",
        "境界線があいまいになる",
        "現実から逃避することも",
        "過度な自己犠牲になりやすい"
      ],
      development: [
        "健全な境界線を設ける練習",
        "自分自身を大切にする自己愛",
        "感情と理性のバランスを取る",
        "愛を広く分かち合う方法を見つける",
        "芸術や創造性で感情を表現する"
      ]
    },
    {
      id: "zeta",
      name: "ゼータレティクル",
      soulName: "和魂（にぎみたま）",
      function: "親",
      description: "ゼータレティクル人は高度な科学技術を持ちますが、感情を抑制し集合意識となりました。現在は地球人を通じて多様性を取り戻そうとしています。",
      soulDescription: "和魂の機能は「親」であり、平和や調和を望む心があります。思いやり、親しみ交わる力です。心が広い人は、和魂が強いといえます。",
      directSoul: "広い心で全体の調和と秩序を保ち、多様性を受け入れる包容力。共同体の絆を深める力です。",
      curvedSoul: "仲間の利益のために悪事をなし、狭い視野で仲間と敵を区別する。集団の序列や規則に固執しすぎることも。",
      traits: ["調和", "秩序", "共生", "効率性", "全体意識"],
      element: "地",
      questions: [
        "集団の中での調和や協力を大切にする",
        "物事を効率的に進めるのが好きだ",
        "広い視野で多様な価値観を受け入れられる",
        "組織やコミュニティの一員として貢献したいと思う",
        "秩序やルールを尊重する傾向がある"
      ],
      directQuestions: [
        "全体の調和とバランスを考えて行動できる",
        "多様な価値観を受け入れる包容力がある",
        "組織やコミュニティの中で調和を生み出せる",
        "物事を効率的に進める能力がある",
        "皆が安心できる安定した基盤を作れる"
      ],
      curvedQuestions: [
        "集団の意見に流されすぎることがある",
        "変化や新しいことに抵抗を感じることがある",
        "ルールや形式に縛られすぎることがある",
        "自分のグループを優先しすぎる傾向がある",
        "個性を抑え込んでしまうことがある"
      ],
      color: "#2ECC71",
      lightColor: "#D5F5E3",
      icon: "🌱",
      gradient: "from-green-500 to-emerald-400",
      strength: [
        "共同体の調和を保つ力",
        "多様性を受け入れる包容力",
        "組織力と効率性",
        "安定した基盤を作る力",
        "全体の福祉を考える力"
      ],
      weakness: [
        "集団思考に陥りやすい",
        "変化を恐れがち",
        "個性を抑圧しすぎることも",
        "形式や伝統に縛られる",
        "内集団バイアスが強くなりがち"
      ],
      development: [
        "個性と全体性のバランスを取る",
        "柔軟性を養い変化を受け入れる",
        "多様な視点や意見を積極的に求める",
        "形式だけでなく本質を見る目を養う",
        "排他的にならない広い視野を持つ"
      ]
    }
  ];
  
  // 直霊（なおひ）データ
  const directSoul = {
    id: "naochi",
    name: "直霊（なおひ）",
    description: "一霊四魂を統合する省みる力。自分自身を客観的に見つめ、バランスを取る力です。直霊が曲霊に転じると四魂は歪みます。",
    questions: [
      "自分の行動や思考を振り返ることができる",
      "自分の強みと弱みを客観的に認識している",
      "バランスの取れた判断ができると思う",
      "自分を成長させるために意識的に行動している",
      "様々な視点から物事を考えることができる"
    ],
    color: "#F39C12",
    lightColor: "#FCF3CF",
    icon: "✨",
    gradient: "from-amber-500 to-yellow-300"
  };
  
  // 質問の総数を計算
  const calculateTotalQuestions = () => {
    let count = 0;
    galaxySouls.forEach(soul => {
      count += soul.questions.length;
    });
    count += directSoul.questions.length;
    return count;
  };
  
  // 回答済みの質問数を計算
  const calculateAnsweredQuestions = () => {
    let answered = 0;
    
    // 各魂タイプの質問について確認
    galaxySouls.forEach(soul => {
      if (quizAnswers[soul.id]) {
        Object.values(quizAnswers[soul.id]).forEach(value => {
          if (value > 0) answered++;
        });
      }
    });
    
    // 直霊の質問について確認
    if (quizAnswers[directSoul.id]) {
      Object.values(quizAnswers[directSoul.id]).forEach(value => {
        if (value > 0) answered++;
      });
    }
    
    return answered;
  };
  
  // 進行状況の更新
  useEffect(() => {
    if (currentView === 'quiz') {
      const answered = calculateAnsweredQuestions();
      const total = calculateTotalQuestions();
      setProgress(Math.round((answered / total) * 100));
    }
  }, [quizAnswers, currentView]);
  
  // 回答を記録する関数
  const handleAnswer = (soulId, questionIndex, value) => {
    setQuizAnswers(prev => ({
      ...prev,
      [soulId]: {
        ...(prev[soulId] || {}),
        [questionIndex]: value
      }
    }));
  };
  
  // 魂タイプごとのスコアを計算
  const calculateSoulScore = (soulId) => {
    if (!quizAnswers[soulId]) return 0;
    
    let totalScore = 0;
    let answeredQuestions = 0;
    
    Object.entries(quizAnswers[soulId]).forEach(([_, value]) => {
      totalScore += value;
      answeredQuestions++;
    });
    
    // 回答がない場合は0を返す
    if (answeredQuestions === 0) return 0;
    
    // 平均スコアを100点満点で返す
    return Math.round((totalScore / (answeredQuestions * 5)) * 100);
  };
  
  // 最も高いスコアの魂タイプを取得
  const getHighestSoulType = () => {
    let highestScore = 0;
    let highestType = null;
    
    galaxySouls.forEach(soul => {
      const score = calculateSoulScore(soul.id);
      if (score > highestScore) {
        highestScore = score;
        highestType = soul;
      }
    });
    
    return highestType;
  };
  
  // 次のステップに進む
  const goToNextStep = () => {
    if (quizStep < 5) {
      setQuizStep(quizStep + 1);
    } else {
      // 最終ステップ完了、結果表示
      const highestType = getHighestSoulType();
      setSelectedType(highestType);
      setCurrentView('results');
    }
  };
  
  // 前のステップに戻る
  const goToPrevStep = () => {
    if (quizStep > 1) {
      setQuizStep(quizStep - 1);
    }
  };
  
  // レーダーチャートデータの生成
  const generateRadarData = (soulType) => {
    if (!soulType) return [];
    
    switch(soulType.id) {
      case 'rira':
        return [
          { subject: "行動力", value: calculateSoulScore(soulType.id), fullMark: 100 },
          { subject: "情熱", value: calculateSoulScore(soulType.id) - 5, fullMark: 100 },
          { subject: "意志力", value: calculateSoulScore(soulType.id) - 10, fullMark: 100 },
          { subject: "開拓精神", value: calculateSoulScore(soulType.id) + 5, fullMark: 100 },
          { subject: "決断力", value: calculateSoulScore(soulType.id) - 8, fullMark: 100 },
        ];
      case 'sirius':
        return [
          { subject: "分析力", value: calculateSoulScore(soulType.id) + 5, fullMark: 100 },
          { subject: "洞察力", value: calculateSoulScore(soulType.id), fullMark: 100 },
          { subject: "知識探究", value: calculateSoulScore(soulType.id) - 5, fullMark: 100 },
          { subject: "客観性", value: calculateSoulScore(soulType.id) - 10, fullMark: 100 },
          { subject: "論理性", value: calculateSoulScore(soulType.id) + 3, fullMark: 100 },
        ];
      case 'pleiades':
        return [
          { subject: "感受性", value: calculateSoulScore(soulType.id) + 5, fullMark: 100 },
          { subject: "共感力", value: calculateSoulScore(soulType.id), fullMark: 100 },
          { subject: "癒し", value: calculateSoulScore(soulType.id) - 5, fullMark: 100 },
          { subject: "芸術性", value: calculateSoulScore(soulType.id) - 8, fullMark: 100 },
          { subject: "調和", value: calculateSoulScore(soulType.id) + 3, fullMark: 100 },
        ];
      case 'zeta':
        return [
          { subject: "調和", value: calculateSoulScore(soulType.id) + 5, fullMark: 100 },
          { subject: "包容力", value: calculateSoulScore(soulType.id), fullMark: 100 },
          { subject: "効率性", value: calculateSoulScore(soulType.id) - 5, fullMark: 100 },
          { subject: "安定性", value: calculateSoulScore(soulType.id) - 8, fullMark: 100 },
          { subject: "組織力", value: calculateSoulScore(soulType.id) + 3, fullMark: 100 },
        ];
      default:
        return [];
    }
  };
  
  // 進捗状況インジケーター
  const ProgressIndicator = () => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">進行状況</span>
        <span className="text-sm font-medium text-orange-600">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
  
  // Step インジケーター
  const StepIndicator = ({ current, total }) => (
    <div className="flex justify-center items-center space-x-2 my-4">
      {Array.from({ length: total }).map((_, index) => (
        <div 
          key={index}
          className={`w-3 h-3 rounded-full transition-all ${
            index + 1 === current 
              ? 'bg-orange-500 scale-125' 
              : index + 1 < current 
                ? 'bg-amber-300' 
                : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
  
  // 質問アイテム
  const QuestionItem = ({ question, soulId, questionIndex, onAnswer }) => {
    const currentAnswer = quizAnswers[soulId]?.[questionIndex] || 0;
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <p className="mb-3">{question}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">全く当てはまらない</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all 
                  ${currentAnswer === value 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                onClick={() => onAnswer(soulId, questionIndex, value)}
              >
                {value}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-500">非常に当てはまる</span>
        </div>
      </div>
    );
  };
  
  // ホームページ
  const IntroView = () => (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">銀河ファミリー＆一霊四魂マトリクス</h1>
      <p className="mb-6">
        あなたの中に眠る銀河ファミリーの特性と一霊四魂のバランスを診断します。<br/>
        自分自身の本質を知り、直霊の状態を高めるヒントを得ましょう。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {galaxySouls.map(soul => (
          <div 
            key={soul.id}
            className="bg-white p-4 rounded-lg shadow-md border-l-4"
            style={{ borderLeftColor: soul.color }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                style={{ background: `linear-gradient(to right, ${soul.color}, ${soul.color}dd)` }}
              >
                {soul.icon}
              </div>
              <h2 className="font-bold text-lg" style={{ color: soul.color }}>
                {soul.name} / {soul.soulName}
              </h2>
            </div>
            <p className="text-sm mb-2">「{soul.function}」の力</p>
            <p className="text-sm text-gray-600">{soul.soulDescription}</p>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setCurrentView('quiz')}
        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        診断を始める
      </button>
    </div>
  );
  
  // 質問フォーム（基本質問）
  const BasicQuestionsForm = () => {
    const currentSoulType = galaxySouls[quizStep - 1];
    
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: currentSoulType.color }}>
          {currentSoulType.name} / {currentSoulType.soulName}
        </h2>
        <p className="text-center mb-4 text-gray-600">
          「{currentSoulType.function}」の力についての質問です
        </p>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <p className="mb-2 text-sm text-gray-600">{currentSoulType.soulDescription}</p>
          <div className="flex flex-wrap gap-1">
            {currentSoulType.traits.map(trait => (
              <span 
                key={trait} 
                className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: currentSoulType.lightColor, color: currentSoulType.color }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
        
        {currentSoulType.questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            soulId={currentSoulType.id}
            questionIndex={index}
            onAnswer={handleAnswer}
          />
        ))}
      </div>
    );
  };
  
  // 直霊質問フォーム
  const DirectSoulQuestionsForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: directSoul.color }}>
          {directSoul.name}
        </h2>
        <p className="text-center mb-4 text-gray-600">
          四魂を統合する「省みる力」についての質問です
        </p>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <p className="mb-2 text-sm text-gray-600">{directSoul.description}</p>
        </div>
        
        {directSoul.questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            soulId={directSoul.id}
            questionIndex={index}
            onAnswer={handleAnswer}
          />
        ))}
      </div>
    );
  };
  
  // 質問ビュー（メイン）
  const QuizView = () => (
    <div>
      <ProgressIndicator />
      <StepIndicator current={quizStep} total={5} />
      
      {quizStep <= 4 ? (
        <BasicQuestionsForm />
      ) : (
        <DirectSoulQuestionsForm />
      )}
      
      <div className="flex justify-between mt-6">
        <button
          onClick={goToPrevStep}
          disabled={quizStep === 1}
          className={`px-4 py-2 rounded-lg ${
            quizStep === 1 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          前へ
        </button>
        
        <button
          onClick={goToNextStep}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white rounded-lg shadow hover:shadow-md"
        >
          {quizStep === 5 ? '結果を見る' : '次へ'}
        </button>
      </div>
    </div>
  );
  
  // 結果表示
  const ResultsView = () => {
    if (!selectedType) return <div>結果を計算中...</div>;
    
    const directSoulScore = calculateSoulScore(directSoul.id);
    const soulTypeScore = calculateSoulScore(selectedType.id);
    
    // 直霊状態を判定
    const getSoulState = (score) => {
      if (score >= 80) return "非常に強い直霊状態";
      if (score >= 60) return "良好な直霊状態";
      if (score >= 40) return "バランス状態";
      if (score >= 20) return "曲霊傾向";
      return "強い曲霊状態";
    };
    
    // 直霊・曲霊のバランス分析
    const getBalanceAnalysis = (score) => {
      if (score >= 80) {
        return "直霊が非常に強い状態です。本来の特性が最大限に発揮されています。";
      } else if (score >= 60) {
        return "直霊が良好な状態です。自分の特性を活かせています。";
      } else if (score >= 40) {
        return "直霊と曲霊のバランス状態です。状況によって両方の側面が現れます。";
      } else if (score >= 20) {
        return "曲霊の傾向があります。本来の特性が歪んで現れることがあります。";
      } else {
        return "強い曲霊状態です。特性の否定的な面が強く現れています。";
      }
    };
    
    const radarData = generateRadarData(selectedType);
    
    return (
      <div id="result-container">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">あなたの銀河ファミリー＆一霊四魂分析結果</h2>
        
        <div className="bg-white p-5 rounded-lg shadow-lg mb-6">
          <div className="text-center mb-4">
            <div 
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-3xl mb-2"
              style={{ background: `linear-gradient(to right, ${selectedType.color}, ${selectedType.color}dd)` }}
            >
              {selectedType.icon}
            </div>
            <h3 className="text-xl font-bold" style={{ color: selectedType.color }}>
              あなたの魂タイプ: {selectedType.name} / {selectedType.soulName}
            </h3>
            <p className="text-gray-600">「{selectedType.function}」の力が最も強く現れています</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border" style={{ borderColor: selectedType.lightColor }}>
              <h4 className="font-bold mb-2" style={{ color: selectedType.color }}>あなたの特性</h4>
              <p className="text-sm mb-3">{selectedType.soulDescription}</p>
              <div className="flex flex-wrap gap-1">
                {selectedType.traits.map(trait => (
                  <span 
                    key={trait} 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: selectedType.lightColor, color: selectedType.color }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{selectedType.name}スコア:</span>
                <div 
                  className="text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: selectedType.color }}
                >
                  {soulTypeScore}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">直霊スコア:</span>
                <div 
                  className="text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: directSoul.color }}
                >
                  {directSoulScore}
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-1">状態:</p>
                <p className="bg-amber-50 p-2 rounded">{getSoulState(soulTypeScore)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-bold mb-3 text-gray-700">直霊・曲霊バランス分析</h4>
            <p className="mb-2">{getBalanceAnalysis(soulTypeScore)}</p>
            
            <div className="relative h-4 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full mb-2 overflow-hidden">
              <div 
                className="absolute h-full w-2 bg-white shadow-md transform translate-x-[-50%]"
                style={{ left: `${soulTypeScore}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-600">
              <span>曲霊</span>
              <span>バランス</span>
              <span>直霊</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2 text-green-700">直霊の状態 - あなたの長所</h4>
              <ul className="list-disc pl-5">
                {selectedType.strength.map((str, idx) => (
                  <li key={idx} className="mb-1">{str}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2 text-red-700">曲霊の状態 - 気をつけたい点</h4>
              <ul className="list-disc pl-5">
                {selectedType.weakness.map((weak, idx) => (
                  <li key={idx} className="mb-1">{weak}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mb-6 h-64">
            <h4 className="font-bold mb-2 text-center text-gray-700">特性バランス</h4>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4a3933', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar 
                  name={`${selectedType.name}の特性`} 
                  dataKey="value" 
                  stroke={selectedType.color} 
                  fill={selectedType.color} 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-amber-700">あなたの特性を活かすために</h4>
            <ul className="list-disc pl-5">
              {selectedType.development.map((dev, idx) => (
                <li key={idx} className="mb-1">{dev}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              disabled={true} // 現在は無効化（将来実装用）
            >
              <span>🖼️</span>
              <span>画像として保存</span>
            </button>
            
            <button
              className="px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2"
              disabled={true} // 現在は無効化（将来実装用）
            >
              <span>🔗</span>
              <span>結果をシェア</span>
            </button>
          </div>
          
          <button
            onClick={() => {
              setCurrentView('intro');
              setQuizStep(1);
              setQuizAnswers({});
              setSelectedType(null);
            }}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-amber-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-400 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">グレイトヒーローズジャーニー</h1>
          <p className="text-sm">光の柱を立てる - 銀河ファミリー診断</p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center">
        <div 
          className={`bg-white rounded-xl shadow-xl p-6 mx-auto w-full max-w-4xl 
            transform transition-all duration-700 ${animation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          {currentView === 'intro' && <IntroView />}
          {currentView === 'quiz' && <QuizView />}
          {currentView === 'results' && <ResultsView />}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-3 text-center text-sm">
        <p>© 2025 Great Hero's Journey | <span className="text-orange-300">Only Love Is REAL</span></p>
      </footer>
    </div>
  );
};

export default EnhancedSoulMatrix;