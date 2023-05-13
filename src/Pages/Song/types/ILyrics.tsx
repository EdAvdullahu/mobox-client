export interface Lyric {
 lyricId: string;
 songId: string;
 song: Song;
 verses: Verse[];
}

export interface Verse {
 verseId: string;
 annotated: boolean;
 text: string;
 order: number;
 lyricId: string;
 lyric: Lyric;
 annotationId: string;
 annotation: Annotation;
}

export interface Annotation {
 annotationId: string;
 annotationText: string;
 verseId: string;
 verse: Verse;
}

export interface Song {
 songId: string;
 songApiId: string;
 songName: string;
}
