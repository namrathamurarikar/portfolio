import { useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { safeWorkHref, videoDemoHref } from "../utils/workLinks";
import { publicUrl } from "../utils/publicUrl";

type WorkProject = {
  title: string;
  category: string;
  tools: string;
  image: string;
  /** Opens in a new tab (video player page, or external https URL) */
  link: string;
};

const PROJECTS: WorkProject[] = [
  {
    title: "AI Code Review Assistant",
    category: "LLM + VCS · GitHub · CI",
    tools:
      "Python, PyTorch, Hugging Face, LangChain, CodeBERT/OpenAI embeddings, webhooks",
    image: publicUrl("images/AI-Codereview.png"),
    link: videoDemoHref("AI-Code review (1).mp4"),
  },
  {
    title: "Nam's Bot",
    category: "Multi-model chat · Persona routing",
    tools:
      "Python, Gradio, GPT-4, Claude, LLaMA3, OpenAI & Anthropic & Ollama SDKs",
    image: publicUrl("images/AI-ChatBot.png"),
    link: videoDemoHref("Nams-Bot.mp4"),
  },
  {
    title: "Bestow Gift Services",
    category: "E-commerce · Freelance",
    tools: "Full-stack web stack for personalized gifting at bestowgiftservices.com",
    image: publicUrl("images/Bestowgiftservices.png"),
    link: safeWorkHref("https://store.bestowgifts.com/"),
  },
  {
    title: "AI-Journaling",
    category: "Mental health · Hyperlinked digital journal",
    tools:
      "Built with Python, Streamlit, and Gemini AI to provide automated ASAM mapping, risk detection, and voice-to-text clinical insights.",
    image: publicUrl("images/AI-Journaling.png"),
    link: videoDemoHref("Interactive_journaling_video.mp4"),
  },
];

function getWorkHorizontalScroll(): number {
  const container = document.querySelector(".work-container");
  const boxes = document.querySelectorAll(".work-box");
  if (!container || !boxes.length) return 0;
  let total = 0;
  boxes.forEach((el) => {
    total += el.getBoundingClientRect().width;
  });
  const visible = container.getBoundingClientRect().width;
  return Math.max(0, Math.round(total - visible + 24));
}

const Work = () => {
  useEffect(() => {
    let timeline: gsap.core.Timeline | null = null;

    const setup = () => {
      timeline?.kill();
      ScrollTrigger.getById("work")?.kill();

      const translateX = getWorkHorizontalScroll();
      if (translateX < 8) {
        ScrollTrigger.refresh(true);
        return;
      }

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });

      ScrollTrigger.refresh(true);
    };

    setup();
    const onLoad = () => setup();
    window.addEventListener("load", onLoad);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setup());
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("load", onLoad);
      timeline?.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {PROJECTS.map((project, index) => (
            <div className="work-box" key={project.title}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
