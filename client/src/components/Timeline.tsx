"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLocomotiveScrollContext } from "@/contexts/LocomotiveScrollContext";

export interface TimelineEntry {
  title: string;
  badge?: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
}

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [beamProgress, setBeamProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { scroll: locomotiveScroll } = useLocomotiveScrollContext();

  useEffect(() => {
    if (!locomotiveScroll || !timelineRef.current) return;

    const handleScroll = (args: any) => {
      if (!timelineRef.current || itemsRef.current.length === 0) return;

      const scrollY = Math.abs(args.scroll.y);
      const container = timelineRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollY + windowHeight * 0.4;

      // Calculate which item is active based on scroll position
      let newActiveIndex = 0;
      let minDistance = Infinity;

      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const itemRect = item.getBoundingClientRect();
        const itemTop = itemRect.top + scrollY;
        const itemCenter = itemTop + itemRect.height / 2;
        const distance = Math.abs(viewportCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          newActiveIndex = index;
        }
      });

      setActiveIndex(newActiveIndex);

      // Calculate beam progress
      const firstItem = itemsRef.current[0];
      const lastItem = itemsRef.current[itemsRef.current.length - 1];
      
      if (firstItem && lastItem) {
        const firstTop = firstItem.getBoundingClientRect().top + scrollY;
        const lastTop = lastItem.getBoundingClientRect().top + scrollY;
        const totalHeight = lastTop - firstTop;
        const currentProgress = Math.max(0, Math.min(1, (viewportCenter - firstTop) / totalHeight));
        setBeamProgress(currentProgress);
      }
    };

    locomotiveScroll.on("scroll", handleScroll);
    
    // Initial call
    if (locomotiveScroll.scroll) {
      handleScroll({ scroll: locomotiveScroll.scroll });
    }

    return () => {
      locomotiveScroll.off("scroll", handleScroll);
    };
  }, [locomotiveScroll]);

  return (
    <div ref={timelineRef} className="relative w-full py-8">
      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Line Background */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform md:-translate-x-1/2" />

        {/* Scroll Beam Indicator - follows scroll */}
        <div
          className="absolute left-8 md:left-1/2 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 transform md:-translate-x-1/2 transition-all duration-300 ease-out rounded-full"
          style={{
            top: 0,
            height: `${beamProgress * 100}%`,
            opacity: 0.9,
            boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)',
          }}
        />

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-24">
          {data.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative pl-20 md:pl-0 md:flex md:items-center"
              data-scroll
              data-scroll-speed={index % 2 === 0 ? "0.1" : "-0.1"}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-6 md:left-1/2 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 transform md:-translate-x-1/2 transition-all duration-300 z-10 ${
                  index === activeIndex
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125 shadow-lg shadow-pink-500/50 ring-4 ring-pink-500/20"
                    : "bg-gray-300 dark:bg-gray-600 scale-100"
                }`}
              />

              {/* Content Card Container */}
              <div
                className={`md:w-[45%] transition-all duration-500 ${
                  index % 2 === 0 
                    ? "md:mr-auto md:pr-8" 
                    : "md:ml-auto md:pl-8"
                } ${
                  index === activeIndex
                    ? "opacity-100 transform scale-100"
                    : "opacity-60 transform scale-95"
                }`}
              >
                {/* Content Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

