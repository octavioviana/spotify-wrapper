export default function track() {
  return {
    track: id => this.request(`${this.apiURL}/tracks/${id}`),
    tracks: ids => this.request(`${this.apiURL}/tracks?ids=${ids}`),
  };
}
