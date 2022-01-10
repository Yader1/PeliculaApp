export interface RespuestaMDB{
    page: number;
    total_results: number;
    total_pages: number;
    results: Pelicula[];
}

export interface Pelicula{
    vote_count: number;
    id: number;
    video: boolean;
    vote_average: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;  
    adult: boolean;   
    genre_ids: number[];
    backdrop_path?: string;  
}

export interface PeliculaDetalle{
    vote_count?: number;
    id?: number;
    video?: boolean;
    vote_average?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    title?: string;  
    adult?: boolean;   
    genre_ids?: number[];
    backdrop_path?: string;  
    belongs_to_collection?: any;
    budget?: number;
    genres?: Genre[];
    homepage?: string;
    imdb_id?: string;
    production_companies?: Productioncompany[]; 
    production_countries?: Productioncountry[]; 
    revenue?: number;
    ruetime?: number;
    spoker_language?: Spokerlanguage[];
    status?: string;
    tagline?: string;
}
export interface Spokerlanguage {
    iso_639_1: string;
    name: string;
}

export interface Productioncompany {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
}

export interface Productioncountry {
    iso_3166_1: string;
    name: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface RespuestaCredits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}
export interface Cast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path?: string;
}
export interface Crew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path?: string;
}