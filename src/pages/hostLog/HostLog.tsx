import React, { createRef, FC, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHostLog } from './hostLogSlice';
import { RootState } from '../../app/store';
import '../../app/components/tree/styles.scss'
import Table from '../../app/components/table/Table';
import { TreeTable, TreeState } from 'cp-react-tree-table';
import './styles.scss';
import Loader from '../../app/components/loader/loader';
import { COLUMNS } from './columns';

const tableCellStyle = {
}


function CPTable({ data }) {

  const treeTableRef = createRef<TreeTable>();
  const [treeValue, setTreeValue] = useState<any>(TreeState.create(data));

  const handleOnChange = (newValue: any) => {
    setTreeValue(newValue);
  }


  const renderhostIdCell = (row) => {
    return (
      <div style={{ paddingLeft: (row.metadata.depth * 15) + 'px' }}
        className={row.metadata.hasChildren ? 'with-children' : 'without-children'}>

        {
          (row.metadata.hasChildren)
            ? (
              <button className="toggle-button" onClick={row.toggleChildren}></button>
            )
            : ''
        }

        <span>{row.data.hostId}</span>
      </div>
    );
  }

  const renderDescriptionCell = (row) => {
    return (
      <span className="employees-cell">{row.data.description}</span>
    );
  }

  const renderValueCell = (row) => {
    return (
      <span className="value-cell">{row.data.value}</span>
    );
  }

  return (
    <>
      <TreeTable
        onChange={handleOnChange}
        ref={treeTableRef}
        value={treeValue} >
        <TreeTable.Column basis="180px"
          renderCell={renderhostIdCell}
          renderHeaderCell={() => <span>DataElement</span>} />
        <TreeTable.Column
          renderCell={renderDescriptionCell}
          renderHeaderCell={() => <span className="">Description</span>} />
        <TreeTable.Column
          renderCell={renderValueCell}
          renderHeaderCell={() => <span className="">Value</span>} />
      </TreeTable>
    </>
  )

}

export default function HostLog() {
  const dispatch = useDispatch();
  const { isLoading, error, hostLogs, elements } = useSelector((state: RootState) => state.hostLogs);
  const [hostTreeLog, setHostTreeLog] = useState<any>(null);
  const [value, setValue] = useState('');
  useEffect(() => {
    dispatch(fetchHostLog());
  }, []);

  const onRowClick = (host) => {
    setHostTreeLog(null);
    setTimeout(() => { host.mti ? setHostTreeLog(host.mti) : setValue(host.value) });
  }

  return (
    <>
      {isLoading ?
        <Loader /> :
        <div className="host-log-main-container">
          <div className='host-list'>
            <div className="host-log-container">
              <Table onRowClick={onRowClick} columns={COLUMNS} data={hostLogs} tableCellStyle={tableCellStyle} />
            </div>
          </div>

          {hostTreeLog ?
            <div className='selection-container'>
              <CPTable data={elements[hostTreeLog]} />
            </div> :
            <div className='selection-container'>
              <div className='fullValue'>
                <div className='host-log-value'>{value}</div>
              </div>
            </div>
          }
        </div>

      }
    </>
  )
}
