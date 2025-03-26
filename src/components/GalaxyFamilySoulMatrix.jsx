import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

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
      lightColor: "#FADBD8"
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
      lightColor: "#D4E6F1"
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
      lightColor: "#E8DAEF"
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
      lightColor: "#D5F5E3"
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
    lightColor: "#FCF3CF"
  };

  // 状態管理
  const [scores, setScores] = useState({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedSoul, setSelectedSoul] = useState(null);

  // セクション（四魂＋直霊）
  const sections = [...galaxySouls, directSoul];

  // 初期化
  useEffect(() => {
    const initialScores = {};
    [...galaxySouls, directSoul].forEach(section => {
      initialScores[section.id || section.name] = Array(section.questions.length).fill(0);
    });
    setScores(initialScores);
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

  // 次のセクションに進む
  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      // 最後のセクションの後に結果を表示
      setShowResults(true);
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
    setShowResults(false);
  };

  // 各セクションの総合スコアを計算
  const calculateTotalScore = (sectionId) => {
    if (!scores[sectionId]) return 0;
    return scores[sectionId].reduce((sum, score) => sum + score, 0);
  };

  // 最大可能スコアを計算（各質問が5点満点の場合）
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
        value: percentages.find(p => p.element === "火").percentage,
        fullMark: 100,
      },
      {
        subject: "風（奇魂）",
        value: percentages.find(p => p.element === "風").percentage,
        fullMark: 100,
      },
      {
        subject: "水（幸魂）",
        value: percentages.find(p => p.element === "水").percentage,
        fullMark: 100,
      },
      {
        subject: "地（和魂）",
        value: percentages.find(p => p.element === "地").percentage,
        fullMark: 100,
      },
    ];
  };

  // ソウルマトリクス表のデータ
  const getSoulMatrixData = () => {
    const percentages = getAllPercentages();
    return {
      galaxySouls: percentages.filter(p => p.element !== "天"),
      directSoul: percentages.find(p => p.element === "天")
    };
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

  // イントロ画面コンポーネント
  const IntroScreen = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-amber-600">銀河ファミリー＆一霊四魂マトリクス</h1>
      <p className="text-lg mb-6">
        このチェックシートでは、銀河ファミリーの特性と古神道の一霊四魂の考え方を統合し、
        あなたの中に眠る本質的な特性を探ります。
      </p>
      
      <div className="mb-6 bg-amber-50 p-5 rounded-lg">
        <div className="text-left">
          <h2 className="text-xl font-semibold mb-3 text-amber-700">一霊四魂とは</h2>
          <p className="mb-4">
            古神道の世界観では、人間の魂は「一霊四魂」から成り立っているとされています。
            一霊は「直霊(なおひ)」であり、四魂を統合する力です。四魂は「荒魂」「奇魂」「幸魂」「和魂」から成ります。
          </p>
          <p className="mb-2">直霊が健全な状態では四魂はバランスを保ちますが、曲霊に転じると四魂は歪みます。</p>
        </div>
      </div>
      
      <div className="mb-6 bg-amber-50 p-5 rounded-lg text-left">
        <h2 className="text-xl font-semibold mb-3 text-amber-700">銀河ファミリー＆一霊四魂の対応</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <p><span className="font-bold">リラ / 荒魂（火）</span>：「勇」の力</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <p><span className="font-bold">シリウス / 奇魂（風）</span>：「智」の力</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <p><span className="font-bold">プレアデス / 幸魂（水）</span>：「愛」の力</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <p><span className="font-bold">ゼータレティクル / 和魂（地）</span>：「親」の力</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
          <p><span className="font-bold">直霊（天）</span>：四魂を統合する「省みる力」</p>
        </div>
      </div>
      
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">使い方</h2>
        <ol className="text-left list-decimal pl-5 space-y-2">
          <li>各セクションの質問に対して、自分にどのくらい当てはまるかを5段階で評価します</li>
          <li>全てのセクションについて回答すると、あなたの一霊四魂マトリクスが表示されます</li>
          <li>結果を参考に、自分のバランスと強みを理解し、成長の方向性を探りましょう</li>
        </ol>
      </div>
      
      <button 
        onClick={() => setShowIntro(false)} 
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
      >
        チェックを始める
      </button>
    </div>
  );

  // 質問フォームコンポーネント
  const QuestionForm = () => {
    const currentSection = sections[currentSectionIndex];
    const sectionScores = scores[currentSection.id || currentSection.name] || [];
    const isGalaxySoul = currentSectionIndex < galaxySouls.length;

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1" style={{ color: currentSection.color }}>
            {isGalaxySoul ? (
              <>
                {currentSection.name} / {currentSection.soulName}
                <span className="ml-2 px-3 py-1 text-sm rounded-full" style={{ backgroundColor: currentSection.lightColor, color: currentSection.color }}>
                  {currentSection.element}・{currentSection.function}
                </span>
              </>
            ) : (
              <>{currentSection.name}</>
            )}
          </h2>
          <p className="text-gray-600 mb-2">{currentSection.description}</p>
          {isGalaxySoul && (
            <p className="text-gray-600 mb-4">{currentSection.soulDescription}</p>
          )}
          
          {isGalaxySoul && (
            <div className="flex flex-wrap gap-2 mb-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${currentSection.lightColor}40` }}>
                <p className="text-sm font-bold mb-1" style={{ color: currentSection.color }}>直霊の状態：</p>
                <p className="text-sm">{currentSection.directSoul}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <p className="text-sm font-bold mb-1 text-gray-700">曲霊の状態：</p>
                <p className="text-sm">{currentSection.curvedSoul}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {currentSection.questions.map((question, qIndex) => (
            <div 
              key={qIndex} 
              className="p-4 rounded-lg" 
              style={{ backgroundColor: `${currentSection.lightColor}20` }}
            >
              <p className="font-medium mb-3">{question}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">全く当てはまらない</span>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map(value => (
                    <button
                      key={value}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                        sectionScores[qIndex] === value 
                          ? 'text-white shadow-md' 
                          : 'bg-white border hover:bg-gray-100'
                      }`}
                      style={{ 
                        backgroundColor: sectionScores[qIndex] === value ? currentSection.color : '',
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

        <div className="mt-8 flex justify-between">
          <button
            onClick={goToPreviousSection}
            className={`px-4 py-2 rounded-lg border border-gray-300 ${
              currentSectionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            disabled={currentSectionIndex === 0}
          >
            前へ
          </button>
          
          <div className="flex gap-1">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSection(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSectionIndex === index ? 'bg-amber-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={goToNextSection}
            className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600"
          >
            {currentSectionIndex === sections.length - 1 ? '結果を見る' : '次へ'}
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
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold" style={{ color: selectedSoul.color }}>
              {selectedSoul.name} {selectedSoul.soulName && `（${selectedSoul.soulName}）`}
            </h3>
            <button 
              onClick={() => setShowExplanation(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {selectedSoul.element && (
            <div className="mb-3">
              <span className="px-3 py-1 rounded-full text-sm" 
                style={{ backgroundColor: `${selectedSoul.color}20`, color: selectedSoul.color }}>
                {selectedSoul.element}の元素
              </span>
              {selectedSoul.function && (
                <span className="ml-2 px-3 py-1 rounded-full text-sm" 
                  style={{ backgroundColor: `${selectedSoul.color}20`, color: selectedSoul.color }}>
                  {selectedSoul.function}の力
                </span>
              )}
            </div>
          )}
          
          <div className="mb-4 mt-4">
            <div className="text-lg font-bold mb-1">あなたのスコア: {selectedSoul.percentage}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ width: `${selectedSoul.percentage}%`, backgroundColor: selectedSoul.color }}
              ></div>
            </div>
            <p className="mt-2">{getSoulState(selectedSoul.percentage)}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-700 mb-1">直霊の状態</h4>
              <p className="bg-green-50 p-3 rounded">{selectedSoul.directSoul}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-700 mb-1">曲霊の状態</h4>
              <p className="bg-red-50 p-3 rounded">{selectedSoul.curvedSoul}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-700 mb-1">あなたの現在の状態</h4>
              <p className="bg-amber-50 p-3 rounded">
                {getBalanceAnalysis(selectedSoul)}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-700 mb-1">バランスのポイント</h4>
              <p className="bg-gray-50 p-3 rounded">
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
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
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
    const { galaxySouls: soulPercentages, directSoul: directSoulPercentage } = getSoulMatrixData();
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
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-3 text-center text-amber-600">あなたの一霊四魂マトリクス</h2>
        
        {/* 直霊スコア */}
        <div className="bg-amber-50 p-5 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold">
              <span style={{ color: directSoulPercentage.color }}>{directSoulPercentage.name}</span>
              <span className="text-sm ml-2 text-gray-600">省みる力</span>
            </h3>
            <div className="flex items-center gap-2">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: directSoulPercentage.color }}
              >
                {directSoulPercentage.percentage}%
              </div>
              <button 
                onClick={() => showSoulDetail(directSoulPercentage)}
                className="text-amber-600 hover:text-amber-700 underline text-sm"
              >
                詳細
              </button>
            </div>
          </div>
          <p className="text-sm">
            直霊は四魂を統合し、バランスを取る省みる力です。あなたのスコアは{directSoulPercentage.percentage}%で、
            {isDirectSoul ? 
              '直霊の状態が強く、四魂のバランスを取る力が高いといえます。' : 
              isCurvedSoul ? 
                '曲霊の傾向があり、四魂のバランスが崩れやすい状態にあります。自己省察を深めることで改善できるでしょう。' : 
                '直霊と曲霊のバランス状態にあります。さらに自己省察を深めることで、四魂の統合が進むでしょう。'}
          </p>
        </div>
        
        {/* レーダーチャート */}
        <h3 className="text-lg font-semibold mb-3 text-center">一霊四魂バランス</h3>
        <div className="h-72 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#4a3933', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
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
        
        {/* 魂マトリクス */}
        <h3 className="text-lg font-semibold mb-4 text-center">銀河ファミリー＆一霊四魂マトリクス</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {soulPercentages.map(soul => (
            <div 
              key={soul.name}
              className="p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow" 
              style={{ backgroundColor: `${soul.color}15` }}
              onClick={() => showSoulDetail(soul)}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-bold" style={{ color: soul.color }}>
                    {soul.name} / {soul.soulName}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${soul.color}30`, color: soul.color }}>
                      {soul.element}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${soul.color}30`, color: soul.color }}>
                      {soul.function}
                    </span>
                  </div>
                </div>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: soul.color }}
                >
                  {soul.percentage}%
                </div>
              </div>
              <div className="w-full bg-white/50 rounded-full h-1.5 mt-2">
                <div 
                  className="h-1.5 rounded-full" 
                  style={{ width: `${soul.percentage}%`, backgroundColor: soul.color }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                {getSoulState(soul.percentage)}
              </p>
            </div>
          ))}
        </div>
        
        {/* 直霊・曲霊の分析 */}
        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3">直霊・曲霊の分析</h3>
          <p className="mb-3">
            {isDirectSoul ? 
              '直霊が強い状態では、四魂のバランスが取れ、自己省察により自分自身を正しく見つめることができます。あなたは高い直霊の状態にあり、内なる調和を実現しています。' : 
              isCurvedSoul ? 
                '曲霊の状態では、四魂のバランスが崩れ、偏った見方や行動が現れやすくなります。あなたは曲霊の傾向があり、より意識的な自己省察が必要な状態です。' : 
                '直霊と曲霊のバランス状態にあり、状況によって両方の傾向が現れます。意識的に直霊の状態を高めることで、より調和のとれた状態に近づくことができます。'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-green-50">
              <p className="font-bold text-green-800 mb-1">直霊が強い場合</p>
              <ul className="text-sm text-green-700 space-y-1 list-disc pl-4">
                <li>四魂がバランスよく発達する</li>
                <li>自己省察により成長が促進される</li>
                <li>内外の調和が実現しやすい</li>
                <li>健全な判断力が備わる</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-red-50">
              <p className="font-bold text-red-800 mb-1">曲霊に転じた場合</p>
              <ul className="text-sm text-red-700 space-y-1 list-disc pl-4">
                <li>四魂のバランスが崩れる</li>
                <li>偏った見方や行動が現れる</li>
                <li>内外の不調和が生じる</li>
                <li>自己認識が歪みやすい</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 総合分析 */}
        <div className="bg-white p-5 border border-amber-200 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-amber-700">総合分析</h3>
          <p className="mb-3">
            {getGalaxyFamilyAnalysis()}
          </p>
          
          <p className="mb-3">
            {isBalanced ? 
              '四魂のバランスが取れており、状況に応じて様々な特性を発揮できる柔軟性があります。' : 
              '四魂のバランスに偏りがあり、特定の特性に頼りがちです。より調和のとれた在り方を目指すとよいでしょう。'}
          </p>
          
          <p>
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
        <div className="bg-amber-50 p-5 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3">成長のヒント</h3>
          
          {isCurvedSoul && (
            <div className="mb-4 p-3 bg-white rounded-lg">
              <p className="font-bold text-amber-700 mb-1">直霊を高めるために</p>
              <ul className="space-y-1 list-disc pl-4 text-sm">
                <li>定期的な自己省察の時間を持つ</li>
                <li>多角的な視点で物事を見る習慣をつける</li>
                <li>自分の思考や感情のパターンに気づく</li>
                <li>バランスの取れた生活を心がける</li>
              </ul>
            </div>
          )}
          
          <div className="space-y-3">
            {soulPercentages.filter(soul => soul.percentage < 50).map(soul => (
              <div key={`hint-${soul.id}`} className="p-3 bg-white rounded-lg">
                <p className="font-bold mb-1" style={{color: soul.color}}>
                  {soul.name}（{soul.function}）を高めるために
                </p>
                <ul className="space-y-1 list-disc pl-4 text-sm">
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
              <p>すべての四魂が50%以上あり、良好なバランスです。さらに各特性を深め、統合していきましょう。</p>
            )}
          </div>
        </div>
        
        {/* 一霊四魂の統合へ向けて */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-5 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-amber-700">一霊四魂の統合へ向けて</h3>
          <p className="mb-3 italic">
            "全ては一つであり愛である" —グレイトヒーローズジャーニー
          </p>
          <p className="mb-3">
            古神道の教えでは、一霊四魂の全てが調和した状態を「全徳」と呼び、魂の完成とされています。
            四魂はそれぞれ独立しているようで、実は深く関連し合っており、一つの全体を形作っています。
          </p>
          <p>
            現代の私たちの生活においても、この古来の知恵は大きな意味を持ちます。
            自分自身の中にある多様な側面を認め、尊重し、統合することで、
            より豊かで調和のとれた人生を築くことができるでしょう。
          </p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentSectionIndex(0);
            }}
            className="px-6 py-3 rounded-full bg-amber-500 text-white hover:bg-amber-600 shadow-md"
          >
            もう一度チェックする
          </button>
        </div>
      </div>
    );
  };

  // メインレンダリング
  if (showIntro) {
    return <IntroScreen />;
  }

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {showResults ? <ResultsScreen /> : <QuestionForm />}
      {showExplanation && <SoulExplanationModal />}
    </div>
  );
};

export default GalaxyFamilySoulMatrix;