import { useEffect, useState } from 'react';
import { useScatterData } from '../../api/hooks';

const ScatterChart = () => {
  const [yesOrNo, setYesOrNo] = useState<'yes' | 'no'>('yes');
  const toggle = () => setYesOrNo(yesOrNo === 'yes' ? 'no' : 'yes');
  const start = '2025-03-05T00:00:00Z';
  const end = '2025-03-12T00:00:00Z';

  const { data, isLoading, isError, error } = useScatterData({ start, end });

  useEffect(() => {
    console.log('ScatterChart API Response:', data);
  }, [data]);

  if (isLoading) return <p>Loading scatter data...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div>
      <p>Data fetched! Check the console.</p>
      <button className='bg-green-800 text-white p-4 rounded' onClick={toggle}>
        {yesOrNo}
      </button>
    </div>
  );
};

export { ScatterChart };
