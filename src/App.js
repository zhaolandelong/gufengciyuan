import React, { useState } from "react";
import { Card, Input, Button, Divider, Switch } from "antd";
import axios from "axios";

const LanguageTranslator = () => {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("zh");
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text) {
      return;
    }
    try {
      setLoading(true);
      setResults();
      const response = await axios.get(
        `https://api.zldlwq.top/gufeng/trans?query=${text}&lang=${lang}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error translating text:", error);
    } finally {
      setLoading(false);
    }
  };
  // [{"viet":"đôla","phrase_viet":"dt.","trans":"美元","phrase":"","syno_anto":"cv: dollar","eg1":"Đơn vị tiền tệ của nước Mỹ.\\n美元。\\nMột đôla.\\n一美元。","eg2":"","eg3":"","eg4":"","eg5":"","eg6":"","eg7":"","eg8":"","eg9":"","eg10":""}]
  return (
    <Card className="w-full max-w-xl mx-auto" title="谷风词源">
      <div className="space-y-4">
        <div style={{marginBottom: 16}}>
          <Input
            id="text-input"
            type="text"
            placeholder="请输入要翻译的文本"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={handleTranslate} className="w-full">
          翻译
        </Button>
        <Switch
          style={{ margin: "0 8px" }}
          value={lang === "zh"}
          onChange={(checked) => setLang(checked ? "zh" : "viet")}
        />
        {lang === "zh" ? "中->越" : "越->中"}
        <Divider />
        {loading && <p>翻译中...</p>}
        {Array.isArray(results) && results.length === 0 && (
          <p>暂未找到翻译结果</p>
        )}
        {Array.isArray(results) &&
          results.length > 0 &&
          results.map((r, index) => (
            <div key={index}>
              <p>翻译：{lang === "zh" ? r.viet: r.trans}</p>
              <p>
                词性（越南语）：{r.phrase_viet || "无"}
              </p>
              <p>同义词/近义词/反义词：{r.syno_anto || "无"}</p>
              <p>例句:</p>
              <ul>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((i) =>
                  r[`eg${i}`] ? (
                    <li>
                      {r[`eg${i}`].split("\\n").map((s, j) => (
                        <p key={`eg${i}-${j}`}>{s}</p>
                      ))}
                    </li>
                  ) : null
                )}
              </ul>
              <Divider />
            </div>
          ))}
      </div>
    </Card>
  );
};

export default LanguageTranslator;
