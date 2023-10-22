
import { useEffect, useState } from 'react';
import './App.css';

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

  return (
    <div>
      {data ? (
        // Отображение данных, полученных в результате запроса
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.isDirectory ? `Папка: ${item.name}` : `Файл: ${item.name}`}
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
