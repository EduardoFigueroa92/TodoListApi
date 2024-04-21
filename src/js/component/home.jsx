import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
    const [todoList, setTodoList] = useState([]); 

    useEffect(() => {
        getTodos(); // Llamamos a la función getTodos al montar el componente
    }, []);

    const getTodos = () => {
        fetch("https://playground.4geeks.com/todo/users/edu") 
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setTodoList(result.todos); // Guardamos la lista de tareas en el estado
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container">
            <h1>Lista de tareas pendientes</h1>
			{/* Aquí va la funcionalidad para añadir tareas */}
            <ul>
                {todoList.map((item, index) => (
                    <li>
                        {item.label} {/* Mostramos el título de la tarea */}
                        <i
                            className="fas fa-trash-alt float-end"
                            onClick={() =>
                                setTodoList(prevList =>
                                    prevList.filter(
                                        (t, currentIndex) => index !== currentIndex
                                    )
                                )
                            } // Eliminamos la tarea al hacer clic en el icono de la papelera
                        ></i>
                    </li>
                ))}
            </ul>
            <div>{todoList.length} tareas</div> {/* Mostramos la cantidad de tareas */}
        </div>
    );
};

export default Home;