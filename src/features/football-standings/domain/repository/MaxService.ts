import { F1Repository } from '../../data/repository/F1Repository';
import { DriverMapper } from '../../data/mapper/DriverMapper';

export const MaxService = {
  async getFootballData(page: number = 1) {
    const data = await F1Repository.fetchDrivers(page);
    return {
      items: data.results ? data.results.map(DriverMapper.toDomain) : [],
      hasMore: data.info?.next !== null 
    };
  },


  async getTeamFullDetails(id: string) {
    const rawChar = await F1Repository.fetchCharacterById(id);
    if (!rawChar) return null;

    const current = DriverMapper.toDomain(rawChar);
    const episodes = rawChar.episode || [];
    
    return {
      ...current,
      players: episodes.slice(0, 10).map((epUrl: string) => {
        const epId = epUrl.split('/').pop();
        return {
          id: epId,
          name: `Episode ${epId}`,
          position: 'APPEARANCE',
          photo: 'https://rickandmortyapi.com/icons/icon-512x512.png'
        };
      })
    };
  }
};