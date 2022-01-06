import React, { Component, Fragment, useEffect, useRef, useState } from 'react'

import { List, AutoSizer, CellMeasurerCache, ListProps } from 'react-virtualized'
import 'react-virtualized/styles.css'


export interface iProps extends Partial<ListProps> {

    items: any[]
    rowRenderer: (props: any) => any
    rowCount: number
    overscanRowCount?: number
    cache?: CellMeasurerCache
}

const ListVirtualized: React.FC<iProps> = (props) => {

    const cache = useRef<CellMeasurerCache>(null)
    const list = useRef(null)
    const [resizeAllFlag, changeResizeAllFlag] = useState(false)
    const [mostRecentWidth, changeMostRecentWidth] = useState(0)

    const resizeAll = () => {
        changeResizeAllFlag(false)
        cache.current.clearAll()
    }

    useEffect(() => {
        cache.current = props.cache
    }, [])

    useEffect(() => {
        const index = props.items.length
        cache.current.clear(index, 0)
    }, [props.items, props.items.length])

    return (
        <AutoSizer>

            {({ height, width }) => {

                if (mostRecentWidth && mostRecentWidth !== width) {
                    resizeAll()
                }

                changeMostRecentWidth(width)

                return (
                        <List
                            {...props}
                            style={{ overflowX: 'visible', overflowY: 'visible' }}
                            ref={list}
                            height={height}
                            width={width}
                            rowCount={props.rowCount}
                            rowHeight={cache.current.rowHeight}
                        />
                )
            }}

        </AutoSizer>
    )
}

ListVirtualized.defaultProps = {
    cache: new CellMeasurerCache(),
    overscanRowCount: 5
}

export default ListVirtualized