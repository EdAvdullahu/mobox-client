export interface LyricsPost {
 songId: string;
 verses: Lyrics[];
}

export interface Lyrics {
 text: string;
 order: number;
 annotation: string;
}
