import type { GameRoom, RoomImage } from "./types";

export function parseRoomName(fileName: string) {
  const match = fileName.match(
    /^([a-z0-9-]+)_(?:complete|completed|construction|underconstruction)/i,
  );
  return match ? match[1].toLowerCase() : null;
}

export function parseImageIndex(fileName: string) {
  const match = fileName.match(/_(\d+)(?=\.(?:jpeg|png|webp)$)/i);
  return match ? Number.parseInt(match[1], 10) : 0;
}

export function toPublicRoomPath(fileName: string) {
  return `/developer/aerosports/game-rooms/${fileName}`;
}

export function buildGameRooms(
  files: readonly string[],
  displayNames: Record<string, string>,
): GameRoom[] {
  const roomMap = new Map<
    string,
    { completed: RoomImage[]; construction: RoomImage[] }
  >();

  for (const file of files) {
    const roomKey = parseRoomName(file);
    if (!roomKey) continue;

    const bucket = roomMap.get(roomKey) || { completed: [], construction: [] };
    const imageData = { src: toPublicRoomPath(file), index: parseImageIndex(file) };

    if (/_((?:complete|completed))/i.test(file)) {
      bucket.completed.push(imageData);
    } else if (/_((?:construction|underconstruction))/i.test(file)) {
      bucket.construction.push(imageData);
    }

    roomMap.set(roomKey, bucket);
  }

  return Array.from(roomMap.entries())
    .map(([key, value]) => {
      const completedImages = value.completed.sort(
        (a, b) => a.index - b.index || a.src.localeCompare(b.src),
      );
      const constructionImages = value.construction.sort(
        (a, b) => a.index - b.index || a.src.localeCompare(b.src),
      );
      const preferredCover =
        completedImages.find((image) =>
          /(?:_complete1|_completed1)\./i.test(image.src),
        ) || completedImages[0];

      if (!preferredCover) return null;

      return {
        key,
        name:
          displayNames[key] ??
          key.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()),
        coverImage: preferredCover.src,
        completedImages,
        constructionImages,
      } as GameRoom;
    })
    .filter((room): room is GameRoom => room !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}
