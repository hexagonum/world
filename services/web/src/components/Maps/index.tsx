import { useEffectOnce } from '@world/common/hooks/use-effect-once';
import { Path } from '@world/types/maps';
import { select } from 'd3';

export type MapsData = {
  viewBox?: string;
  width: string;
  height: string;
  paths: Path[];
};

export type MapsProps = {
  id: string;
  data: MapsData;
};

const drawChart = (id: string, data: MapsData): void => {
  const svg = select(`svg#${id}`);
  svg
    .append('g')
    .selectAll('path')
    .data(data.paths)
    .enter()
    .append('path')
    .attr('d', (path: Path) => path.d)
    .style('id', (path: Path) => path.id)
    .attr('title', (path: Path) => path.title)
    .attr('fill', () => {
      return '#319795';
    })
    .attr('stroke', 'rgba(255, 255, 255, 1)')
    .attr('class', 'svg-path');
};

export const Maps: React.FC<MapsProps> = ({ id, data }) => {
  useEffectOnce(() => {
    drawChart(id, data);
  });

  return (
    <div id={`${id}-container`}>
      <svg
        id={id}
        viewBox={`0 0 ${data.width} ${data.height}`}
        className="overflow-hidden mx-auto"
      />
    </div>
  );
};

export default Maps;
