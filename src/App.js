import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from "react";

function App() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [questions, setQuestions] = useState();


  const fetchCategories = async () => {
    console.log('this will fetch the categories');
    let res = await fetch('http://localhost:3001/api/v1/categories');
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


  const fetchQuestionsForCategory = async (id) =>{
    console.log('fetch questions for this category id', id);
    let res = await fetch('http://localhost:3001/api/v1/categories/${id}/questions');
    let data = await res.json();
    console.log(data);
    setQuestions(data);
    //setCategories(data);
  };
  
  
  const createNewQuestion = async () => {
    console.log('create a question for the category id', selectedCategory)
  };
  
  return (
    <>
      <div className="Top" >
        <div className={'col-span-full border p-5'}>
          <h1 className={'Heading'}>BILLIE EILISH</h1>
          <p className={'SubHeading'}>FAN FORUM</p>
        </div>

      </div>

      <div className="CategoryColumn">
      <div className="grid grid-cols-12">
        <div className={'col-span-full md:col-span-3 lg:col-span-2 border p-5'}>
          <div className="CategoryColumnHeading">
          {<h1 className={'text-center text-xl p-5'}><b>SELECT A CATEGORY</b></h1>}
          </div>
            <div className="Categories">
            <ul>
              
                {categories.map((category, index) => {
                    return <li key={index} className={category.id == selectedCategory ? 'border p-5 cursor-pointer bg-gray-200' : 'border p-5 cursor-pointer'} onClick={() => {
                        setSelectedCategory(category.id);
                      fetchQuestionsForCategory(category.id)
                    }}>
                        {category.name}
                    </li>
                  
                })}
            </ul>
            </div>
        </div>
        

        <div className={'col-span-full md:col-span-9 lg:col-span-10 border p-5'}>
          <div className="buttons">
          <button className={'border p-2 pl-4 pr-4 bg-gray-200'} onClick={createNewQuestion}>New Question</button>
          <br/>
          <br/>
          </div>
          <ul>
            {questions && questions.map((question) => {
              return <li key={question.id}>
                {question.question.Txt}
              </li>

            })}
          </ul>

          {/*questions && <p>{JSON.stringify(questions)}</p>*/}
        </div>

      </div>
      </div>
      </>
  );
}

export default App;
