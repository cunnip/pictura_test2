// aboutUs.js - Text-to-Speech for multilingual support

// Check if the Web Speech API is supported
if ('speechSynthesis' in window) {
    // --- Global State Variables ---
    let ttsButton;
    let mainContent;
    let sentences = [];
    let currentSentenceIndex = 0;
    let isSpeaking = false;
    const synth = window.speechSynthesis;
    let voices = [];
    
    // --- Configuration ---
    const DEFAULT_BUTTON_TEXT = "Start Reading";
    const CONTINUE_BUTTON_TEXT = "Continue";
    
    // Load available voices
    function loadVoices() {
        voices = synth.getVoices();
        console.log("Available voices:", voices.length);
    }
    
    // Load voices on page load and when they change
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }
    
    // Detect the current language of the page
    function detectLanguage() {
        // Check if Google Translate has set a language
        const htmlLang = document.documentElement.lang;
        
        // Check for Google Translate cookie
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith('googtrans=')) {
                const langCode = cookie.split('/')[2];
                if (langCode) {
                    console.log("Detected language from cookie:", langCode);
                    return langCode;
                }
            }
        }
        
        // Check the HTML lang attribute
        if (htmlLang && htmlLang !== 'en') {
            console.log("Detected language from HTML:", htmlLang);
            return htmlLang;
        }
        
        // Check for translated class on body
        const bodyClass = document.body.className;
        if (bodyClass.includes('translated-')) {
            const match = bodyClass.match(/translated-(\w+)/);
            if (match) {
                console.log("Detected language from body class:", match[1]);
                return match[1];
            }
        }
        
        // Default to English
        console.log("Defaulting to English");
        return 'en';
    }
    
    // Get the best voice for a given language
    function getVoiceForLanguage(langCode) {
        // Ensure voices are loaded
        if (voices.length === 0) {
            voices = synth.getVoices();
        }
        
        // Language code mappings for common translations
        const langMap = {
            'zh-CN': ['zh-CN', 'zh', 'cmn'],
            'zh-TW': ['zh-TW', 'zh', 'cmn'],
            'ja': ['ja', 'jp'],
            'ko': ['ko', 'kr'],
            'ru': ['ru'],
            'de': ['de'],
            'es': ['es'],
            'fr': ['fr'],
            'it': ['it'],
            'pt': ['pt'],
            'mi': ['mi', 'en-NZ'],
            'en': ['en']
        };
        
        // Get language variants to search for
        const searchLangs = langMap[langCode] || [langCode];
        
        console.log("Searching for voice with languages:", searchLangs);
        
        // Try to find a matching voice
        for (let searchLang of searchLangs) {
            // First, try exact match
            let voice = voices.find(v => v.lang === searchLang);
            if (voice) {
                console.log("Found exact match voice:", voice.name, voice.lang);
                return voice;
            }
            
            // Then try partial match
            voice = voices.find(v => v.lang.startsWith(searchLang));
            if (voice) {
                console.log("Found partial match voice:", voice.name, voice.lang);
                return voice;
            }
        }
        
        // If no match found, return default voice
        console.log("No matching voice found, using default");
        return voices[0] || null;
    }
    
    // Function to extract text and split it into sentences
    function initializeSentences() {
        if (!mainContent || !ttsButton) {
            console.error("Cannot initialize sentences - elements not found");
            return;
        }
        
        // 1. Get all text content from the mainContent container
        // let fullText = mainContent.textContent || mainContent.innerText;
        let clonedContent = mainContent.cloneNode(true);
        const noSoundElements = clonedContent.querySelectorAll('.noSound');
        noSoundElements.forEach(el => el.remove());
        let fullText = clonedContent.textContent || clonedContent.innerText;        
        
        // 2. Clean up extra whitespaces and newline characters
        fullText = fullText.replace(/\s+/g, ' ').trim();
        
        // 3. Remove the button's text and any heading text
        const textToRemove = [ttsButton.textContent.trim(), "ABOUT US"];
        for (const str of textToRemove) {
            const escapedStr = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedStr, 'gi');
            fullText = fullText.replace(regex, '');
        }
        
        // 4. Split the text into sentences
        let rawSentences = fullText.split(/([.?!。！？]+\s*)/);
        
        // 5. Recombine the punctuation with the preceding sentence fragment
        sentences = [];
        for (let i = 0; i < rawSentences.length; i += 2) {
            let sentence = (rawSentences[i] + (rawSentences[i+1] || '')).trim();
            if (sentence.length > 0) {
                sentences.push(sentence);
            }
        }
        
        // Reset index for a new reading session
        currentSentenceIndex = 0;
        ttsButton.textContent = DEFAULT_BUTTON_TEXT;
        console.log("Sentences initialized:", sentences.length, "sentences");
    }
    
    // Function to speak the current sentence
    function speakSentence() {
        if (currentSentenceIndex < sentences.length) {
            const sentenceText = sentences[currentSentenceIndex];
            const utterance = new SpeechSynthesisUtterance(sentenceText);
            
            // Detect language and set appropriate voice
            const currentLang = detectLanguage();
            const voice = getVoiceForLanguage(currentLang);
            
            if (voice) {
                utterance.voice = voice;
                utterance.lang = voice.lang;
                console.log("Using voice:", voice.name, "for language:", voice.lang);
            } else {
                utterance.lang = currentLang;
                console.log("Using language code:", currentLang);
            }
            
            // Adjust rate and pitch for better pronunciation
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
            // Set up an event listener for when the speech ends
            utterance.onend = function() {
                isSpeaking = false;
                
                if (currentSentenceIndex < sentences.length) {
                    ttsButton.textContent = CONTINUE_BUTTON_TEXT;
                } else {
                    ttsButton.textContent = DEFAULT_BUTTON_TEXT;
                    currentSentenceIndex = 0;
                }
            };
            
            // Error handler
            utterance.onerror = function(event) {
                console.error("Speech synthesis error:", event);
                isSpeaking = false;
                ttsButton.textContent = CONTINUE_BUTTON_TEXT;
            };
            
            // Set speaking flag and start speech
            isSpeaking = true;
            synth.speak(utterance);
        } else {
            ttsButton.textContent = DEFAULT_BUTTON_TEXT;
            currentSentenceIndex = 0;
        }
    }
    
    // Function to stop speech and reset
    function stopAndReset() {
        if (synth.speaking) {
            synth.cancel();
        }
        isSpeaking = false;
        currentSentenceIndex = 0;
        sentences = [];
        if (ttsButton) {
            ttsButton.textContent = DEFAULT_BUTTON_TEXT;
        }
        console.log("Speech stopped and reset due to language change");
    }
    
    // Monitor for language changes
    function monitorLanguageChange() {
        let currentLang = detectLanguage();
        
        // Watch for changes to the Google Translate dropdown
        setTimeout(function() {
            const translateSelect = document.querySelector('.goog-te-combo');
            if (translateSelect) {
                translateSelect.addEventListener('change', function() {
                    console.log("Language dropdown changed");
                    stopAndReset();
                    setTimeout(function() {
                        initializeSentences();
                    }, 500);
                });
            }
        }, 2000);
        
        // Watch for changes to the body class
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const newLang = detectLanguage();
                    if (newLang !== currentLang) {
                        console.log("Language changed from", currentLang, "to", newLang);
                        currentLang = newLang;
                        stopAndReset();
                        setTimeout(function() {
                            initializeSentences();
                        }, 500);
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Watch for cookie changes
        let lastCookie = document.cookie;
        setInterval(function() {
            if (document.cookie !== lastCookie) {
                const newLang = detectLanguage();
                if (newLang !== currentLang) {
                    console.log("Language changed via cookie from", currentLang, "to", newLang);
                    currentLang = newLang;
                    stopAndReset();
                    setTimeout(function() {
                        initializeSentences();
                    }, 500);
                }
                lastCookie = document.cookie;
            }
        }, 500);
    }
    
    // Button Click Handler
    function handleButtonClick() {
        if (synth.speaking) {
            synth.cancel();
            isSpeaking = false;
            if (currentSentenceIndex < sentences.length) {
                 ttsButton.textContent = CONTINUE_BUTTON_TEXT;
            }
            return;
        }

        if (sentences.length === 0 || currentSentenceIndex === 0) {
            initializeSentences();
            
            if (sentences.length > 0) {
                speakSentence();
                currentSentenceIndex++;
                ttsButton.textContent = CONTINUE_BUTTON_TEXT;
            }
            
        } else if (currentSentenceIndex < sentences.length) {
            speakSentence();
            currentSentenceIndex++;

        } else {
            initializeSentences(); 
            if (sentences.length > 0) {
                speakSentence();
                currentSentenceIndex++; 
                ttsButton.textContent = CONTINUE_BUTTON_TEXT;
            }
        }
    }
    
    // Initialize TTS when DOM is ready
    function initTTS() {
        ttsButton = document.getElementById('ttsButton');
        mainContent = document.querySelector('.mainContent');
        
        if (!ttsButton || !mainContent) {
            console.error("TTS Button or Main Content not found");
            return;
        }
        
        // Set up button click handler
        ttsButton.addEventListener('click', handleButtonClick);
        
        // Initial setup
        setTimeout(function() {
            initializeSentences();
            monitorLanguageChange();
        }, 1000);
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTTS);
    } else {
        initTTS();
    }

} else {
    // API not supported
    function disableTTS() {
        const ttsButton = document.getElementById('ttsButton');
        if (ttsButton) {
            ttsButton.textContent = "TTS Not Supported";
            ttsButton.disabled = true;
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', disableTTS);
    } else {
        disableTTS();
    }
}