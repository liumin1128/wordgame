import { List, Record } from 'immutable';
import { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

class Bullet extends Record({
  key: '',
  text: '',
  bg: '',
  color: '',
  x: 0,
  y: 0,
  w: 0,
  h: 0,
}) {}

function getList1(w: number, h: number, t1: string, t2: string) {
  let list = List<Bullet>();
  for (let i = 0; i < w; i += 1) {
    for (let j = 0; j < h; j += 1) {
      const id = i * w + j;
      const map = new Bullet({
        key: `${id}`,
        text: t1,
        color: '#006d75',
        bg: '#d4b106',
        x: i,
        y: j,
        w: 1,
        h: 1,
      });
      list = list.push(map);
    }
  }

  const rIdx = Math.floor(Math.random() * list.size);
  // arr[rIdx].bg = 'red';
  // arr[rIdx].color = '#fff';
  // list[rIdx].updateIn([])
  list = list.updateIn([rIdx, 'text'], () => t2);
  // list = list.updateIn([rIdx, 'color'], () => 'red');
  return { data: list, ans: rIdx };
}

const list = {
  5: ['乌', '鸟'],
  6: ['日', '目'],
  7: ['旯', '旮'],
  8: ['人', '入'],
  9: ['土', '士'],
  10: ['垚', '壵'],
  11: ['已', '己'],
  12: ['茶', '荼'],
  13: ['汆', '氽'],
  14: ['戍', '戌'],
  15: ['祗', '祇'],
  16: ['亳', '毫'],
  17: ['祎', '袆'],
  18: ['洗', '冼'],
  19: ['币', '帀'],
  20: ['汩', '汨'],
};

export default function IndexPage() {
  const [data, setData] = useState<List<Bullet>>();
  const [ans, setAns] = useState<number>();
  const [level, setLevel] = useState<number>(5);
  const [clientWidth, setWidth] = useState<number>(0);

  const getData = useCallback(() => {
    // eslint-disable-next-line
    const { data, ans } = getList1(
      level,
      level,
      list[level][0],
      list[level][1],
    );
    setData(data);
    setAns(ans);
  }, [level]);

  useEffect(() => {
    getData();
    if (window.innerWidth > 600) {
      setWidth(600);
    } else {
      setWidth(window.innerWidth);
    }
  }, [level, getData]);

  const handleShowAnswer = () => {
    setData(data?.updateIn([ans, 'color'], () => 'red'));
  };

  const handleClick = (i) => () => {
    if (i.key === `${ans}`) {
      if (level === 20) {
        alert('你赢了！');
        return;
      }
      setLevel(level + 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#006d75',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        当前等级：{level}
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: clientWidth,
          height: clientWidth,
          // border: '1px solid red',
        }}
      >
        {data?.map((i) => {
          const unit = clientWidth / level;
          const left = `${i.x * unit}px`;
          const top = `${i.y * unit}px`;
          const width = `${i.w * unit}px`;
          const height = `${i.h * unit}px`;

          return (
            <Box
              key={i.key}
              sx={{
                left,
                top,
                width,
                height,
                position: 'absolute',
                border: '2px solid transparent',
                fontSize: `${unit * 0.5}px`,
                lineHeight: `${unit}px`,
                textAlign: 'center',
                // background: 'red',
                color: i.color,
                cursor: 'pointer',
              }}
              onClick={handleClick(i)}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: i.bg,
                  borderRadius: '20%',
                }}
              >
                {i.text}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button onClick={handleShowAnswer}>显示答案</Button>
      </Box>
    </Box>
  );
}
