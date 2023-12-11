"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: ['700'], subsets: ['latin'] });

export default function Home() {
  const [scrolling, setScrolling] = useState(false);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ar");
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSourceLangChange = (e) => {
    setSourceLang(e.target.value);
  };

  const handleTargetLangChange = (e) => {
    setTargetLang(e.target.value);
  };
  
  useEffect(() => {
    const handleScrolling = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScrolling);

    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  }, []);

  const fetchTranslation = async () => {
    if (sourceLang === targetLang) {
      alert("Error: Source and target languages are the same. Please select different languages.");
    } else {
      setIsFetching(true);
      setTranslatedText("");
      const data = {
        langs: `${sourceLang}-${targetLang}`,
        text_to_translate: textToTranslate
      };

      try {
        const response = await axios.get('http://localhost:8000', {
          params: data
        });

        if (response.status === 200) {
          setTranslatedText(response.data.translated_text);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        
      } finally {
        setIsFetching(false);
      }
    }
  };

  const waveStyle = {
    transform: 'rotate(180deg)',
    transition: '0.3s',
    position: 'absolute',
    left: 0,
    top: 0
  };

  const gradientId = 'sw-gradient-0';


  return (
    <main>
        <svg id="wave" style={waveStyle} viewBox="0 0 1440 460" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="1" y2="0">
                    <stop stopColor="rgba(34, 109, 247, 1)" offset="0%" />
                    <stop stopColor="rgba(25, 157, 206, 1)" offset="100%" />
                </linearGradient>
            </defs>
            <path style={{ transform: 'translate(0, -120px)', opacity: 1 }} fill={`url(#${gradientId})`} d="M 0,700 C 0,700 0,350 0,350 C 194.5,431.5 389,512.5 546,475 C 703,437.5 822,280.5 965,240 C 1107.5,199.5 1274,274.5 1440,350 C 1440,350 1440,700 1440,700 Z"></path>
        </svg>
    
        <nav className={scrolling ? 'navbar navbar-expand navbar-dark fixed-top bg-primary' : 'navbar navbar-expand navbar-dark fixed-top'}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">AI Translator</a>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ms-auto">
                        <a className="nav-link" href="https://github.com/reemrizzk/AI-translator-Next.js-Python-">View on Github</a>
                    </div>
                </div>
            </div>
        </nav>
    
    
        <div className="container px-2 pb-3">  
            <div className="row align-items-center pt-lg-3 pt-5">
                <div className="translation-col col-lg-6 text-left text-lg-start rounded p-4">
                    <h1 className={montserrat.className+" display-6 lh-1 mb-3"}>AI translator</h1>
                    <div className="row">
                        <div className="mb-2 col-6">     
                            <label htmlFor="sourceLang">From:&nbsp;</label>
                            <select className="form-select" id="sourceLang" value={sourceLang} onChange={handleSourceLangChange}>
                                <option value="ar">Arabic</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="es">Spanish</option>
                            </select>
                        </div>
                        <div className="mb-2 col-6">
                            <label htmlFor="targetLang">To:&nbsp;</label>
                            <select className="form-select" id="targetLang" value={targetLang} onChange={handleTargetLangChange}>
                                <option value="ar">Arabic</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="es">Spanish</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="originalText">Type text here:</label>
                        <textarea className="form-control mb-2" name="originalText" id="originalText" value={textToTranslate} onChange={(e) => setTextToTranslate(e.target.value)}></textarea>
                    </div>
                            
                    <button type="button" className="btn btn-translate mb-2" onClick={fetchTranslation} disabled={isFetching}>
                    {isFetching ? 'Translating...' : 'Translate'}
                    </button>
                            
                    <div className="form-group">
                        <label htmlFor="viewTranslatedText">Translated text:</label>
                        <textarea className="form-control mb-2" name="viewTranslatedText" id="viewTranslatedText" readOnly={true} value={translatedText}></textarea>
                    </div>
                </div>
                        
                <div className="col-lg-6 mx-auto d-none d-lg-block">
                    <img alt="" src="image.png" className="p-5" width="100%" />
                </div>
            </div>
        </div>
    </main>
  );
}
