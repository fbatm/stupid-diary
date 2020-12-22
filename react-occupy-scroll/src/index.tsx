import React, {useReducer, useEffect, useMemo, useRef} from 'react';
import {requestTimeout} from './timer';

interface params {
  container?: string | boolean;
  containerHeight?: number;
  rowTagName?: string;
  rowRender: Function;
  rowHeight?: number;
  smoothLines?: number;
  records: Array<any>;
}

const emptyFn = () =>{};
const reducer = (state, payload) => ({ ...state, ...payload });
const initState = {
  startIndex: 0,
  scrollOffset: 0,
  topFillerHeight: 0,
  bottomFillerHeight: 0,
};

/**
 * @param container 外层定高容器的元素类型，默认为div，false表示定高容器由调用者自己生成
 * @param containerHeight 外城定高容器的高度
 * @param smoothLines 预留几行，在缓慢滚动时不至于出现短暂空白
 */
export default function({
 container = 'div',
 containerHeight = 400,
 rowTagName = 'tr',
 rowRender = emptyFn,
 rowHeight = 30,
 smoothLines = 10,
 records = [],
}: params){
	const [
		{ startIndex, scrollOffset, topFillerHeight, bottomFillerHeight },
		scrollDispatcher,
  ] = useReducer(reducer, initState);
  const total = useMemo(()=>(records.length), records.length);

	const maxVisibleRows = useMemo(() => {
		if (containerHeight) {
			return Math.ceil(containerHeight / rowHeight) + smoothLines * 2;
		}
		return 20;
	}, [containerHeight]);

	useEffect(() => {
		if (total > maxVisibleRows) {
			scrollDispatcher({
				bottomFillerHeight: (total - maxVisibleRows) * rowHeight,
			});
		}
  }, [records, maxVisibleRows]);
  
	const scrollTimeout = useRef();
  
  function onScroll(e) {
		const { clientHeight, scrollHeight, scrollTop } = e.currentTarget;
		// 仅关注竖直滚动
		if (scrollOffset !== scrollTop) {
			const so = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
			let sIndex = Math.floor(so / rowHeight);
			sIndex = sIndex > smoothLines ? sIndex - smoothLines : 0;
			const lefted = total - maxVisibleRows - sIndex;
			if (scrollTimeout.current) {
				scrollTimeout.current.cancel();
			}
			scrollTimeout.current = requestTimeout(() => {
				scrollDispatcher({
					startIndex: sIndex,
					scrollOffset: so,
					topFillerHeight: sIndex * rowHeight,
					bottomFillerHeight: lefted > 0 ? lefted * rowHeight : 0,
				});
			}, 100);
		}
  }
  
  const body = useMemo(() => {
    const rowComps = [];
    const endIndex = startIndex + maxVisibleRows;
    for(let i = startIndex;i < endIndex;i++){
      rowComps.push(rowRender(records[i], i + maxVisibleRows));
    }
		return rowComps;
	}, [records, startIndex]);

  const OuterElement = container === false ? React.Fragement : React.createElement(container, {
    style: {
      position: 'relative',
      height: containerHeight,
      overflow: 'auto',
      onScroll,
    }
  })
  const RowTag = rowTagName;
  const resultEL = <OuterElement>
    {topFillerHeight !== 0 && (
      <RowTag style={{ height: topFillerHeight }} />
    )}
    {body}
    {bottomFillerHeight !== 0 && (
      <RowTag style={{ height: bottomFillerHeight }} />
    )}
  </OuterElement>;
  if(container === false){
    resultEL._onScroll = onScroll;
  }

  return resultEL;
}