export interface ISearchResult {
  albums: IPage<IAlbumResult>
  artists: IPage<IArtistResult>
  tracks: IPage<ITrackResult>
}

export interface IPage<R extends IResultItem> {
  items: R[] // Items within page
  href: string // Reference to get this page
  limit: number // Max number of items in page
  next?: string // URI for next page
  offset: number // Pagination offset
  previous?: string // URI for previous page
  total: number // Total number of results (across all pages)
}

export interface IResultItem {
  external_urls: {
    spotify?: string // URL to open item in Spotify
  }
  href: string // URL to get information from API
  id: string // Unique item identifier
  name: string // Display name
  uri: string // Resource identifier. This can likely be used to fetch more information about this resource from the API
  images?: IImage[] // Array of images for the asset
  type: ResultItemType // Result type resulting in a discriminated union
}

export interface IAlbumResult extends IResultItem {
  type: 'album'
  album_type: string // Valid album types include 'album', 'compilation', etc.
  artists: IArtistResult[] // Array of credited artists
  release_date: string // Date album was released
  release_date_precision: string // Precision of date (day, month, or year)
  total_tracks: number // Number of tracks on album
}

export interface ITrackResult extends IResultItem {
  type: 'track'
  album: IAlbumResult // Album the track belongs to
  artists: IArtistResult[] // Array of credited artists
  disc_number: number // Used for multi disc albums
  duration_ms: number // Duration of track
  explicit: boolean // Does the track have bad words? :o
  external_ids: { // External identifiers (unsure how this can be used)
    isrc?: string
  }
  is_local: boolean // (unsure what this is)
  popularity: number // Popularity of track
}

export interface IArtistResult extends IResultItem {
  type: 'artist'
  followers?: { // Number of Spotify users that follow this artist
    href?: string
    total: number
  }
  genres?: string[] // Genres of the artist
  popularity?: number // Popularity of the artist
}

export interface IImage {
  height: number // Image height
  width: number // Image width
  url: string // URL to get image
}

export type ImageSize = 'sm' | 'md' | 'lg'
export type ResultItemType = 'album' | 'artist' | 'track'
