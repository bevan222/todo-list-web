import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import SearchTaskBar from './components/SearchTaskBar';
import NewTask from './components/NewTask';
import { Task } from './type';
import SortButton from './components/SortButton';
function App() {
  const searchOptions = [{value:1, label:'Time'},{value:2, label:'Creator'} ];
  const sortOptions = [{value:1, label:'CreateTime'},{value:2, label:'DueDate'},{value:3, label:'Creator'},{value:4, label:'ID'},{value:5, label:'Todo'},{value:6, label:'Complete'}];
  const [searchOptionSelect, setSearchOptionSelect] = useState(searchOptions[0])
  const [sortOptionSelect, setSortOptionSelect] = useState(sortOptions[0])
  const [searchTimePeriod, setSearchTimePeriod] = useState({startDate:'', endDate:''})
  const [searchString, setSearchString] = useState('')
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [showSearchBar, setShowSearchBar] = useState(false)

  const fetchTask = () => fetch('http://localhost:5001/task/getFilterTask',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchMode:searchOptionSelect.value , sortMode: sortOptionSelect.value, startDate: searchTimePeriod.startDate, endDate: searchTimePeriod.endDate, searchString: searchString })
  })
  .then(res => res.json())
  .then((data) => {
    console.log(data.task)
    setTasks(data.task)
  });

  useEffect(() => {
    console.log(sortOptionSelect.value)
    fetchTask()
  },[sortOptionSelect])

  const handleSearchOptionSelect = (option: {value:number, label:string}) => {
    setSearchOptionSelect(option)
  };

  const handleSortOptionSelect = (option: {value:number, label:string}) => {
    setSortOptionSelect(option)
  };

  

  return (
    <div className='flex justify-center w-screen min-h-screen'>
      <div className='justify-center w-11/12 md:w-2/3'>
        <SearchTaskBar options={searchOptions} optionValue={searchOptionSelect} onSelect={handleSearchOptionSelect} show={showSearchBar} setSearchTimePeriod={setSearchTimePeriod} setSearchString={setSearchString} fetchTask={fetchTask}/>
        <div className='flex justify-between px-1 my-4 md:px-6'>
          <NewTask />
          <div className="flex items-center justify-center md:hidden">
                <img src="/listIcon.png" className="w-10 h-10" onClick={()=>{setShowSearchBar(!showSearchBar)}}></img>
          </div>
          <SortButton options={sortOptions} optionValue={sortOptionSelect} onSelect={handleSortOptionSelect} />
        </div>
        <TodoList tasks={tasks} sortOption={sortOptionSelect.value} fetchTask={fetchTask}/>
      </div>
    </div>
  );
}

export default App;