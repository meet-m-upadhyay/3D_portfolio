"use client";
import { useState, useEffect } from "react";

const TITLES = [
  "Senior Software Engineer",
  "AI Systems Architect",
  "Backend Engineer",
  "Vibe Coder"
];

export function TypeWriter() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = TITLES[titleIndex];

  useEffect(() => {
    const speed = deleting ? 30 : 60;
    const pause = !deleting && charIndex === current.length ? 2000 : deleting && charIndex === 0 ? 400 : speed;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setCharIndex(c => c + 1);
      } else if (!deleting && charIndex === current.length) {
        setDeleting(true);
      } else if (deleting && charIndex > 0) {
        setCharIndex(c => c - 1);
      } else {
        setDeleting(false);
        setTitleIndex(i => (i + 1) % TITLES.length);
      }
    }, pause);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, current.length, titleIndex]);

  return (
    <span>
      {current.slice(0, charIndex)}
      <span className="inline-block w-[2px] h-[1.1em] bg-primary ml-0.5 align-middle animate-[blink_1s_steps(2)_infinite]"></span>
    </span>
  );
}
