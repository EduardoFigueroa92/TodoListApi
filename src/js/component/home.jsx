import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
    const [todoList, setTodoList] = useState([]); 
    const [newTodoLabel, setNewTodoLabel] = useState(""); // Estado para almacenar el valor del nuevo campo de entrada de tarea

    useEffect(() => {
        getTodos(); // Llamamos a la función getTodos al montar el componente
    }, []);

    const getTodos = () => {
        
        fetch("https://playground.4geeks.com/todo/users/edu") 
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result && result.todos && Array.isArray(result.todos)) {
                    setTodoList(result.todos);
                } else {
                    console.error("La respuesta de la API no es válida.");
                }
            })
            .catch(error => console.error(error));
    };

    const handleAddTodo = async (e) => {
        e.preventDefault(); // Evitar que el formulario recargue la página

        if (newTodoLabel.trim() === "") {
            alert("Por favor, ingresa una etiqueta para la nueva tarea.");
            return;
        }

        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/edu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    label: newTodoLabel
                })
            });
            if (response.ok) {
                getTodos(); // Recargar la lista de tareas después de agregar una nueva tarea
                setNewTodoLabel(""); // Limpiar el campo de entrada de la nueva tarea
            } else {
                console.error("Error al agregar la tarea:", response.statusText);
            }
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
        }
    };
      
        // Función para manejar la eliminación de una tarea
        const handleDeleteTodo = async (id) => {
            console.log(id);
            try {
                const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    getTodos(); // Recargar la lista de tareas después de eliminar una tarea
                } else {
                    console.error("Error al eliminar la tarea:", response.statusText);
                }
            } catch (error) {
                console.error("Error en la solicitud DELETE:", error);
            }
        };
    
    return (
        <div className="container">
            <h1>Lista de tareas pendientes</h1>
			{/* Aquí va la funcionalidad para añadir tareas */}
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodoLabel}
                    onChange={(e) => setNewTodoLabel(e.target.value)}
                    placeholder="Agregar nueva tarea"
                />
                <button type="submit">Agregar</button>
            </form>

            <ul>
                {todoList.map((item, index) => (
                    <li  key={index}>
                         <div className="todo-item">
                            <span>{item.label}</span> {/* Mostrar el título de la tarea */}
                            <i
                                className="fas fa-trash-alt float-end"
                                onClick={() => handleDeleteTodo(item.id)} // Eliminamos la tarea al hacer clic en el icono de la papelera
                            ></i>
                        </div>
                    </li>
                ))}
            </ul>
            <div>{todoList.length} tareas</div> {/* Mostramos la cantidad de tareas */}
        </div>
    );
};

export default Home;