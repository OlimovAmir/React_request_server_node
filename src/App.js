import { Folder } from 'react-bootstrap-icons';
import { FaFile } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    // Создаем асинхронную функцию для выполнения запроса
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/'); // Замените URL на свой
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Вызываем функцию fetchData() внутри useEffect
    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз после монтирования компонента


  const clickHandler = event=>{
    event.preventDefault();
    console.log(event.target.attributes.href.value);
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/?path='+event.target.attributes.href.value ); // Замените URL на свой
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }
  return (
    <div>
    
      {data ? (
        // Отображение данных, полученных в результате запроса
        <ul>
          {data.map((item, index) => (
            <li key={index}>
            
              {item.isDirectory ? (
               
                <span>
                  <Folder size={24} className='m-2' />
                  Папка: <a href={ '/' + item.name} onClick={clickHandler}>{item.name.toUpperCase()}</a>
                  
                </span>
                
                
              ) : (
                
                <span>
                  <FaFile size={24} className='m-2' /> Файл: {item.name}
                </span>
                
                
              )}
            </li>
          ))}
        </ul>
      ) : (
        // Отображение загрузки или ошибки
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
