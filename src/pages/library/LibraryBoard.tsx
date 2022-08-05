import React, { FC, useEffect, useState } from 'react'
import Table from "../../app/components/table/Table";
import { COLUMNS } from "./columns";
import Select from "react-select";
import { dropdownProps } from "./typing";
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import { fetchLibrary, filteredLibrary } from './librarySlice';
import { RootState } from '../../app/store';
import { customDropdownStyles } from './constants/constants';
import Loader from '../../app/components/loader/loader';

function LibraryBoard() {
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    schemesLibrary,
  } = useSelector((state: RootState) => state.library);

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const options = [
    { value: 'all', label: 'All' },
    { value: 'upi', label: 'UPI' },
    { value: 'discover', label: 'Discover' },
  ]


  const [selectedOption, setSelectedOption] = useState<dropdownProps | null>(null)

  useEffect(() => {
    dispatch(fetchLibrary())
  }, [])

  useEffect(() => {
    if (selectedOption?.label) {
      dispatch(filteredLibrary(selectedOption?.label));
    }
  }, [selectedOption?.label])

  return (
    <>
      {isLoading ? 
      <Loader />:
        <div className='library-container'>
          <div className="flex justify-between">
            <div className='flex gap-x-3 items-center'>
              <div>Schemes</div>
              <div className='select-box'>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  value={selectedOption}
                  options={options}
                  styles={customDropdownStyles}
                />
              </div>

            </div>
            <div>
              <button className='primary-button'>Import TSEC</button>
            </div>
          </div>
          {schemesLibrary.length > 0 && (
            <section>
              <div className="table-container">
                <Table
                  columns={COLUMNS}
                  data={schemesLibrary}
                />
              </div>
            </section>
          )
          }

        </div>
      }
    </>
  );
}

export default LibraryBoard;
