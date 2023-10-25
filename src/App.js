import { Folder, ArrowLeft } from 'react-bootstrap-icons';
import { FaFile } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPath, setCurrentPath] = useState('/');

  // Определите функцию fetchData вне useEffect
  const fetchData = async (path) => {
    try {
      const response = await fetch('http://localhost:8000/?path=' + path);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Используйте fetchData для получения данных при монтировании компонента
    fetchData(currentPath);
  }, [currentPath]);

  const clickHandler = (event, item) => {
    event.preventDefault();
    if (item.isDirectory) {
      const newPath = currentPath + item.name + '/';
      setCurrentPath(() => newPath); // Обновляем currentPath с использованием функции
    }
  };

  const goBack = (event) => {
    event.preventDefault();
    let parts = currentPath.split('/');
    // Убираем пустую строку, которая появляется из-за / в конце пути
    parts = parts.filter((part) => part !== '');

    // Убираем последний элемент (папку, в которую мы перешли)
    parts.pop();

    // Собираем путь обратно с / между элементами
    const newPath = '/' + parts.join('/');

    setCurrentPath(newPath);
  };

  return (
    <div>
      <div>
        <a href={currentPath} onClick={goBack} className='m-4'>
          Назад
        </a>
        <span className='ml-3'>Текущий путь: {currentPath}</span>
      </div>
      {Array.isArray(data) && data.length > 0 ? (
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