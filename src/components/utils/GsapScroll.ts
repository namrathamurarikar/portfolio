import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** DOM-only scroll-driven motion (replaces former Three.js character timelines). */
export function registerScrollSectionAnimations() {
  if (window.innerWidth > 1024) {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    tl1
      .fromTo(
        ".landing-hero-video-parallax",
        { x: "0%" },
        { x: "-25%", duration: 1 },
        0
      )
      .fromTo(
        [".landing-intro", ".landing-info"],
        { opacity: 1, y: "0%" },
        { opacity: 0, y: "40%", duration: 0.8, ease: "none" },
        0
      )
      .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "center 55%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    /* Avoid y-transform on about-section — it slides the block over What I Do while copy is still visible */
    tl2.to(".about-section", { opacity: 0, duration: 2.5, ease: "none" }, 0);

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".whatIDO",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    tl3.fromTo(
      ".landing-hero-video-parallax",
      { y: "0%" },
      { y: "-100%", duration: 4, ease: "none", delay: 1 },
      0
    );
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )
    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
