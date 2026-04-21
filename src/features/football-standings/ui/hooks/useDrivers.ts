import { useState, useEffect, useCallback } from 'react';
import { MaxService } from '../../domain/repository/MaxService';
import type { MaxDriver } from '../../domain/model/MaxDriver';

export const useDrivers = () => {
  const [teams, setTeams] = useState<MaxDriver[]>([]);
  const [loading, setLoading] = useState(true);       
  const [loadingMore, setLoadingMore] = useState(false);    
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadDrivers = useCallback(async (pageNum: number) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await MaxService.getFootballData(pageNum);
      
      
      setTeams(prev => pageNum === 1 ? response.items : [...prev, ...response.items]);
      setHasMore(response.hasMore);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  
  useEffect(() => {
    loadDrivers(page);
  }, [page, loadDrivers]);

  
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loadingMore, hasMore]);

  return { teams, loading, loadingMore, hasMore, loadMore };
};