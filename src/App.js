import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from "react";

function App() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();


  const fetchCategories = async () => {
    console.log('this will fetch the categories');
    let res = await fetch('http://localhost:3000/api/v1/categories');
    let data = await res.json();
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    // this code will run only once on component mount
    fetchCategories()
  }, [])

    useEffect(() => {
        // this code is going to run whenever the selectedCategory changes
        // fetchQuestions() TheTodo: fetch and show the questions
    }, [selectedCategory])

  // useEffect(() => {
  //   // this code will run every time the someStateVariable changes
  //   // this code will run every time var2 OR someStateVariable changes
  //   // write code here that reloads the page as a side effect of var2 OR someStateVariable changing
  // }, [someStateVariable, var2])


  return (
    <>
      <div className="grid grid-cols-12">
        <div className={'col-span-full border p-5'}>
          <h1 className={'text-center text-3xl'}>FORUM APP</h1>
        </div>

      </div>

      <div className="grid grid-cols-12">
        <div className={'col-span-full md:col-span-3 lg:col-span-2 border p-5'}>
          {<h1 className={'text-center text-3xl'}>Categories list</h1>}
            <ul>
                {categories.map((category, index) => {
                    return <li key={index} className={category.id == selectedCategory ? 'border p-5 cursor-pointer bg-gray-200' : 'border p-5 cursor-pointer'} onClick={() => {
                        setSelectedCategory(category.id);
                    }}>
                        {category.name}
                    </li>
                })}
            </ul>
        </div>

        <div className={'col-span-full md:col-span-9 lg:col-span-10 border p-5'}>
          <h1 className={'text-center text-3xl'}>blank space</h1>
        </div>

      </div>

      </>
  );
}

export default App;
