export default function artist() {
  return {
    artist: id => this.request(`${this.apiURL}/artists/${id}`),
    artists: ids => this.request(`${this.apiURL}/artists?ids=${ids}`),
    albums: id => this.request(`${this.apiURL}/artists/${id}/albums`),
    topTracks: (id, country) => this.request(`${this.apiURL}/artists/${id}/top-tracks?country=${country}`),
  };
}
