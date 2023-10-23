import { Folder } from 'react-bootstrap-icons';
import { FaFile } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState(null);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/');
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
  }, []);

  const clickHandler = (event, item) => {
    event.preventDefault();
    if (item.isDirectory) {
      const newPath = currentPath + item.name + '/';
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:8000/?path=' + newPath);
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
      setCurrentPath(newPath); // Обновляем путь после отправки запроса
    }
  };

  return (
    <div>
      <div className=''>
        current: {currentPath}
      </div>
      {data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.isDirectory ? (
                <span>
                  <Folder size={24} className='m-2' />
                  Папка: <a href={currentPath + item.name} onClick={(event) => clickHandler(event, item)}>{item.name.toUpperCase()}</a>
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
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;