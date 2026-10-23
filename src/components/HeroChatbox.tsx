import { useState, useEffect, useRef } from "react";
import "./styles/HeroChatbox.css";

interface QAPair {
  id: string;
  question: string;
  answer: string;
}

const PRESET_QA: QAPair[] = [
  {
    id: "about",
    question: "Tell me something about Fuaad",
    answer:
      "Fuaad is a passionate UX/UI Designer based in Bidar, Karnataka! He loves turning complex problems into intuitive, delightful digital experiences that solve real user needs and deliver business impact.",
  },
  {
    id: "skills",
    question: "Tell me about his skills",
    answer:
      "He has skills in creating user flows, wireframing, high-fidelity UI design, and scalable design systems! He also creates interactive prototypes and brings UI to life with smooth micro-interactions.",
  },
  {
    id: "tools",
    question: "What tools does he use?",
    answer:
      "Fuaad's primary design toolkit includes Figma, Figma AI, FigJam, and Canva, with working knowledge of HTML, CSS & Bootstrap for smooth developer collaboration.",
  },
  {
    id: "location",
    question: "Where does he live?",
    answer:
      "Fuaad is currently based in Bidar, Karnataka, India. He is ready to relocate to Bengaluru or Hyderabad and is also open to working remotely!",
  },
  {
    id: "help",
    question: "How can he help us?",
    answer:
      "Fuaad can help you design websites & intuitive apps, revamp existing products, build design systems, or shape your brand's digital presence. Whether you're a startup or an established team, he turns your vision into a polished reality!",
  },
  {
    id: "experience",
    question: "How much experience he has?",
    answer:
      "Fuaad has 3+ years of experience designing end-to-end digital products — from early research, user flows, and wireframes to high-fidelity Figma prototypes and developer handoff at IBaseIT.",
  },
  {
    id: "different",
    question: "What makes him different from others?",
    answer:
      "Fuaad bridges design thinking with a strong product mindset. He doesn't just make things look good — he deeply understands user behaviour, business goals, and technical constraints to craft experiences that truly work.",
  },
];

const GREETING = "Hi, how can I help you?";
const CHIP_STAGGER_MS = 220; // delay between each chip appearing

interface HeroChatboxProps {
  onClose?: () => void;
}

const HeroChatbox = ({ onClose }: HeroChatboxProps = {}) => {
  const [greetingText, setGreetingText] = useState<string>("");
  const [greetingDone, setGreetingDone] = useState<boolean>(false);
  const [visibleChips, setVisibleChips] = useState<number>(0); // how many chips have appeared

  const [activeQuestion, setActiveQuestion] = useState<string>("");
  const [displayedAnswer, setDisplayedAnswer] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasAnswer, setHasAnswer] = useState<boolean>(false);

  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typewriter for the greeting on mount
  useEffect(() => {
    let index = 0;
    const speed = 30;
    const typeNext = () => {
      if (index < GREETING.length) {
        setGreetingText(GREETING.slice(0, index + 1));
        index++;
        typingTimerRef.current = setTimeout(typeNext, speed);
      } else {
        setGreetingText(GREETING);
        // After greeting finishes, reveal chips one by one
        setGreetingDone(true);
      }
    };
    typeNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stagger chips in after greeting completes
  useEffect(() => {
    if (!greetingDone) return;
    let count = 0;
    const showNext = () => {
      if (count < PRESET_QA.length) {
        count++;
        setVisibleChips(count);
        setTimeout(showNext, CHIP_STAGGER_MS);
      }
    };
    setTimeout(showNext, 100); // small initial delay
  }, [greetingDone]);

  // Typewriter for Q&A answers
  const startTypewriter = (text: string) => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    setIsTyping(true);
    setDisplayedAnswer("");
    setHasAnswer(true);

    let index = 0;
    const speed = 16;
    const typeNext = () => {
      if (index < text.length) {
        setDisplayedAnswer(text.slice(0, index + 1));
        index++;
        typingTimerRef.current = setTimeout(typeNext, speed);
      } else {
        setDisplayedAnswer(text);
        setIsTyping(false);
      }
    };
    typeNext();
  };

  const handleSelectQuestion = (qa: QAPair) => {
    if (activeQuestion === qa.question && !isTyping) {
      startTypewriter(qa.answer);
      return;
    }
    setActiveQuestion(qa.question);
    startTypewriter(qa.answer);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="chatbox-wrapper full-hero-chatbox">
      {/* Main card with animated rotating laser border */}
      <div className="chatbox-outer-card">
        {/* Animated laser beam element */}
        <div className="chatbox-border-beam" aria-hidden="true" />

        {/* Inner Card Content */}
        <div className="chatbox-inner">
          {/* Header */}
          <div className="chatbox-header">
            <div className="chatbox-header-left">
              <div className="chatbox-avatar-ring">
                <img
                  src="/images/ai-girl-avatar.jpg"
                  alt="AI Assistant"
                  className="chatbox-avatar-img"
                />
                <span className="chatbox-avatar-online" title="Online"></span>
              </div>
              <div className="chatbox-header-info">
                <h3 className="chatbox-header-title">Fuaad's AI assistant</h3>
                <span className="chatbox-header-status">Online</span>
              </div>
            </div>
            {onClose && (
              <button
                type="button"
                className="chatbox-back-home-btn"
                onClick={onClose}
                aria-label="Back to home"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back to home</span>
              </button>
            )}
          </div>

          {/* Messages Area */}
          <div className="chatbox-messages">
            {/* Greeting 1 */}
            <div className="chatbox-msg-row">
              <div className="chatbox-mini-avatar">
                <img src="/images/ai-girl-avatar.jpg" alt="AI" />
              </div>
              <div className="chatbox-ai-response">
                <p className="chatbox-ai-text">{greetingText}</p>
              </div>
            </div>

            {/* Greeting 2 */}
            {greetingDone && (
              <div className="chatbox-msg-row chatbox-bubble-enter">
                <div className="chatbox-mini-avatar">
                  <img src="/images/ai-girl-avatar.jpg" alt="AI" />
                </div>
                <div className="chatbox-ai-response">
                  <p className="chatbox-ai-text">
                    Ask about his skills, tools, or experience. Pick a question below.
                  </p>
                </div>
              </div>
            )}

            {/* Q&A exchange — appears after a chip is clicked */}
            {hasAnswer && (
              <>
                <div className="chatbox-user-bubble chatbox-bubble-enter">
                  <span>{activeQuestion}</span>
                </div>
                <div className="chatbox-msg-row chatbox-bubble-enter">
                  <div className="chatbox-mini-avatar">
                    <img src="/images/ai-girl-avatar.jpg" alt="AI" />
                  </div>
                  <div className="chatbox-ai-response">
                    <p className="chatbox-ai-text">
                      {displayedAnswer}
                      {isTyping && <span className="chatbox-cursor">|</span>}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom Bar: Suggestions Section */}
          <div className="chatbox-bottom-bar">
            <span className="chatbox-suggestions-title">TRY ASKING</span>
            <div className="chatbox-chips">
              {PRESET_QA.map((item, i) => {
                const isActive = activeQuestion === item.question;
                const isVisible = i < visibleChips;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`chatbox-chip ${isActive ? "active" : ""} ${isVisible ? "chip-visible" : "chip-hidden"}`}
                    onClick={() => handleSelectQuestion(item)}
                    tabIndex={isVisible ? 0 : -1}
                  >
                    {item.question}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroChatbox;
