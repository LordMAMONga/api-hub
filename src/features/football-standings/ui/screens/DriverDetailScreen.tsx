import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MaxService } from '../../domain/repository/MaxService';

export const DriverDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      MaxService.getTeamFullDetails(id).then(res => {
        setData(res);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div style={{ color: '#97ce4c', padding: '50px' }}>Загрузка портала...</div>;
  if (!data) return <div style={{ color: 'white', padding: '50px' }}>Персонаж не найден</div>;

  return (
    <div style={{ padding: '20px', background: '#202329', minHeight: '100vh', color: 'white' }}>
      <button onClick={() => navigate(-1)} style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
        ← Назад
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <img src={data.logo} alt={data.name} style={{ width: '150px', borderRadius: '10px' }} />
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{data.name}</h1>
          <p style={{ color: '#97ce4c' }}>{data.year} | {data.stadium}</p>
        </div>
      </div>

      <h2>Список появлений (Состав):</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        {data.players?.map((ep: any) => (
          <div key={ep.id} style={{ background: '#3c3e44', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
            <img src={ep.photo} style={{ width: '40px', marginBottom: '10px' }} />
            <div style={{ fontWeight: 'bold' }}>{ep.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};