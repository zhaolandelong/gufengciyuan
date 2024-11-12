import React, { useState } from "react";
import { Card, Input, Button, Divider } from "antd";
import axios from "axios";

const LanguageTranslator = () => {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("zh");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text) {
      return;
    }
    try {
      setLoading(true);
      setResults([]);
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
    <Card className="w-full max-w-xl mx-auto" title="Language Translator">
      <div className="space-y-4">
        <div>
          <label htmlFor="text-input" className="block font-medium mb-2">
            Enter text to translate:
          </label>
          <Input
            id="text-input"
            type="text"
            placeholder="Enter text here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={handleTranslate} className="w-full">
          Translate
        </Button>
        <Divider />
        {loading && <p>Loading...</p>}
        {results.length > 0 &&
          results.map((r, index) => (
            <div key={index}>
              <p>翻译：{lang === "zh" ? r["﻿viet"] : r.trans}</p>
              <p>
                词性（越南语）：{r.phrase}（{r.phrase_viet}）
              </p>
              <p>同义词/近义词/反义词：{r.syno_anto}</p>
              <p>例句:</p>
              {r.eg1 && <p>{r.eg1}</p>}
              {r.eg2 && <p>{r.eg2}</p>}
              {r.eg3 && <p>{r.eg3}</p>}
              {r.eg4 && <p>{r.eg4}</p>}
              {r.eg5 && <p>{r.eg5}</p>}
              {r.eg6 && <p>{r.eg6}</p>}
              {r.eg7 && <p>{r.eg7}</p>}
              {r.eg8 && <p>{r.eg8}</p>}
              {r.eg9 && <p>{r.eg9}</p>}
              {r.eg10 && <p>{r.eg10}</p>}
              <Divider />
            </div>
          ))}
      </div>
    </Card>
  );
};

export default LanguageTranslator;
