import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// 光の柱アニメーションコンポーネント
const LightPillar = () => (
  <div className="absolute inset-0 flex justify-center pointer-events-none z-0 overflow-hidden">
    <div className="w-32 h-full bg-gradient-to-t from-transparent via-amber-400/20 to-transparent animate-pulse"></div>
    <div className="w-8 h-full bg-gradient-to-t from-transparent via-amber-300/40 to-transparent animate-pulse delay-150"></div>
  </div>
);

const GalaxyFamilySoulMatrix = () => {
  // 銀河ファミリー＆一霊四魂データ
  const galaxySouls = [
    {
      id: "rira",
      name: "リラ",
      soulName: "荒魂（あらみたま）",
      function: "勇",
      description: "リラはヒューマノイドの発祥地であり、拡大と発展を重視する文明です。支配的な面もありますが、宇宙文明の発展に大きく貢献しました。",
      soulDescription: "荒魂の機能は「勇」であり、行動力があり、外向的な人は荒魂が強いといえます。前に進む力です。耐えながら進む力です。",
      directSoul: "直霊：行動力と意志の強さで新しい道を切り開き、困難に立ち向かう力。",
      curvedSoul: "曲霊（争魂）：権力をふるうために争いに明け暮れ、自分の欲するものに我を通す。",
      traits: ["拡大志向", "開拓精神", "行動力", "情熱", "意志力"],
      element: "火",
      questions: [
        "新しいことに挑戦するのが好きだ",
        "行動力があり、すぐに動き出せる",
        "困難があっても諦めずに前に進む",
        "情熱的で、エネルギッシュな方だ",
        "自分の意志を強く持ち、主張できる"
      ],
      color: "#E74C3C",
      lightColor: "#FADBD8",
      icon: "🔥",
      gradient: "from-red-500 to-orange-400"
    },
    {
      id: "sirius",
      name: "シリウス",
      soulName: "奇魂（くしみたま）",
      function: "智",
      description: "シリウスの長老たちは、統合を目指す高度な存在たちです。彼らは地球と深い関わりを持ち、地球人の育成に大きく貢献してきました。",
      soulDescription: "奇魂の機能は「智」であり、観察力・分析力・理解力を備えた知性の力です。真理を求めて探究する人は、奇魂が強いといえます。",
      directSoul: "直霊：観察力と分析力で真理を見出し、全体の調和を導く知性の力。",
      curvedSoul: "曲霊（狂魂）：狂信的な思想と妄想に溺れ、人の考えを批判して優位に立とうとする。",
      traits: ["知恵", "洞察力", "分析力", "統合力", "真理探究"],
      element: "風",
      questions: [
        "物事を論理的に分析するのが得意だ",
        "知識を深めること、学ぶことが好きだ",
        "全体像を俯瞰して見ることができる",
        "真理や本質を追求したいと思う",
        "客観的な視点で物事を捉えられる"
      ],
      color: "#3498DB",
      lightColor: "#D4E6F1",
      icon: "💨",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      id: "pleiades",
      name: "プレアデス",
      soulName: "幸魂（さきみたま）",
      function: "愛",
      description: "プレアデス人は感受性が高く、愛と調和を重視します。彼らは地球人との遺伝子的なつながりが深く、深い愛で見守っています。",
      soulDescription: "幸魂の機能は「愛」であり、思いやりや気持ちを大切にし、人を愛し育てる力です。相互理解を計る人は、幸魂が強い人といえます。",
      directSoul: "直霊：深い愛と共感で他者を理解し、育み、癒す豊かな感受性。",
      curvedSoul: "曲霊（逆魂）：嫉妬や執着に狂い、愛情を独占して嫉妬を生む。",
      traits: ["感受性", "愛", "調和", "癒し", "芸術性"],
      element: "水",
      questions: [
        "他者の感情に敏感で共感できる",
        "人を癒したり、サポートすることが好きだ",
        "美しいものや芸術に心惹かれる",
        "感情豊かで、直感が鋭い方だ",
        "人との調和や平和を大切にしている"
      ],
      color: "#9B59B6",
      lightColor: "#E8DAEF",
      icon: "💧",
      gradient: "from-purple-500 to-indigo-400"
    },
    {
      id: "zeta",
      name: "ゼータレティクル",
      soulName: "和魂（にぎみたま）",
      function: "親",
      description: "ゼータレティクル人は高度な科学技術を持ちますが、感情を抑制し集合意識となりました。現在は地球人を通じて多様性を取り戻そうとしています。",
      soulDescription: "和魂の機能は「親」であり、平和や調和を望む心があります。思いやり、親しみ交わる力です。心が広い人は、和魂が強いといえます。",
      directSoul: "直霊：広い心で全体の調和と秩序を保ち、多様性を受け入れる包容力。",
      curvedSoul: "曲霊（悪魂）：仲間の利益のために悪事をなし、狭い視野で仲間と敵を区別する。",
      traits: ["調和", "秩序", "共生", "効率性", "全体意識"],
      element: "地",
      questions: [
        "集団の中での調和や協力を大切にする",
        "物事を効率的に進めるのが好きだ",
        "広い視野で多様な価値観を受け入れられる",
        "組織やコミュニティの一員として貢献したいと思う",
        "秩序やルールを尊重する傾向がある"
      ],
      color: "#2ECC71",
      lightColor: "#D5F5E3",
      icon: "🌱",
      gradient: "from-green-500 to-emerald-400"
    }
  ];
  
  // 直霊（なおひ）データ
  const directSoul = {
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

  // 状態管理
  const [currentView, setCurrentView] = useState('intro'); // intro, form, results
  const [scores, setScores] = useState({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedSoul, setSelectedSoul] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);
  const [animation, setAnimation] = useState(false);

  // セクション（四魂＋直霊）
  const sections = [...galaxySouls, directSoul];

  // 初期化
  useEffect(() => {
    const initialScores = {};
    [...galaxySouls, directSoul].forEach(section => {
      initialScores[section.id || section.name] = Array(section.questions.length).fill(0);
    });
    setScores(initialScores);

    // アニメーション初期化
    setTimeout(() => {
      setAnimation(true);
    }, 500);
  }, []);

  // 評価の変更を処理する関数
  const handleRatingChange = (sectionId, questionIndex, value) => {
    setScores(prevScores => ({
      ...prevScores,
      [sectionId]: prevScores[sectionId].map((score, i) => 
        i === questionIndex ? value : score
      )
    }));
  };

  // セクションの完了を確認
  const checkSectionCompletion = (sectionId) => {
    if (!scores[sectionId]) return false;
    return !scores[sectionId].includes(0);
  };

  // 次のセクションに進む
  const goToNextSection = () => {
    // 現在のセクションが完了していれば、完了リストに追加
    const currentSectionId = sections[currentSectionIndex].id || sections[currentSectionIndex].name;
    if (checkSectionCompletion(currentSectionId) && !completedSections.includes(currentSectionId)) {
      setCompletedSections(prev => [...prev, currentSectionId]);
    }

    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      // 最後のセクションの後に結果を表示
      setCurrentView('results');
    }
  };

  // 前のセクションに戻る
  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  // 特定のセクションに直接ジャンプ
  const goToSection = (index) => {
    setCurrentSectionIndex(index);
  };

  // 各セクションの総合スコアを計算
  const calculateTotalScore = (sectionId) => {
    if (!scores[sectionId]) return 0;
    return scores[sectionId].reduce((sum, score) => sum + score, 0);
  };

  // 最大可能スコアを計算
  const getMaxPossibleScore = (sectionId) => {
    const section = [...galaxySouls, directSoul].find(s => (s.id || s.name) === sectionId);
    return section ? section.questions.length * 5 : 0;
  };

  // 割合（%）を計算
  const calculatePercentage = (sectionId) => {
    const totalScore = calculateTotalScore(sectionId);
    const maxScore = getMaxPossibleScore(sectionId);
    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  };

  // すべてのセクションのパーセンテージを取得
  const getAllPercentages = () => {
    return [
      ...galaxySouls.map(soul => ({
        name: soul.name,
        soulName: soul.soulName,
        function: soul.function,
        fullLabel: `${soul.name}（${soul.soulName}）`,
        percentage: calculatePercentage(soul.id),
        element: soul.element,
        color: soul.color,
        icon: soul.icon,
        gradient: soul.gradient,
        directSoul: soul.directSoul,
        curvedSoul: soul.curvedSoul,
        traits: soul.traits,
        id: soul.id
      })),
      {
        name: directSoul.name,
        soulName: "",
        function: "",
        fullLabel: directSoul.name,
        percentage: calculatePercentage(directSoul.name),
        element: "天",
        color: directSoul.color,
        icon: directSoul.icon,
        gradient: directSoul.gradient,
        directSoul: "四魂のバランスを取り、全体を統合する省みる力。",
        curvedSoul: "自己省察ができず、四魂のバランスが崩れ、歪みが生じる。"
      }
    ];
  };

  // レーダーチャート用データ整形
  const getRadarData = () => {
    const percentages = getAllPercentages();
    return [
      {
        subject: "火（荒魂）",
        fullName: "リラ・荒魂",
        value: percentages.find(p => p.element === "火").percentage,
        fullMark: 100,
      },
      {
        subject: "風（奇魂）",
        fullName: "シリウス・奇魂",
        value: percentages.find(p => p.element === "風").percentage,
        fullMark: 100,
      },
      {
        subject: "水（幸魂）",
        fullName: "プレアデス・幸魂",
        value: percentages.find(p => p.element === "水").percentage,
        fullMark: 100,
      },
      {
        subject: "地（和魂）",
        fullName: "ゼータレティクル・和魂",
        value: percentages.find(p => p.element === "地").percentage,
        fullMark: 100,
      },
    ];
  };

  // 魂の詳細表示
  const showSoulDetail = (soul) => {
    setSelectedSoul(soul);
    setShowExplanation(true);
  };

  // 直霊と曲霊の状態判定
  const getSoulState = (percentage) => {
    if (percentage >= 80) return "非常に強い直霊状態";
    if (percentage >= 60) return "良好な直霊状態";
    if (percentage >= 40) return "バランス状態";
    if (percentage >= 20) return "曲霊傾向";
    return "強い曲霊状態";
  };

  // 直霊・曲霊バランスの分析
  const getBalanceAnalysis = (soul) => {
    if (soul.percentage >= 80) {
      return `${soul.directSoul} 非常に発達しています。`;
    } else if (soul.percentage >= 60) {
      return `${soul.directSoul} バランスが良好です。`;
    } else if (soul.percentage >= 40) {
      return `直霊と曲霊のバランス状態です。さらなる成長の余地があります。`;
    } else if (soul.percentage >= 20) {
      return `${soul.curvedSoul} 意識的に直霊の状態を高める取り組みが必要です。`;
    } else {
      return `${soul.curvedSoul} 強い曲霊状態にあります。自己省察を深め、意識的な変容が必要です。`;
    }
  };

  // 完了した質問の数を計算
  const calculateCompletedQuestions = () => {
    let completed = 0;
    let total = 0;
    
    Object.keys(scores).forEach(key => {
      total += scores[key].length;
      completed += scores[key].filter(score => score > 0).length;
    });
    
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  // ----- コンポーネント -----

  // ヘッダーコンポーネント
  const Header = () => (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500 to-amber-400 text-white">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✨</div>
        <h1 className="text-lg font-bold">グレイトヒーローズジャーニー</h1>
      </div>
      <div className="text-sm opacity-80">光の柱を立てる - 3/30 ワークショップ</div>
    </header>
  );

  // フッターコンポーネント
  const Footer = () => (
    <footer className="p-3 text-center text-sm text-gray-500 bg-white/80 border-t">
      <p>© 2025 Great Hero's Journey | <span className="text-orange-500">Only Love Is REAL</span></p>
    </footer>
  );

  // スターフィールドの背景アニメーション
  const StarField = () => (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-orange-50/60 to-amber-100/90"></div>
      <div className="stars-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-yellow-300/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite ${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );

  // イントロ画面コンポーネント
  const IntroScreen = () => (
    <div className={`relative bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8 max-w-4xl mx-auto 
      transform transition-all duration-1000 ${animation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-24 h-24">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-amber-300 
          shadow-lg flex items-center justify-center text-4xl animate-pulse">✨</div>
      </div>
      
      <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mt-6">
        銀河ファミリー＆一霊四魂マトリクス
      </h1>
      
      <div className="text-lg mb-8 text-center max-w-2xl mx-auto">
        <p>このチェックシートでは、銀河ファミリーの特性と古神道の一霊四魂の考え方を統合し、<br/>
        あなたの中に眠る本質的な特性を探ります。</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-md transform hover:scale-[1.02] transition-transform">
          <h2 className="text-xl font-semibold mb-3 text-orange-700 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">✨</span>
            一霊四魂とは
          </h2>
          <p className="mb-4 text-gray-700">
            古神道の世界観では、人間の魂は「一霊四魂」から成り立っているとされています。
            一霊は「直霊(なおひ)」であり、四魂を統合する力です。四魂は「荒魂」「奇魂」「幸魂」「和魂」から成ります。
          </p>
          <p className="text-gray-700">直霊が健全な状態では四魂はバランスを保ちますが、曲霊に転じると四魂は歪みます。</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-md transform hover:scale-[1.02] transition-transform">
          <h2 className="text-xl font-semibold mb-3 text-orange-700 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">🌌</span>
            銀河ファミリー＆一霊四魂の対応
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {galaxySouls.map(soul => (
              <div key={soul.id} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm bg-gradient-to-r ${soul.gradient}`}>
                  {soul.icon}
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">{soul.name} / {soul.soulName}</span>
                  <span className="text-xs block text-gray-500">「{soul.function}」の力</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm bg-gradient-to-r from-amber-500 to-yellow-400">
              {directSoul.icon}
            </div>
            <p className="text-gray-700">
              <span className="font-medium">{directSoul.name}</span>
              <span className="text-xs block text-gray-500">四魂を統合する「省みる力」</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={() => setCurrentView('form')}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold rounded-full 
            shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>チェックを始める</span>
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );

  // 進捗バーコンポーネント
  const ProgressBar = () => {
    const { completed, total, percentage } = calculateCompletedQuestions();
    
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1 text-sm">
          <span className="text-gray-600">進捗状況</span>
          <span className="text-orange-600 font-medium">{completed}/{total} 質問 ({percentage}%)</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // 質問フォームコンポーネント
  const QuestionForm = () => {
    const currentSection = sections[currentSectionIndex];
    const sectionScores = scores[currentSection.id || currentSection.name] || [];
    const isGalaxySoul = currentSectionIndex < galaxySouls.length;
    const isSectionCompleted = checkSectionCompletion(currentSection.id || currentSection.name);

    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
        <ProgressBar />
        
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl text-white bg-gradient-to-r ${currentSection.gradient}`}>
              {currentSection.icon}
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
              {isGalaxySoul ? (
                <>
                  {currentSection.name} / {currentSection.soulName}
                </>
              ) : (
                <>{currentSection.name}</>
              )}
            </h2>
            {isGalaxySoul && (
              <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                {currentSection.element}・{currentSection.function}
              </span>
            )}
          </div>
          
          <div className="text-gray-600 mb-4 pl-14">
            <p className="mb-2">{currentSection.description}</p>
            {isGalaxySoul && (
              <p className="mb-4">{currentSection.soulDescription}</p>
            )}
          </div>
          
          {isGalaxySoul && (
            <div className="flex flex-wrap gap-2 mb-4 pl-14">
              {currentSection.traits && currentSection.traits.map(trait => (
                <span 
                  key={trait} 
                  className="px-3 py-1 rounded-full text-sm" 
                  style={{ backgroundColor: `${currentSection.lightColor}`, color: currentSection.color }}
                >
                  {trait}
                </span>
              ))}
            </div>
          )}
          
          {isGalaxySoul && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pl-14">
              <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentSection.lightColor}40` }}>
                <p className="text-sm font-bold mb-2" style={{ color: currentSection.color }}>直霊の状態：</p>
                <p className="text-sm">{currentSection.directSoul}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-100">
                <p className="text-sm font-bold mb-2 text-gray-700">曲霊の状態：</p>
                <p className="text-sm">{currentSection.curvedSoul}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 mb-8">
          {currentSection.questions.map((question, qIndex) => (
            <div 
              key={qIndex} 
              className="p-5 rounded-lg transition-all duration-300"
              style={{ 
                backgroundColor: sectionScores[qIndex] > 0 
                  ? `${currentSection.lightColor}60` 
                  : 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}
            >
              <p className="font-medium mb-4">{qIndex + 1}. {question}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">全く当てはまらない</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(value => (
                    <button
                      key={value}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-medium 
                        transition-all hover:shadow-md ${
                        sectionScores[qIndex] === value 
                          ? 'text-white shadow-md transform scale-110' 
                          : 'bg-white border hover:bg-gray-50'
                      }`}
                      style={{ 
                        backgroundColor: sectionScores[qIndex] === value 
                          ? currentSection.color 
                          : '',
                        borderColor: currentSection.color
                      }}
                      onClick={() => handleRatingChange(currentSection.id || currentSection.name, qIndex, value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-gray-500">非常に当てはまる</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t pt-6">
          <button
            onClick={goToPreviousSection}
            className={`px-5 py-2.5 rounded-lg border flex items-center gap-2 ${
              currentSectionIndex === 0 
                ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'border-orange-300 text-orange-600 hover:bg-orange-50'
            }`}
            disabled={currentSectionIndex === 0}
          >
            <span className="text-lg">←</span>
            <span>前へ</span>
          </button>
          
          <div className="flex gap-1">
            {sections.map((_, index) => {
              const sectionId = sections[index].id || sections[index].name;
              const isCompleted = completedSections.includes(sectionId);
              const isCurrent = currentSectionIndex === index;
              
              return (
                <button
                  key={index}
                  onClick={() => goToSection(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    isCurrent 
                      ? 'bg-orange-500 scale-125' 
                      : isCompleted 
                        ? 'bg-amber-300' 
                        : 'bg-gray-300'
                  }`}
                  title={sections[index].name}
                />
              );
            })}
          </div>
          
          <button
            onClick={goToNextSection}
            className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
              isSectionCompleted
                ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md hover:shadow-lg'
                : 'bg-orange-100 text-orange-400'
            }`}
          >
            <span>{currentSectionIndex === sections.length - 1 ? '結果を見る' : '次へ'}</span>
            <span className="text-lg">{isSectionCompleted ? '→' : '•••'}</span>
          </button>
        </div>
      </div>
    );
  };

  // 魂詳細説明モーダル
  const SoulExplanationModal = () => {
    if (!selectedSoul) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-30 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-modalFadeIn">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl bg-gradient-to-r ${selectedSoul.gradient}`}>
                {selectedSoul.icon}
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
                {selectedSoul.name} {selectedSoul.soulName && `（${selectedSoul.soulName}）`}
              </h3>
            </div>
            <button 
              onClick={() => setShowExplanation(false)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
          
          {selectedSoul.element && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-sm" 
                style={{ backgroundColor: `${selectedSoul.color}20`, color: selectedSoul.color }}>
                {selectedSoul.element}の元素
              </span>
              {selectedSoul.function && (
                <span className="px-3 py-1 rounded-full text-sm" 
                  style={{ backgroundColor: `${selectedSoul.color}20`, color: selectedSoul.color }}>
                  {selectedSoul.function}の力
                </span>
              )}
            </div>
          )}
          
          <div className="mb-6 mt-4 bg-gray-50 p-4 rounded-lg">
            <div className="text-lg font-bold mb-2 flex items-center justify-between">
              <span>あなたのスコア:</span>
              <span className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl bg-gradient-to-r ${selectedSoul.gradient}`}>
                {selectedSoul.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="h-2.5 rounded-full" 
                style={{ width: `${selectedSoul.percentage}%`, backgroundColor: selectedSoul.color }}
              ></div>
            </div>
            <p className="font-medium text-center" style={{ color: selectedSoul.color }}>{getSoulState(selectedSoul.percentage)}</p>
          </div>
          
          <div className="space-y-5">
            <div className="p-4 rounded-lg" style={{ backgroundColor: `${selectedSoul.color}15` }}>
              <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">✓</span>
                直霊の状態
              </h4>
              <p className="pl-8">{selectedSoul.directSoul}</p>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm">!</span>
                曲霊の状態
              </h4>
              <p className="pl-8">{selectedSoul.curvedSoul}</p>
            </div>
            
            <div className="p-4 rounded-lg bg-amber-50">
              <h4 className="font-bold text-orange-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm">i</span>
                あなたの現在の状態
              </h4>
              <p className="pl-8">
                {getBalanceAnalysis(selectedSoul)}
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50">
              <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">↑</span>
                バランスのポイント
              </h4>
              <p className="pl-8">
                {selectedSoul.element === "火" && "情熱と行動力を活かしながらも、他者への配慮と長期的な視点を持つこと。"}
                {selectedSoul.element === "風" && "知性と分析力を活かしながらも、感情や直感の価値も認め、全体との調和を見失わないこと。"}
                {selectedSoul.element === "水" && "愛と感受性を大切にしながらも、依存や執着から自由になり、健全な境界線を持つこと。"}
                {selectedSoul.element === "地" && "調和と秩序を重んじながらも、柔軟性と多様性の尊重を失わず、開かれた心を持つこと。"}
                {selectedSoul.element === "天" && "四魂のバランスを意識し、日々の自己省察を通して自分自身と世界を正しく見つめること。"}
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowExplanation(false)}
              className="px-5 py-2 bg-gradient-to-r from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 rounded-lg shadow-sm transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 結果表示コンポーネント
  const ResultsScreen = () => {
    const allPercentages = getAllPercentages();
    const { galaxySouls: soulPercentages, directSoul: directSoulPercentage } = {
      galaxySouls: allPercentages.filter(p => p.element !== "天"),
      directSoul: allPercentages.find(p => p.element === "天")
    };
    const radarData = getRadarData();
    
    // 最も高いスコアの魂
    const strongestSoul = soulPercentages.reduce((prev, current) => 
      prev.percentage > current.percentage ? prev : current
    );
    
    // 最も低いスコアの魂
    const weakestSoul = soulPercentages.reduce((prev, current) => 
      prev.percentage < current.percentage ? prev : current
    );
    
    // 四魂のバランス分析
    const soulAverage = soulPercentages.reduce((sum, soul) => sum + soul.percentage, 0) / soulPercentages.length;
    const maxDifference = Math.max(...soulPercentages.map(soul => Math.abs(soul.percentage - soulAverage)));
    const isBalanced = maxDifference <= 15; // 差が15%以下ならバランスが取れていると判断
    
    // 直霊・曲霊の分析
    const isDirectSoul = directSoulPercentage.percentage >= 60;
    const isCurvedSoul = directSoulPercentage.percentage < 40;
    
    // 銀河ファミリー総合分析
    const getGalaxyFamilyAnalysis = () => {
      const topTwoSouls = [...soulPercentages].sort((a, b) => b.percentage - a.percentage).slice(0, 2);
      
      if (topTwoSouls[0].percentage - topTwoSouls[1].percentage > 20) {
        // 一つの種族が突出している場合
        return `あなたは${topTwoSouls[0].name}（${topTwoSouls[0].soulName}）の特性が非常に強く出ています。「${topTwoSouls[0].function}」の力があなたの核となっています。`;
      } else {
        // 複数の種族がバランスしている場合
        return `あなたは${topTwoSouls[0].name}（${topTwoSouls[0].soulName}）と${topTwoSouls[1].name}（${topTwoSouls[1].soulName}）の特性がバランスよく現れています。「${topTwoSouls[0].function}」と「${topTwoSouls[1].function}」の力を組み合わせることであなたの強みがさらに発揮されるでしょう。`;
      }
    };
    
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
            あなたの一霊四魂マトリクス
          </h2>
          <p className="text-gray-600">以下の結果からあなたの魂のバランスと可能性を読み解きましょう</p>
        </div>
        
        {/* 直霊スコア */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl bg-gradient-to-r ${directSoulPercentage.gradient}`}>
                {directSoulPercentage.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {directSoulPercentage.name}
                </h3>
                <p className="text-sm text-gray-600">省みる力 - 四魂を統合する力</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold bg-gradient-to-r ${directSoulPercentage.gradient} shadow-md`}
              >
                {directSoulPercentage.percentage}%
              </div>
              <button 
                onClick={() => showSoulDetail(directSoulPercentage)}
                className="px-3 py-1.5 bg-white rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors text-sm shadow-sm"
              >
                詳細
              </button>
            </div>
          </div>
          <p className="text-gray-700">
            直霊は四魂を統合し、バランスを取る省みる力です。あなたのスコアは
            <span className="font-bold">{directSoulPercentage.percentage}%</span>で、
            {isDirectSoul ? 
              '直霊の状態が強く、四魂のバランスを取る力が高いといえます。' : 
              isCurvedSoul ? 
                '曲霊の傾向があり、四魂のバランスが崩れやすい状態にあります。自己省察を深めることで改善できるでしょう。' : 
                '直霊と曲霊のバランス状態にあります。さらに自己省察を深めることで、四魂の統合が進むでしょう。'}
          </p>
        </div>
        
        {/* レーダーチャート */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-bold mb-4 text-center text-gray-800">一霊四魂バランス</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e0e0e0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4a3933', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip 
                    formatter={(value, name, props) => [`${value}%`, props.payload.fullName]}
                    contentStyle={{ borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '8px 12px' }}
                  />
                  <Radar 
                    name="あなたの四魂バランス" 
                    dataKey="value" 
                    stroke="#ff7e5f" 
                    fill="#ff7e5f" 
                    fillOpacity={0.5} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-bold mb-4 text-center text-gray-800">銀河ファミリー分布</h3>
            <div className="space-y-4">
              {soulPercentages.map(soul => (
                <div 
                  key={soul.id}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => showSoulDetail(soul)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg text-white bg-gradient-to-r ${soul.gradient}`}>
                    {soul.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">{soul.name} / {soul.soulName}</p>
                      <p className="font-bold">{soul.percentage}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ width: `${soul.percentage}%`, backgroundColor: soul.color }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 総合分析 */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 mb-8 shadow-sm border border-orange-100">
          <h3 className="text-lg font-bold mb-3 text-orange-700 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 text-sm">✓</span>
            総合分析
          </h3>
          <p className="mb-3 pl-8 text-gray-700">
            {getGalaxyFamilyAnalysis()}
          </p>
          
          <p className="mb-3 pl-8 text-gray-700">
            {isBalanced ? 
              '四魂のバランスが取れており、状況に応じて様々な特性を発揮できる柔軟性があります。' : 
              '四魂のバランスに偏りがあり、特定の特性に頼りがちです。より調和のとれた在り方を目指すとよいでしょう。'}
          </p>
          
          <p className="pl-8 text-gray-700">
            特に注目すべき点として、
            <span className="font-bold" style={{color: strongestSoul.color}}>
              {strongestSoul.name}（{strongestSoul.function}）
            </span>
            の力が強く、
            <span className="font-bold" style={{color: weakestSoul.color}}>
              {weakestSoul.name}（{weakestSoul.function}）
            </span>
            の力を高める余地があります。
          </p>
        </div>
        
        {/* 成長のヒント */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">↑</span>
              成長のヒント
            </h3>
            
            {isCurvedSoul && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-700 mb-2">直霊を高めるために</p>
                <ul className="space-y-1 list-disc pl-5 text-sm text-gray-600">
                  <li>定期的な自己省察の時間を持つ</li>
                  <li>多角的な視点で物事を見る習慣をつける</li>
                  <li>自分の思考や感情のパターンに気づく</li>
                  <li>バランスの取れた生活を心がける</li>
                </ul>
              </div>
            )}
            
            <div className="space-y-3">
              {soulPercentages.filter(soul => soul.percentage < 50).map(soul => (
                <div key={`hint-${soul.id}`} className="p-3 rounded-lg" style={{ backgroundColor: `${soul.color}10` }}>
                  <p className="font-bold mb-2" style={{color: soul.color}}>
                    {soul.name}（{soul.function}）を高めるために
                  </p>
                  <ul className="space-y-1 list-disc pl-5 text-sm text-gray-600">
                    {soul.element === "火" && (
                      <>
                        <li>新しいことに挑戦する機会を増やす</li>
                        <li>自分の情熱が向かうものに時間を投資する</li>
                        <li>小さな一歩でも行動を起こす習慣をつける</li>
                        <li>自分の意志を明確にし、表現する</li>
                      </>
                    )}
                    {soul.element === "風" && (
                      <>
                        <li>知的好奇心を満たす読書や学びの時間を持つ</li>
                        <li>客観的な視点で物事を分析する習慣をつける</li>
                        <li>多様な視点や考え方に触れる</li>
                        <li>論理的思考を鍛える問題解決に取り組む</li>
                      </>
                    )}
                    {soul.element === "水" && (
                      <>
                        <li>自分や他者の感情に意識的に向き合う</li>
                        <li>芸術や美に触れる時間を大切にする</li>
                        <li>共感力を高めるために他者の話に耳を傾ける</li>
                        <li>自分の感受性と直感を信頼する</li>
                      </>
                    )}
                    {soul.element === "地" && (
                      <>
                        <li>共同体やグループ活動に参加する</li>
                        <li>調和と秩序を意識した環境づくりを行う</li>
                        <li>多様性を尊重し、違いを受け入れる</li>
                        <li>全体のバランスを考えた判断を心がける</li>
                      </>
                    )}
                  </ul>
                </div>
              ))}
              
              {soulPercentages.filter(soul => soul.percentage < 50).length === 0 && (
                <p className="text-gray-700">すべての四魂が50%以上あり、良好なバランスです。さらに各特性を深め、統合していきましょう。</p>
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-amber-50 rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-bold mb-4 text-orange-700 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 text-sm">✨</span>
              一霊四魂の統合へ向けて
            </h3>
            <div className="text-center mb-4 p-3 bg-white/50 rounded-lg">
              <p className="text-lg italic text-orange-600 font-medium">
                "全ては一つであり愛である"
              </p>
              <p className="text-sm text-gray-600">—グレイトヒーローズジャーニー</p>
            </div>
            <p className="mb-3 text-gray-700">
              古神道の教えでは、一霊四魂の全てが調和した状態を「全徳」と呼び、魂の完成とされています。
              四魂はそれぞれ独立しているようで、実は深く関連し合っており、一つの全体を形作っています。
            </p>
            <p className="text-gray-700">
              現代の私たちの生活においても、この古来の知恵は大きな意味を持ちます。
              自分自身の中にある多様な側面を認め、尊重し、統合することで、
              より豊かで調和のとれた人生を築くことができるでしょう。
            </p>
            <div className="mt-4 p-3 bg-white/50 rounded-lg">
              <p className="text-sm text-gray-600">
                ワークショップでは、この結果をもとに、あなたの光の柱を立てるための
                実践的なワークを行います。3月30日(日)のワークショップでお会いしましょう。
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setCurrentView('intro');
              setCurrentSectionIndex(0);
              setCompletedSections([]);
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <span>最初からやり直す</span>
            <span className="text-lg">↺</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <StarField />
      <LightPillar />
      
      <Header />
      
      <main className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center">
        {currentView === 'intro' && <IntroScreen />}
        {currentView === 'form' && <QuestionForm />}
        {currentView === 'results' && <ResultsScreen />}
      </main>
      
      <Footer />
      
      {showExplanation && <SoulExplanationModal />}
      
      <style jsx global>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modalFadeIn {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GalaxyFamilySoulMatrix;