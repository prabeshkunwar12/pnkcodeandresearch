"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { gameRoomFiles, roomDisplayNameMap } from "../data";
import { SectionHeader } from "./SectionHeader";
import { buildGameRooms } from "../utils";
import type { GameRoom } from "../types";

export function GallerySection() {
  const [gameRoomIndex, setGameRoomIndex] = useState(0);
  const [pauseGameRoomCarousel, setPauseGameRoomCarousel] = useState(false);
  const [activeRoom, setActiveRoom] = useState<GameRoom | null>(null);
  const [activeRoomCompletedIndex, setActiveRoomCompletedIndex] = useState(0);
  const [activeRoomConstructionIndex, setActiveRoomConstructionIndex] =
    useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const gameRooms = buildGameRooms(gameRoomFiles, roomDisplayNameMap).slice(0, 8);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || pauseGameRoomCarousel || gameRooms.length <= 1) return;
    const timer = window.setInterval(() => {
      setGameRoomIndex((prev) => (prev + 1) % gameRooms.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [pauseGameRoomCarousel, reducedMotion, gameRooms.length]);

  useEffect(() => {
    if (!activeRoom) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveRoom(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveRoomCompletedIndex((prev) =>
          (prev + 1) % activeRoom.completedImages.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveRoomCompletedIndex((prev) =>
          prev === 0 ? activeRoom.completedImages.length - 1 : prev - 1,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeRoom]);

  const nextGameRoom = () => {
    if (gameRooms.length <= 1) return;
    setGameRoomIndex((prev) => (prev + 1) % gameRooms.length);
  };

  const prevGameRoom = () => {
    if (gameRooms.length <= 1) return;
    setGameRoomIndex((prev) =>
      prev === 0 ? gameRooms.length - 1 : prev - 1,
    );
  };

  const openRoomDialog = (room: GameRoom) => {
    setActiveRoom(room);
    setActiveRoomCompletedIndex(0);
    setActiveRoomConstructionIndex(0);
  };

  const closeRoomDialog = () => {
    setActiveRoom(null);
    setActiveRoomCompletedIndex(0);
    setActiveRoomConstructionIndex(0);
  };

  return (
    <section className="mt-20 space-y-6">
      <SectionHeader
        eyebrow="Gallery"
        title="Inside the game rooms and systems"
        description="A rotating view of the rooms, screens, and hardware that power the experience."
      />

      <Card
        variant="surface"
        className="overflow-hidden rounded-4xl shadow-[0_20px_70px_-45px_rgba(0,0,0,0.45)]"
      >
        {gameRooms.length > 0 ? (
          <div
            className="relative aspect-video w-full"
            onMouseEnter={() => setPauseGameRoomCarousel(true)}
            onMouseLeave={() => setPauseGameRoomCarousel(false)}
            onFocusCapture={() => setPauseGameRoomCarousel(true)}
            onBlurCapture={() => setPauseGameRoomCarousel(false)}
          >
            {gameRooms.map((room, index) => (
              <button
                type="button"
                key={room.key}
                onClick={() => openRoomDialog(room)}
                className={`absolute inset-0 text-left transition-opacity duration-500 motion-reduce:transition-none ${
                  index === gameRoomIndex
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                aria-label={`View room ${room.name}`}
              >
                <Image
                  src={room.coverImage}
                  alt={`${room.name} game room`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white sm:p-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/75">
                      {index + 1} / {gameRooms.length}
                    </p>
                    <p className="mt-1 text-base font-semibold sm:text-lg">
                      {room.name}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/35 bg-black/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/95">
                    View room
                  </span>
                </div>
              </button>
            ))}

            {gameRooms.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={prevGameRoom}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Previous room"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={nextGameRoom}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Next room"
                >
                  →
                </button>
              </>
            ) : null}

            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {gameRooms.map((room, index) => (
                <button
                  type="button"
                  key={room.key}
                  onClick={() => setGameRoomIndex(index)}
                  aria-label={`Go to ${room.name}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === gameRoomIndex
                      ? "bg-white"
                      : "bg-white/45 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 text-sm text-black/65">
            No game room photos available.
          </div>
        )}
      </Card>

      {activeRoom ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close room gallery dialog"
            onClick={closeRoomDialog}
          />
          <Card
            variant="surface"
            className="relative z-10 h-[88vh] w-full max-w-6xl overflow-y-auto rounded-[28px] border-white/20 bg-black/90 p-4 text-white sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeRoom.name} room gallery`}
          >
            <button
              type="button"
              onClick={closeRoomDialog}
              className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Close
            </button>

            <h3 className="pr-14 text-xl font-semibold sm:text-2xl">
              {activeRoom.name}
            </h3>

            <div className="mt-5 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Completed
                </p>
                <div className="relative mt-2 overflow-hidden rounded-2xl border border-white/20 bg-black">
                  <div className="relative aspect-video">
                    <Image
                      src={
                        activeRoom.completedImages[activeRoomCompletedIndex].src
                      }
                      alt={`${activeRoom.name} completed photo ${activeRoomCompletedIndex + 1}`}
                      fill
                      className="object-contain p-3"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white/90">
                      {activeRoomCompletedIndex + 1} /{" "}
                      {activeRoom.completedImages.length}
                    </div>

                    {activeRoom.completedImages.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveRoomCompletedIndex((prev) =>
                              prev === 0
                                ? activeRoom.completedImages.length - 1
                                : prev - 1,
                            )
                          }
                          aria-label="Previous completed photo"
                          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveRoomCompletedIndex((prev) =>
                              (prev + 1) % activeRoom.completedImages.length,
                            )
                          }
                          aria-label="Next completed photo"
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          →
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              {activeRoom.constructionImages.length > 0 ? (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Under Construction
                  </p>
                  <div className="relative mt-2 overflow-hidden rounded-2xl border border-white/20 bg-black">
                    <div className="relative aspect-video">
                      <Image
                        src={
                          activeRoom.constructionImages[
                            activeRoomConstructionIndex
                          ].src
                        }
                        alt={`${activeRoom.name} construction photo ${activeRoomConstructionIndex + 1}`}
                        fill
                        className="object-contain p-3"
                      />
                      <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white/90">
                        {activeRoomConstructionIndex + 1} /{" "}
                        {activeRoom.constructionImages.length}
                      </div>

                      {activeRoom.constructionImages.length > 1 ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveRoomConstructionIndex((prev) =>
                                prev === 0
                                  ? activeRoom.constructionImages.length - 1
                                  : prev - 1,
                              )
                            }
                            aria-label="Previous construction photo"
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveRoomConstructionIndex((prev) =>
                                (prev + 1) %
                                activeRoom.constructionImages.length,
                              )
                            }
                            aria-label="Next construction photo"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            →
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-white/75">
                  No construction photos available for this room.
                </p>
              )}
            </div>
          </Card>
        </div>
      ) : null}
    </section>
  );
}
